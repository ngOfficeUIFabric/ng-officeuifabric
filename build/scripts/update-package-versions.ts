// updates the package.json & bower.json in the ngOfficeUiFabric packaging
// repo (package-ngofficeuifabric) to have the same version & dependencies
// that are specified in the main source repo's (ng-officeuifabric)
// package.json file
//
// two parameters are expected:
// --src = location of the cloned source repo (ng-officeuifabric)
// --pkg = location of the cloned package repo (ngofficeuifabric)

import { ScriptUtils, ILibraryDependencies } from './ScriptUtils';
import * as fs from 'fs';
import * as yargs from 'yargs';

let argKeys: any = {
  pkg: 'pkg',
  src: 'src'
};

// verify required params passed in
if (!yargs.argv[argKeys.src] || !yargs.argv[argKeys.pkg]) {
  console.error('must specify the path to \'--src\' & \'--pkg\'');
  process.exit();
}

// get library version & dependencies
let libraryVersion: string = ScriptUtils.getLibraryVersion(yargs.argv[argKeys.src]);
let deps: ILibraryDependencies = ScriptUtils.getDependencies(yargs.argv[argKeys.src]);

// update bower
let bowerManifest: any = require(yargs.argv[argKeys.pkg] + '/bower.json');
bowerManifest.version = libraryVersion;
bowerManifest.dependencies = {
  'angular': deps.angularLib,
  'office-ui-fabric': deps.officeUiFabricLib
};
// write bower file back
fs.writeFileSync(yargs.argv[argKeys.pkg] + '/bower.json', JSON.stringify(bowerManifest, null, 2));


// update package
let packageManifest: any = require(yargs.argv[argKeys.pkg] + '/package.json');
packageManifest.version = libraryVersion;
packageManifest.dependencies = {
  'angular': deps.angularLib,
  'office-ui-fabric': deps.officeUiFabricLib
};
// write bower file back
fs.writeFileSync(yargs.argv[argKeys.pkg] + '/package.json', JSON.stringify(packageManifest, null, 2));
