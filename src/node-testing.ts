import {ConsoleTransport} from './console-transport';
import {LogBook} from './logbook';
import {LogLevel} from './logger.interface';

const logger = new LogBook({
	logLevel: LogLevel.info,
	transports: [new ConsoleTransport(LogLevel.info, true)]
});

const paramObj = {foo: 'bar', bar: 'baz'};
logger.warn('This is an warn message', paramObj);
logger.info('This is an info message', paramObj);
logger.verbose('This is an verbose message', paramObj);
logger.debug('This is a debug message', paramObj);
logger.silly('This is a silly message', paramObj);
logger.error('This is an error message', new Error('Fake error'), paramObj);

