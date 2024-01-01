import { Request } from 'express';
import { UserRepository } from 'src/domains/user/repositories/user.repository';
import { RedisService } from '@liaoliaots/nestjs-redis';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private userRepository;
    private readonly redisService;
    constructor(userRepository: UserRepository, redisService: RedisService);
    validate(req: Request, payload: any): Promise<any>;
}
export {};
