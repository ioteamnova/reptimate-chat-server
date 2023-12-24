import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { BoardRepository } from './repositories/board.repository';
export declare class LiveChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly redisService;
    private boardRepository;
    constructor(redisService: RedisService, boardRepository: BoardRepository);
    private logger;
    private rooms;
    nsp: Namespace;
    afterInit(): void;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
    handleMessage(socket: Socket, message: {
        userIdx: number;
        message: string;
        room: string;
    }): Promise<void>;
    handleJoinRoom(socket: Socket, message: {
        userIdx: number;
        socketId: string;
        message: string;
        profilePath: string;
        nickname: string;
        room: string;
    }): Promise<void>;
    leaveRoom(socket: Socket, message: {
        userIdx: number;
        roomIdx: string;
    }): Promise<void>;
    userBan(message: {
        userIdx: number;
        banUserIdx: number;
        boardIdx: string;
        room: string;
    }): Promise<void>;
    noChat(message: {
        userIdx: number;
        banUserIdx: number;
        boardIdx: string;
        room: string;
    }): Promise<void>;
    noChatDelete(message: {
        userIdx: number;
        banUserIdx: number;
        boardIdx: string;
        room: string;
    }): Promise<void>;
}
