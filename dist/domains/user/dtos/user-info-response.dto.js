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
exports.UserInfoResponseDto = void 0;
const create_user_dto_1 = require("./create-user.dto");
const swagger_1 = require("@nestjs/swagger");
class UserInfoResponseDto extends (0, swagger_1.OmitType)(create_user_dto_1.CreateUserDto, [
    'password',
]) {
    constructor(user) {
        super();
        (this.idx = user.idx),
            (this.email = user.email),
            (this.nickname = user.nickname),
            (this.loginMethod = user.loginMethod),
            (this.fbToken = user.fbToken),
            (this.isPremium = user.isPremium),
            (this.agreeWithMarketing = user.agreeWithMarketing),
            (this.profilePath = user.profilePath),
            (this.createdAt = user.createdAt),
            (this.updatedAt = user.updatedAt);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '인덱스',
        default: 1,
    }),
    __metadata("design:type", Number)
], UserInfoResponseDto.prototype, "idx", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일',
        default: '2023-06-13',
    }),
    __metadata("design:type", Date)
], UserInfoResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일',
        default: '2023-06-13',
    }),
    __metadata("design:type", Date)
], UserInfoResponseDto.prototype, "updatedAt", void 0);
exports.UserInfoResponseDto = UserInfoResponseDto;
//# sourceMappingURL=user-info-response.dto.js.map