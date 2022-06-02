"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_transport_1 = require("./console-transport");
const logbook_1 = require("./logbook");
const logger_interface_1 = require("./logger.interface");
const logger = new logbook_1.LogBook({
    logLevel: logger_interface_1.LogLevel.info,
    logWithDate: true,
    transports: [new console_transport_1.ConsoleTransport(logger_interface_1.LogLevel.info, true)]
});
const paramObj = { foo: 'bar', bar: 'baz' };
logger.warn('This is an warn message', paramObj);
logger.info('This is an info message', paramObj);
logger.verbose('This is an verbose message', paramObj);
logger.debug('This is a debug message', paramObj);
logger.silly('This is a silly message', paramObj);
logger.error('This is an error message', new Error('Fake error'), paramObj);
//# sourceMappingURL=node-testing.js.map