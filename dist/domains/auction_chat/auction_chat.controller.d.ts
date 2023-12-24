/// <reference types="express" />
import { PageRequest } from 'src/core/page';
import { AuctionChatService } from './auction_chat.service';
import { User } from 'src/domains/user/entities/user.entity';
export declare class AuctionChatcontroller {
    private readonly chatService;
    constructor(chatService: AuctionChatService);
    getChatData(res: any, pageRequest: PageRequest, auctionIdx: number): Promise<import("express").Response<unknown, Record<string, any>>>;
    auctionParticipation(res: any, dto: {
        auctionIdx: number;
        userIdx: number;
    }): Promise<import("express").Response<unknown, Record<string, any>>>;
    auctionAlertSet(res: any, user: User, auctionIdx: number, dto: {
        userIdx: number;
        action: string;
    }): Promise<import("express").Response<unknown, Record<string, any>>>;
}
