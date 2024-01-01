import { ChatMemberRepository } from './repositories/chat-member.repository';
import { ChatRoomDto, CreateRoomDto } from './dtos/chat-room.dto';
import { DataSource } from 'typeorm';
import { ChatRoom } from './entities/chat-room.entity';
import { ChatMember } from './entities/chat-member.entity';
import { Page, PageRequest } from 'src/core/page';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { UserRepository } from '../user/repositories/user.repository';
import { ChatConversationRepository } from './repositories/chat-conversation.repository';
interface YourChatMessageType {
    userIdx: number;
    action: string;
    message: string;
}
export declare class ChatService {
    private chatMemberRepository;
    private dataSource;
    private readonly redisService;
    private userRepository;
    private chatConversationRepository;
    constructor(chatMemberRepository: ChatMemberRepository, dataSource: DataSource, redisService: RedisService, userRepository: UserRepository, chatConversationRepository: ChatConversationRepository);
    findChatRoom(userIdx: number, oppositeIdx: number): Promise<number>;
    createRoom(dto: CreateRoomDto, userIdx: number): Promise<ChatRoom>;
    getChatRoomList(pageRequest: PageRequest, userIdx: number): Promise<Page<ChatMember>>;
    getChatData(pageRequest: PageRequest, roomIdx: number, userIdx: number): Promise<YourChatMessageType[]>;
    chatBan(dto: ChatRoomDto, userIdx: number): Promise<number>;
    chatRoomOut(roomIdx: number, userIdx: number): Promise<number>;
    findUserInfo: (result: any) => Promise<{
        idx: number;
        nickname: string;
        profilePath: string;
    }>;
}
export {};
