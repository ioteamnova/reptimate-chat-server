"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusMessage = void 0;
const http_status_codes_1 = require("http-status-codes");
function responseJson(status, object) {
    if (object === undefined) {
        return {
            status: status,
            message: statusMessage(status),
            result: object,
        };
    }
    return {
        status: status,
        message: statusMessage(status),
        result: object,
    };
}
exports.default = responseJson;
function statusMessage(httpStatus) {
    switch (httpStatus) {
        case http_status_codes_1.default.OK:
            return 'Success';
        case http_status_codes_1.default.CREATED:
            return 'Created';
        case http_status_codes_1.default.BAD_REQUEST:
            return 'Bad Request';
        case http_status_codes_1.default.UNAUTHORIZED:
            return 'Unauthorized';
        case http_status_codes_1.default.FORBIDDEN:
            return 'Forbidden';
        case http_status_codes_1.default.NOT_FOUND:
            return 'Not Found';
        case http_status_codes_1.default.CONFLICT:
            return 'Conflict';
        case 419:
            return 'Token Expired';
        case http_status_codes_1.default.UNPROCESSABLE_ENTITY:
            return 'Unprocessable Entity';
        case http_status_codes_1.default.TOO_MANY_REQUESTS:
            return 'Too Many Request';
        case http_status_codes_1.default.INTERNAL_SERVER_ERROR:
            return 'Internal Error';
        default:
            return 'Server Error';
    }
}
exports.statusMessage = statusMessage;
//# sourceMappingURL=response-json.js.map