'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import {BuildConfig} from '../config';
import {Utils} from '../utils';
import * as gulp from 'gulp';
import * as yargs from 'yargs';
let $: any = require('gulp-load-plugins')({ lazy: true });

/**
 * Builds files to be distributed as a library release.
 * 
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Builds ngOfficeUiFabric library files';

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = ['transpile-ts'];

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['b', 'B'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'verbose': 'Output all TypeScript files being compiled & JavaScript files included in the external library',
    'version': 'Version number to set build library (if omitted, version from package.json is used)'
  };

  /**
   * @property  {ICommandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /** @constructor */
  constructor() {
    super();
    Utils.log('Concatenating & Minifying JavaScript files');

    // build manifest of deployable JavaScript files
    let depFiles: string[] = [];
    // ... include 3rd party dependencies
    depFiles = BuildConfig.LIB_KEEP_JS;
    // ... include transpiled TypeScript
    depFiles = depFiles.concat(BuildConfig.LIB_JS);
    // ... exclude specs
    BuildConfig.LIB_TEST_JS.forEach((file: string) => {
      depFiles.push('!' + file);
    });

    // concat & minify all JavaScript
    return gulp.src(depFiles)
      .pipe($.stripComments())
      .pipe($.if(this._args.verbose, $.print()))
      .pipe($.concat(BuildConfig.OUTPUT_LIB_NAME + '-' + BuildConfig.VERSION + '.js'))
      .pipe($.insert.prepend(BuildConfig.BANNER_JS))
      .pipe(gulp.dest(BuildConfig.OUTPUT_PATH))
      .pipe($.uglify({ preserveComments: 'all' }))
      .pipe($.rename({ extname: '.min.js' }))
      .pipe(gulp.dest(BuildConfig.OUTPUT_PATH));

  }

}
