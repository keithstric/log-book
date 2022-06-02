import {LogBook, LogLevel, ConsoleTransport, HttpTransport} from 'log-book';

export {LogLevel} from 'log-book';
export const Logger = new LogBook({
  logLevel: LogLevel.silly,
  transports: [
    new ConsoleTransport(LogLevel.silly, true),
    new HttpTransport(LogLevel.silly, {
      logWithDate: false,
      flushInterval: 1000,
      flushThreshold: 5,
      dbKeyMap: {
        date: 'entryDate',
        msg: 'message',
        options: 'params'
      }
    })
  ]
});
