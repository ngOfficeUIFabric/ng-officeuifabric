// updates the package.json & bower.json in the ngOfficeUiFabric packaging 
// repo (package-ngofficeuifabric) to have the same version & dependencies 
// that are specified in the main source repo's (ng-officeuifabric)
// package.json file
//
// two parameters are expected:
// --src = location of the cloned source repo (ng-officeuifabric)
// --pkg = location of the cloned package repo (ngofficeuifabric)

'use strict';

import * as fs from 'fs';
import * as yargs from 'yargs';

// verify required params passed in
if (!yargs.argv.src || !yargs.argv.pkg) {
  console.error('must specify the path to \'--src\' & \'--pkg\'');
  process.exit();
}

// get library version & dependencies
let libraryVersion: string = getLibraryVersion(yargs.argv.src);
let deps: ILibraryDependencies = getDependencies(yargs.argv.src);

// update bower
let bowerManifest: any = require(yargs.argv.pkg + '/bower.json');
bowerManifest.version = libraryVersion;
bowerManifest.dependencies = {
  'angular': deps.angularLib,
  'office-ui-fabric': deps.officeUiFabricLib
};
// write bower file back
fs.writeFileSync(yargs.argv.pkg + '/bower.json', JSON.stringify(bowerManifest, null, 2));


// update package
let packageManifest: any = require(yargs.argv.pkg + '/package.json');
packageManifest.version = libraryVersion;
packageManifest.dependencies = {
  'angular': deps.angularLib,
  'office-ui-fabric': deps.officeUiFabricLib
};
// write bower file back
fs.writeFileSync(yargs.argv.pkg + '/package.json', JSON.stringify(packageManifest, null, 2));


/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */


/**
 * Gets the version of the library from the package.json file unless
 * the version is specified as the enviroment variable VERSION.
 * 
 * @param  {string} sourcePath - location where the source repo resides
 *
 * @returns string
 */
function getLibraryVersion(sourcePath: string): string {
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
function getDependencies(sourcePath: string): ILibraryDependencies {
  // get the dependencies
  let libDeps: any = require(sourcePath + '/package.json').dependencies;

  // create new dep object & export
  let dependencies: ILibraryDependencies = {
    angularLib: libDeps.angular,
    officeUiFabricLib: libDeps['office-ui-fabric']
  };

  return dependencies;
}

/**
 * Library version dependencies this library has.
 * 
 * @typedef libraryDependencies
 * @type {Object}
 * @prop {string?}   angular        - Version of Angular required.
 * @prop {string?}   officeUiFabric - Version of the Office UI Fabric required.
 */
interface ILibraryDependencies {
  angularLib?: string;
  officeUiFabricLib?: string;
}
