export class BuildConfig {
  public static ROOT: string = '.';
  public static NODE_MODULES: string = '/node_modules';
  public static BUILD_PATH: string = BuildConfig.ROOT + '/build';
  public static GULP_TASKS: string = BuildConfig.BUILD_PATH + '/gulp/tasks';
  public static SOURCE: string = BuildConfig.ROOT + '/src';

  /*
   * JavaScript files
   */
  public static BUILD_JS: string[] = [
    BuildConfig.BUILD_PATH + '/**/*.js',
    'gulpfile.js'
  ];
  public static APP_JS: string[] = [
    BuildConfig.SOURCE + '/**/*.js'
  ];
  public static APP_TEST_JS: string[] = [
    BuildConfig.SOURCE + '/**/*.tests.js'
  ];
  public static ALL_JS: string[] = BuildConfig.BUILD_JS
    .concat(BuildConfig.APP_JS)
    .concat(BuildConfig.APP_TEST_JS);

  // files not dynamically built & should not be purged
  public static BUILD_KEEP_JS: string[] = [
    BuildConfig.BUILD_PATH + '/karma.conf.js'];
  public static APP_KEEP_JS: string[] = [
    BuildConfig.SOURCE + '/externals/PickaDate.js'
  ];

  /*
   * TypeScript files
   */
  public static BUILD_TYPESCRIPT: string[] = [
    BuildConfig.BUILD_PATH + '/gulp/**/*.ts',
    'gulpfile.ts'
  ];
  public static APP_TYPESCRIPT: string[] = [
    BuildConfig.SOURCE + '/**/*.ts'
  ];
  public static APP_TEST_TYPESCRIPT: string[] = [
    BuildConfig.SOURCE + '/**/*.tests.ts'
  ];
  public static ALL_TYPESCRIPT: string[] = BuildConfig.BUILD_TYPESCRIPT
    .concat(BuildConfig.APP_TYPESCRIPT)
    .concat(BuildConfig.APP_TEST_TYPESCRIPT);
}
