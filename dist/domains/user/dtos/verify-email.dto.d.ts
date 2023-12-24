import { EmailVerifyType } from '../helper/constant';
import { CreateUserDto } from './create-user.dto';
declare const VerifyEmailDto_base: import("@nestjs/common").Type<Pick<CreateUserDto, "email">>;
export declare class VerifyEmailDto extends VerifyEmailDto_base {
    type: EmailVerifyType;
}
export {};
