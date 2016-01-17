'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import * as gulp from 'gulp';
import {BuildConfig} from '../../../config/build';
import {Utils} from '../utils';
import * as yargs from 'yargs';
let $: any = require('gulp-load-plugins')({ lazy: true });

/**
 * Vets the code style & quality of all build-related TypeScript as the gulp task 'vet-build-ts'.
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Run code quality & style analysis on all build-realted TypeScript'
  + ' (code used to build & maintain project)';

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'verbose': 'Output all TypeScript files being vetted'
  };

  /**
   * @property  {ICommandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /** @constructor */
  constructor(done: IVoidCallback) {
    super();
    Utils.log('Vetting build TypeScript code');

    return gulp.src(BuildConfig.BUILD_TYPESCRIPT)
      .pipe($.if(this._args.verbose, $.print()))
      .pipe($.tslint())
      .pipe($.tslint.report('verbose', { summarizeFailureOutput: true }));
  }

}
