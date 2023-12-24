import { UpdateUserDto } from './../dtos/update-user.dto';
import BaseEntity from 'src/core/entity/base.entity';
import { SocialMethodType } from 'src/domains/auth/helpers/constants';
export declare class User extends BaseEntity {
    email: string;
    password: string;
    nickname: string;
    profilePath: string;
    isPremium: boolean;
    agreeWithMarketing: boolean;
    loginMethod: SocialMethodType;
    fbToken: string;
    refreshToken: string;
    static from({ email, password, nickname, profilePath, isPremium, agreeWithMarketing, loginMethod, fbToken, }: {
        email: string;
        password: string;
        nickname: string;
        profilePath: string;
        isPremium: boolean;
        agreeWithMarketing: boolean;
        loginMethod: SocialMethodType;
        fbToken: string;
    }): User;
    static userProfile(idx: any, nickname: any, profilePath: any): User;
    updateFromDto(dto: UpdateUserDto): void;
}
