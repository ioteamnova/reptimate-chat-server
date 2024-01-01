"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionChatModule = void 0;
const common_1 = require("@nestjs/common");
const auction_chat_gateway_1 = require("./auction_chat.gateway");
const typeorm_ex_module_1 = require("../../core/typeorm-ex.module");
const auction_chat_service_1 = require("./auction_chat.service");
const auction_chat_controller_1 = require("./auction_chat.controller");
const auction_alert_repository_1 = require("./repositories/auction-alert.repository");
const user_fbtoken_repository_1 = require("../user/repositories/user.fbtoken.repository");
const fcm_service_1 = require("../../utils/fcm.service");
const board_repository_1 = require("../live_chat/repositories/board.repository");
const board_auction_repository_1 = require("./repositories/board-auction.repository");
let AuctionChatModule = class AuctionChatModule {
};
AuctionChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([
                auction_alert_repository_1.AuctionAlertRepository,
                user_fbtoken_repository_1.FbTokenRepository,
                board_repository_1.BoardRepository,
                board_auction_repository_1.BoardAuctionRepository
            ]),
        ],
        providers: [auction_chat_gateway_1.AuctionChatGateway, auction_chat_service_1.AuctionChatService, fcm_service_1.FCMService],
        controllers: [auction_chat_controller_1.AuctionChatcontroller],
        exports: [auction_chat_service_1.AuctionChatService, typeorm_ex_module_1.TypeOrmExModule],
    })
], AuctionChatModule);
exports.AuctionChatModule = AuctionChatModule;
//# sourceMappingURL=auction_chat.module.js.map