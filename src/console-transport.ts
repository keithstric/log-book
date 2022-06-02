import {FormattedMessage, LogLevel, LogLevelNameMap} from './logger.interface';
import {LogEntry} from './log-entry';
import {AbstractTransport} from './abstract-transport';

export class ConsoleTransport extends AbstractTransport {
	readonly logWithDate: boolean;
	/**
	 * The index of these colors should match the log level enum.
	 * For example, LogLevel.error = 0. So color at index 0 will be
	 * used for log entries with an Error logging level
	 */
	logLevelColors: string[] = [
		'color: #de1414;',
		'color: #fff3cd;',
		'color: #d1ecf1;',
		'color: #856404;',
		'color: #d4edda;',
		'color: #f8d7da;'
	];

	constructor(level: LogLevel, logWithDate: boolean) {
		super(level);
		this.logWithDate = logWithDate;
	}

	/**
	 * Get all the different log parts for styling purposes
	 * @param {LogEntry} logEntry
	 * @private
	 */
	private _getLogParts(logEntry: LogEntry) {
		const levelColor = this.logLevelColors[logEntry.level];
		return [
			{partName: 'date', styles: 'color: default;', value: `%c${logEntry.entryDate} - `},
			{
				partName: 'level',
				styles: `${levelColor} font-weight: bold; font-size: 1.1em`,
				value: `%c${LogLevelNameMap[logEntry.level]} - `
			},
			{partName: 'message', styles: levelColor, value: `%c${logEntry.message}`}
		];
	}

	/**
	 * Add formatting to the message to be displayed
	 * @param logEntry
	 * @returns {FormattedMessage}
	 */
	protected _formatMessage(logEntry: LogEntry): FormattedMessage {
		let message = '';
		const logParts = this._getLogParts(logEntry);
		const replacementVars: string[] = [];
		logParts.forEach((logPart) => {
			if (logPart.partName !== 'date' || (logPart.partName === 'date' && logEntry.logWithDate)) {
				message += logPart.value;
				replacementVars.push(logPart.styles);
			}
		});
		return {message, replacementVars};
	}

	protected log(logEntry: LogEntry): LogEntry {
		const formatMsg = this._formatMessage(logEntry);
		let message = formatMsg.message;
		let vars = formatMsg.replacementVars;
		if (logEntry.params && logEntry.params.length) {
			message += ' %o';
			vars = [...formatMsg.replacementVars, ...logEntry.params];
		}
		// Send message to console
		if (logEntry.level !== LogLevel.error) {
			if (logEntry.level === LogLevel.debug) {
				console.debug(message, ...vars);
			} else {
				console.log(message, ...vars);
			}
		} else {
			console.error(message, ...vars);
		}
		return logEntry;
	}
}
