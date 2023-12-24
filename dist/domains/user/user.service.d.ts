/// <reference types="multer" />
import { UserInfoResponseDto } from './dtos/user-info-response.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { DeleteUserDto } from './dtos/delete-user.dto';
import { SocialMethodType } from '../auth/helpers/constants';
import { FindPasswordDto } from './dtos/find-password.dto';
import { RedisService } from '@liaoliaots/nestjs-redis';
export declare class UserService {
    private userRepository;
    private readonly redisService;
    constructor(userRepository: UserRepository, redisService: RedisService);
    createUser(dto: CreateUserDto): Promise<User>;
    createSocialUser(email: string, nickname: string, socialType: SocialMethodType): Promise<User>;
    checkExistEmail(email: string): Promise<boolean>;
    getUserInfo(userIdx: number): Promise<UserInfoResponseDto>;
    update(file: Express.Multer.File, dto: UpdateUserDto, userIdx: number): Promise<void>;
    checkExistNickname(nickname: string): Promise<boolean>;
    updatePassword(userIdx: number, dto: UpdatePasswordDto): Promise<void>;
    findPassword(dto: FindPasswordDto): Promise<void>;
    removeByPassword(dto: DeleteUserDto, userIdx: number): Promise<void>;
    getUserDetailInfo(userIdx: number): Promise<User>;
}
