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
exports.AuthController = void 0;
const refresh_guard_1 = require("./auth-guards/refresh-guard");
const api_created_response_1 = require("./../../core/swagger/api-created-response");
const http_response_1 = require("../../core/http/http-response");
const auth_service_1 = require("./auth.service");
const swagger_tags_1 = require("../../core/swagger/swagger-tags");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const login_user_dto_1 = require("./dtos/login-user.dto");
const social_login_user_dto_1 = require("./dtos/social-login-user.dto");
const api_error_common_response_1 = require("../../core/swagger/api-error-common-response");
const login_response_dto_1 = require("./dtos/login-response.dto");
const refresh_token_dto_1 = require("./dtos/refresh-token.dto");
const apt_error_response_1 = require("../../core/swagger/apt-error-response");
const http_status_codes_1 = require("http-status-codes");
const http_error_objects_1 = require("../../core/http/http-error-objects");
const use_auth_1 = require("./auth-guards/use-auth");
const auth_user_decorator_1 = require("../../core/decorators/auth-user.decorator");
const user_entity_1 = require("../user/entities/user.entity");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(res, dto) {
        const result = await this.authService.login(dto);
        return http_response_1.default.created(res, { body: result });
    }
    async socialLogin(res, dto) {
        const result = await this.authService.socialLogin(dto);
        return http_response_1.default.created(res, { body: result });
    }
    async getNewAccessToken(res, dto) {
        const result = await this.authService.getNewAccessToken(dto.refreshToken);
        return http_response_1.default.created(res, { body: result });
    }
    async logout(res, user) {
        await this.authService.logout(user.idx);
        return http_response_1.default.ok(res);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '로그인',
        description: `로그인을 한다. 응답은 token값을 반환한다.
  - 이메일/비밀번호로 로그인을 시도하여, 엑세스토큰을 발급한다.
  - 엑세스토큰을 생성하는(create) 행위이기 때문에, POST 로 정의한다.`,
    }),
    (0, swagger_1.ApiBody)({
        type: login_user_dto_1.LoginUserDto,
    }),
    (0, api_created_response_1.ApiCreatedResponseTemplate)({ type: login_response_dto_1.LoginResponseDto }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '소셜 로그인',
        description: `소셜 로그인을 한다. 응답은 token값을 반환한다.`,
    }),
    (0, swagger_1.ApiBody)({
        type: social_login_user_dto_1.SocialLoginUserDto,
    }),
    (0, api_created_response_1.ApiCreatedResponseTemplate)({ type: login_response_dto_1.LoginResponseDto }),
    (0, common_1.Post)('/social'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, social_login_user_dto_1.SocialLoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "socialLogin", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '액세스 토큰 재발급',
        description: `JWT 리프레시 토큰으로 액세스 토큰을 재발급 한다.`,
    }),
    (0, swagger_1.ApiBody)({
        type: refresh_token_dto_1.RefreshTokenDto,
    }),
    (0, api_created_response_1.ApiCreatedResponseTemplate)({ type: login_response_dto_1.LoginResponseDto }),
    (0, apt_error_response_1.ApiErrorResponseTemplate)([
        {
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
            errorFormatList: [http_error_objects_1.HttpErrorConstants.CANNOT_FIND_USER],
        },
        {
            status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            errorFormatList: [http_error_objects_1.HttpErrorConstants.EXPIRED_REFRESH_TOKEN],
        },
    ]),
    (0, common_1.UseGuards)(refresh_guard_1.JwtRefreshGuard),
    (0, common_1.Post)('/token'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getNewAccessToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '로그아웃',
        description: `로그아웃 한다.`,
    }),
    (0, api_created_response_1.ApiCreatedResponseTemplate)(),
    (0, use_auth_1.default)(),
    (0, common_1.Get)('/logout'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, auth_user_decorator_1.default)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)(swagger_tags_1.SwaggerTag.AUTH),
    (0, api_error_common_response_1.ApiCommonErrorResponseTemplate)(),
    (0, common_1.Controller)('/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map