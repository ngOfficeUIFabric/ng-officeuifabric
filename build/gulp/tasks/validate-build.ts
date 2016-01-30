'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import * as gulp from 'gulp';
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
  public static description: string = 'Validates the build runs `vet`, `transpile-ts`, ' + GulpTask.helpMargin +
                                      '`build-lib` and `test` in a sequence' + GulpTask.helpMargin;

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = [];

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['vb', 'VB'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'debug':   'Affects \'test\' task, sets karma log level to DEBUG' + GulpTask.helpMargin,

    'dev':     'Affects \'build-lib\' task, creates unminified ' + GulpTask.helpMargin +
               'version of the library with source maps & comments ' + GulpTask.helpMargin +
               '(otherwise, production bundle created)' + GulpTask.helpMargin,

    'specs':   'Affects \'test\' task, outputs all tests being run' + GulpTask.helpMargin,

    'verbose': 'Affects \'test\' and \'build-lib\' tasks, outputs all ' + GulpTask.helpMargin +
               'TypeScript files being compiled & JavaScript files included' + GulpTask.helpMargin +
               'in the external library, set karma log level to INFO' + GulpTask.helpMargin,

    'version': 'Affects \'build-lib\' task, version number to set build' + GulpTask.helpMargin +
               'library (if omitted, version from package.json is used)' + GulpTask.helpMargin
  };

  /** @constructor */
  constructor(cb: gulp.TaskCallback) {
    super();

    runSequence('transpile-ts', 'build-lib', 'test', cb);
  }
}
