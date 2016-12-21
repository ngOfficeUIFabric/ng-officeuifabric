import * as webpack from 'webpack';

/**
 * Options affecting the normal module.
 *
 * @class
 * @implements {webpack.Module}
 * @public
 *
 * @property {webpack.Loader[]}   loaders - Array of automatically applied loaders.
 */
class WebPackModule implements webpack.OldModule {

  public loaders: webpack.Rule[] = [];

  /**
   * Constructor that creates the collection of loaders.
   *
   * @constructs
   */
  constructor() {
    this.loaders.push(<webpack.Rule>{
      loader: 'ts-loader',
      test: /\.ts$/
    });
  }
}

/**
 * Webpack configuration.
 *
 * @class
 * @implements {webpack.Configuration}
 * @public
 * @see {link http://webpack.github.io/docs/configuration.html}
 *
 * @property  {webpack.Output}  output    - Options affecting the output.
 * @property  {string}          output.libraryTarget    - Which format to export the library.
 * @property  {Object}          externals - Dependencies not resolved by webpack, but become dependencies of the resulting bundle.
 * @property  {string}          target    - Compile for usage in a browser-like environment.
 * @property  {Object}          resolve   - Options affecting the resolving of modules.
 * @property  {string[]}        resolve.extensions  - Extensions that should be used to resolve modules.
 * @property  {string}          resolve.root  - Absolute path that contains the modules.
 */
export class WebPackConfig implements webpack.Configuration {

  public output: webpack.Output = <webpack.Output>{
    // export to AMD, CommonJS2 or as property in root
    libraryTarget: 'umd'
  };

  public externals: any = {
    'angular': 'angular'
  };

  public target: string = 'web';

  public resolve: any = {
    extensions: ['', '.ts', '.js'],
    root: './src'
  };

  public module: webpack.Module = new WebPackModule();
}
