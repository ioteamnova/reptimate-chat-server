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
exports.UserController = void 0;
const api_created_response_1 = require("../../core/swagger/api-created-response");
const api_ok_response_1 = require("../../core/swagger/api-ok-response");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dtos/create-user.dto");
const update_user_dto_1 = require("./dtos/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./entities/user.entity");
const use_auth_1 = require("../auth/auth-guards/use-auth");
const auth_user_decorator_1 = require("../../core/decorators/auth-user.decorator");
const http_response_1 = require("../../core/http/http-response");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_tags_1 = require("../../core/swagger/swagger-tags");
const api_error_common_response_1 = require("../../core/swagger/api-error-common-response");
const user_info_response_dto_1 = require("./dtos/user-info-response.dto");
const http_status_codes_1 = require("http-status-codes");
const http_error_objects_1 = require("../../core/http/http-error-objects");
const apt_error_response_1 = require("../../core/swagger/apt-error-response");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(res, dto) {
        const user = await this.userService.createUser(dto);
        return http_response_1.default.created(res, { body: user.idx });
    }
    async getUserInfo(res, user) {
        const userInfo = await this.userService.getUserInfo(user.idx);
        return http_response_1.default.ok(res, userInfo);
    }
    async update(res, dto, user, file) {
        const userInfo = await this.userService.update(file, dto, user.idx);
        return http_response_1.default.ok(res, userInfo);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '회원가입',
        description: '회원가입은 유저를 생성하는 것이므로 POST 응답인 201 리턴함.',
    }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, api_created_response_1.ApiCreatedResponseTemplate)({ description: '생성한 유저 인덱스 리턴' }),
    (0, apt_error_response_1.ApiErrorResponseTemplate)([
        {
            status: http_status_codes_1.StatusCodes.CONFLICT,
            errorFormatList: [
                http_error_objects_1.HttpErrorConstants.EXIST_EMAIL,
                http_error_objects_1.HttpErrorConstants.EXIST_NICKNAME,
            ],
        },
    ]),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '회원 정보 조회',
        description: '현재 로그인 중인 회원의 정보를 조회한다.',
    }),
    (0, api_ok_response_1.ApiOkResponseTemplate)({ type: user_info_response_dto_1.UserInfoResponseDto }),
    (0, apt_error_response_1.ApiErrorResponseTemplate)([
        {
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
            errorFormatList: [http_error_objects_1.HttpErrorConstants.CANNOT_FIND_USER],
        },
    ]),
    (0, use_auth_1.default)(),
    (0, common_1.Get)('/me'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, auth_user_decorator_1.default)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '회원 정보 수정',
        description: '현재 로그인 중인 회원의 정보를 수정한다.',
    }),
    (0, api_ok_response_1.ApiOkResponseTemplate)({ type: update_user_dto_1.UpdateUserDto }),
    (0, apt_error_response_1.ApiErrorResponseTemplate)([
        {
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
            errorFormatList: [http_error_objects_1.HttpErrorConstants.CANNOT_FIND_USER],
        },
    ]),
    (0, use_auth_1.default)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_user_decorator_1.default)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto,
        user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)(swagger_tags_1.SwaggerTag.USER),
    (0, api_error_common_response_1.ApiCommonErrorResponseTemplate)(),
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map