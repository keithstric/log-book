import {AbstractTransport} from './abstract-transport';
import {LogEntry} from '../log-entry';
import {LogLevel} from '../logger.interface';

export interface HttpTransportConfig {
	logWithDate: boolean;
	loggingEndpoint?: RequestInfo;
	flushInterval: number;
	flushThreshold: number;
	fetchRequestInit?: Partial<RequestInit>;
	dbKeyMap?: {[key: string]: keyof LogEntry};
}

export class HttpTransport extends AbstractTransport {
	private readonly _config: HttpTransportConfig = {
		logWithDate: true,
		flushInterval: 60000,
		flushThreshold: 10,
		fetchRequestInit: {
			method: 'POST',
			cache: 'no-cache',
		}
	};
	private _logs: LogEntry[] = [];
	flushTimer: any;

	constructor(level: LogLevel, config: HttpTransportConfig) {
		super(level);
		this._config = {
			...this._config,
			...config
		};
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

	protected log(logEntry: LogEntry): LogEntry {
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

	private setTimer() {
		this.flushTimer = setInterval(() => {
			if (this.loggingEndpoint) {
				this.flushTimer = setInterval(() => {
					this.flush();
				}, this.flushInterval);
			}else{
				clearInterval(this.flushTimer);
				console.warn('No loggingEndpoint defined for LogBook HttpTransport. Logs will not be sent to logging service');
			}
		}, this.flushInterval);
	}

	protected async flush() {
		if (this.logs.length) {
			let logBookLogs: any[] = this.logs;
			if (this.dbKeyMap) {
				logBookLogs = this.logs.map((logEntry) => {
					return this.getDbLogEntry(logEntry);
				});
			}
			try {
				if (this.loggingEndpoint) {
					await fetch(this.loggingEndpoint, {
						...this.fetchRequestInit as Partial<RequestInit>,
						body: JSON.stringify(logBookLogs)
					});
					this._logs = [];
				}else{
					console.warn(`${logBookLogs.length} log entries not sent to logging service. No loggingEndpoint defined`, logBookLogs);
					this._logs = [];
				}
			}catch(e) {
				console.error('Error sending logs to logging service', e);
				throw e;
			}
		}
	}

	protected shouldPersist(logEntry: LogEntry) {
		return logEntry.level <= this.level;
	}

	private getDbLogEntry(logEntry: LogEntry) {
		if (this.dbKeyMap) {
			const dbLogEntry: any = {};
			Object.keys(this.dbKeyMap).forEach((dbKey) => {
				// @ts-ignore
				dbLogEntry[dbKey] = this.dbKeyMap[dbKey] ? logEntry[this.dbKeyMap[dbKey]] : undefined;
			});
			return dbLogEntry;
		}
		return undefined;
	}
}
