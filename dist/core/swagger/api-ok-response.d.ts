import { Type } from '@nestjs/common';
export declare const ApiOkResponseTemplate: <DtoClass extends Type<unknown>>(params?: {
    description?: string;
    type?: DtoClass;
    isArray?: boolean;
}) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
