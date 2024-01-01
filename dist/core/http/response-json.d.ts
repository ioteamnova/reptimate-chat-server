export default function responseJson<T>(status: number, object?: T): {
    status: number;
    message: string;
    result?: T | unknown;
};
export declare function statusMessage(httpStatus: number): string;
