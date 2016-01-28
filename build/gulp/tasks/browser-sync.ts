'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import * as gulp from 'gulp';
import * as browserSyncModule from 'browser-sync';

/**
 * Builds files to be distributed as a library release.
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Watches for changes in demo files and automatically refreshes connected browsers';

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = [];

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['bs', 'BS'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {};

  /** @constructor */
  constructor(done: gulp.TaskCallback) {
    super();
    let browserSync: browserSyncModule.BrowserSyncInstance = browserSyncModule.create();
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(['./dist/*.js', './src/**/demo*/*.*'], () => {
      browserSync.reload();
    });
  }
}
