import { UserService } from './../user/user.service';
import { UserRepository } from './../user/repositories/user.repository';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SocialLoginUserDto } from './dtos/social-login-user.dto';
import { User } from '../user/entities/user.entity';
import { LoginResponseDto } from './dtos/login-response.dto';
export declare class AuthService {
    private readonly userRepository;
    private jwtService;
    private readonly userService;
    constructor(userRepository: UserRepository, jwtService: JwtService, userService: UserService);
    login(dto: LoginUserDto): Promise<LoginResponseDto>;
    socialLogin(dto: SocialLoginUserDto): Promise<LoginResponseDto>;
    getUserByKakaoAccessToken(dto: SocialLoginUserDto): Promise<User>;
    getSocialLoginUser(dto: SocialLoginUserDto): Promise<User>;
    generateAccessToken(userIdx: number): Promise<string>;
    generateRefreshToken(userIdx: number): Promise<string>;
    getNewAccessToken(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    logout(userIdx: number): Promise<void>;
}
