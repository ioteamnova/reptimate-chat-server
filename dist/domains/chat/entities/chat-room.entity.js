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
exports.ChatRoom = void 0;
const base_entity_1 = require("../../../core/entity/base.entity");
const typeorm_1 = require("typeorm");
const chat_member_entity_1 = require("./chat-member.entity");
let ChatRoom = class ChatRoom extends base_entity_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChatRoom.prototype, "recentMessage", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => chat_member_entity_1.ChatMember),
    (0, typeorm_1.JoinColumn)({ name: 'idx', referencedColumnName: 'chatRoomIdx' }),
    __metadata("design:type", chat_member_entity_1.ChatMember)
], ChatRoom.prototype, "chatMember", void 0);
ChatRoom = __decorate([
    (0, typeorm_1.Entity)()
], ChatRoom);
exports.ChatRoom = ChatRoom;
//# sourceMappingURL=chat-room.entity.js.map