import { Repository } from 'typeorm';
import { BoardAuction } from '../entities/board-auction.entity';
export declare class BoardAuctionRepository extends Repository<BoardAuction> {
    findEndTimeByTime(time: string): Promise<BoardAuction[]>;
    findAlertTimeByTime(time: string): Promise<BoardAuction[]>;
}
