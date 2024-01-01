import { DataSource } from 'typeorm';
import { PageRequest } from 'src/core/page';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { AuctionAlertRepository } from './repositories/auction-alert.repository';
import { AuctionChatGateway } from './auction_chat.gateway';
import { FCMService } from 'src/utils/fcm.service';
import { FbTokenRepository } from '../user/repositories/user.fbtoken.repository';
import { BoardRepository } from '../live_chat/repositories/board.repository';
import { BoardAuctionRepository } from './repositories/board-auction.repository';
interface YourChatMessageType {
    userIdx: number;
    action: string;
    message: string;
}
interface messageList {
    list: YourChatMessageType[];
    userInfo: string[];
}
export declare class AuctionChatService {
    private dataSource;
    private readonly redisService;
    private boardAuctionRepository;
    private auctionAlertRepository;
    private fbTokenRepository;
    private auctionChatGateway;
    private fCMService;
    private boardRepository;
    constructor(dataSource: DataSource, redisService: RedisService, boardAuctionRepository: BoardAuctionRepository, auctionAlertRepository: AuctionAlertRepository, fbTokenRepository: FbTokenRepository, auctionChatGateway: AuctionChatGateway, fCMService: FCMService, boardRepository: BoardRepository);
    getChatData(pageRequest: PageRequest, roomIdx: number): Promise<messageList>;
    auctionAlertSet(auctionIdx: number, userIdx: number, action: string): Promise<void>;
    auctionParticipation(auctionIdx: number, userIdx: number): Promise<void>;
    checkSchedules(): Promise<void>;
    auctionAlertCheck(currentTime: string): Promise<void>;
    auctionFinishCheck(currentTime: string, socketGateway: AuctionChatGateway): Promise<void>;
}
export {};
