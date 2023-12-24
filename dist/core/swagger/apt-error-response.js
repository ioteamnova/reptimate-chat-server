"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorResponseTemplate = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const ApiErrorResponseTemplate = (paramsList) => {
    const decorators = paramsList.map((params) => {
        const { status, errorFormat, errorFormatList } = params;
        if (errorFormatList) {
            const errorParams = {
                status: status,
                description: errorFormatList.reduce((prev, current, idx) => {
                    prev =
                        prev +
                            `- ${current.errorCode}: ${current.description || current.message}      \n`;
                    return prev;
                }, ``),
                content: {
                    'application/json': {
                        examples: errorFormatList.reduce((prev, current, idx) => {
                            prev[current.errorCode] = {
                                value: {
                                    status,
                                    message: current.message,
                                    errorCode: current.errorCode,
                                },
                            };
                            return prev;
                        }, {}),
                    },
                },
            };
            return (0, swagger_1.ApiResponse)(errorParams);
        }
        const errorParams = {
            status: status,
            description: `- ${errorFormat === null || errorFormat === void 0 ? void 0 : errorFormat.errorCode}:${errorFormat === null || errorFormat === void 0 ? void 0 : errorFormat.message} `,
            content: {
                'application/json': {
                    example: Object.assign({ status: status }, errorFormat),
                },
            },
        };
        return (0, swagger_1.ApiResponse)(errorParams);
    });
    return (0, common_1.applyDecorators)(...decorators);
};
exports.ApiErrorResponseTemplate = ApiErrorResponseTemplate;
//# sourceMappingURL=apt-error-response.js.map