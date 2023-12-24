import { Response } from 'express';
export default class HttpResponse {
    static ok<T>(res: Response, body?: T): Response<unknown>;
    static created<T>(res: Response, params?: {
        uri?: string;
        body?: T;
    }): Response<unknown>;
    static noContent(res: Response): Response<unknown>;
    static badRequest<T>(res: Response, object?: T | Error): Response<unknown>;
    static unauthorized<T>(res: Response, object?: T | Error): Response<unknown>;
    static notFound<T>(res: Response, object?: T | Error): Response<unknown>;
    static unprocessableEntity<T>(res: Response, object?: T | Error): Response<unknown>;
    static internalServerError<T>(res: Response, object?: T | Error): Response<unknown>;
}
