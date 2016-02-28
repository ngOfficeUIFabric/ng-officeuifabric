// updates the package.json & bower.json in the ngOfficeUiFabric packaging
// repo (package-ngofficeuifabric) to have the same version & dependencies
// that are specified in the main source repo's (ng-officeuifabric)
// package.json file
//
// two parameters are expected:
// --src = location of the cloned source repo (ng-officeuifabric)
// --pkg = location of the cloned package repo (ngofficeuifabric)

'use strict';

import {ScriptUtils, ILibraryDependencies} from './ScriptUtils';
import * as fs from 'fs';
import * as yargs from 'yargs';

// verify required params passed in
if (!yargs.argv.src || !yargs.argv.pkg) {
  console.error('must specify the path to \'--src\' & \'--pkg\'');
  process.exit();
}

// get library version & dependencies
let libraryVersion: string = ScriptUtils.getLibraryVersion(yargs.argv.src);
let deps: ILibraryDependencies = ScriptUtils.getDependencies(yargs.argv.src);

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
