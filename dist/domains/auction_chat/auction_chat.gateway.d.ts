import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { DataSource } from 'typeorm';
import { AuctionAlertRepository } from './repositories/auction-alert.repository';
import { FbTokenRepository } from '../user/repositories/user.fbtoken.repository';
import { FCMService } from 'src/utils/fcm.service';
import { BoardAuction } from './entities/board-auction.entity';
import { BoardAuctionRepository } from './repositories/board-auction.repository';
export declare class AuctionChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly redisService;
    private dataSource;
    private auctionAlertRepository;
    private fbTokenRepository;
    private fCMService;
    private boardAuctionRepository;
    constructor(redisService: RedisService, dataSource: DataSource, auctionAlertRepository: AuctionAlertRepository, fbTokenRepository: FbTokenRepository, fCMService: FCMService, boardAuctionRepository: BoardAuctionRepository);
    private logger;
    rooms: Map<string, Map<number, Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>>>;
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
        message: string;
        room: string;
    }): void;
    joinsend(socket: Socket, message: {
        userIdx: number;
        profilePath: string;
        nickname: string;
        room: string;
    }): Promise<void>;
    getAuctionInfo(room: string): Promise<BoardAuction>;
}
