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
exports.LiveChatcontroller = void 0;
const swagger_1 = require("@nestjs/swagger");
const api_error_common_response_1 = require("../../core/swagger/api-error-common-response");
const swagger_tags_1 = require("../../core/swagger/swagger-tags");
const http_response_1 = require("../../core/http/http-response");
const common_1 = require("@nestjs/common");
const api_ok_pagination_response_1 = require("../../core/swagger/api-ok-pagination-response");
const live_chat_service_1 = require("./live_chat.service");
let LiveChatcontroller = class LiveChatcontroller {
    constructor(livechatService) {
        this.livechatService = livechatService;
    }
    async getBanList(res, roomIdx, boardIdx, userIdx) {
        const result = await this.livechatService.getBanList(roomIdx, boardIdx, userIdx);
        return http_response_1.default.ok(res, result);
    }
    async banDelete(res, roomIdx, boardIdx, userIdx, banUserIdx) {
        const result = await this.livechatService.banDelete(roomIdx, boardIdx, userIdx, banUserIdx);
        return http_response_1.default.ok(res, result);
    }
    async getNoChatList(res, roomIdx, boardIdx, userIdx) {
        console.log('roomIdx', roomIdx);
        console.log('boardIdx', boardIdx);
        console.log('userIdx', userIdx);
        const result = await this.livechatService.getNoChatList(roomIdx, boardIdx, userIdx);
        return http_response_1.default.ok(res, result);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '라이브 밴 유저 조회',
        description: '밴(차단) 유저들 목록을 조회합니다.',
    }),
    (0, api_ok_pagination_response_1.ApiOkPaginationResponseTemplate)({ type: Number }),
    (0, common_1.Get)('/ban/:roomIdx/:boardIdx/:userIdx'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('roomIdx')),
    __param(2, (0, common_1.Param)('boardIdx')),
    __param(3, (0, common_1.Param)('userIdx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], LiveChatcontroller.prototype, "getBanList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '라이브 밴 유저를 해제합니다.',
        description: '밴(차단)당한 유저를 밴 해제합니다.',
    }),
    (0, api_ok_pagination_response_1.ApiOkPaginationResponseTemplate)({ type: Number }),
    (0, common_1.Post)('/ban/:roomIdx/:boardIdx/:userIdx/:banUserIdx'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('roomIdx')),
    __param(2, (0, common_1.Param)('boardIdx')),
    __param(3, (0, common_1.Param)('userIdx')),
    __param(4, (0, common_1.Param)('banUserIdx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], LiveChatcontroller.prototype, "banDelete", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '라이브 채팅 차단 유저 조회',
        description: '채팅 유저들 목록을 조회합니다.',
    }),
    (0, api_ok_pagination_response_1.ApiOkPaginationResponseTemplate)({ type: Number }),
    (0, common_1.Get)('nochat/:roomIdx/:boardIdx/:userIdx'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('roomIdx')),
    __param(2, (0, common_1.Param)('boardIdx')),
    __param(3, (0, common_1.Param)('userIdx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], LiveChatcontroller.prototype, "getNoChatList", null);
LiveChatcontroller = __decorate([
    (0, swagger_1.ApiTags)(swagger_tags_1.SwaggerTag.AUCTIONCHAT),
    (0, api_error_common_response_1.ApiCommonErrorResponseTemplate)(),
    (0, common_1.Controller)('/LiveChat'),
    __metadata("design:paramtypes", [live_chat_service_1.LiveChatService])
], LiveChatcontroller);
exports.LiveChatcontroller = LiveChatcontroller;
//# sourceMappingURL=live_chat.controller.js.map