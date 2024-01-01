"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaUpload = exports.S3FolderName = exports.asyncUploadToS3 = exports.s3 = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("./logger");
const date_utils_1 = require("./date-utils");
const uuid = require("uuid");
exports.s3 = new aws_sdk_1.S3({
    accessKeyId: process.env.AWS_ACECSS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,
});
const asyncUploadToS3 = async (fileKey, file) => {
    if (isPNG(file)) {
        const originalExtension = fileKey.split('.').pop();
        fileKey = fileKey.replace(`.${originalExtension}`, '.jpeg');
    }
    const bucket = process.env.AWS_BUCKET_NAME;
    const s3 = new aws_sdk_1.S3({
        accessKeyId: process.env.AWS_ACECSS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_BUCKET_REGION,
    });
    return await s3
        .upload({
        Bucket: bucket,
        Key: fileKey,
        Body: file,
    }, async function (err, data) {
        if (err) {
            throw new common_1.BadRequestException('file is not properly uploaded');
        }
        logger_1.logger.info(`file ${fileKey} uploaded successfully. ${data.Location}`);
    })
        .promise();
};
exports.asyncUploadToS3 = asyncUploadToS3;
var S3FolderName;
(function (S3FolderName) {
    S3FolderName["PROFILE"] = "profile";
    S3FolderName["PET"] = "pet";
    S3FolderName["BOARD"] = "board";
    S3FolderName["DIARY"] = "diary";
    S3FolderName["REPLY"] = "reply";
})(S3FolderName = exports.S3FolderName || (exports.S3FolderName = {}));
const mediaUpload = async (file, folder) => {
    const fileName = `${date_utils_1.default.momentFile()}-${uuid.v4()}-${file.originalname}`;
    const fileKey = `${folder}/${fileName}`;
    const result = await (0, exports.asyncUploadToS3)(fileKey, file.buffer);
    return result.Location;
};
exports.mediaUpload = mediaUpload;
function isPNG(file) {
    const signature = file.slice(0, 8).toString('hex');
    return signature === '89504e470d0a1a0a';
}
//# sourceMappingURL=s3-utils.js.map