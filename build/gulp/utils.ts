'use strict';

import * as events from 'events';
let $: any = require('gulp-load-plugins')({ lazy: true });

export class Utils {
  /**
   * Log a message or series of messages using chalk's blue color.
   * Can pass in a string, object or array.
   * 
   * @param {(string|string[]} message - Message(s) to write to the log.
   */
  public static log(message: string | string[]): void {
    if (typeof (message) === 'object') {
      for (let item in <string[]>message) {
        if (message.hasOwnProperty(item)) {
          $.util.log($.util.colors.blue(message[item]));
        }
      }
    } else {
      $.util.log($.util.colors.blue(message));
    }
  }

  /**
   * Logs any errors that are passed in & publishes the 'end' event.
   * 
   * @param {Object}  error   - Error object to log.
   */
  public static handleError(error: IGulpError): void {
    // log the error
    $.util.log(error.toString());

    // publish the event
    let eventEmitter: NodeJS.EventEmitter = new events.EventEmitter();
    eventEmitter.emit('end');
  }
}
