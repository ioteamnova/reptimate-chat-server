"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatConversationRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_ex_decorator_1 = require("../../../core/decorators/typeorm-ex.decorator");
const chat_conversation_entity_1 = require("../entities/chat-conversation.entity");
let ChatConversationRepository = class ChatConversationRepository extends typeorm_1.Repository {
    async getUnreadCount(roomIdx, oppositeIdx) {
        const action = 'send';
        const totalCount = await this.createQueryBuilder('chatConversation')
            .where('chatConversation.userIdx = :oppositeIdx', { oppositeIdx })
            .andWhere('chatConversation.roomIdx = :roomIdx', { roomIdx })
            .andWhere('chatConversation.action = :action', { action })
            .getCount();
        return totalCount;
    }
};
ChatConversationRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(chat_conversation_entity_1.ChatConversation)
], ChatConversationRepository);
exports.ChatConversationRepository = ChatConversationRepository;
//# sourceMappingURL=chat-conversation.repository.js.map