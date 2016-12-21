/**
 * Library version dependencies this library has.
 *
 * @typedef libraryDependencies
 * @type {Object}
 * @prop {string?}   angular        - Version of Angular required.
 * @prop {string?}   officeUiFabric - Version of the Office UI Fabric required.
 */
export interface ILibraryDependencies {
  angularLib?: string;
  officeUiFabricLib?: string;
}

export class ScriptUtils {
  /**
   * Gets the version of the library from the package.json file unless
   * the version is specified as the enviroment variable VERSION.
   *
   * @param  {string} sourcePath - location where the source repo resides
   *
   * @returns string
   */
  public static getLibraryVersion(sourcePath: string): string {
    if (process.env.VERSION === undefined) {
      return require(sourcePath + '/package.json').version;
    } else {
      return process.env.VERSION;
    }
  }

  /**
   * Gets the library dependencies in the current library from the
   * package.json.
   *
   * @param  {string} sourcePath - location where the source repo resides
   *
   * @returns ILibraryDependencies
   */
  public static getDependencies(sourcePath: string): ILibraryDependencies {
    // get the dependencies
    let libDeps: any = require(sourcePath + '/package.json').dependencies;

    // create new dep object & export
    let dependencies: ILibraryDependencies = {
      angularLib: libDeps.angular,
      officeUiFabricLib: libDeps['office-ui-fabric']
    };

    return dependencies;
  }

}
