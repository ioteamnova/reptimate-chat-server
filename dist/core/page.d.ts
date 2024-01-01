export declare class Page<T> {
    pageSize: number;
    totalCount: number;
    totalPage: number;
    existsNextPage: boolean;
    items: T[];
    constructor(totalCount: number, items: T[], pageRequest: PageRequest);
}
export declare class PageRequest {
    page?: number;
    size?: number;
    order?: 'DESC' | 'ASC';
    get offset(): number;
    get limit(): number;
    existsNextPage(totalCount: number): boolean;
}
