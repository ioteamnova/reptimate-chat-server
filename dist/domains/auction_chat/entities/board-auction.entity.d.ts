import BaseEntity from 'src/core/entity/base.entity';
export declare class BoardAuction extends BaseEntity {
    boardIdx: number;
    buyPrice: number;
    startPrice: number;
    currentPrice: number;
    unit: number;
    alertTime: Date;
    endTime: string;
    extensionTime: string;
    extensionRule: number;
    gender: string;
    size: string;
    variety: string;
    pattern: string;
    state: string;
    successfulBidder: string;
    streamKey: string;
    static from(idx: number, boardIdx: number, buyPrice: number, startPrice: number, currentPrice: number, unit: number, endTime: string, extensionRule: number, extensionTime: string, gender: string, size: string, variety: string, pattern: string, state: string, streamKey: string, createdAt: Date, updatedAt: Date): BoardAuction;
}
