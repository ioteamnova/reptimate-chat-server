import BaseEntity from 'src/core/entity/base.entity';
export declare class ChatMember extends BaseEntity {
    chatRoomIdx: number;
    userIdx: number;
    oppositeIdx: number;
    state: string;
    roomOut: Date;
    static From(chatRoomIdx: number, userIdx: number, oppositeIdx: number): ChatMember;
}
