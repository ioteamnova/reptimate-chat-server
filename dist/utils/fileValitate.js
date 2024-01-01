"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileValidate = exports.fileValidates = void 0;
const common_1 = require("@nestjs/common");
function fileValidates(files) {
    if (files && files.length > 0) {
        const allowedFileTypes = /(?:png|jpeg|mov|mp4)$/i;
        const maxFileSize = 200 * 1024 * 1024;
        for (const file of files) {
            if (!allowedFileTypes.test(file.originalname)) {
                throw new common_1.HttpException('Invalid file type', common_1.HttpStatus.BAD_REQUEST);
            }
            if (file.size > maxFileSize) {
                throw new common_1.HttpException('File size exceeds the limit', common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
}
exports.fileValidates = fileValidates;
function fileValidate(file) {
    if (file) {
        const allowedFileTypes = /(?:png|jpeg|mov|mp4)$/i;
        const maxFileSize = 200 * 1024 * 1024;
        if (!allowedFileTypes.test(file.originalname)) {
            throw new common_1.HttpException('Invalid file type', common_1.HttpStatus.BAD_REQUEST);
        }
        if (file.size > maxFileSize) {
            throw new common_1.HttpException('File size exceeds the limit', common_1.HttpStatus.BAD_REQUEST);
        }
    }
}
exports.fileValidate = fileValidate;
//# sourceMappingURL=fileValitate.js.map