import { SocialMethodType } from '../helpers/constants';
export declare class SocialLoginUserDto {
    accessToken: string;
    socialType: SocialMethodType;
    email: string;
    nickname: string;
    fbToken: string;
}
