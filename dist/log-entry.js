"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntry = void 0;
class LogEntry {
    constructor(level, message, params) {
        this.level = level;
        this.message = message;
        this.params = params;
        this.entryDate = new Date().toISOString();
        this._logWithDate = false;
    }
    get logWithDate() {
        return this._logWithDate;
    }
    set logWithDate(logWithDate) {
        this._logWithDate = logWithDate;
    }
    /**
     * Convert this log entry to an object
     */
    toJson() {
        return JSON.parse(JSON.stringify(this));
    }
    /**
     * Convert this log entry to a JSON string
     */
    toString() {
        return JSON.stringify(this);
    }
    /**
     * Convert this to a formatted JSON string
     */
    toFormattedString() {
        return JSON.stringify(this, null, 2);
    }
}
exports.LogEntry = LogEntry;
//# sourceMappingURL=log-entry.js.map