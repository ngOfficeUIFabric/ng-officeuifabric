'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import {Utils} from '../utils';
import * as gulp from 'gulp';
import * as path from 'path';
import * as yargs from 'yargs';
import * as karma from 'karma';
import * as runSequence from 'run-sequence';

/**
 * Watches for file change and automatically run vet, test, transpile, build.
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Watches for changes in source files and automatically runs vet, build, test';

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = ['run-all-sequence'];

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
    let eventSeparator: string = '---------------- *** ----------------------';
    let logEvent: (event: gulp.WatchEvent, eventName: string) => void = (event: gulp.WatchEvent, eventName: string) => {
      let fileName: string = path.basename(event.path);
      Utils.log(eventSeparator);
      Utils.log(`${eventName}`);
      Utils.log(eventSeparator);
      Utils.log(`Triggered by: '${fileName}'`);
    };

    let subscribeWatcher: (watcher: NodeJS.EventEmitter, eventName: string) => void = (watcher: NodeJS.EventEmitter, eventName: string) => {
      watcher.on('change', (event: gulp.WatchEvent) => {
        logEvent(event, eventName);
      });
    };

    let modeName: string = 'DEV';
    if (!this._args.dev) {
      modeName = 'RELEASE';
    }

    let buildLibEventName: string = `Build and test library in ${modeName} mode`;

    subscribeWatcher(
      gulp.watch(['./build/**/*.ts', './gulpfile.ts', './config/**/*.ts'], ['transpile-ts']), 'Transpile build files');

    subscribeWatcher(
      gulp.watch(['./src/**/demo*/*.ts'], ['transpile-ts']), 'Transpile demo files');

    gulp.watch(['./src/**/*.ts', '!./src/**/demo*/*.ts'], (event: gulp.WatchEvent) => {

      let currentPath: path.ParsedPath = path.parse(event.path);
      let allExceptSpecs: string = path.join(currentPath.dir, '!(*.spec).js');
      let allSpecs: string = path.join(currentPath.dir, '*.spec.js');
      let pathParts: string[] = currentPath.dir.split(path.sep);
      let dirName: string = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];

      Utils.log(eventSeparator);
      Utils.log(`${buildLibEventName}`);
      Utils.log(eventSeparator);
      Utils.log(`Triggered by: '${currentPath.base}'`);

      runSequence('transpile-ts', 'build-lib', () => {

        Utils.log('Starting Karma server');
        Utils.log(`Using specs under src/components/${dirName}/`);

        let karmaConfig: karma.ConfigOptions = <karma.ConfigOptions>{
          configFile: '../../../config/karma.js',
          singleRun: true
        };

        // if in spec mode, change reporters from progress => spec
        if (this._args.specs) {
          karmaConfig.reporters = ['spec', 'coverage'];
        }

        // set log level accordingly
        if (this._args.debug) {
          karmaConfig.logLevel = 'DEBUG';
        } else if (this._args.verbose) {
          karmaConfig.logLevel = 'INFO';
        }

        karmaConfig.files = [
          'node_modules/angular/angular.js',
          'node_modules/angular-mocks/angular-mocks.js',
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
          'src/core/jquery.phantomjs.fix.js',
          'src/core/*.js',
          allExceptSpecs,
          allSpecs
        ];

        let karmaServer: karma.Server = new karma.Server(karmaConfig, (karmaResult: number) => {
          Utils.log('Karma test run completed');

          // result = 1 means karma exited with error
          if (karmaResult === 1) {
            Utils.log('Karma finished with error(s)');
          }
        });

        karmaServer.start();
      });

    });
  }
}
