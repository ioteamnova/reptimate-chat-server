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
exports.LiveChatGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const board_repository_1 = require("./repositories/board.repository");
const http_error_objects_1 = require("../../core/http/http-error-objects");
let LiveChatGateway = class LiveChatGateway {
    constructor(redisService, boardRepository) {
        this.redisService = redisService;
        this.boardRepository = boardRepository;
        this.logger = new common_1.Logger('Chat Gateway');
        this.rooms = new Map();
    }
    afterInit() {
        this.nsp.adapter.on('create-room', (room) => {
            this.logger.log(`"Room:${room}"이 생성되었습니다.`);
        });
        this.nsp.adapter.on('join-live', (room, id) => {
            this.logger.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
        });
        this.nsp.adapter.on('leave-room', (room, id) => {
            this.logger.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
        });
        this.nsp.adapter.on('delete-room', (roomName) => {
            this.logger.log(`"Room:${roomName}"이 삭제되었습니다.`);
        });
        this.nsp.adapter.on('message', (roomName) => {
            console.log();
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
        if (message.message.length > 100) {
            throw new common_1.BadRequestException(http_error_objects_1.HttpErrorConstants.LIVEROOM_TOO_LONG);
        }
        const noChatKey = `live-noChat-${room}`;
        const key = `live-chat-${room}`;
        const redis = this.redisService.getClient();
        const isNoChat = await redis.sismember(noChatKey, userIdx.toString());
        if (isNoChat) {
            socket.emit('no_chat', 'no chat');
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.LIVEROOM_NO_CHAT);
        }
        const score = Date.now();
        const jsonMessage = {
            userIdx: userIdx,
            roomIdx: room,
            message: message.message,
            datetime: getCurrentDateTimeString(),
        };
        await redis.zadd(key, score, JSON.stringify(jsonMessage));
        this.nsp.to(message.room).emit('live_message', jsonMessage);
    }
    async handleJoinRoom(socket, message) {
        const { userIdx, socketId, room, nickname, profilePath } = message;
        socket.join(room);
        const roomName = `live-chat-${room}`;
        const key = `live-user-list-${room}`;
        const banKey = `live-ban-${room}`;
        const redis = this.redisService.getClient();
        const isBanned = await redis.sismember(banKey, userIdx.toString());
        if (isBanned) {
            socket.emit('ban-notification', {
                message: http_error_objects_1.HttpErrorConstants.LIVEROOM_BAN,
            });
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.LIVEROOM_BAN);
        }
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
        const participants = await Array.from((this.nsp.adapter.rooms.get(room) || new Set()).values());
        const jsonMessage = {
            userIdx: userIdx,
            profilePath: profilePath,
            nickname: nickname,
        };
        await redis.sadd(key, JSON.stringify(jsonMessage));
        const userList = await redis.smembers(key);
        participants.forEach((participantSocketId) => {
            if (socketId == participantSocketId) {
                this.nsp.to(room).emit('live_participate', userList);
            }
            else {
                this.nsp.to(room).emit('live_participate', jsonMessage);
            }
        });
    }
    async leaveRoom(socket, message) {
        const { userIdx, roomIdx } = message;
        const redis = this.redisService.getClient();
        await userOut(roomIdx, userIdx, redis, this.rooms);
        const jsonMessage = {
            userIdx: userIdx,
        };
        this.nsp.to(roomIdx).emit('leave-user', jsonMessage);
    }
    async userBan(message) {
        const { userIdx, boardIdx, banUserIdx, room } = message;
        const result = await this.boardRepository.findOne({
            where: {
                idx: parseInt(boardIdx),
            },
        });
        if (result.userIdx !== userIdx) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.LIVEROOM_NOT_HOST);
        }
        const banKey = `live-ban-${room}`;
        const redis = this.redisService.getClient();
        await redis.sadd(banKey, banUserIdx);
        const jsonMessage = {
            userIdx: banUserIdx,
        };
        this.nsp.to(room).emit('ban-user', jsonMessage);
    }
    async noChat(message) {
        const { userIdx, boardIdx, banUserIdx, room } = message;
        const result = await this.boardRepository.findOne({
            where: {
                idx: parseInt(boardIdx),
            },
        });
        if (result.userIdx !== userIdx) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.LIVEROOM_NOT_HOST);
        }
        const banKey = `live-noChat-test`;
        const redis = this.redisService.getClient();
        redis.sadd(banKey, 'test');
        const roomName = `live-chat-${room}`;
        const userSocketsMap = this.rooms.get(roomName);
        if (!userSocketsMap) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.LIVEROOM_NOT_EXIST);
        }
        const userSocket = userSocketsMap.get(banUserIdx);
        if (userSocket) {
            userSocket.emit('no_chat', 'no chat');
        }
    }
    async noChatDelete(message) {
        const { userIdx, boardIdx, banUserIdx, room } = message;
        const result = await this.boardRepository.findOne({
            where: {
                idx: parseInt(boardIdx),
            },
        });
        if (result.userIdx !== userIdx) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.LIVEROOM_NOT_HOST);
        }
        const noChatKey = `live-noChat-${room}`;
        const redis = this.redisService.getClient();
        await redis.srem(noChatKey, banUserIdx.toString());
        const roomName = `live-chat-${room}`;
        const userSocketsMap = this.rooms.get(roomName);
        if (!userSocketsMap) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.LIVEROOM_NOT_EXIST);
        }
        const userSocket = userSocketsMap.get(banUserIdx);
        if (userSocket) {
            const jsonMessage = {
                userIdx: banUserIdx,
            };
            userSocket.emit('no_chat_delete', jsonMessage);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], LiveChatGateway.prototype, "nsp", void 0);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], LiveChatGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], LiveChatGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('live_message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], LiveChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-live'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], LiveChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-room'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], LiveChatGateway.prototype, "leaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('user_ban'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LiveChatGateway.prototype, "userBan", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('noChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LiveChatGateway.prototype, "noChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('noChatDelete'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LiveChatGateway.prototype, "noChatDelete", null);
LiveChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'LiveChat',
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Authorization'],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [nestjs_redis_1.RedisService,
        board_repository_1.BoardRepository])
], LiveChatGateway);
exports.LiveChatGateway = LiveChatGateway;
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
async function userOut(roomIdx, userIdx, redis, rooms) {
    const roomName = `live-chat-${roomIdx}`;
    const key = `live-user-list-${roomIdx}`;
    if (rooms.has(roomName)) {
        const usersInRoom = rooms.get(roomName);
        if (usersInRoom.has(userIdx)) {
            usersInRoom.delete(userIdx);
            if (usersInRoom.size === 0) {
                rooms.delete(roomName);
            }
        }
    }
    const setValues = await redis.smembers(key);
    for (const value of setValues) {
        const parsedValue = JSON.parse(value);
        if (parsedValue.userIdx === userIdx) {
            await redis.srem(key, value);
        }
    }
}
//# sourceMappingURL=live_chat.gateway.js.map