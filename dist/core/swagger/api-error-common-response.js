"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCommonErrorResponseTemplate = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const http_status_codes_1 = require("http-status-codes");
const ApiCommonErrorResponseTemplate = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiResponse)({
        status: http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY,
        description: '필수 파라미터가 오지 않았을 경우, 혹은 파라미터 형식이 맞지 않을 경우',
        content: {
            'application/json': {
                example: {
                    status: http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY,
                    errorCode: 'UNPROCESSABLE_ENTITY',
                    message: 'xxx should not be empty / xxx should be array 등',
                },
            },
        },
    }), (0, swagger_1.ApiResponse)({
        status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        description: '서버에서 예외처리하지 않은 에러 발생시 ( 500에러 발생시 제보 부탁드립니다. )',
        content: {
            'application/json': {
                example: {
                    status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                    message: 'Internal server error',
                },
            },
        },
    }));
};
exports.ApiCommonErrorResponseTemplate = ApiCommonErrorResponseTemplate;
//# sourceMappingURL=api-error-common-response.js.map