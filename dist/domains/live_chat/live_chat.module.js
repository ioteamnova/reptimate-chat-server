"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveChaModule = void 0;
const common_1 = require("@nestjs/common");
const live_chat_gateway_1 = require("./live_chat.gateway");
const typeorm_ex_module_1 = require("../../core/typeorm-ex.module");
const board_repository_1 = require("./repositories/board.repository");
const live_chat_controller_1 = require("./live_chat.controller");
const live_chat_service_1 = require("./live_chat.service");
const user_repository_1 = require("../user/repositories/user.repository");
let LiveChaModule = class LiveChaModule {
};
LiveChaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([board_repository_1.BoardRepository, user_repository_1.UserRepository]),
        ],
        providers: [live_chat_gateway_1.LiveChatGateway, live_chat_service_1.LiveChatService],
        controllers: [live_chat_controller_1.LiveChatcontroller],
        exports: [live_chat_service_1.LiveChatService, typeorm_ex_module_1.TypeOrmExModule],
    })
], LiveChaModule);
exports.LiveChaModule = LiveChaModule;
//# sourceMappingURL=live_chat.module.js.map