'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import {Utils} from '../utils';
import * as gulp from 'gulp';
import * as path from 'path';
import * as yargs from 'yargs';
import * as runSequence from 'run-sequence';
import * as browserSyncModule from 'browser-sync';
import * as fs from 'fs';
import * as childProcess from 'child_process';

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

    let spawnGulpTask: (task: string, ...additionalArgs: string[]) => childProcess.ChildProcess =
    (task: string, ...additionalArgs: string[]) => {
      let isWindows: boolean = (process.platform.lastIndexOf('win') === 0);

      let command: string = isWindows ? 'cmd.exe' : 'sh';
      let args: string[]  = isWindows ? ['/c', 'gulp ' + task].concat(process.argv.slice(3)).concat(additionalArgs)
                                      : ['-c', 'gulp ' + task].concat(process.argv.slice(3)).concat(additionalArgs);

      return childProcess.spawn(command, args, { env: process.env , stdio: 'inherit' });
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

    type setupWatcherFunc = () => void;

    let demoFilesWatcher: setupWatcherFunc = () => {
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
    };

    let buildFilesWatcher: setupWatcherFunc = () => {
      subscribeWatcher(
      gulp.watch(['./build/**/*.ts', './gulpfile.ts', './config/**/*.ts'], ['transpile-ts']), 'Transpile build files');
    };

    let demoTypescriptWatcher: setupWatcherFunc = () => {
      subscribeWatcher(
      gulp.watch(['./src/**/demo*/*.ts'], () => {
        runSequence('transpile-ts', reloadBrowsers);
      }),
      'Transpile demo files');
    };

    let sourceWatcher: setupWatcherFunc = () => {
      subscribeWatcher(
      gulp.watch(['./src/**/*.ts', '!./src/**/demo*/*.ts'], (event: gulp.WatchEvent) => {

      runSequence('transpile-ts', () => {
        spawnGulpTask('build-lib')
        .on('exit', () => {
          spawnGulpTask('test', '--file=' + event.path);
        });
      });
    }),
      buildLibEventName);
    };


    /* Push .bin path into current PATH env. variable */
    process.env.PATH += path.delimiter + path.join(__dirname, 'node_modules', '.bin');

    /* setup all wathers */
    buildFilesWatcher();
    demoFilesWatcher();
    demoTypescriptWatcher();
    sourceWatcher();
  }
}
