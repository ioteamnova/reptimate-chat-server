import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { ChatConversationRepository } from './repositories/chat-conversation.repository';
import { DataSource } from 'typeorm';
import { FbTokenRepository } from '../user/repositories/user.fbtoken.repository';
import { FCMService } from 'src/utils/fcm.service';
import { UserService } from '../user/user.service';
export declare class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly redisService;
    private chatConversationRepository;
    private dataSource;
    private fbTokenRepository;
    private fCMService;
    private userService;
    constructor(redisService: RedisService, chatConversationRepository: ChatConversationRepository, dataSource: DataSource, fbTokenRepository: FbTokenRepository, fCMService: FCMService, userService: UserService);
    private logger;
    private rooms;
    nsp: Namespace;
    afterInit(nsp: any): void;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
    handleMessage(socket: Socket, message: {
        userIdx: number;
        oppositeIdx: number;
        message: string;
        room: string;
    }): Promise<void>;
    MessageRead(socket: Socket, message: {
        userIdx: number;
        score: string;
        room: string;
    }): Promise<void>;
    handleJoinRoom(socket: Socket, message: {
        userIdx: number;
        message: string;
        room: string;
    }): void;
    removeMessage(socket: Socket, message: {
        userIdx: number;
        score: number;
        room: string;
    }): Promise<void>;
}
