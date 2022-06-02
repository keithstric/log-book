import { FormattedMessage, LogLevel } from './logger.interface';
import { LogEntry } from './log-entry';
import { AbstractTransport } from './abstract-transport';
export declare class ConsoleTransport extends AbstractTransport {
    readonly logWithDate: boolean;
    /**
     * The index of these colors should match the log level enum.
     * For example, LogLevel.error = 0. So color at index 0 will be
     * used for log entries with an Error logging level
     */
    logLevelColors: string[];
    constructor(level: LogLevel, logWithDate: boolean);
    /**
     * Get all the different log parts for styling purposes
     * @param {LogEntry} logEntry
     * @private
     */
    private _getLogParts;
    /**
     * Add formatting to the message to be displayed
     * @param logEntry
     * @returns {FormattedMessage}
     */
    protected _formatMessage(logEntry: LogEntry): FormattedMessage;
    protected log(logEntry: LogEntry): LogEntry;
}
