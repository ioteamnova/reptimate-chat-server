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
exports.SocialLoginUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constants_1 = require("../helpers/constants");
class SocialLoginUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '액세스 토큰',
        default: 'W2uID5fWO5NllVWLKMWZvQPo0W_F2FZbEeilIiVMCinI2gAAAYd0M97K',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SocialLoginUserDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '소셜 로그인 타입',
        default: constants_1.SocialMethodType.KAKAO,
        required: true,
        enum: constants_1.SocialMethodType,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SocialLoginUserDto.prototype, "socialType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '소셜 로그인 이메일',
        default: 'asd123@gmail.com',
        required: false,
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SocialLoginUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '닉네임',
        default: '김철수',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", String)
], SocialLoginUserDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '파이어 베이스 토큰',
        default: 'abcdefg',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SocialLoginUserDto.prototype, "fbToken", void 0);
exports.SocialLoginUserDto = SocialLoginUserDto;
//# sourceMappingURL=social-login-user.dto.js.map