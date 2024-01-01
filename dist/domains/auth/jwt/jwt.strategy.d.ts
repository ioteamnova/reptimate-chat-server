import { UserRepository } from '../../user/repositories/user.repository';
import { RedisService } from '@liaoliaots/nestjs-redis';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    private readonly redisService;
    constructor(userRepository: UserRepository, redisService: RedisService);
    validate(payload: any): Promise<any>;
}
export {};
