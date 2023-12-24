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
exports.LiveChatService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const board_repository_1 = require("./repositories/board.repository");
const http_error_objects_1 = require("../../core/http/http-error-objects");
const user_repository_1 = require("../user/repositories/user.repository");
const user_profile_dto_1 = require("../user/dtos/user-profile.dto");
let LiveChatService = class LiveChatService {
    constructor(redisService, boardRepository, userRepository) {
        this.redisService = redisService;
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }
    async getBanList(roomIdx, boardIdx, userIdx) {
        const boardResult = await this.boardRepository.findOne({
            where: {
                idx: boardIdx,
            },
        });
        if (boardResult.userIdx !== userIdx) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.LIVEROOM_NOT_HOST);
        }
        const banKey = `live-ban-${roomIdx}`;
        const redis = this.redisService.getClient();
        const setMembers = await redis.smembers(banKey);
        const result = [];
        for (const value of setMembers) {
            const userInfo = await this.userRepository.findOne({
                where: {
                    idx: parseInt(value),
                },
            });
            const userDto = new user_profile_dto_1.UserProfileDto();
            userDto.idx = userInfo.idx;
            userDto.nickname = userInfo.nickname;
            userDto.profilePath = userInfo.profilePath;
            result.push(userDto);
        }
        return result;
    }
    async banDelete(roomIdx, boardIdx, userIdx, banUserIdx) {
        const boardResult = await this.boardRepository.findOne({
            where: {
                idx: boardIdx,
            },
        });
        if (boardResult.userIdx !== userIdx) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.LIVEROOM_NOT_HOST);
        }
        const banKey = `live-ban-${roomIdx}`;
        const redis = this.redisService.getClient();
        await redis.srem(banKey, banUserIdx.toString());
    }
    async noChatDelete(roomIdx, boardIdx, userIdx, banUserIdx) {
        const boardResult = await this.boardRepository.findOne({
            where: {
                idx: boardIdx,
            },
        });
        if (boardResult.userIdx !== userIdx) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.LIVEROOM_NOT_HOST);
        }
        const banKey = `live-noChat-${roomIdx}`;
        const redis = this.redisService.getClient();
        await redis.srem(banKey, banUserIdx.toString());
    }
    async getNoChatList(roomIdx, boardIdx, userIdx) {
        const boardResult = await this.boardRepository.findOne({
            where: {
                idx: boardIdx,
            },
        });
        if (boardResult.userIdx !== userIdx) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.LIVEROOM_NOT_HOST);
        }
        const banKey = `live-noChat-${roomIdx}`;
        const redis = this.redisService.getClient();
        const setMembers = await redis.smembers(banKey);
        const result = [];
        for (const value of setMembers) {
            const userInfo = await this.userRepository.findOne({
                where: {
                    idx: parseInt(value),
                },
            });
            const userDto = new user_profile_dto_1.UserProfileDto();
            userDto.idx = userInfo.idx;
            userDto.nickname = userInfo.nickname;
            userDto.profilePath = userInfo.profilePath;
            result.push(userDto);
        }
        return result;
    }
};
LiveChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_redis_1.RedisService,
        board_repository_1.BoardRepository,
        user_repository_1.UserRepository])
], LiveChatService);
exports.LiveChatService = LiveChatService;
//# sourceMappingURL=live_chat.service.js.map