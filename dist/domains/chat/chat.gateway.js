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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const chat_conversation_repository_1 = require("./repositories/chat-conversation.repository");
const chat_conversation_entity_1 = require("./entities/chat-conversation.entity");
const constants_1 = require("./helpers/constants");
const typeorm_1 = require("typeorm");
const chat_room_entity_1 = require("./entities/chat-room.entity");
const user_fbtoken_repository_1 = require("../user/repositories/user.fbtoken.repository");
const fcm_service_1 = require("../../utils/fcm.service");
const user_service_1 = require("../user/user.service");
let EventsGateway = class EventsGateway {
    constructor(redisService, chatConversationRepository, dataSource, fbTokenRepository, fCMService, userService) {
        this.redisService = redisService;
        this.chatConversationRepository = chatConversationRepository;
        this.dataSource = dataSource;
        this.fbTokenRepository = fbTokenRepository;
        this.fCMService = fCMService;
        this.userService = userService;
        this.logger = new common_1.Logger('Chat Gateway');
        this.rooms = new Map();
    }
    afterInit(nsp) {
        nsp.adapter.on('create-room', (room) => {
            this.logger.log(`"Room:${room}"이 생성되었습니다.`);
        });
        nsp.adapter.on('join-room', (room, id) => {
            this.logger.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
        });
        nsp.adapter.on('leave-room', (room, id) => {
            this.logger.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
        });
        nsp.adapter.on('delete-room', (roomName) => {
            this.logger.log(`"Room:${roomName}"이 삭제되었습니다.`);
        });
        nsp.adapter.on('message', (roomName) => {
            console.log(roomName);
        });
        this.logger.log('웹소켓 서버 초기화 ✅');
    }
    handleConnection(socket) {
        this.logger.log(`${socket.id} 소켓 연결`);
        socket.broadcast.emit('message', {
            message: `${socket.id}가 들어왔습니다.`,
        });
    }
    handleDisconnect(socket) {
        this.logger.log(`${socket.id} 소켓 연결 해제 ❌`);
    }
    async handleMessage(socket, message) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            this.logger.log(`채팅 발신 이벤트(1) - 발신자 ID: ${message.userIdx} / 수신자 ID: ${message.oppositeIdx} / room ID: ${message.room} / 메시지: ${message.message}`);
            const score = Date.now();
            const Data = chat_conversation_entity_1.ChatConversation.from(constants_1.chatType.PERSONAL, score, parseInt(message.room), message.userIdx, message.message);
            await queryRunner.manager.save(Data);
            const entityToUpdate = await queryRunner.manager.findOne(chat_room_entity_1.ChatRoom, {
                where: { idx: parseInt(message.room) },
            });
            if (!entityToUpdate) {
                throw new Error(`해당 방을 찾을 수 없습니다.`);
            }
            entityToUpdate.recentMessage = message.message;
            await entityToUpdate.save();
            const jsonMessage = {
                userIdx: message.userIdx,
                roomIdx: message.room,
                message: message.message,
                action: 'send',
                datetime: getCurrentDateTimeString(),
                score: score,
            };
            const key = `personal-chat${message.room}`;
            const redis = this.redisService.getClient();
            await redis.zadd(key, score, JSON.stringify(jsonMessage));
            this.nsp.to(message.room).emit('message', jsonMessage);
            const socketIdsInRoom = Array.from(this.nsp.adapter.rooms.get(message.room) || []);
            this.logger.log(`채팅 발신 이벤트(2) - ${message.room}번 방에 몇명이 있는가? (발신자 포함) ${socketIdsInRoom.length}`);
            const otherUserIds = socketIdsInRoom.filter((socketId) => socketId !== socket.id);
            this.logger.log(`채팅 발신 이벤트(3) - ${message.room}번 방에 몇명이 있는가? (발신자 제외) ${otherUserIds.length}`);
            const otherUsersExist = otherUserIds.length > 0;
            const results = await this.fbTokenRepository.find({
                where: {
                    userIdx: message.oppositeIdx,
                },
            });
            const senderInfo = await this.userService.getUserDetailInfo(message.userIdx);
            for (const data of results) {
                this.logger.log(`채팅 발신 이벤트(4) - ${data.fbToken}에 알림을 보냈다.`);
                this.fCMService.sendFCM(data.fbToken, senderInfo.nickname, `${message.message}`);
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
    async MessageRead(socket, message) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const returnMessage = await queryRunner.manager.findOne(chat_conversation_entity_1.ChatConversation, {
                where: { score: parseInt(message.score) },
            });
            if (!returnMessage) {
                throw new Error(`해당 메시지가 없습니다.`);
            }
            returnMessage.action = 'read';
            await returnMessage.save();
            const key = `personal-chat${message.room}`;
            const redis = this.redisService.getClient();
            const members = await redis.zrangebyscore(key, returnMessage.score, returnMessage.score);
            if (members && members.length > 0) {
                const member = JSON.parse(members[0]);
                member.action = 'read';
                await redis.zremrangebyscore(key, returnMessage.score, returnMessage.score);
                await redis.zadd(key, returnMessage.score, JSON.stringify(member));
            }
            this.nsp.to(message.room).emit('afterRead', members);
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
    handleJoinRoom(socket, message) {
        socket.join(message.room);
        this.logger.log(`Socket ${message.userIdx}이(가) 방 ${message.room}에 참여하였습니다.`);
    }
    async removeMessage(socket, message) {
        const getMessage = await this.chatConversationRepository.findOne({
            where: {
                score: message.score,
                roomIdx: parseInt(message.room),
                userIdx: message.userIdx,
            },
        });
        if (!getMessage) {
            throw new Error(`해당 메시지를 찾을 수 없습니다.`);
        }
        getMessage.message = constants_1.chat.DELETE;
        getMessage.deletedAt = new Date();
        await this.chatConversationRepository.save(getMessage);
        const key = `personal-chat${message.room}`;
        const redisClient = this.redisService.getClient();
        const existingData = await redisClient.zrangebyscore(key, message.score, message.score);
        if (existingData.length === 0) {
            throw new Error(`Score ${message.score} not found in ${key}.`);
        }
        const result = JSON.parse(existingData[0]);
        result.message = constants_1.chat.DELETE;
        await redisClient.zremrangebyscore(key, message.score, message.score);
        await redisClient.zadd(key, message.score, JSON.stringify(result));
        this.nsp.to(message.room).emit('removeMessage', result);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], EventsGateway.prototype, "nsp", void 0);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('messageRead'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "MessageRead", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-room'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "removeMessage", null);
EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'chat',
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Authorization'],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [nestjs_redis_1.RedisService,
        chat_conversation_repository_1.ChatConversationRepository,
        typeorm_1.DataSource,
        user_fbtoken_repository_1.FbTokenRepository,
        fcm_service_1.FCMService,
        user_service_1.UserService])
], EventsGateway);
exports.EventsGateway = EventsGateway;
function getCurrentDateTimeString() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
//# sourceMappingURL=chat.gateway.js.map