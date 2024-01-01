import { ExecutionContext } from '@nestjs/common';
declare const UserGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class UserGuard extends UserGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
