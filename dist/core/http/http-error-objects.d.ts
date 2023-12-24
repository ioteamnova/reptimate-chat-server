export interface HttpErrorFormat {
    errorCode: string;
    description?: string;
    message: string;
}
export declare const HttpErrorConstants: {
    UNAUTHORIZED: HttpErrorFormat;
    FORBIDDEN: HttpErrorFormat;
    INTERNAL_SERVER_ERROR: HttpErrorFormat;
    EXIST_EMAIL: HttpErrorFormat;
    EXIST_NICKNAME: HttpErrorFormat;
    EXIST_DATE: HttpErrorFormat;
    INVALID_AUTH: HttpErrorFormat;
    CANNOT_FIND_USER: HttpErrorFormat;
    CANNOT_FIND_PET: HttpErrorFormat;
    CANNOT_FIND_DIARY: HttpErrorFormat;
    CANNOT_FIND_WEIGHT: HttpErrorFormat;
    CANNOT_FIND_SCHEDULE: HttpErrorFormat;
    AUTH_LINK_EXPIRED: HttpErrorFormat;
    AUTH_TYPE_INVALID: HttpErrorFormat;
    CANNOT_UPDATE_SOCIAL_USER: HttpErrorFormat;
    EXPIRED_ACCESS_TOKEN: HttpErrorFormat;
    EXPIRED_REFRESH_TOKEN: {
        errorCode: string;
        message: string;
    };
    CANNOT_FIND_BOARD: HttpErrorFormat;
    BOARD_PRIVATE: HttpErrorFormat;
    BOARD_NOT_WRITER: HttpErrorFormat;
    REPLY_NOT_WRITER: HttpErrorFormat;
    CANNOT_FIND_REPLY: HttpErrorFormat;
    BOOKMAEK_EXIST: HttpErrorFormat;
    BOOKMAEK_NOT_EXIST: HttpErrorFormat;
    CHATROOM_NOT_EXIST: HttpErrorFormat;
    AUCTION_END: HttpErrorFormat;
    AUCTION_PRICE_ROW: HttpErrorFormat;
    LIVEROOM_NOT_HOST: HttpErrorFormat;
    LIVEROOM_NOT_EXIST: HttpErrorFormat;
    LIVEROOM_TOO_LONG: HttpErrorFormat;
    LIVEROOM_NO_CHAT: HttpErrorFormat;
    LIVEROOM_BAN: HttpErrorFormat;
};
