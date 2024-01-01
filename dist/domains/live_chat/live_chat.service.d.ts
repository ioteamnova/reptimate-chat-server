import { RedisService } from '@liaoliaots/nestjs-redis';
import { BoardRepository } from './repositories/board.repository';
import { UserRepository } from '../user/repositories/user.repository';
import { UserProfileDto } from '../user/dtos/user-profile.dto';
export declare class LiveChatService {
    private readonly redisService;
    private boardRepository;
    private userRepository;
    constructor(redisService: RedisService, boardRepository: BoardRepository, userRepository: UserRepository);
    getBanList(roomIdx: number, boardIdx: number, userIdx: number): Promise<UserProfileDto[]>;
    banDelete(roomIdx: number, boardIdx: number, userIdx: number, banUserIdx: number): Promise<void>;
    noChatDelete(roomIdx: number, boardIdx: number, userIdx: number, banUserIdx: number): Promise<void>;
    getNoChatList(roomIdx: number, boardIdx: number, userIdx: number): Promise<UserProfileDto[]>;
}
