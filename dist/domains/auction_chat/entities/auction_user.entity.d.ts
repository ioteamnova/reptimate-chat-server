import BaseEntity from 'src/core/entity/base.entity';
export declare class AuctionUser extends BaseEntity {
    auctionIdx: number;
    userIdx: number;
    static from(auctionIdx: number, userIdx: number): AuctionUser;
}
