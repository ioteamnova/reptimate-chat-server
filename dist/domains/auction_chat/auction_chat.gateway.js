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
exports.AuctionChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const chat_conversation_entity_1 = require("./entities/chat-conversation.entity");
const constants_1 = require("./helpers/constants");
const typeorm_1 = require("typeorm");
const http_error_objects_1 = require("../../core/http/http-error-objects");
const auction_alert_repository_1 = require("./repositories/auction-alert.repository");
const user_fbtoken_repository_1 = require("../user/repositories/user.fbtoken.repository");
const fcm_service_1 = require("../../utils/fcm.service");
const board_auction_entity_1 = require("./entities/board-auction.entity");
const moment = require("moment");
const board_auction_repository_1 = require("./repositories/board-auction.repository");
let AuctionChatGateway = class AuctionChatGateway {
    constructor(redisService, dataSource, auctionAlertRepository, fbTokenRepository, fCMService, boardAuctionRepository) {
        this.redisService = redisService;
        this.dataSource = dataSource;
        this.auctionAlertRepository = auctionAlertRepository;
        this.fbTokenRepository = fbTokenRepository;
        this.fCMService = fCMService;
        this.boardAuctionRepository = boardAuctionRepository;
        this.logger = new common_1.Logger('Chat Gateway');
        this.rooms = new Map();
    }
    afterInit() {
        this.nsp.adapter.on('create-room', (room) => {
            this.logger.log(`"Room:${room}"이 생성되었습니다.`);
        });
        this.nsp.adapter.on('join-room', (room, id) => {
            this.logger.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
        });
        this.nsp.adapter.on('leave-room', (room, id) => {
            this.logger.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
        });
        this.nsp.adapter.on('delete-room', (roomName) => {
            this.logger.log(`"Room:${roomName}"이 삭제되었습니다.`);
        });
        this.nsp.adapter.on('message', (roomName) => {
            console.log(roomName);
        });
        this.logger.log('웹소켓 서버 초기화 ✅');
    }
    handleConnection(socket) {
        this.logger.log(`${socket.id} 소켓 연결`);
    }
    handleDisconnect(socket) {
        this.logger.log(`${socket.id} 소켓 연결 해제 ❌`);
    }
    async handleMessage(socket, message) {
        const { userIdx, room } = message;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const redis = this.redisService.getClient();
            const currentTime = moment().format('YYYY-MM-DD HH:mm');
            const auctionInfo = await this.getAuctionInfo(room);
            if (auctionInfo.state === 'end') {
                throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.AUCTION_END);
            }
            if (auctionInfo.currentPrice >= parseInt(message.message)) {
                throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.AUCTION_PRICE_ROW);
            }
            if (auctionInfo.extensionRule === 1 &&
                moment(currentTime).isAfter(auctionInfo.extensionTime)) {
                auctionInfo.endTime = moment(auctionInfo.endTime)
                    .add(1, 'minute')
                    .format('YYYY-MM-DD HH:mm');
                await queryRunner.manager.save(auctionInfo);
                await redis.set(`acutionInfo-${room}`, JSON.stringify(auctionInfo));
            }
            auctionInfo.currentPrice = parseInt(message.message);
            await queryRunner.manager.save(auctionInfo);
            await redis.set(`acutionInfo-${room}`, JSON.stringify(auctionInfo));
            const score = Date.now();
            const Data = chat_conversation_entity_1.ChatConversation.from(constants_1.chatType.AUCTION, score, parseInt(room), userIdx, message.message);
            await queryRunner.manager.save(Data);
            const jsonMessage = {
                userIdx: userIdx,
                roomIdx: room,
                message: message.message,
                action: 'send',
                datetime: getCurrentDateTimeString(),
            };
            const key = `auction-chat${room}`;
            await redis.zadd(key, score, JSON.stringify(jsonMessage));
            let alertList = await this.auctionAlertRepository.find({
                where: {
                    auctionIdx: parseInt(room),
                },
            });
            this.nsp.to(message.room).emit('Auction_message', Data);
            const roomName = `auction-chat-${room}`;
            const userSocketsMap = this.rooms.get(roomName);
            if (!userSocketsMap) {
                throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.CHATROOM_NOT_EXIST);
            }
            for (const [userIdx, socket] of userSocketsMap) {
                for (const data of alertList) {
                    if (data.userIdx === userIdx) {
                        alertList = alertList.filter((alert) => alert.userIdx !== userIdx);
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
                    this.fCMService.sendFCM(data.fbToken, 'auction', `해당 경매가가 ${message.message}로 갱신되었습니다.`);
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
    handleJoinRoom(socket, message) {
        socket.join(message.room);
        this.logger.log(`옥션 ${message.userIdx}이(가) 방 ${message.room}에 참여하였습니다.`);
        const roomName = `auction-chat-${message.room}`;
        const { userIdx } = message;
        if (this.rooms.has(roomName)) {
            const userMap = this.rooms.get(roomName);
            if (userMap) {
                userMap.set(userIdx, socket);
            }
        }
        else {
            const userMap = new Map();
            userMap.set(userIdx, socket);
            this.rooms.set(roomName, userMap);
        }
    }
    async joinsend(socket, message) {
        const jsonMessage = {
            userIdx: message.userIdx,
            profilePath: message.profilePath,
            nickname: message.nickname,
        };
        this.nsp.to(message.room).emit('auction_participate', jsonMessage);
    }
    async getAuctionInfo(room) {
        const redis = this.redisService.getClient();
        const auctionInfo = await redis.get(`acutionInfo-${room}`);
        if (!auctionInfo) {
            const result = await this.boardAuctionRepository.findOne({
                where: {
                    boardIdx: parseInt(room),
                },
            });
            const data = JSON.stringify(result);
            await redis.set(`acutionInfo-${room}`, data);
            return result;
        }
        else {
            const data = JSON.parse(auctionInfo);
            const result = board_auction_entity_1.BoardAuction.from(data.idx, data.boardIdx, data.buyPrice, data.startPrice, data.currentPrice, data.unit, data.endTime, data.extensionRule, data.extensionTime, data.gender, data.size, data.variety, data.pattern, data.state, data.streamKey, data.createdAt, data.updatedAt);
            return result;
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], AuctionChatGateway.prototype, "nsp", void 0);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AuctionChatGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], AuctionChatGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('Auction_message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AuctionChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-room'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], AuctionChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('auction_participate'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], AuctionChatGateway.prototype, "joinsend", null);
AuctionChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'AuctionChat',
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Authorization'],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [nestjs_redis_1.RedisService,
        typeorm_1.DataSource,
        auction_alert_repository_1.AuctionAlertRepository,
        user_fbtoken_repository_1.FbTokenRepository,
        fcm_service_1.FCMService,
        board_auction_repository_1.BoardAuctionRepository])
], AuctionChatGateway);
exports.AuctionChatGateway = AuctionChatGateway;
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
//# sourceMappingURL=auction_chat.gateway.js.map