import { Repository } from 'typeorm';
import { ChatConversation } from '../entities/chat-conversation.entity';
export declare class ChatConversationRepository extends Repository<ChatConversation> {
    getUnreadCount(roomIdx: number, oppositeIdx: number): Promise<number>;
}
