"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const chat_member_repository_1 = require("./repositories/chat-member.repository");
const typeorm_1 = require("typeorm");
const chat_room_entity_1 = require("./entities/chat-room.entity");
const chat_member_entity_1 = require("./entities/chat-member.entity");
const page_1 = require("../../core/page");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const chat_conversation_entity_1 = require("./entities/chat-conversation.entity");
const constants_1 = require("./helpers/constants");
const http_error_objects_1 = require("../../core/http/http-error-objects");
const user_repository_1 = require("../user/repositories/user.repository");
const chat_conversation_repository_1 = require("./repositories/chat-conversation.repository");
let ChatService = class ChatService {
    constructor(chatMemberRepository, dataSource, redisService, userRepository, chatConversationRepository) {
        this.chatMemberRepository = chatMemberRepository;
        this.dataSource = dataSource;
        this.redisService = redisService;
        this.userRepository = userRepository;
        this.chatConversationRepository = chatConversationRepository;
        this.findUserInfo = async (result) => {
            const userInfo = await this.userRepository.findOne({
                where: {
                    idx: result,
                },
            });
            const userDetails = {
                idx: userInfo.idx,
                nickname: userInfo.nickname,
                profilePath: userInfo.profilePath,
            };
            return userDetails;
        };
    }
    async findChatRoom(userIdx, oppositeIdx) {
        const result = await this.chatMemberRepository.findOne({
            where: {
                userIdx: userIdx,
                oppositeIdx: oppositeIdx,
            },
        });
        if (!result) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.CHATROOM_NOT_EXIST);
        }
        return result.chatRoomIdx;
    }
    async createRoom(dto, userIdx) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const chatRoom = new chat_room_entity_1.ChatRoom();
            const result = await queryRunner.manager.save(chatRoom);
            const myInfo = chat_member_entity_1.ChatMember.From(result.idx, userIdx, dto.oppositeIdx);
            await queryRunner.manager.save(myInfo);
            const oppositeInfo = chat_member_entity_1.ChatMember.From(result.idx, dto.oppositeIdx, userIdx);
            await queryRunner.manager.save(oppositeInfo);
            await queryRunner.commitTransaction();
            return result;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getChatRoomList(pageRequest, userIdx) {
        const [datas, totalCount] = await this.chatMemberRepository.findAndCountByUserIdx(pageRequest, userIdx);
        const chatRoomInfoArr = [];
        for (const chatRoomInfo of datas) {
            const userDetails = await this.findUserInfo(chatRoomInfo.oppositeIdx);
            chatRoomInfo.UserInfo = userDetails;
            const unreadCount = await this.chatConversationRepository.getUnreadCount(chatRoomInfo.chatRoomIdx, chatRoomInfo.oppositeIdx);
            chatRoomInfo.unreadCount = unreadCount;
            chatRoomInfoArr.push(chatRoomInfo);
        }
        const result = new page_1.Page(totalCount, chatRoomInfoArr, pageRequest);
        return result;
    }
    async getChatData(pageRequest, roomIdx, userIdx) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const chatMemberInfo = await queryRunner.manager.findOne(chat_member_entity_1.ChatMember, {
                where: {
                    userIdx: userIdx,
                    chatRoomIdx: roomIdx,
                },
            });
            if (!chatMemberInfo) {
                throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.CHATROOM_NOT_EXIST);
            }
            let roomOutScore = 0;
            if (chatMemberInfo.roomOut !== null) {
                roomOutScore = new Date(chatMemberInfo.roomOut).getTime();
            }
            const chatConversations = await queryRunner.manager.find(chat_conversation_entity_1.ChatConversation, {
                where: {
                    roomIdx: roomIdx,
                    type: constants_1.chatType.PERSONAL,
                    userIdx: (0, typeorm_1.Not)(userIdx),
                    action: 'send',
                },
            });
            for (const conversation of chatConversations) {
                conversation.action = 'read';
                await queryRunner.manager.save(conversation);
            }
            await queryRunner.manager.save(chatConversations);
            const key = `personal-chat${roomIdx}`;
            const redis = this.redisService.getClient();
            if (pageRequest.page === 1) {
                const getData = await redis.zrevrange(key, 0, -1, 'WITHSCORES');
                for (let i = 0; i < getData.length; i += 2) {
                    const jsonMember = getData[i];
                    const timestamp = getData[i + 1];
                    const data = JSON.parse(jsonMember);
                    if (data.userIdx !== userIdx && data.action === 'send') {
                        data.action = 'read';
                        const updatedJsonMember = JSON.stringify(data);
                        await redis.zrem(key, jsonMember);
                        await redis.zadd(key, timestamp, updatedJsonMember);
                    }
                    else {
                        break;
                    }
                }
            }
            const getData = await redis.zrevrange(key, (pageRequest.page - 1) * pageRequest.size, (pageRequest.page - 1) * pageRequest.size + pageRequest.size - 1, 'WITHSCORES');
            const result = [];
            for (let i = 0; i < getData.length; i += 2) {
                const jsonMember = getData[i];
                const timestamp = parseInt(getData[i + 1]);
                if (timestamp > roomOutScore) {
                    const data = JSON.parse(jsonMember);
                    result.push(data);
                }
            }
            if (result.length < pageRequest.size) {
                const skip = (pageRequest.page - 1) * pageRequest.size + result.length;
                const limit = pageRequest.size - result.length;
                const chatConversations = await queryRunner.manager.find(chat_conversation_entity_1.ChatConversation, {
                    where: {
                        roomIdx: roomIdx,
                        type: constants_1.chatType.PERSONAL,
                        score: (0, typeorm_1.Raw)((alias) => `${alias} > ${roomOutScore}`),
                    },
                    order: {
                        createdAt: 'DESC',
                    },
                    skip: skip,
                    take: limit,
                });
                for (const chatConversation of chatConversations) {
                    const jsonMessage = {
                        userIdx: chatConversation.userIdx,
                        roomIdx: chatConversation.roomIdx,
                        message: chatConversation.message,
                        action: chatConversation.action,
                        datetime: chatConversation.createdAt,
                    };
                    const key = `personal-chat${chatConversation.roomIdx}`;
                    await redis.zadd(key, chatConversation.score, JSON.stringify(jsonMessage));
                    result.push(jsonMessage);
                }
            }
            await queryRunner.commitTransaction();
            return result;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async chatBan(dto, userIdx) {
        const redis = this.redisService.getClient();
        const key = `userBan${userIdx}`;
        const result = await this.chatMemberRepository.findOne({
            where: {
                userIdx: userIdx,
                oppositeIdx: dto.oppositeIdx,
            },
        });
        if (result.state === constants_1.chat.BAN) {
            result.state = constants_1.chat.NORMAL;
        }
        else if (result.state === constants_1.chat.NORMAL) {
            result.state = constants_1.chat.BAN;
        }
        await this.chatMemberRepository.save(result);
        return result.chatRoomIdx;
    }
    async chatRoomOut(roomIdx, userIdx) {
        const date = new Date();
        const result = await this.chatMemberRepository.findOne({
            where: {
                userIdx: userIdx,
                chatRoomIdx: roomIdx,
            },
        });
        result.roomOut = date;
        await this.chatMemberRepository.save(result);
        return result.chatRoomIdx;
    }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chat_member_repository_1.ChatMemberRepository,
        typeorm_1.DataSource,
        nestjs_redis_1.RedisService,
        user_repository_1.UserRepository,
        chat_conversation_repository_1.ChatConversationRepository])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map