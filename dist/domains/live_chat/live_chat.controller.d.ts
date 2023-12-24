/// <reference types="express" />
import { LiveChatService } from './live_chat.service';
export declare class LiveChatcontroller {
    private readonly livechatService;
    constructor(livechatService: LiveChatService);
    getBanList(res: any, roomIdx: number, boardIdx: number, userIdx: number): Promise<import("express").Response<unknown, Record<string, any>>>;
    banDelete(res: any, roomIdx: number, boardIdx: number, userIdx: number, banUserIdx: number): Promise<import("express").Response<unknown, Record<string, any>>>;
    getNoChatList(res: any, roomIdx: number, boardIdx: number, userIdx: number): Promise<import("express").Response<unknown, Record<string, any>>>;
}
