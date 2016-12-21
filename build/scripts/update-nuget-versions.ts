// updates the ng-office-ui-fabric.nuspec in the ngOfficeUiFabric nuget
// repo (nuget-ngofficeuifabric) to have the same version & dependencies
// that are specified in the main source repo's (ng-officeuifabric)
// package.json file
//
// two parameters are expected:
// --src = location of the cloned source repo (ng-officeuifabric)
// --pkg = location of the cloned package repo (nuget-ngofficeuifabric)

import { ScriptUtils, ILibraryDependencies } from './ScriptUtils';
import * as fs from 'fs';
import * as yargs from 'yargs';
import * as xmldom from 'xmldom';
let xpath: any = require('xpath');

let argKeys: any = {
  pkg: 'pkg',
  src: 'src'
};

// verify required params passed in
if (!yargs.argv[argKeys.src] || !yargs.argv[argKeys.pkg]) {
  console.error('must specify the path to \'--src\' & \'--pkg\'');
  process.exit();
}

// nuspec file
let nuspecFile: string = yargs.argv[argKeys.pkg] + '/src/ng-office-ui-fabric.nuspec';

// get library version & dependencies
let libraryVersion: string = ScriptUtils.getLibraryVersion(yargs.argv[argKeys.src]);
let deps: ILibraryDependencies = ScriptUtils.getDependencies(yargs.argv[argKeys.src]);

// load XML
let domParser: DOMParser = new xmldom.DOMParser();
let packageContents: string = fs.readFileSync(nuspecFile).toString();
let packageManifest: Document = domParser.parseFromString(packageContents, 'text/xml');
let query: any = xpath.useNamespaces({ nuget: 'http://schemas.microsoft.com/packaging/2011/08/nuspec.xsd' });

// update nuspec
//  update package version
let versionNode: Node = query('/nuget:package/nuget:metadata/nuget:version', packageManifest, true);
versionNode.textContent = libraryVersion;
//  update anuglar version
let angularVersionNode: any = query(
  '/nuget:package/nuget:metadata/nuget:dependencies/nuget:dependency[@id=\'AngularJS.Core\']',
  packageManifest,
  true);
angularVersionNode.setAttribute('version', deps.angularLib);
//  update fabric version
let fabricVersionNode: any = query(
  '/nuget:package/nuget:metadata/nuget:dependencies/nuget:dependency[@id=\'OfficeUIFabric\']',
  packageManifest,
  true);
fabricVersionNode.setAttribute('version', deps.officeUiFabricLib);

// save file changes
let domSerialzer: XMLSerializer = new xmldom.XMLSerializer();
fs.writeFileSync(yargs.argv[argKeys.pkg] + '/src/ng-office-ui-fabric.nuspec', domSerialzer.serializeToString(packageManifest));
