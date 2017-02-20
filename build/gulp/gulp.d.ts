/**
 * Describes a dynamic gulp file contents.
 *
 * @typedef gulpTaskFile
 * @type  {Object}
 * @property  {string}    name      - Name of the gulp task.
 * @property  {gulpTask}  GulpTask  - Actual gulp task.
 */
interface IGulpTaskFile {
  name: string;
  GulpTask: IGulpTask;
}

/**
 * Describes a gulp task that is dynamically loaded. Implementatin of the task resides within
 * the implementation of the the class' constructor.
 *
 * @typedef gulpTask
 * @type  {Object}
 * @property  {string}    description   - Help description for the task.
 * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
 * @property  {string[]}  aliases       - Different options to run the task.
 * @property  {Object}    options       - Any command line flags that can be passed to the task.
 */
interface IGulpTask {
  description: string;
  dependencies: string[];
  aliases: string[];
  options: any;
}

/**
 * Error object coming from gulp
 *
 * @typedef gulpErrorulp
 * @type {Object}
 * @property  {string}  message         - Error message.
 * @property  {boolean} showStack       - Flag if the call stack should be shown.
 * @property  {string}  showProperties  - Flag if the error properties should be shown.
 * @property  {string}  plugin          - Name of the gulp plugin that published the error.
 * @property  {Object}  __saftey        - Catch-all
 */
interface IGulpError {
  message: string;
  showStack: boolean;
  showProperties: boolean;
  plugin: string;
  __saftey: any;
}
