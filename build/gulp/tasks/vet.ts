import { BaseGulpTask } from '../BaseGulpTask';
import { Utils } from '../utils';

/**
 * Vets all built files as the gulp task 'vet'.
 *
 * @class
 */
export class GulpTask extends BaseGulpTask {

  /**
   * @property  {string}  description   - Help description for the task.
   */
  public static description: string = 'Vets all built files';

  /**
   * @property  {string[]}  dependencies  - Array of all tasks that should be run before this one.
   */
  public static dependencies: string[] = ['vet-build-ts', 'vet-lib-ts'];

  /**
   * @property  {string[]}  aliases   - Different options to run the task.
   */
  public static aliases: string[] = ['v', 'V'];

  /**
   * @property  {Object}  options   - Any command line flags that can be passed to the task.
   */
  public static options: any = {
    'noExit': 'Flag if failed vetting should not emit error this terminating the process',
    'verbose': 'Output all TypeScript files being vetted'
  };

  /** @constructor */
  constructor() {
    super();
    Utils.log('Vetting code');
  }

}
