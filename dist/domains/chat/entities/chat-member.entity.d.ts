import BaseEntity from 'src/core/entity/base.entity';
import { ChatRoom } from './chat-room.entity';
export declare class ChatMember extends BaseEntity {
    chatRoomIdx: number;
    userIdx: number;
    oppositeIdx: number;
    state: string;
    roomOut: Date;
    chatRoom: ChatRoom;
    static From(chatRoomIdx: number, userIdx: number, oppositeIdx: number): ChatMember;
    UserInfo: {
        idx: number;
        nickname: string;
        profilePath: string;
    };
    unreadCount: number;
}
