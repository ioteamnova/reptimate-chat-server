import { CreateUserDto } from './create-user.dto';
import { User } from 'src/domains/user/entities/user.entity';
declare const UserInfoResponseDto_base: import("@nestjs/common").Type<Omit<CreateUserDto, "password">>;
export declare class UserInfoResponseDto extends UserInfoResponseDto_base {
    idx: number;
    createdAt: Date;
    updatedAt: Date;
    constructor(user: User);
}
export {};
