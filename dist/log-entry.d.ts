import { LogLevel } from './logger.interface';
export declare class LogEntry {
    level: LogLevel;
    message: string;
    params?: any[] | undefined;
    entryDate: string;
    private _logWithDate;
    constructor(level: LogLevel, message: string, params?: any[] | undefined);
    get logWithDate(): boolean;
    set logWithDate(logWithDate: boolean);
    /**
     * Convert this log entry to an object
     */
    toJson(): any;
    /**
     * Convert this log entry to a JSON string
     */
    toString(): string;
    /**
     * Convert this to a formatted JSON string
     */
    toFormattedString(): string;
}
