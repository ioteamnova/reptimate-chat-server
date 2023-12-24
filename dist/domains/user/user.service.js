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
exports.UserService = void 0;
const user_info_response_dto_1 = require("./dtos/user-info-response.dto");
const common_1 = require("@nestjs/common");
const http_error_objects_1 = require("../../core/http/http-error-objects");
const user_entity_1 = require("./entities/user.entity");
const user_repository_1 = require("./repositories/user.repository");
const uuid = require("uuid");
const password_utils_1 = require("../../utils/password.utils");
const s3_utils_1 = require("../../utils/s3-utils");
const date_utils_1 = require("../../utils/date-utils");
const constants_1 = require("../auth/helpers/constants");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
let UserService = class UserService {
    constructor(userRepository, redisService) {
        this.userRepository = userRepository;
        this.redisService = redisService;
    }
    async createUser(dto) {
        await this.checkExistEmail(dto.email);
        await this.checkExistNickname(dto.nickname);
        const user = user_entity_1.User.from(dto);
        return await this.userRepository.save(user);
    }
    async createSocialUser(email, nickname, socialType) {
        const password = (0, password_utils_1.hashPassword)(uuid.v1());
        const user = new user_entity_1.User();
        user.email = email;
        user.password = password;
        user.nickname = nickname;
        user.loginMethod =
            socialType === 'KAKAO'
                ? constants_1.SocialMethodType.KAKAO
                : socialType === 'GOOGLE'
                    ? constants_1.SocialMethodType.GOOGLE
                    : constants_1.SocialMethodType.APPLE;
        return await this.userRepository.save(user);
    }
    async checkExistEmail(email) {
        const isExistEmail = await this.userRepository.existByEmail(email);
        if (isExistEmail) {
            throw new common_1.ConflictException(http_error_objects_1.HttpErrorConstants.EXIST_EMAIL);
        }
        return isExistEmail;
    }
    async getUserInfo(userIdx) {
        const userInfo = await this.userRepository.findByUserIdx(userIdx);
        if (!userInfo) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.CANNOT_FIND_USER);
        }
        return new user_info_response_dto_1.UserInfoResponseDto(userInfo);
    }
    async update(file, dto, userIdx) {
        if (dto.email) {
            await this.checkExistEmail(dto.email);
        }
        if (dto.nickname) {
            await this.checkExistNickname(dto.nickname);
        }
        const user = await this.userRepository.findByUserIdx(userIdx);
        if (!user) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.CANNOT_FIND_USER);
        }
        if (user.loginMethod && dto.email) {
            throw new common_1.BadRequestException(http_error_objects_1.HttpErrorConstants.CANNOT_UPDATE_SOCIAL_USER);
        }
        if (file) {
            const folder = s3_utils_1.S3FolderName.PROFILE;
            const fileName = `${userIdx}-${date_utils_1.default.momentFile()}-${uuid.v4()}-${file.originalname}`;
            const fileKey = `${folder}/${fileName}`;
            const result = await (0, s3_utils_1.asyncUploadToS3)(fileKey, file.buffer);
            dto.profilePath = result.Location;
        }
        const updateUserInfo = user.updateFromDto(dto);
        await this.userRepository.save(user);
        return updateUserInfo;
    }
    async checkExistNickname(nickname) {
        const isExistNickname = await this.userRepository.existByNickname(nickname);
        if (isExistNickname) {
            throw new common_1.ConflictException(http_error_objects_1.HttpErrorConstants.EXIST_NICKNAME);
        }
        return isExistNickname;
    }
    async updatePassword(userIdx, dto) {
        const user = await this.userRepository.findByUserIdx(userIdx);
        if (!user) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.CANNOT_FIND_USER);
        }
        if (user.loginMethod) {
            throw new common_1.BadRequestException(http_error_objects_1.HttpErrorConstants.CANNOT_UPDATE_SOCIAL_USER);
        }
        await (0, password_utils_1.validatePassword)(dto.currentPassword, user.password);
        const newPassword = (0, password_utils_1.hashPassword)(dto.newPassword);
        await this.userRepository.updatePasswordByUserIdx(user.idx, newPassword);
    }
    async findPassword(dto) {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.CANNOT_FIND_USER);
        }
        if (user.loginMethod) {
            throw new common_1.BadRequestException(http_error_objects_1.HttpErrorConstants.CANNOT_UPDATE_SOCIAL_USER);
        }
        const newPassword = (0, password_utils_1.hashPassword)(dto.password);
        await this.userRepository.updatePasswordByUserIdx(user.idx, newPassword);
    }
    async removeByPassword(dto, userIdx) {
        const password = dto.password;
        const user = await this.userRepository.findByUserIdx(userIdx);
        if (!user) {
            throw new common_1.NotFoundException(http_error_objects_1.HttpErrorConstants.CANNOT_FIND_USER);
        }
        await (0, password_utils_1.validatePassword)(password, user.password);
        await this.userRepository.softDelete(userIdx);
    }
    async getUserDetailInfo(userIdx) {
        const redis = this.redisService.getClient();
        const userInfo = await redis.get(`userInfo${userIdx}`);
        let user;
        if (!userInfo) {
            user = await this.userRepository.findOne({
                where: {
                    idx: userIdx,
                },
            });
            const userString = JSON.stringify(user);
            await redis.set(`userInfo${userIdx}`, userString);
        }
        else {
            user = JSON.parse(userInfo);
        }
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        nestjs_redis_1.RedisService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map