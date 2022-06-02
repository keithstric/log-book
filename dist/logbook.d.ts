import { LogBookConfig, LogLevel } from './logger.interface';
export declare class LogBook {
    private readonly _config;
    constructor(config: LogBookConfig);
    get config(): LogBookConfig;
    get transports(): import("./abstract-transport").AbstractTransport[];
    set transports(transports: import("./abstract-transport").AbstractTransport[]);
    get logLevel(): LogLevel;
    set logLevel(logLevel: LogLevel);
    error(message: string, ...optionalParams: any[]): void;
    warn(message: string, ...optionalParams: any[]): void;
    info(message: string, ...optionalParams: any[]): void;
    verbose(message: string, ...optionalParams: any[]): void;
    debug(message: string, ...optionalParams: any[]): void;
    silly(message: string, ...optionalParams: any[]): void;
    log(level: LogLevel, message: string, ...optionalParams: any[]): void;
    /**
     * Send the log entry off to the transport. Will display or store the log entry
     * @param {LogLevel} level
     * @param {string} message
     * @param {any[]} optionalParams
     */
    writeToLog(level: LogLevel, message: string, ...optionalParams: any[]): void;
    shouldLog(level: LogLevel): boolean;
}
