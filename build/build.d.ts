/**
 * Specifies the current node web environment variables.
 * 
 * @typedef nodeEnvironment
 * @type {Object}
 * @property {number}   port      - Port where the server should run.
 * @property {number}   nodeEnv   - Setting of 'dev' or 'build' for the node environment.
 */
interface INodeEnvironment {
  PORT: number;
  NODE_ENV: string;
  DEBUG?: string;
}

/**
 * Settings for the node enviroment on startup for nodemon. 
 * 
 * @typedef nodeOptions
 * @type {Object}
 * @property {string}           script    - Relative path to the script to start the node server.
 * @property {number}           delayTime - The time nodemon should delay to restart the server.
 * @property {nodeEnvironment}  env       - Specify if the server should be dev / build.
 * @property {string[]}         watch     - What files should be monitored to restart nodemon.
 */
interface INodemonOptions {
  script: string;
  delayTime: number;
  env: INodeEnvironment;
  watch: string[];
  nodeArgs?: string[];
}
