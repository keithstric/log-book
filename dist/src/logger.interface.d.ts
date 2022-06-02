import { AbstractTransport } from './abstract-transport';
export declare enum LogLevel {
    error = 0,
    warn = 1,
    info = 2,
    verbose = 3,
    debug = 4,
    silly = 5
}
export declare const LogLevelNameMap: string[];
export interface LogBookConfig {
    transports: AbstractTransport[];
    logLevel: LogLevel;
    logWithDate: boolean;
}
export interface FormattedMessage {
    message: string;
    /**
     * We use an `qny` type because this can contain whatever may be passed
     * into a log message as additional options and style information for those options.
     * For example:
     * `Logger.info('foo', bar)`
     *
     * Here we don't know what `bar` is and it will be in the replacementVars array.
     * So it really could be anything
     */
    replacementVars: any[];
}
