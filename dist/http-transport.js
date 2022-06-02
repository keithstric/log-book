"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpTransport = void 0;
const abstract_transport_1 = require("./abstract-transport");
class HttpTransport extends abstract_transport_1.AbstractTransport {
    constructor(level, config) {
        super(level);
        this._config = {
            logWithDate: true,
            flushInterval: 60000,
            flushThreshold: 10,
            fetchRequestInit: {
                method: 'POST',
                cache: 'no-cache',
            }
        };
        this._logs = [];
        this._config = Object.assign(Object.assign({}, this._config), config);
    }
    get config() {
        return this._config;
    }
    get logWithDate() {
        return this.config.logWithDate;
    }
    get loggingEndpoint() {
        return this.config.loggingEndpoint || '';
    }
    get flushInterval() {
        return this.config.flushInterval;
    }
    get flushThreshold() {
        return this.config.flushThreshold;
    }
    get fetchRequestInit() {
        if (!this.config.fetchRequestInit) {
            return {
                method: 'POST',
                cache: 'no-cache'
            };
        }
        return this.config.fetchRequestInit;
    }
    get dbKeyMap() {
        return this.config.dbKeyMap;
    }
    get logs() {
        return this._logs;
    }
    log(logEntry) {
        if (!this.flushTimer) {
            this.setTimer();
        }
        if (this.shouldPersist(logEntry)) {
            this._logs.unshift(logEntry);
        }
        if (this.logs.length >= this.flushThreshold) {
            this.flush();
        }
        return logEntry;
    }
    setTimer() {
        this.flushTimer = setInterval(() => {
            if (this.loggingEndpoint) {
                this.flushTimer = setInterval(() => {
                    this.flush();
                }, this.flushInterval);
            }
            else {
                clearInterval(this.flushTimer);
                console.warn('No loggingEndpoint defined for LogBook HttpTransport. Logs will not be sent to logging service');
            }
        }, this.flushInterval);
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.logs.length) {
                let logBookLogs = this.logs;
                if (this.dbKeyMap) {
                    logBookLogs = this.logs.map((logEntry) => {
                        return this.getDbLogEntry(logEntry);
                    });
                }
                try {
                    if (this.loggingEndpoint) {
                        yield fetch(this.loggingEndpoint, Object.assign(Object.assign({}, this.fetchRequestInit), { body: JSON.stringify(logBookLogs) }));
                        this._logs = [];
                    }
                    else {
                        console.warn(`${logBookLogs.length} log entries not sent to logging service. No loggingEndpoint defined`, logBookLogs);
                        this._logs = [];
                    }
                }
                catch (e) {
                    console.error('Error sending logs to logging service', e);
                    throw e;
                }
            }
        });
    }
    shouldPersist(logEntry) {
        return logEntry.level <= this.level;
    }
    getDbLogEntry(logEntry) {
        if (this.dbKeyMap) {
            const dbLogEntry = {};
            Object.keys(this.dbKeyMap).forEach((dbKey) => {
                // @ts-ignore
                dbLogEntry[dbKey] = this.dbKeyMap[dbKey] ? logEntry[this.dbKeyMap[dbKey]] : undefined;
            });
            return dbLogEntry;
        }
        return undefined;
    }
}
exports.HttpTransport = HttpTransport;
//# sourceMappingURL=http-transport.js.map