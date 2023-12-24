import { SocialMethodType } from 'src/domains/auth/helpers/constants';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UserRepository extends Repository<User> {
    existByEmail(email: string): Promise<boolean>;
    existByNickname(nickname: string): Promise<boolean>;
    findByUserIdx(userIdx: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    updateFirebaseTokenByUserIdx(userIdx: number, fbToken: string): Promise<void>;
    updatePasswordByUserIdx(userIdx: number, newPassword: string): Promise<void>;
    findByEmailAndLoginMethod(email: string, socialType: SocialMethodType): Promise<User>;
}
