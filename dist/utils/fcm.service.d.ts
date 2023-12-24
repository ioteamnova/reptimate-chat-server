export declare class FCMService {
    private fcm;
    constructor();
    sendFCM(fbTokens: string, title: string, description: string): Promise<void>;
}
