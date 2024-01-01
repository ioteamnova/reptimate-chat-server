import BaseEntity from 'src/core/entity/base.entity';
export declare class Board extends BaseEntity {
    category: string;
    userIdx: number;
    title: string;
    thumbnail: string;
    description: string;
    commentCnt: number;
    status: string;
    view: number;
}
