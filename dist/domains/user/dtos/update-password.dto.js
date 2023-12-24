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
exports.UpdatePasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const password_utils_1 = require("../../../utils/password.utils");
class UpdatePasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 비밀번호',
        default: 'qwer1234#',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "currentPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: `변경할 비밀번호.
    비밀번호 정책은 다음과 같음
    - 영문, 숫자, 특수문자 조합 8자 이상
    - 최대 64자인데 UI에는 표기하지 않음
    ex) qwer1234#
    `,
        default: 'qwer12345#',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(password_utils_1.PasswordRegex, {
        message: '비밀번호 형식이 적절하지 않습니다. 비밀번호는 영문, 숫자, 특수문자가 포함된 8자 이상으로만 가능합니다.',
    }),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "newPassword", void 0);
exports.UpdatePasswordDto = UpdatePasswordDto;
//# sourceMappingURL=update-password.dto.js.map