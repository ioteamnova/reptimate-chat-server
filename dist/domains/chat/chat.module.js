"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./chat.gateway");
const chat_service_1 = require("./chat.service");
const chat_controller_1 = require("./chat.controller");
const typeorm_ex_module_1 = require("../../core/typeorm-ex.module");
const chat_member_repository_1 = require("./repositories/chat-member.repository");
const chat_conversation_repository_1 = require("./repositories/chat-conversation.repository");
const user_fbtoken_repository_1 = require("../user/repositories/user.fbtoken.repository");
const fcm_service_1 = require("../../utils/fcm.service");
const user_service_1 = require("../user/user.service");
const user_repository_1 = require("../user/repositories/user.repository");
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([
                chat_member_repository_1.ChatMemberRepository,
                chat_conversation_repository_1.ChatConversationRepository,
                user_fbtoken_repository_1.FbTokenRepository,
                user_repository_1.UserRepository,
            ]),
        ],
        providers: [chat_gateway_1.EventsGateway, chat_service_1.ChatService, fcm_service_1.FCMService, user_service_1.UserService],
        controllers: [chat_controller_1.Chatcontroller],
        exports: [chat_service_1.ChatService, typeorm_ex_module_1.TypeOrmExModule],
    })
], ChatModule);
exports.ChatModule = ChatModule;
//# sourceMappingURL=chat.module.js.map