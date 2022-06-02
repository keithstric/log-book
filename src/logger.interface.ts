import {AbstractTransport} from './abstract-transport';

export enum LogLevel {
	error,
	warn,
	info,
	verbose,
	debug,
	silly
}

export const LogLevelNameMap = [
	'error',
	'warn',
	'info',
	'verbose',
	'debug',
	'silly'
];

export interface LogBookConfig {
	transports: AbstractTransport[];
	logLevel: LogLevel;
}

export interface FormattedMessage {
	message: string;
	/**
	 * We use an `qny` type because this can contain whatever may be passed
	 * into a log message as additional options and style information for those options.
	 * For example:
	 * `Logger.info('foo', bar)`
	 *
	 * Here we don't know what `bar` is and it will be in the replacementVars array.
	 * So it really could be anything
	 */
	replacementVars: any[];
}
