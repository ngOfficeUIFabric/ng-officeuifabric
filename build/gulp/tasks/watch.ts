'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import {Utils} from '../utils';
import * as gulp from 'gulp';
import * as path from 'path';
import * as yargs from 'yargs';

/**
 * Watches for file change and automatically run vet, test, transpile, build.
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Watches for changes in files and automatically runs vet, build, test';

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = [];

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['w', 'W'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'specs': 'Affects \'test\' task, outputs all tests being run',
    'verbose': 'Affects \'test\' and \'build-lib\' tasks, outputs all TypeScript files ' +
                'being compiled & JavaScript files included in the external library, set karma log level to INFO',
    'version': 'Affects \'build-lib\' task, version number to set build library (if omitted, version from package.json is used)',
    'debug': 'Affects \'test\' task, sets karma log level to DEBUG',
    'dev': 'Affects \'build-lib\' task, creates unminified version of the library ' +
            'with source maps & comments (otherwise, production bundle created) '
  };

  /**
   * @property  {ICommandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /** @constructor */
  constructor() {
    super();
    Utils.log('Watching for files changes....');

    let logEvent: (event: gulp.WatchEvent, eventName: string) => void = (event: gulp.WatchEvent, eventName: string) => {
      let fileName: string = path.basename(event.path);
      Utils.log(`*** Event: '${eventName}'. Triggered by file: '${fileName}' ***`);
    };

    let subscribeWatcher: (watcher: NodeJS.EventEmitter, eventName: string) => void = (watcher: NodeJS.EventEmitter, eventName: string) => {
      watcher.on('change', (event: gulp.WatchEvent) => {
        logEvent(event, eventName);
      });
    };

    let buildLibEventName: string = 'Build library in DEV mode';
    if (!this._args.dev) {
      buildLibEventName = 'Build library in RELEASE mode';
    }

    subscribeWatcher(gulp.watch(['./src/**/*.ts', '!./src/**/*.spec.ts'], ['build-lib']), buildLibEventName);
    subscribeWatcher(gulp.watch(['./build/**/*.ts', './gulpfile.ts', './config/**/*.ts'], ['transpile-ts']), 'Transpile build files');
    subscribeWatcher(gulp.watch(['./src/**/*.spec.ts'], ['test']), 'Run tests');
  }
}
