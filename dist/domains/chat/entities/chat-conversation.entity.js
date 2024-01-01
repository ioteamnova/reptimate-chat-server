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
var ChatConversation_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatConversation = void 0;
const base_entity_1 = require("../../../core/entity/base.entity");
const typeorm_1 = require("typeorm");
let ChatConversation = ChatConversation_1 = class ChatConversation extends base_entity_1.default {
    static from(type, score, roomIdx, userIdx, message) {
        const chatConversation = new ChatConversation_1();
        chatConversation.type = type;
        chatConversation.score = score;
        chatConversation.roomIdx = roomIdx;
        chatConversation.userIdx = userIdx;
        chatConversation.message = message;
        return chatConversation;
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChatConversation.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChatConversation.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChatConversation.prototype, "roomIdx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ChatConversation.prototype, "userIdx", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChatConversation.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChatConversation.prototype, "action", void 0);
ChatConversation = ChatConversation_1 = __decorate([
    (0, typeorm_1.Entity)()
], ChatConversation);
exports.ChatConversation = ChatConversation;
//# sourceMappingURL=chat-conversation.entity.js.map