import { HttpErrorFormat } from '../http/http-error-objects';
export declare const ApiErrorResponseTemplate: (paramsList: {
    status?: number;
    errorFormat?: HttpErrorFormat;
    errorFormatList?: HttpErrorFormat[];
}[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
