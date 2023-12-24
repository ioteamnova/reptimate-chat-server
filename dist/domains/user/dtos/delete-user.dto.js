"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./create-user.dto");
class DeleteUserDto extends (0, swagger_1.PickType)(create_user_dto_1.CreateUserDto, [
    'password',
]) {
}
exports.DeleteUserDto = DeleteUserDto;
//# sourceMappingURL=delete-user.dto.js.map