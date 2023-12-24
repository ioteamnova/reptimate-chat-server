import BaseEntity from 'src/core/entity/base.entity';
export declare class LiveRoom extends BaseEntity {
    boardIdx: number;
    buyPrice: number;
    startPrice: number;
    unit: number;
    startTime: Date;
    endTime: Date;
    extensionRule: string;
    gender: string;
    size: string;
    variety: string;
    pattern: string;
    state: string;
    streamKey: string;
}
