import { Page } from '../page';
import { ResponseDto } from './response-dto';
export declare class PageResponseDto<T> extends ResponseDto<T> {
    readonly result: Page<T>;
}
