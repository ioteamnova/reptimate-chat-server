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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionChatcontroller = void 0;
const swagger_1 = require("@nestjs/swagger");
const api_error_common_response_1 = require("../../core/swagger/api-error-common-response");
const swagger_tags_1 = require("../../core/swagger/swagger-tags");
const http_response_1 = require("../../core/http/http-response");
const common_1 = require("@nestjs/common");
const api_ok_pagination_response_1 = require("../../core/swagger/api-ok-pagination-response");
const page_1 = require("../../core/page");
const auction_chat_service_1 = require("./auction_chat.service");
const auth_user_decorator_1 = require("../../core/decorators/auth-user.decorator");
const user_entity_1 = require("../user/entities/user.entity");
const auction_user_entity_1 = require("./entities/auction_user.entity");
let AuctionChatcontroller = class AuctionChatcontroller {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getChatData(res, pageRequest, auctionIdx) {
        const result = await this.chatService.getChatData(pageRequest, auctionIdx);
        return http_response_1.default.ok(res, result);
    }
    async auctionParticipation(res, dto) {
        const result = await this.chatService.auctionParticipation(dto.auctionIdx, dto.userIdx);
        return http_response_1.default.ok(res, result);
    }
    async auctionAlertSet(res, user, auctionIdx, dto) {
        const result = await this.chatService.auctionAlertSet(auctionIdx, dto.userIdx, dto.action);
        return http_response_1.default.ok(res, result);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '경매 비딩 채팅 내역 조회',
        description: '경매 비딩 목록을 불러옵니다.',
    }),
    (0, api_ok_pagination_response_1.ApiOkPaginationResponseTemplate)({ type: Number }),
    (0, common_1.Get)('/:auctionIdx'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)('auctionIdx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, page_1.PageRequest, Number]),
    __metadata("design:returntype", Promise)
], AuctionChatcontroller.prototype, "getChatData", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '경매 첫 입찰 처리',
        description: '해당 경매 첫 비딩 시, 참가자 명단에 추가가됩니다.',
    }),
    (0, api_ok_pagination_response_1.ApiOkPaginationResponseTemplate)({ type: Number }),
    (0, swagger_1.ApiBody)({ type: auction_user_entity_1.AuctionUser }),
    (0, common_1.Post)('/bid'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuctionChatcontroller.prototype, "auctionParticipation", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '경매 알람 ON/OFF',
        description: '해당 경매 첫 비딩 시, ON 처리 해야합니다. action은 on/off 입니다.',
    }),
    (0, api_ok_pagination_response_1.ApiOkPaginationResponseTemplate)({ type: Number }),
    (0, common_1.Post)('/:auctionIdx'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, auth_user_decorator_1.default)()),
    __param(2, (0, common_1.Param)('auctionIdx')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User, Number, Object]),
    __metadata("design:returntype", Promise)
], AuctionChatcontroller.prototype, "auctionAlertSet", null);
AuctionChatcontroller = __decorate([
    (0, swagger_1.ApiTags)(swagger_tags_1.SwaggerTag.AUCTIONCHAT),
    (0, api_error_common_response_1.ApiCommonErrorResponseTemplate)(),
    (0, common_1.Controller)('/auctionChat'),
    __metadata("design:paramtypes", [auction_chat_service_1.AuctionChatService])
], AuctionChatcontroller);
exports.AuctionChatcontroller = AuctionChatcontroller;
//# sourceMappingURL=auction_chat.controller.js.map