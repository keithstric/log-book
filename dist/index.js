"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntry = exports.AbstractTransport = exports.HttpTransport = exports.ConsoleTransport = exports.LogBook = void 0;
var logbook_1 = require("./logbook");
Object.defineProperty(exports, "LogBook", { enumerable: true, get: function () { return logbook_1.LogBook; } });
var console_transport_1 = require("./console-transport");
Object.defineProperty(exports, "ConsoleTransport", { enumerable: true, get: function () { return console_transport_1.ConsoleTransport; } });
var http_transport_1 = require("./http-transport");
Object.defineProperty(exports, "HttpTransport", { enumerable: true, get: function () { return http_transport_1.HttpTransport; } });
var abstract_transport_1 = require("./abstract-transport");
Object.defineProperty(exports, "AbstractTransport", { enumerable: true, get: function () { return abstract_transport_1.AbstractTransport; } });
var log_entry_1 = require("./log-entry");
Object.defineProperty(exports, "LogEntry", { enumerable: true, get: function () { return log_entry_1.LogEntry; } });
__exportStar(require("./logger.interface"), exports);
//# sourceMappingURL=index.js.map