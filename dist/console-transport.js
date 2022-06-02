"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleTransport = void 0;
const logger_interface_1 = require("./logger.interface");
const abstract_transport_1 = require("./abstract-transport");
class ConsoleTransport extends abstract_transport_1.AbstractTransport {
    constructor(level, logWithDate) {
        super(level);
        /**
         * The index of these colors should match the log level enum.
         * For example, LogLevel.error = 0. So color at index 0 will be
         * used for log entries with an Error logging level
         */
        this.logLevelColors = [
            'color: #de1414;',
            'color: #fff3cd;',
            'color: #d1ecf1;',
            'color: #856404;',
            'color: #d4edda;',
            'color: #f8d7da;'
        ];
        this.logWithDate = logWithDate;
    }
    /**
     * Get all the different log parts for styling purposes
     * @param {LogEntry} logEntry
     * @private
     */
    _getLogParts(logEntry) {
        const levelColor = this.logLevelColors[logEntry.level];
        return [
            { partName: 'date', styles: 'color: default;', value: `%c${logEntry.entryDate} - ` },
            {
                partName: 'level',
                styles: `${levelColor} font-weight: bold; font-size: 1.1em`,
                value: `%c${logger_interface_1.LogLevelNameMap[logEntry.level]} - `
            },
            { partName: 'message', styles: levelColor, value: `%c${logEntry.message}` }
        ];
    }
    /**
     * Add formatting to the message to be displayed
     * @param logEntry
     * @returns {FormattedMessage}
     */
    _formatMessage(logEntry) {
        let message = '';
        const logParts = this._getLogParts(logEntry);
        const replacementVars = [];
        logParts.forEach((logPart) => {
            if (logPart.partName !== 'date' || (logPart.partName === 'date' && logEntry.logWithDate)) {
                message += logPart.value;
                replacementVars.push(logPart.styles);
            }
        });
        return { message, replacementVars };
    }
    log(logEntry) {
        const formatMsg = this._formatMessage(logEntry);
        let message = formatMsg.message;
        let vars = formatMsg.replacementVars;
        if (logEntry.params && logEntry.params.length) {
            message += ' %o';
            vars = [...formatMsg.replacementVars, ...logEntry.params];
        }
        // Send message to console
        if (logEntry.level !== logger_interface_1.LogLevel.error) {
            if (logEntry.level === logger_interface_1.LogLevel.debug) {
                console.debug(message, ...vars);
            }
            else {
                console.log(message, ...vars);
            }
        }
        else {
            console.error(message, ...vars);
        }
        return logEntry;
    }
}
exports.ConsoleTransport = ConsoleTransport;
//# sourceMappingURL=console-transport.js.map