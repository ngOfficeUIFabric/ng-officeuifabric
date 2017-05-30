// import * as webpack from 'webpack';
import {
  Configuration,
  ExternalsElement,
  NewModule,
  NewLoaderRule,
  NewResolve,
  Output
 } from 'webpack';

/**
 * Options affecting the normal module.
 *
 * @class
 * @implements {NewModule}
 * @public
 *
 * @property {NewLoaderRule[]}   rules - Array of automatically applied loader rules.
 */
class WebPackModule implements NewModule {

  public rules: NewLoaderRule[] = [];

  /**
   * Constructor that creates the collection of loaders.
   *
   * @constructs
   */
  constructor() {
    this.rules.push(<NewLoaderRule>{
      exclude: /node_modules/,
      loader: 'ts-loader',
      test: /\.ts$/
    });
  }
}

/**
 * Webpack configuration.
 *
 * @class
 * @implements {Configuration}
 * @public
 * @see {link http://webpack.github.io/docs/configuration.html}
 *
 * @property  {Output}          output        - Options affecting the output.
 * @property  {string}          libraryTarget - Which format to export the library.
 * @property  {Object}          externals     - Dependencies not resolved by webpack, but become dependencies of the resulting bundle.
 * @property  {string}          target        - Compile for usage in a browser-like environment.
 * @property  {Object}          NewResolve    - Options affecting the resolving of modules.
 */
export class WebPackConfig implements Configuration {

  public output: Output = <Output>{
    // export to AMD, CommonJS2 or as property in root
    libraryTarget: 'umd'
  };

  public externals: ExternalsElement = {
    'angular': 'angular'
  };

  public target: string = 'web';

  public resolve: NewResolve = {
    extensions: ['.ts', '.js']
  };

  public module: NewModule = new WebPackModule();

}
