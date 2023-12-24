"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtRefreshTokenStrategy = void 0;
const http_error_objects_1 = require("../../../core/http/http-error-objects");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const user_repository_1 = require("../../user/repositories/user.repository");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
let JwtRefreshTokenStrategy = class JwtRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh-token') {
    constructor(userRepository, redisService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromBodyField('refreshToken'),
            secretOrKey: process.env.JWT_SECRET,
        });
        this.userRepository = userRepository;
        this.redisService = redisService;
    }
    async validate(req, payload) {
        const redis = this.redisService.getClient();
        const userInfo = await redis.get(`userInfo${payload.userIdx}`);
        let user;
        if (!userInfo) {
            user = await this.userRepository.findOne({
                where: {
                    idx: payload.userIdx,
                },
            });
            const userString = JSON.stringify(user);
            await redis.set(`userInfo${payload.userIdx}`, userString);
        }
        else {
            user = JSON.parse(userInfo);
        }
        if (!user) {
            throw new common_1.UnauthorizedException(http_error_objects_1.HttpErrorConstants.EXPIRED_ACCESS_TOKEN);
        }
        return user;
    }
};
JwtRefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        nestjs_redis_1.RedisService])
], JwtRefreshTokenStrategy);
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy;
//# sourceMappingURL=refresh-token.strategy.js.map