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
exports.Chatcontroller = void 0;
const swagger_1 = require("@nestjs/swagger");
const api_error_common_response_1 = require("../../core/swagger/api-error-common-response");
const swagger_tags_1 = require("../../core/swagger/swagger-tags");
const use_auth_1 = require("../auth/auth-guards/use-auth");
const auth_user_decorator_1 = require("../../core/decorators/auth-user.decorator");
const user_entity_1 = require("../user/entities/user.entity");
const http_response_1 = require("../../core/http/http-response");
const common_1 = require("@nestjs/common");
const api_ok_pagination_response_1 = require("../../core/swagger/api-ok-pagination-response");
const chat_service_1 = require("./chat.service");
const apt_error_response_1 = require("../../core/swagger/apt-error-response");
const http_status_codes_1 = require("http-status-codes");
const http_error_objects_1 = require("../../core/http/http-error-objects");
const chat_room_dto_1 = require("./dtos/chat-room.dto");
const page_1 = require("../../core/page");
let Chatcontroller = class Chatcontroller {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async createBoard(res, dto, user) {
        const result = await this.chatService.createRoom(dto, user.idx);
        return http_response_1.default.created(res, { body: result });
    }
    async getRoomIdx(res, user, oppositeIdx) {
        const result = await this.chatService.findChatRoom(user.idx, oppositeIdx);
        return http_response_1.default.ok(res, result);
    }
    async getChatRoomList(res, user, pageRequest) {
        const result = await this.chatService.getChatRoomList(pageRequest, user.idx);
        return http_response_1.default.ok(res, result);
    }
    async getChatData(res, user, pageRequest, roomIdx) {
        const result = await this.chatService.getChatData(pageRequest, roomIdx, user.idx);
        return http_response_1.default.ok(res, result);
    }
    async chatBan(res, dto, user) {
        const result = await this.chatService.chatBan(dto, user.idx);
        return http_response_1.default.created(res, { body: result });
    }
    async chatRoomOut(res, roomIdx, user) {
        const result = await this.chatService.chatRoomOut(roomIdx, user.idx);
        return http_response_1.default.created(res, { body: result });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '채팅방 생성',
        description: '채팅방을 생성합니다',
    }),
    (0, apt_error_response_1.ApiErrorResponseTemplate)([
        {
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
            errorFormatList: [http_error_objects_1.HttpErrorConstants.CANNOT_FIND_USER],
        },
    ]),
    (0, swagger_1.ApiBody)({ type: chat_room_dto_1.CreateRoomDto }),
    (0, use_auth_1.default)(),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_user_decorator_1.default)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chat_room_dto_1.CreateRoomDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], Chatcontroller.prototype, "createBoard", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '채팅방 인덱스 조회',
        description: '1:1 채팅방 입장 전, 인덱스 조회하는 기능입니다.',
    }),
    (0, api_ok_pagination_response_1.ApiOkPaginationResponseTemplate)({ type: Number }),
    (0, use_auth_1.default)(),
    (0, common_1.Get)('/room/:oppositeIdx'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, auth_user_decorator_1.default)()),
    __param(2, (0, common_1.Param)('oppositeIdx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], Chatcontroller.prototype, "getRoomIdx", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '채팅 방 목록 조회',
        description: '유저 인덱스로 방 목록을 조회합니다.',
    }),
    (0, api_ok_pagination_response_1.ApiOkPaginationResponseTemplate)({ type: Number }),
    (0, use_auth_1.default)(),
    (0, common_1.Get)('list/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, auth_user_decorator_1.default)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User,
        page_1.PageRequest]),
    __metadata("design:returntype", Promise)
], Chatcontroller.prototype, "getChatRoomList", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '채팅 내역 조회',
        description: '1:1 채팅방 첫 입장 시, 읽음 처리까지 같이 합니다.',
    }),
    (0, api_ok_pagination_response_1.ApiOkPaginationResponseTemplate)({ type: Number }),
    (0, use_auth_1.default)(),
    (0, common_1.Get)('/:roomIdx'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, auth_user_decorator_1.default)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Param)('roomIdx')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User,
        page_1.PageRequest, Number]),
    __metadata("design:returntype", Promise)
], Chatcontroller.prototype, "getChatData", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '채팅 상대방 차단 or 차단 해제',
        description: '차단된 유저는 해제, 차단 되지 않은 유조는 차단을 설정합니다.',
    }),
    (0, apt_error_response_1.ApiErrorResponseTemplate)([
        {
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
            errorFormatList: [http_error_objects_1.HttpErrorConstants.CANNOT_FIND_USER],
        },
    ]),
    (0, swagger_1.ApiBody)({ type: chat_room_dto_1.ChatRoomDto }),
    (0, use_auth_1.default)(),
    (0, common_1.Post)('/ban'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_user_decorator_1.default)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chat_room_dto_1.ChatRoomDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], Chatcontroller.prototype, "chatBan", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '채팅방에서 나가게 됩니다.',
        description: '채팅방 나가는 기능입니다..',
    }),
    (0, apt_error_response_1.ApiErrorResponseTemplate)([
        {
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
            errorFormatList: [http_error_objects_1.HttpErrorConstants.CANNOT_FIND_USER],
        },
    ]),
    (0, use_auth_1.default)(),
    (0, common_1.Delete)('/:roomIdx'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('roomIdx')),
    __param(2, (0, auth_user_decorator_1.default)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], Chatcontroller.prototype, "chatRoomOut", null);
Chatcontroller = __decorate([
    (0, swagger_1.ApiTags)(swagger_tags_1.SwaggerTag.PERSONALCHAT),
    (0, api_error_common_response_1.ApiCommonErrorResponseTemplate)(),
    (0, common_1.Controller)('/chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], Chatcontroller);
exports.Chatcontroller = Chatcontroller;
//# sourceMappingURL=chat.controller.js.map