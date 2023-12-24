/// <reference types="express" />
import { User } from 'src/domains/user/entities/user.entity';
import { ChatService } from './chat.service';
import { ChatRoomDto, CreateRoomDto } from './dtos/chat-room.dto';
import { PageRequest } from 'src/core/page';
export declare class Chatcontroller {
    private readonly chatService;
    constructor(chatService: ChatService);
    createBoard(res: any, dto: CreateRoomDto, user: User): Promise<import("express").Response<unknown, Record<string, any>>>;
    getRoomIdx(res: any, user: User, oppositeIdx: number): Promise<import("express").Response<unknown, Record<string, any>>>;
    getChatRoomList(res: any, user: User, pageRequest: PageRequest): Promise<import("express").Response<unknown, Record<string, any>>>;
    getChatData(res: any, user: User, pageRequest: PageRequest, roomIdx: number): Promise<import("express").Response<unknown, Record<string, any>>>;
    chatBan(res: any, dto: ChatRoomDto, user: User): Promise<import("express").Response<unknown, Record<string, any>>>;
    chatRoomOut(res: any, roomIdx: number, user: User): Promise<import("express").Response<unknown, Record<string, any>>>;
}
