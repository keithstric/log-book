import { Component, OnInit } from '@angular/core';
import {Logger, LogLevel} from 'src/app/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ui-test';

  constructor() {}

  ngOnInit() {
    const logObj = {foo: 'bar', bar: ['baz','boom']};
    Logger.warn('Warn log', logObj);
    Logger.info('Info log', logObj);
    Logger.verbose('Verbose log', logObj);
    Logger.debug('Debug log', logObj);
    Logger.silly('Silly log', logObj);
    Logger.log(LogLevel.info, 'Info log from .log', logObj);
    Logger.error('Error log', new Error('Fake error message'), logObj);
  }
}
