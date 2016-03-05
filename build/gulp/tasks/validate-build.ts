'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import {Utils} from '../utils';
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
  public static description: string = 'Validates the build runs \'vet\', \'transpile-ts\', \'build-lib\' and \'test\' in a sequence'
                                      + GulpTask.helpMargin;

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
    'debug':   'Affects \'test\' task, sets karma log level to DEBUG',
    'dev':     'Create unminified version of the library with source maps & comments (otherwise, production' + GulpTask.helpMargin +
               'bundle created)',
    'specs':   'Affects \'test\' task, outputs all tests being run',
    'verbose': 'Affects \'test\' and \'build-lib\' tasks, outputs all TypeScript files being compiled & JavaScript ' + GulpTask.helpMargin +
               'files included in the external library, set karma log level to INFO',
    'version': 'Affects \'build-lib\' task, version number to set build library (if omitted, version from' + GulpTask.helpMargin +
               'package.json is used)'
  };

  /** @constructor */
  constructor(cb: gulp.TaskCallback) {
    super();

    Utils.spawnGulpTask('vet', '--noExit')
      .on('exit', () => {
        runSequence('test', 'build-lib', cb);
      });
  }
}
