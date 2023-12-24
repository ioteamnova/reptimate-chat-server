import { Type } from '@nestjs/common';
export declare const ApiOkPaginationResponseTemplate: <DtoClass extends Type<unknown>>(params: {
    description?: string;
    type: DtoClass;
}) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
