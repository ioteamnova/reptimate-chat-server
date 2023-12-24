/// <reference types="express" />
/// <reference types="multer" />
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(res: any, dto: CreateUserDto): Promise<import("express").Response<unknown, Record<string, any>>>;
    getUserInfo(res: any, user: User): Promise<import("express").Response<unknown, Record<string, any>>>;
    update(res: any, dto: UpdateUserDto, user: User, file: Express.Multer.File): Promise<import("express").Response<unknown, Record<string, any>>>;
}
