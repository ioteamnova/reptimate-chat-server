import { SocialMethodType } from 'src/domains/auth/helpers/constants';
export declare class CreateUserDto {
    email: string;
    password: string;
    nickname: string;
    isPremium: boolean;
    agreeWithMarketing: boolean;
    profilePath: string;
    loginMethod: SocialMethodType;
    fbToken: string;
}
