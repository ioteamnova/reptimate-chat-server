/// <reference types="node" />
/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
export declare const s3: S3;
export declare const asyncUploadToS3: (fileKey: string, file: Buffer) => Promise<ManagedUpload.SendData>;
export declare enum S3FolderName {
    PROFILE = "profile",
    PET = "pet",
    BOARD = "board",
    DIARY = "diary",
    REPLY = "reply"
}
export declare const mediaUpload: (file: Express.Multer.File, folder: string) => Promise<string>;
