"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindPasswordDto = void 0;
const create_user_dto_1 = require("./create-user.dto");
const swagger_1 = require("@nestjs/swagger");
class FindPasswordDto extends (0, swagger_1.PickType)(create_user_dto_1.CreateUserDto, [
    'email',
    'password',
]) {
}
exports.FindPasswordDto = FindPasswordDto;
//# sourceMappingURL=find-password.dto.js.map