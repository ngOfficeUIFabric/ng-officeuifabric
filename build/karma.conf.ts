'use strict';

import * as karma from 'karma';
import * as webpack from 'webpack';
import * as webpackConfig from './webpack.conf';

/**
 * Karma configuration.
 * 
 * @function
 * @public
 * @see {link http://karma-runner.github.io/0.13/config/configuration-file.html}
 * 
 */
module.exports = (config: karma.Config) => {
  // load webpack config settings
  let webpackSettings: webpack.Configuration = new webpackConfig.WebPackConfig();
  webpackSettings.entry = {};
  webpackSettings.devtool = 'inline-source-map';

  // create karma config
  let karmaConfig: IKarmaConfig = <IKarmaConfig>{
    autoWatch: true,
    basePath: '../',
    browsers: ['PhantomJS'],
    colors: true,
    coverageReporter: {
      dir: 'coverage/',
      type: 'lcov'
    },
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/jquery/dist/jquery.min.js',
      'src/core/*.js',
      'src/components/*/*.js'
    ],
    frameworks: ['jasmine-jquery', 'jasmine'],
    logLevel: config.LOG_WARN,
    plugins: ['karma-*'],
    port: 5793,
    preprocessors: {
      'src/**/*.js': ['webpack', 'sourcemap'],
      'src/core/**/*.js': 'coverage',
      'src/components/*/!(*spec).js': 'coverage'
    },
    reporters: ['progress', 'coverage'],
    singleRun: false,
    webpack: webpackSettings,
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
 * @property {string} dir - Output directory for coverage reports. If relative, resolved against karma.Configurationoptions.basePath.
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
 * @augments karma.Config
 * @property {IKarmaCoverageReporterConfigurationOptions} coverageReporter - Settings for karma-coverage.
 * @property {webpack.Configuration}  webpack - Webpack configuration settings.
 */
interface IKarmaConfig extends karma.ConfigOptions {
  coverageReporter?: IKarmaCoverageReporterConfigurationOptions;
  webpack?: webpack.Configuration;
}
