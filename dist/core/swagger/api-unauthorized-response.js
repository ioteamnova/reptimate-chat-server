"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiUnauthorizedErrorResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const http_status_codes_1 = require("http-status-codes");
const http_error_objects_1 = require("../http/http-error-objects");
const ApiUnauthorizedErrorResponse = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiResponse)({
        status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
        description: `로그인 필요, 엑세스토큰의 만료, 유효하지 않은 로그인 정보`,
        content: {
            'application/json': {
                example: {
                    status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                    message: http_error_objects_1.HttpErrorConstants.UNAUTHORIZED.message,
                },
            },
        },
    }));
};
exports.ApiUnauthorizedErrorResponse = ApiUnauthorizedErrorResponse;
//# sourceMappingURL=api-unauthorized-response.js.map