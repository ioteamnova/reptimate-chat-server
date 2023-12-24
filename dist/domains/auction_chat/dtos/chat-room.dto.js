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
exports.CreateRoomDto = exports.ChatRoomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ChatRoomDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '방 번호',
        default: '1',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ChatRoomDto.prototype, "idx", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '상대 유저 번호',
        default: '2',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ChatRoomDto.prototype, "oppositeIdx", void 0);
exports.ChatRoomDto = ChatRoomDto;
class CreateRoomDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '상대 유저 번호',
        default: '2',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "oppositeIdx", void 0);
exports.CreateRoomDto = CreateRoomDto;
//# sourceMappingURL=chat-room.dto.js.map