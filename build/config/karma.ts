import * as path from 'path';
import { BuildConfig } from './build';
import { Config, ConfigOptions } from 'karma';
import {
  Configuration,
  NewLoaderRule,
  NewModule
} from 'webpack';
import { WebPackConfig } from './webpack';

/**
 * Karma configuration.
 *
 * @function
 * @public
 * @see {link http://karma-runner.github.io/0.13/config/configuration-file.html}
 *
 */
module.exports = (config: Config) => {
  // load webpack config settings
  let wpConfig: Configuration = new WebPackConfig();
  // wpConfig.entry = {};
  wpConfig.devtool = 'inline-source-map';
  // use istanbul-instrumenter-loader which deals with webpack-added wrapper code
  //  that we can't test for
  let istanbulInstrumeterLoader: NewLoaderRule = {
    include: [
      path.resolve('src/core'),
      path.resolve('src/components')
    ],
    loader: 'istanbul-instrumenter-loader',
    test: /\.js/
  };
  (<NewModule>wpConfig.module).rules.push(istanbulInstrumeterLoader);

  // create karma config
  let karmaConfig: IKarmaConfig = <IKarmaConfig>{
    autoWatch: true,
    basePath: __dirname + '/../..',
    browsers: ['PhantomJS'],
    colors: true,
    coverageIstanbulReporter: {
      fixWebpackSourcePaths: true,
      reports: ['text-summary']
    },
    coverageReporter: {
      dir: 'reports/code-coverage/',
      type: 'lcov'
    },
    files: BuildConfig.CORE_TEST_FILES.concat(
      BuildConfig.ALL_SPEC_FILES
    ),
    frameworks: ['jasmine'],
    junitReporter: {
      outputDir: 'reports/test/'
    },
    logLevel: config.LOG_WARN,
    plugins: ['karma-*'],
    port: 5793,
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap']
    },
    reporters: ['junit', 'progress', 'coverage'],
    singleRun: false,
    webpack: wpConfig,
    webpackMiddleware: {
      noInfo: true
    }
  };

  // set karma configuration
  config.set(karmaConfig);
};

/**
 * Interface to define Karma coverage reporter configuration
 *
 * @typedef karmaCoverageReporterConfigurationOptions
 * @property {string} type - Specify a reporter type (html | lcov | lcovonly | text | text-summary | cobertura | teamcity | json)
 * @property {string} dir - Output directory for coverage reports. If relative, resolved against ConfigurationOptions.basePath.
 * @see {link https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md}
 */
interface IKarmaCoverageReporterConfigurationOptions {
  dir?: string;
  type?: string;
}

/**
 * Interface to extend the default Karma configuration options to add
 * stuff needed for code coverage & webpack.
 *
 * @typedef karmaConfig
 * @augments Config
 * @property {IKarmaCoverageReporterConfigurationOptions} coverageReporter - Settings for karma-coverage.
 * @property {Configuration}  webpack - Webpack configuration settings.
 */
interface IKarmaConfig extends ConfigOptions {
  coverageReporter?: IKarmaCoverageReporterConfigurationOptions;
  webpack?: Configuration;
}
