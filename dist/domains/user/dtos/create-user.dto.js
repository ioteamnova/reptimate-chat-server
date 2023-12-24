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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../auth/helpers/constants");
const password_utils_1 = require("../../../utils/password.utils");
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이메일',
        default: 'asd123@gmail.com',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(64),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `비밀번호.
비밀번호 정책은 다음과 같음
- 영문, 숫자, 특수문자 조합 8자 이상
- 최대 64자인데 UI에는 표기하지 않음
ex) HakWon123#, hakwon123#
`,
        default: 'qwer1234#',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(password_utils_1.PasswordRegex, {
        message: '비밀번호 형식이 적절하지 않습니다. 비밀번호는 영문, 숫자, 특수문자가 포함된 8자 이상으로만 가능합니다.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '닉네임',
        default: '김철수',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '구독 여부',
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "isPremium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이벤트 및 마케팅 이메일 수신 동의 여부',
        default: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "agreeWithMarketing", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '프로필 이미지 사진(회원가입시에는 이미지 설정X, 기본이미지)',
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "profilePath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '소셜 로그인 메서드(자체 회원가입인 경우 null)',
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "loginMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '파이어베이스 토큰(회원가입할 때가 아닌 로그인시에 저장)',
        default: null,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "fbToken", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map