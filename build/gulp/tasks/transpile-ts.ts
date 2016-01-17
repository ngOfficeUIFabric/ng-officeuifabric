'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import * as gulp from 'gulp';
import {Utils} from '../utils';
import * as yargs from 'yargs';
let $: any = require('gulp-load-plugins')({ lazy: true });

/**
 * Transpiles all TypeScript as JavaScript as the gulp task 'transpile-ts'.
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Builds all TypeScript as JavaScript';

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['tts'];

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = ['vet'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'verbose': 'Output all TypeScript files being built'
  };

  /**
   * @property  {ICommandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /** @constructor */
  constructor() {
    super();
    Utils.log('Transpiling app TypeScript files to JavaScript');

    // use the TypeScript project config file for all settings
    let tsProject: any = $.typescript.createProject('tsconfig.json');

    // compile all TypeScript files, including sourcemaps inline in the generated JavaScript
    let result: any = tsProject.src()
      .pipe($.if(this._args.verbose, $.print()))
      .pipe($.sourcemaps.init())
      .pipe($.typescript(tsProject));

    return result.js
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(''));
  }

}
