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
var ChatMember_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMember = void 0;
const base_entity_1 = require("../../../core/entity/base.entity");
const typeorm_1 = require("typeorm");
const chat_room_entity_1 = require("./chat-room.entity");
let ChatMember = ChatMember_1 = class ChatMember extends base_entity_1.default {
    static From(chatRoomIdx, userIdx, oppositeIdx) {
        const chatMember = new ChatMember_1();
        chatMember.chatRoomIdx = chatRoomIdx;
        chatMember.userIdx = userIdx;
        chatMember.oppositeIdx = oppositeIdx;
        return chatMember;
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChatMember.prototype, "chatRoomIdx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChatMember.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChatMember.prototype, "oppositeIdx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChatMember.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ChatMember.prototype, "roomOut", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => chat_room_entity_1.ChatRoom),
    (0, typeorm_1.JoinColumn)({ name: 'chat_room_idx', referencedColumnName: 'idx' }),
    __metadata("design:type", chat_room_entity_1.ChatRoom)
], ChatMember.prototype, "chatRoom", void 0);
ChatMember = ChatMember_1 = __decorate([
    (0, typeorm_1.Entity)()
], ChatMember);
exports.ChatMember = ChatMember;
//# sourceMappingURL=chat-member.entity.js.map