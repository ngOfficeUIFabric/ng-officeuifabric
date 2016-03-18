'use strict';

import * as yargs from 'yargs';

export class BuildConfig {
  public static ROOT: string = '.';
  public static NODE_MODULES: string = 'node_modules';
  public static BUILD_PATH: string = BuildConfig.ROOT + '/build';
  public static GULP_TASKS: string = BuildConfig.BUILD_PATH + '/gulp/tasks';
  public static SOURCE: string = BuildConfig.ROOT + '/src';

  // get version number
  public static VERSION: number = yargs.argv.version || require('./../../package.json').version;

  // banner added to all output
  public static BANNER_JS: string =
  'ngOfficeUIFabric\n' +
  'http://ngofficeuifabric.com\n' +
  'Angular 1.x directives for Microsoft\'s Office UI Fabric\n' +
  'https://angularjs.org & https://dev.office.com/fabric\n' +
  'v' + BuildConfig.VERSION;

  // build library paths
  public static OUTPUT_PATH: string = BuildConfig.ROOT + '/dist';
  public static OUTPUT_LIB_NAME: string = 'ngOfficeUiFabric';

  public static BUILDRPT_PATH: string = BuildConfig.ROOT + '/reports';
  // code coverage reports
  public static COVERAGERPT_PATH: string = BuildConfig.BUILDRPT_PATH + '/code-coverage';
  // code test reports
  public static TESTRPT_PATH: string = BuildConfig.BUILDRPT_PATH + '/test';

  /*
   * JavaScript files
   */
  public static BUILD_JS: string[] = [
    BuildConfig.BUILD_PATH + '/**/*.js',
    'gulpfile.js'
  ];
  public static LIB_JS: string[] = [
    BuildConfig.SOURCE + '/core/**/*.js',
    BuildConfig.SOURCE + '/components/*/*.js'
  ];
  public static LIB_TEST_JS: string[] = [
    BuildConfig.SOURCE + '/core/**/*.spec.js',
    BuildConfig.SOURCE + '/components/*/*.spec.js'
  ];
  public static ALL_JS: string[] = BuildConfig.BUILD_JS
    .concat(BuildConfig.LIB_JS)
    .concat(BuildConfig.LIB_TEST_JS);

  // files not dynamically built & should not be purged
  public static BUILD_KEEP_JS: string[] = [];
  public static LIB_KEEP_JS: string[] = [
    BuildConfig.SOURCE + '/core/jquery.phantomjs.fix.js'
  ];

  /*
   * TypeScript files
   */
  public static TYPESCRIPT_DEFINITIONS: string = BuildConfig.ROOT + '/typings/**/*.d.ts';
  public static BUILD_TYPESCRIPT: string[] = [
    BuildConfig.BUILD_PATH + '/*.ts',
    BuildConfig.BUILD_PATH + '/gulp/**/*.ts',
    'gulpfile.ts'
  ];
  public static LIB_TYPESCRIPT: string[] = [
    BuildConfig.SOURCE + '/core/**/*.ts',
    BuildConfig.SOURCE + '/components/*/*.ts'
  ];
  public static LIB_TEST_TYPESCRIPT: string[] = [
    BuildConfig.SOURCE + '/core/**/*.spec.ts',
    BuildConfig.SOURCE + '/components/*/*.spec.ts'
  ];
  public static ALL_TYPESCRIPT: string[] = BuildConfig.BUILD_TYPESCRIPT
    .concat(BuildConfig.LIB_TYPESCRIPT)
    .concat(BuildConfig.LIB_TEST_TYPESCRIPT);

  /**
   * All core files used in testing.
   */
  public static CORE_TEST_FILES: string[] = [
    BuildConfig.NODE_MODULES + '/angular/angular.js',
    BuildConfig.NODE_MODULES + '/angular-mocks/angular-mocks.js',
    BuildConfig.NODE_MODULES + '/jquery/dist/jquery.min.js',
    BuildConfig.NODE_MODULES + '/pickadate/lib/picker.js',
    BuildConfig.NODE_MODULES + '/pickadate/lib/picker.date.js',
    BuildConfig.NODE_MODULES + '/jasmine-jquery/lib/jasmine-jquery.js',
    'src/core/jquery.phantomjs.fix.js',
    'src/core/*.js'
  ];
  /**
   * ALl test files.
   */
  public static ALL_SPEC_FILES: string[] = [
    'src/components/*/!(*.spec|contextualMenu|navbarDirective).js',
    'src/components/navbar/navbarDirective.js',
    'src/components/contextualmenu/contextualMenu.js',
    'src/components/*/*.spec.js'
  ];
}
