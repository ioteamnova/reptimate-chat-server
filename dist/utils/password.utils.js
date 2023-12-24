"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRegex = exports.comparePassword = exports.validatePassword = exports.hashPassword = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const http_error_objects_1 = require("../core/http/http-error-objects");
const hashPassword = (plainText) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(plainText, salt);
};
exports.hashPassword = hashPassword;
const validatePassword = async (password, hashedPassword) => {
    const equalsPassword = await (0, exports.comparePassword)(password, hashedPassword);
    if (!equalsPassword) {
        throw new common_1.UnauthorizedException(http_error_objects_1.HttpErrorConstants.INVALID_AUTH);
    }
};
exports.validatePassword = validatePassword;
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
exports.PasswordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$^*+=-])(?=.*[0-9]).{8,64}$/;
//# sourceMappingURL=password.utils.js.map