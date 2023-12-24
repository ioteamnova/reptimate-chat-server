"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_json_1 = require("./response-json");
const http_status_codes_1 = require("http-status-codes");
class HttpResponse {
    static ok(res, body) {
        return res.status(http_status_codes_1.default.OK).json((0, response_json_1.default)(http_status_codes_1.default.OK, body));
    }
    static created(res, params) {
        if (params && params.uri) {
            res.setHeader('Location', params.uri);
        }
        return res
            .status(http_status_codes_1.default.CREATED)
            .json((0, response_json_1.default)(http_status_codes_1.default.CREATED, params ? params.body : undefined));
    }
    static noContent(res) {
        return res.status(http_status_codes_1.default.OK).json();
    }
    static badRequest(res, object) {
        return res
            .status(http_status_codes_1.default.BAD_REQUEST)
            .json((0, response_json_1.default)(http_status_codes_1.default.BAD_REQUEST, object));
    }
    static unauthorized(res, object) {
        return res
            .status(http_status_codes_1.default.UNAUTHORIZED)
            .json((0, response_json_1.default)(http_status_codes_1.default.UNAUTHORIZED, object));
    }
    static notFound(res, object) {
        return res
            .status(http_status_codes_1.default.NOT_FOUND)
            .json((0, response_json_1.default)(http_status_codes_1.default.NOT_FOUND, object));
    }
    static unprocessableEntity(res, object) {
        return res
            .status(http_status_codes_1.default.UNPROCESSABLE_ENTITY)
            .json((0, response_json_1.default)(http_status_codes_1.default.UNPROCESSABLE_ENTITY, object));
    }
    static internalServerError(res, object) {
        return res
            .status(http_status_codes_1.default.INTERNAL_SERVER_ERROR)
            .json((0, response_json_1.default)(http_status_codes_1.default.INTERNAL_SERVER_ERROR, object));
    }
}
exports.default = HttpResponse;
//# sourceMappingURL=http-response.js.map