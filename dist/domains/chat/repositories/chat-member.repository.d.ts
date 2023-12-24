import { Repository } from 'typeorm';
import { ChatMember } from '../entities/chat-member.entity';
import { PageRequest } from 'src/core/page';
export declare class ChatMemberRepository extends Repository<ChatMember> {
    findAndCountByUserIdx(pageRequest: PageRequest, userIdx: number): Promise<[ChatMember[], number]>;
}
