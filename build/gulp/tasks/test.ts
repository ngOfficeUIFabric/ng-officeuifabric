'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import {BuildConfig} from '../config';
import {Utils} from '../utils';
import * as karma from 'karma';

/**
 * Runs all tests against the directives.
 * 
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Executes all tests against the directives';

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = ['transpile-ts'];

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['t', 'T'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'verbose': 'Output all directives being tested'
  };

  /** @constructor */
  constructor(done: IStringCallback) {
    super();
    Utils.log('Testing code with Karma');

    // create karma configuration
    let karmaConfig: karma.ConfigOptions = <karma.ConfigOptions>{
      configFile: __dirname + '/../../../' + BuildConfig.BUILD_PATH + '/karma.conf.js',
      singleRun: true
    };

    // create karma server
    let karmaServer: karma.Server = new karma.Server(karmaConfig, (karmaResult: number) => {
      Utils.log('Karma test run completed');

      // result = 1 means karma exited with error
      if (karmaResult === 1) {
        done('Karma returned error code ' + karmaResult + ' because at least one test failed.'
          + '\nThe following stack trace is expected when tests fail.');
      } else {
        done();
      }
    });
    karmaServer.start();
  }

}
