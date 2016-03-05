'use strict';

import * as events from 'events';
import * as childProcess from 'child_process';
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

  /**
   * Spawns a child gulp task with additional command line arguments which run-sequence does not support.
   *
   * @param  {string} task                - Gulp task to run.
   * @param  {string[]} ...taskArgs - Arguments passed to gulp task.
   */
  public static spawnGulpTask: (task: string, ...taskArgs: string[]) => childProcess.ChildProcess =
  (task: string, ...taskArgs: string[]) => {
    let isWindows: boolean = (process.platform.lastIndexOf('win') === 0);

    let command: string = isWindows ? 'cmd.exe' : 'sh';
    let args: string = ['gulp ' + task].concat(process.argv.slice(3)).concat(taskArgs).join(' ');

    if (isWindows) {
      return childProcess.spawn(command, ['/c', args], { env: process.env, stdio: 'inherit' });
    }

    return childProcess.spawn(command, ['-c', args], { env: process.env, stdio: 'inherit' });
  };

}
