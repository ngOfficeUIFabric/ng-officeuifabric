'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import {Utils} from '../utils';
import * as gulp from 'gulp';
import * as path from 'path';
import * as yargs from 'yargs';
import * as karma from 'karma';
import * as runSequence from 'run-sequence';
import * as browserSyncModule from 'browser-sync';
import * as fs from 'fs';

/**
 * Watches for file change and automatically run vet, test, transpile, build.
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Watches for changes in source files and automatically runs vet, build, test' + GulpTask.helpMargin;

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = ['validate-build'];

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['ld', 'LD'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'debug':   'Affects \'test\' task, sets karma log level to DEBUG',
    'dev':     'Affects \'build-lib\' task, creates unminified version of the library with source maps & comments ' + GulpTask.helpMargin +
               '(otherwise, production bundle created)',
    'serve':   'Automatically reloads connected browsers when sources for demo changed. Starts static server at' + GulpTask.helpMargin +
               'http://localhost:3000/. To connect browser you need to explicitly open your demo with url,'  + GulpTask.helpMargin +
               'such as http://localhost:3000/src/components/icon/demo/index.html',
    'specs':   'Affects \'test\' task, outputs all tests being run',
    'verbose': 'Affects \'test\' and \'build-lib\' tasks, outputs all TypeScript files being compiled & JavaScript ' + GulpTask.helpMargin +
               'files included in the external library, set karma log level to INFO',
    'version': 'Affects \'build-lib\' task, version number to set build library (if omitted, version from ' + GulpTask.helpMargin +
               'package.json is used)'
  };

  /**
   * @property  {ICommandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /**
   * @property {Object} browserSync   - If 'serve' option is provied, contains reference to browerSync object
   */
  private browserSync: browserSyncModule.BrowserSyncInstance;

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

    let reloadBrowsers: () => void = () => {
      if (this._args.serve) {
            this.browserSync.reload();
          }
    };

    if (this._args.serve) {
          this.browserSync = browserSyncModule.create();
          this.browserSync.init({
              server: {
                  baseDir: './'
              }
          });

          gulp.watch(['./dist/*.js', './src/**/demo*/*.*', '!./src/**/demo*/*.ts'], (event: gulp.WatchEvent) => {
            let filePath: path.ParsedPath = path.parse(event.path);

            /* skip reloading for files which are changed by typescript transpilation
               they are reloading by other task */
            if (filePath.ext === '.js') {
              let tsFile: string = event.path.replace('.js', '.ts');
              fs.stat(tsFile, (err: NodeJS.ErrnoException, stats: fs.Stats) => {
              /* corresponding .ts not found -->> reload */
              if (err) {
                this.browserSync.reload();
                return;
              }
              /* .ts found -->> do nothing, at this point browsers should be reloaded by the `Transpile demo files` */
            });

            } else {
              this.browserSync.reload();
            }
          });
      }

    subscribeWatcher(
      gulp.watch(['./build/**/*.ts', './gulpfile.ts', './config/**/*.ts'], ['transpile-ts']), 'Transpile build files');

    subscribeWatcher(
      gulp.watch(['./src/**/demo*/*.ts'], () => {
        runSequence('transpile-ts', reloadBrowsers);
      }),
      'Transpile demo files');


    subscribeWatcher(
      gulp.watch(['./src/**/*.ts', '!./src/**/demo*/*.ts'], (event: gulp.WatchEvent) => {

      let currentPath: path.ParsedPath = path.parse(event.path);
      let allExceptSpecs: string = path.join(currentPath.dir, '!(*.spec).js');
      let allSpecs: string = path.join(currentPath.dir, '*.spec.js');
      let pathParts: string[] = currentPath.dir.split(path.sep);
      let dirName: string = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];

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

    }),
      buildLibEventName);

  }
}
