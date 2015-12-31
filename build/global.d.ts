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
 * @property {boolean}  debugBrk  - Flag if Node process should start in debug mode & break on first line.
 * @property {boolean}  nosync    - Flag if brower should not launch with browser-sync when serving code.
 * @property {boolean}  verbose   - Flag if tasks should output verbose messages to console.
 * @property {number}   version   - Version number to use in building library, overriding what's in package.json.
 */
interface ICommandLineArgs {
  debug?: boolean;
  debugBrk?: boolean;
  nosync?: boolean;
  verbose?: boolean;
  version?: number;
}
