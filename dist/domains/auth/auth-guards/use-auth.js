"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_unauthorized_response_1 = require("../../../core/swagger/api-unauthorized-response");
const auth_gurad_1 = require("./auth.gurad");
const UseAuthGuards = () => {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_gurad_1.UserGuard), (0, swagger_1.ApiBearerAuth)('accessToken'), (0, api_unauthorized_response_1.ApiUnauthorizedErrorResponse)());
};
exports.default = UseAuthGuards;
//# sourceMappingURL=use-auth.js.map