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
exports.AuctionChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const chat_conversation_entity_1 = require("./entities/chat-conversation.entity");
const constants_1 = require("./helpers/constants");
const auction_alert_entity_1 = require("./entities/auction_alert.entity");
const auction_user_entity_1 = require("./entities/auction_user.entity");
const user_entity_1 = require("../user/entities/user.entity");
const schedule_1 = require("@nestjs/schedule");
const auction_alert_repository_1 = require("./repositories/auction-alert.repository");
const auction_chat_gateway_1 = require("./auction_chat.gateway");
const fcm_service_1 = require("../../utils/fcm.service");
const user_fbtoken_repository_1 = require("../user/repositories/user.fbtoken.repository");
const board_repository_1 = require("../live_chat/repositories/board.repository");
const moment = require("moment");
const board_auction_repository_1 = require("./repositories/board-auction.repository");
let AuctionChatService = class AuctionChatService {
    constructor(dataSource, redisService, boardAuctionRepository, auctionAlertRepository, fbTokenRepository, auctionChatGateway, fCMService, boardRepository) {
        this.dataSource = dataSource;
        this.redisService = redisService;
        this.boardAuctionRepository = boardAuctionRepository;
        this.auctionAlertRepository = auctionAlertRepository;
        this.fbTokenRepository = fbTokenRepository;
        this.auctionChatGateway = auctionChatGateway;
        this.fCMService = fCMService;
        this.boardRepository = boardRepository;
    }
    async getChatData(pageRequest, roomIdx) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const key = `auction-chat${roomIdx}`;
            const redis = this.redisService.getClient();
            const result = {};
            const getData = await redis.zrevrange(key, (pageRequest.page - 1) * pageRequest.size, (pageRequest.page - 1) * pageRequest.size + pageRequest.size - 1, 'WITHSCORES');
            const conversationList = [];
            for (let i = 0; i < getData.length; i += 2) {
                const jsonMember = getData[i];
                const data = JSON.parse(jsonMember);
                conversationList.push(data);
            }
            if (conversationList.length < pageRequest.size) {
                const skip = (pageRequest.page - 1) * pageRequest.size + conversationList.length;
                const limit = pageRequest.size - conversationList.length;
                const chatConversations = await queryRunner.manager.find(chat_conversation_entity_1.ChatConversation, {
                    where: {
                        roomIdx: roomIdx,
                        type: constants_1.chatType.AUCTION,
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
                    const key = `auction-chat${chatConversation.roomIdx}`;
                    await redis.zadd(key, chatConversation.score, JSON.stringify(jsonMessage));
                    conversationList.push(jsonMessage);
                }
            }
            const userkey = `auction-user-list-${roomIdx}`;
            const userInfoList = await redis.smembers(userkey);
            if (userInfoList.length === 0) {
                const userData = await queryRunner.manager.find(auction_user_entity_1.AuctionUser, {
                    where: {
                        auctionIdx: roomIdx,
                    },
                });
                await Promise.all(userData.map(async (user) => {
                    const userInfo = await queryRunner.manager.findOne(user_entity_1.User, {
                        where: {
                            idx: user.userIdx,
                        },
                    });
                    const jsonMessage = {
                        userIdx: userInfo.idx,
                        profilePath: userInfo.profilePath,
                        nickname: userInfo.nickname,
                    };
                    await redis.sadd(userkey, JSON.stringify(jsonMessage));
                    userInfoList.push(JSON.stringify(jsonMessage));
                    return user;
                }));
            }
            result.list = conversationList;
            result.userInfo = userInfoList;
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
    async auctionAlertSet(auctionIdx, userIdx, action) {
        const redis = this.redisService.getClient();
        const key = `auction-alert-list-${auctionIdx}`;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            if (action === constants_1.chat.ON) {
                const data = auction_alert_entity_1.AuctionAlert.from(auctionIdx, userIdx);
                await queryRunner.manager.save(data);
                await redis.sadd(key, userIdx);
            }
            else if (action === constants_1.chat.OFF) {
                await queryRunner.manager.delete(auction_alert_entity_1.AuctionAlert, {
                    userIdx: userIdx,
                    auctionIdx: auctionIdx,
                });
                const alertList = await redis.smembers(key);
                const updatedMembers = alertList.filter((member) => member !== userIdx.toString());
                await redis.del(key);
                if (updatedMembers.length > 0) {
                    await redis.sadd(key, updatedMembers);
                }
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async auctionParticipation(auctionIdx, userIdx) {
        const redis = this.redisService.getClient();
        const key = `auction-user-list-${auctionIdx}`;
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const data = auction_user_entity_1.AuctionUser.from(auctionIdx, userIdx);
            await queryRunner.manager.save(data);
            const jsonMessage = {
                userIdx: userIdx,
                profilePath: null,
                nickname: null,
            };
            await redis.sadd(key, JSON.stringify(jsonMessage));
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async checkSchedules() {
        moment.tz.setDefault('Asia/Seoul');
        const currentTime = moment().format('YYYY-MM-DD HH:mm');
        const socketGateway = this.auctionChatGateway;
        this.auctionFinishCheck(currentTime, socketGateway);
        this.auctionAlertCheck(currentTime);
    }
    async auctionAlertCheck(currentTime) {
        const boardAuctions = await this.boardAuctionRepository.findAlertTimeByTime(currentTime);
        if (boardAuctions.length === 0) {
            console.log('No auction alert schedules to send alerts.');
            return;
        }
        for (const data of boardAuctions) {
            const boardInfo = await this.boardRepository.findOne({
                where: {
                    idx: data.boardIdx,
                },
            });
            const endTime = new Date(data.endTime);
            const alertTime = new Date(data.alertTime);
            const leftTime = endTime.getTime() - alertTime.getTime();
            const leftMinute = leftTime / (1000 * 60);
            const alertList = await this.auctionAlertRepository.find({
                where: {
                    auctionIdx: data.idx,
                },
            });
            for (const data of alertList) {
                const results = await this.fbTokenRepository.find({
                    where: {
                        userIdx: data.userIdx,
                    },
                });
                for (const data of results) {
                    this.fCMService.sendFCM(data.fbToken, '경매', `해당 경매 마감이 ${leftMinute}분 남았습니다`);
                }
            }
        }
    }
    async auctionFinishCheck(currentTime, socketGateway) {
        const boardAuctions = await this.boardAuctionRepository.findEndTimeByTime(currentTime);
        if (boardAuctions.length === 0) {
            console.log('No end auction schedules to send alerts.');
            return;
        }
        for (const data of boardAuctions) {
            let alertList = await this.auctionAlertRepository.find({
                where: {
                    auctionIdx: data.idx,
                },
            });
            const redis = this.redisService.getClient();
            const key = `auction-chat${data.boardIdx}`;
            const bidderList = await redis.zrevrange(key, 0, 0);
            if (bidderList.length > 0) {
                const lastBidderInfo = JSON.parse(bidderList[0]);
                data.successfulBidder = lastBidderInfo.userIdx;
            }
            data.state = 'end';
            this.boardAuctionRepository.save(data);
            const rooms = socketGateway.rooms;
            const roomName = `auction-chat-${data.idx.toString()}`;
            const userSocketsMap = rooms.get(roomName);
            if (userSocketsMap !== undefined) {
                for (const [userIdx, socket] of userSocketsMap) {
                    for (const data of alertList) {
                        if (data.userIdx === userIdx) {
                            alertList = alertList.filter((alert) => alert.userIdx !== userIdx);
                        }
                        else {
                            socket.emit('Auction_End', '경매 끝');
                        }
                    }
                }
            }
            for (const data of alertList) {
                const results = await this.fbTokenRepository.find({
                    where: {
                        userIdx: data.userIdx,
                    },
                });
                for (const data of results) {
                    this.fCMService.sendFCM(data.fbToken, '경매', '해당 경매가 마감되었습니다.');
                }
            }
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuctionChatService.prototype, "checkSchedules", null);
AuctionChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        nestjs_redis_1.RedisService,
        board_auction_repository_1.BoardAuctionRepository,
        auction_alert_repository_1.AuctionAlertRepository,
        user_fbtoken_repository_1.FbTokenRepository,
        auction_chat_gateway_1.AuctionChatGateway,
        fcm_service_1.FCMService,
        board_repository_1.BoardRepository])
], AuctionChatService);
exports.AuctionChatService = AuctionChatService;
//# sourceMappingURL=auction_chat.service.js.map