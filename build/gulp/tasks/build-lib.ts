'use strict';

import {BaseGulpTask} from '../BaseGulpTask';
import {BuildConfig} from '../../../config/build';
import {Utils} from '../utils';
import * as gulp from 'gulp';
import * as yargs from 'yargs';
import * as webpack from 'webpack';
import * as webpackConfig from '../../../config/webpack';
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
  public static dependencies: string[] = ['test'];

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['b', 'B'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'dev': 'Create unminified version of the library with source maps & comments (otherwise, production bundle created)',
    'verbose': 'Output all TypeScript files being compiled & JavaScript files included in the external library',
    'version': 'Version number to set build library (if omitted, version from package.json is used)'
  };

  /**
   * @property  {ICommandLineArgs}  args  - Command line arguments;
   */
  private _args: ICommandLineArgs = yargs.argv;

  /** @constructor */
  constructor(done: gulp.TaskCallback) {
    super();
    Utils.log('Packaging library using webpack');

    // load webpack config settings
    let config: webpack.Configuration = new webpackConfig.WebPackConfig();

    let webpackPlugins: webpack.Plugin[] = [];
    // if dev mode, write source maps & keep comments
    if (!this._args.dev) {
      config.output.filename = BuildConfig.OUTPUT_LIB_NAME + '.min.js';
      // use uglify plugin to remove comments & sourcemaps
      webpackPlugins.push(
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false
          },
          sourceMap: false
        })
      );
    } else { // else gen un-uglified & include inline sourcemaps
      config.output.filename = BuildConfig.OUTPUT_LIB_NAME + '.js';
      config.devtool = 'inline-source-map';
    }

    // add banner to the generated file
    webpackPlugins.push(
      new webpack.BannerPlugin(BuildConfig.BANNER_JS, null)
    );

    // add plugins to config
    config.plugins = webpackPlugins;

    let rootSource: string = __dirname + '/../../../' + BuildConfig.SOURCE;

    // build webpack bundle
    return gulp.src([rootSource + '/core/core.ts', rootSource + '/core/components.ts'])
      .pipe($.webpack(config))
      .pipe(gulp.dest(BuildConfig.OUTPUT_PATH));
  }
}
