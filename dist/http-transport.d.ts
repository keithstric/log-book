import { AbstractTransport } from './abstract-transport';
import { LogEntry } from './log-entry';
import { LogLevel } from './logger.interface';
export interface HttpTransportConfig {
    logWithDate: boolean;
    loggingEndpoint?: RequestInfo;
    flushInterval: number;
    flushThreshold: number;
    fetchRequestInit?: Partial<RequestInit>;
    dbKeyMap?: {
        [key: string]: keyof LogEntry;
    };
}
export declare class HttpTransport extends AbstractTransport {
    private readonly _config;
    private _logs;
    flushTimer: any;
    constructor(level: LogLevel, config: HttpTransportConfig);
    get config(): HttpTransportConfig;
    get logWithDate(): boolean;
    get loggingEndpoint(): RequestInfo;
    get flushInterval(): number;
    get flushThreshold(): number;
    get fetchRequestInit(): Partial<RequestInit> | {
        method: string;
        cache: string;
    };
    get dbKeyMap(): {
        [key: string]: keyof LogEntry;
    } | undefined;
    get logs(): LogEntry[];
    protected log(logEntry: LogEntry): LogEntry;
    private setTimer;
    protected flush(): Promise<void>;
    protected shouldPersist(logEntry: LogEntry): boolean;
    private getDbLogEntry;
}
