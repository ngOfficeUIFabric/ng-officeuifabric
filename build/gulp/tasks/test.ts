import { BaseGulpTask } from '../BaseGulpTask';
import { Utils } from '../utils';
import { BuildConfig } from '../../config/build';
import * as yargs from 'yargs';
import * as karma from 'karma';
import * as gulp from 'gulp';
import * as path from 'path';

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
    'debug': 'Set karma log level to DEBUG',
    'file': 'Changed file to filter tests down to just that file',
    'specs': 'Output all tests being run',
    'verbose': 'Output all TypeScript files being built & set karma log level to INFO',
    'watch': 'Adds Chrome browser and start listening on file changes for easier debugging'
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
      configFile: '../../../build/config/karma.js',
      singleRun: true
    };

    // if in spec mode, change reporters from progress => spec
    if (this._args.specs) {
      karmaConfig.reporters = ['junit', 'spec', 'coverage'];
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

    if (this._args.file) {
      let currentPath: path.ParsedPath = path.parse(this._args.file);
      let allExceptSpecs: string = path.join(currentPath.dir, '!(*.spec).js');
      let allSpecs: string = path.join(currentPath.dir, '*.spec.js');
      let pathParts: string[] = currentPath.dir.split(path.sep);
      let dirName: string = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];

      karmaConfig.files = BuildConfig.CORE_TEST_FILES.concat(
        allExceptSpecs, allSpecs
      );

      Utils.log(`Using specs under src/components/${dirName}/`);
    }


    // create karma server
    let karmaServer: karma.Server = new karma.Server(karmaConfig, (karmaResult: number) => {
      Utils.log('Karma test run completed');

      // result = 1 means karma exited with error
      if (karmaResult !== 0) {
        Utils.log('Karma finished with error(s)');
        done(() => { return new Error('Karma finished with errors'); });
      } else {
        done();
      }

    });
    karmaServer.start();
  }

}
