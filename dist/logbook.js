"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogBook = void 0;
const log_entry_1 = require("./log-entry");
const logger_interface_1 = require("./logger.interface");
class LogBook {
    constructor(config) {
        this._config = {
            transports: [],
            logLevel: logger_interface_1.LogLevel.info
        };
        this._config = Object.assign(Object.assign({}, this._config), config);
    }
    get config() {
        return this._config;
    }
    get transports() {
        return this.config.transports;
    }
    set transports(transports) {
        this._config.transports = transports;
    }
    get logLevel() {
        return this.config.logLevel;
    }
    set logLevel(logLevel) {
        this._config.logLevel = logLevel;
    }
    error(message, ...optionalParams) {
        this.writeToLog(logger_interface_1.LogLevel.error, message, optionalParams);
    }
    warn(message, ...optionalParams) {
        this.writeToLog(logger_interface_1.LogLevel.warn, message, optionalParams);
    }
    info(message, ...optionalParams) {
        this.writeToLog(logger_interface_1.LogLevel.info, message, optionalParams);
    }
    verbose(message, ...optionalParams) {
        this.writeToLog(logger_interface_1.LogLevel.verbose, message, optionalParams);
    }
    debug(message, ...optionalParams) {
        this.writeToLog(logger_interface_1.LogLevel.debug, message, optionalParams);
    }
    silly(message, ...optionalParams) {
        this.writeToLog(logger_interface_1.LogLevel.silly, message, optionalParams);
    }
    log(level, message, ...optionalParams) {
        this.writeToLog(level, message, optionalParams);
    }
    /**
     * Send the log entry off to the transport. Will display or store the log entry
     * @param {LogLevel} level
     * @param {string} message
     * @param {any[]} optionalParams
     */
    writeToLog(level, message, ...optionalParams) {
        this.transports.forEach((transport) => {
            if (this.shouldLog(level)) {
                const logEntry = new log_entry_1.LogEntry(level, message, ...optionalParams);
                logEntry.logWithDate = transport.logWithDate;
                const loggedEntry = transport.logMessage(logEntry);
            }
        });
    }
    shouldLog(level) {
        return level <= this.logLevel;
    }
}
exports.LogBook = LogBook;
//# sourceMappingURL=logbook.js.map