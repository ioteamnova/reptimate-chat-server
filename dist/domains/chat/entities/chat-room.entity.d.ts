import BaseEntity from 'src/core/entity/base.entity';
import { ChatMember } from './chat-member.entity';
export declare class ChatRoom extends BaseEntity {
    recentMessage: string;
    chatMember: ChatMember;
}
