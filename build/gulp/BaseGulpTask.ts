'use strict';

/** @class */
export class BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = '';

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = [];

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = [];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {};

  /**
   * @property  {string}  helpMargin   - whitespaces for nicely displaying help in the console
   */
  public static helpMargin: string = '\r\n                      ';

}
