"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiOkPaginationResponseTemplate = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const page_response_dto_1 = require("./page-response.dto");
const response_dto_1 = require("./response-dto");
const ApiOkPaginationResponseTemplate = (params) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(response_dto_1.ResponseDto, page_response_dto_1.PageResponseDto, params.type), (0, swagger_1.ApiOkResponse)({
        description: params.description,
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(page_response_dto_1.PageResponseDto) },
                {
                    properties: {
                        result: {
                            properties: {
                                pageSize: {
                                    type: 'number',
                                    default: 20,
                                    description: '페이지 크기',
                                },
                                totalCount: {
                                    type: 'number',
                                    default: 1,
                                    description: '아이템 총 개수',
                                },
                                totalPage: {
                                    type: 'number',
                                    default: 1,
                                    description: '총 페이지 수',
                                },
                                existsNextPage: {
                                    type: 'boolean',
                                    default: false,
                                    description: '다음 페이지 여부',
                                },
                                items: {
                                    type: 'array',
                                    items: { $ref: (0, swagger_1.getSchemaPath)(params.type) },
                                    description: '조회된 아이템 목록',
                                },
                            },
                        },
                    },
                },
            ],
        },
    }));
};
exports.ApiOkPaginationResponseTemplate = ApiOkPaginationResponseTemplate;
//# sourceMappingURL=api-ok-pagination-response.js.map