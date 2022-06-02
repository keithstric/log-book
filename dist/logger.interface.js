"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevelNameMap = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["error"] = 0] = "error";
    LogLevel[LogLevel["warn"] = 1] = "warn";
    LogLevel[LogLevel["info"] = 2] = "info";
    LogLevel[LogLevel["verbose"] = 3] = "verbose";
    LogLevel[LogLevel["debug"] = 4] = "debug";
    LogLevel[LogLevel["silly"] = 5] = "silly";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
exports.LogLevelNameMap = [
    'error',
    'warn',
    'info',
    'verbose',
    'debug',
    'silly'
];
//# sourceMappingURL=logger.interface.js.map