import { BaseGulpTask } from '../BaseGulpTask';
import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';

/**
 * Removes all transpiled TypeScript files as the gulp task 'clean'.
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Removes all transpiled TypeScript files';

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['c'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'verbose': 'Output all files being removed'
  };

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = [];

  /** @constructor */
  constructor(done: gulp.TaskCallback) {
    super();
    runSequence('clean-build', 'clean-lib', done);
  }

}
