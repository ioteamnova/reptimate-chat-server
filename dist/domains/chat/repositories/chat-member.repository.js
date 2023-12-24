"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMemberRepository = void 0;
const typeorm_1 = require("typeorm");
const typeorm_ex_decorator_1 = require("../../../core/decorators/typeorm-ex.decorator");
const chat_member_entity_1 = require("../entities/chat-member.entity");
let ChatMemberRepository = class ChatMemberRepository extends typeorm_1.Repository {
    async findAndCountByUserIdx(pageRequest, userIdx) {
        const [result, totalCount] = await this.createQueryBuilder('chatMember')
            .leftJoinAndSelect('chatMember.chatRoom', 'chatRoom')
            .where('chatMember.userIdx = :userIdx', { userIdx })
            .andWhere('chatRoom.recentMessage IS NOT NULL')
            .orderBy('chatRoom.updatedAt', pageRequest.order)
            .take(pageRequest.limit)
            .skip(pageRequest.offset)
            .getManyAndCount();
        return [result, totalCount];
    }
};
ChatMemberRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(chat_member_entity_1.ChatMember)
], ChatMemberRepository);
exports.ChatMemberRepository = ChatMemberRepository;
//# sourceMappingURL=chat-member.repository.js.map