export interface DatabaseClient {
    connect(uri: string): Promise<void>;
    disconnect(): Promise<void>;
}

export enum RETRY {
    RETRY_COUNT = 5,
    RETRY_TIMEOUT = 1000
}
