'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import {Utils} from '../utils';
import * as yargs from 'yargs';
import * as karma from 'karma';
import * as gulp from 'gulp';

/**
 * Runs all tests against the directives.
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Executes all tests against the directives' + GulpTask.helpMargin;

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = [];

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['t', 'T'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'debug':   'Set karma log level to DEBUG' + GulpTask.helpMargin,
    'specs':   'Output all tests being run' + GulpTask.helpMargin,
    'verbose': 'Output all TypeScript files being built & set karma' + GulpTask.helpMargin +
               'log level to INFO' + GulpTask.helpMargin,
    'watch':   'Adds Chrome browser and start listening on file changes' + GulpTask.helpMargin +
               'for easier debugging' + GulpTask.helpMargin
  };

  /**
   * @property  {ICommandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /** @constructor */
  constructor(done: gulp.TaskCallback) {
    super();
    Utils.log('Testing code with Karma');

    // create karma configuration
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

    if (this._args.watch) {
      karmaConfig.singleRun = false;
      karmaConfig.browsers = ['Chrome', 'PhantomJS'];
    }

    // create karma server
    let karmaServer: karma.Server = new karma.Server(karmaConfig, (karmaResult: number) => {
      Utils.log('Karma test run completed');

      // result = 1 means karma exited with error
      if (karmaResult === 1) {
        Utils.log('Karma finished with error(s)');
      }

      done();

    });
    karmaServer.start();
  }

}
