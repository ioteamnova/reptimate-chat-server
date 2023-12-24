"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCreatedResponseTemplate = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const created_response_dto_1 = require("./created-response-dto");
const ApiCreatedResponseTemplate = (params) => {
    if (params === null || params === void 0 ? void 0 : params.type) {
        const schema = {
            description: params.description,
            schema: {
                allOf: [
                    { $ref: (0, swagger_1.getSchemaPath)(created_response_dto_1.CreatedResponseDto) },
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
        return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(created_response_dto_1.CreatedResponseDto, params === null || params === void 0 ? void 0 : params.type), (0, swagger_1.ApiCreatedResponse)(schema));
    }
    else {
        const schema = {
            description: params === null || params === void 0 ? void 0 : params.description,
            schema: {
                allOf: [
                    { $ref: (0, swagger_1.getSchemaPath)(created_response_dto_1.CreatedResponseDto) },
                ],
            },
        };
        return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(created_response_dto_1.CreatedResponseDto), (0, swagger_1.ApiCreatedResponse)(schema));
    }
};
exports.ApiCreatedResponseTemplate = ApiCreatedResponseTemplate;
//# sourceMappingURL=api-created-response.js.map