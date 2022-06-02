import { LogEntry } from './log-entry';
import { FormattedMessage, LogLevel } from './logger.interface';
export declare abstract class AbstractTransport {
    level: LogLevel;
    /**
     * Set to true to include the date in the logging message
     */
    abstract readonly logWithDate: boolean;
    protected constructor(level: LogLevel);
    /**
     * The name of this transport
     */
    get name(): string;
    /**
     * Show the log or commit it to a database. If you need to modify
     * 'logWithDate', 'shouldPersist', 'shouldNotifyUser' on a per
     * log message basis, do it here otherwise it'll use whatever is
     * defined as those class member properties
     *
     * @param {LogEntry} logEntry
     */
    protected abstract log(logEntry: LogEntry): LogEntry;
    /**
     * This should be a custom formatter for the log message
     * @param logEntry
     */
    protected _formatMessage(logEntry: LogEntry): FormattedMessage | void;
    /**
     * Called from LoggerService to ensure that shouldNotifyUser, shouldPersist and
     * logWithDate are properly set on the logEntry
     * @param {LogEntry} logEntry
     */
    logMessage(logEntry: LogEntry): LogEntry;
}
