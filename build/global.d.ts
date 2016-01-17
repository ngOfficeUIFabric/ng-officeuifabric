/**
 * General purpose interface for callbacks that have no parameters or return types.
 * Commonly used in gulp tasks.
 *
 * @callback VoidCallback
 */
interface IVoidCallback {
  (): void;
}

/**
 * General purpose interface for callbacks that have a single string parameter or return types.
 * Commonly used in gulp tasks.
 *
 * @callback IStringCallback
 */
interface IStringCallback {
  (message?: string): void;
}

/**
 * Command line arguments.
 *
 * @typedef commandLineArgs
 * @type {Object}
 * @property {boolean}  debug     - Flag if Node process should start in debug mode.
 * @property {boolean}  specs     - Flag indicating if the tests should be written to the console.
 * @property {boolean}  verbose   - Flag if tasks should output verbose messages to console.
 * @property {number}   version   - Version number to use in building library, overriding what's in package.json.
 * @property {boolean}  dev       - Flag indicating if development package should be created (unminified, with comments and sourcemaps)
 */
interface ICommandLineArgs {
  debug?: boolean;
  specs?: boolean;
  verbose?: boolean;
  version?: number;
  dev?: boolean;
}
