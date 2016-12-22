import { IWallaby, IWallabyConfig, IWallabyCompilers, IWallabyProcessor, IWallabyFilePattern, IWallabyEnvironment } from 'wallabyjs';
import { BuildConfig } from './build/config/build';
import { WebPackConfig } from './build/config/webpack';

class WallabyConfig implements IWallabyConfig {

  public files: IWallabyFilePattern[] = [
    { instrument: false, pattern: BuildConfig.NODE_MODULES + '/angular/angular.js' },
    { instrument: false, pattern: BuildConfig.NODE_MODULES + '/angular-mocks/angular-mocks.js' },
    { instrument: false, pattern: BuildConfig.NODE_MODULES + '/jquery/dist/jquery.min.js' },
    { instrument: false, pattern: BuildConfig.NODE_MODULES + '/pickadate/lib/picker.js' },
    { instrument: false, pattern: BuildConfig.NODE_MODULES + '/pickadate/lib/picker.date.js' },
    { instrument: false, pattern: BuildConfig.NODE_MODULES + '/jasmine-jquery/lib/jasmine-jquery.js' },
    { instrument: false, pattern: 'src/core/jquery.phantomjs.fix.js' },
    { load: false, pattern: 'src/**/*.ts' },
    { ignore: true, pattern: 'src/**/*.spec.ts' }
  ];

  public tests: IWallabyFilePattern[] = [
    { load: false, pattern: 'src/**/*.spec.ts' }
  ];

  public compilers: IWallabyCompilers = {
    'src/**/*.ts': this.wallaby.compilers.typeScript()
  };

  public env: IWallabyEnvironment = <IWallabyEnvironment>{
    params: { runner: '--web-security=false' },
    runner: require('phantomjs2-ext').path,
    viewportSize: { width: 600 }
  };

  public postprocessor: IWallabyProcessor;

  /**
   * Configure testing framework / sandbox environbment just before a test run starts.
   */
  public setup: any = function (): void {
    // required to trigger test loadingr
    let moduleBundle: string = '__moduleBundler';
    window[moduleBundle].loadTests();
  };

  constructor(private wallaby: IWallaby) {
    this.configPostProcessor();
  }

  /**
   * Configure the Wallaby postprocessor for webpack.
   */
  private configPostProcessor(): void {
    let webpackConfig: WebPackConfig = new WebPackConfig();

    this.postprocessor = require('wallaby-webpack')({
      entryPatterns: [
        'src/core/components.js',
        'src/core/core.js',
        'src/**/*.spec.js'
      ],
      externals: webpackConfig.externals,
      // can't use same resolve from webpack config because with regular
      // webpack, need to load TS then JS, but with Wallaby, need JS then TS
      resolve: {
        extensions: ['', '.js', '.ts'],
        root: webpackConfig.resolve.root
      }
    });
  }

}

module.exports = (wallaby: IWallaby) => {
  return new WallabyConfig(wallaby);
};
