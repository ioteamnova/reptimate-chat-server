"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiOkResponseTemplate = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("./response-dto");
const ApiOkResponseTemplate = (params) => {
    if (params === null || params === void 0 ? void 0 : params.type) {
        const schema = {
            description: params.description,
            schema: {
                allOf: [
                    { $ref: (0, swagger_1.getSchemaPath)(response_dto_1.ResponseDto) },
                    {
                        properties: {
                            result: params.isArray
                                ? {
                                    type: 'array',
                                    items: { $ref: (0, swagger_1.getSchemaPath)(params.type) },
                                }
                                : {
                                    $ref: (0, swagger_1.getSchemaPath)(params.type),
                                },
                        },
                    },
                ],
            },
        };
        return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(response_dto_1.ResponseDto, params === null || params === void 0 ? void 0 : params.type), (0, swagger_1.ApiOkResponse)(schema));
    }
    else {
        const schema = {
            description: params === null || params === void 0 ? void 0 : params.description,
            schema: {
                allOf: [
                    { $ref: (0, swagger_1.getSchemaPath)(response_dto_1.ResponseDto) },
                ],
            },
        };
        return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(response_dto_1.ResponseDto), (0, swagger_1.ApiOkResponse)(schema));
    }
};
exports.ApiOkResponseTemplate = ApiOkResponseTemplate;
//# sourceMappingURL=api-ok-response.js.map