import BaseEntity from 'src/core/entity/base.entity';
export declare class ChatConversation extends BaseEntity {
    type: string;
    score: number;
    roomIdx: number;
    userIdx: number;
    message: string;
    action: string;
    static from(type: string, score: number, roomIdx: number, userIdx: number, message: string): ChatConversation;
}
