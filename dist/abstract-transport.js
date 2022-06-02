"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTransport = void 0;
class AbstractTransport {
    constructor(level) {
        this.level = level;
    }
    /**
     * The name of this transport
     */
    get name() {
        return this.constructor.name;
    }
    /**
     * This should be a custom formatter for the log message
     * @param logEntry
     */
    _formatMessage(logEntry) { }
    /**
     * Called from LoggerService to ensure that shouldNotifyUser, shouldPersist and
     * logWithDate are properly set on the logEntry
     * @param {LogEntry} logEntry
     */
    logMessage(logEntry) {
        return this.log(logEntry);
    }
}
exports.AbstractTransport = AbstractTransport;
//# sourceMappingURL=abstract-transport.js.map