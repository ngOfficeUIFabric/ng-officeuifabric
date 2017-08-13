# [AngularJS (v1.x)](https://angularjs.org) directives specific to the [Office UI Fabric](https://github.com/OfficeDev/office-ui-fabric)

[![npm version](https://badge.fury.io/js/ng-office-ui-fabric.svg)](https://badge.fury.io/js/ng-office-ui-fabric)
[![bower version](https://badge.fury.io/bo/ng-office-ui-fabric.svg)](https://github.com/ngOfficeUIFabric/package-ngofficeuifabric)
[![NuGet version](https://badge.fury.io/nu/ng-office-ui-fabric.svg)](https://badge.fury.io/nu/ng-office-ui-fabric)

[![MIT license](https://img.shields.io/npm/l/express.svg)](https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/LICENSE)

[![bitHound Overall Score](https://www.bithound.io/github/ngOfficeUIFabric/ng-officeuifabric/badges/score.svg)](https://www.bithound.io/github/ngOfficeUIFabric/ng-officeuifabric)
[![bitHound Dependencies](https://www.bithound.io/github/ngOfficeUIFabric/ng-officeuifabric/badges/dependencies.svg)](https://www.bithound.io/github/ngOfficeUIFabric/ng-officeuifabric/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/ngOfficeUIFabric/ng-officeuifabric/badges/devDependencies.svg)](https://www.bithound.io/github/ngOfficeUIFabric/ng-officeuifabric/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/ngOfficeUIFabric/ng-officeuifabric/badges/code.svg)](https://www.bithound.io/github/ngOfficeUIFabric/ng-officeuifabric)

## Branch Status

master | dev
:------: | :---:
[![Circle CI](https://circleci.com/gh/ngOfficeUIFabric/ng-officeuifabric/tree/master.svg?style=svg)](https://circleci.com/gh/ngOfficeUIFabric/ng-officeuifabric/tree/master) | [![Circle CI](https://circleci.com/gh/ngOfficeUIFabric/ng-officeuifabric/tree/dev.svg?style=svg)](https://circleci.com/gh/ngOfficeUIFabric/ng-officeuifabric/tree/dev)
[![Coverage Status](https://coveralls.io/repos/ngOfficeUIFabric/ng-officeuifabric/badge.svg?branch=master&service=github)](https://coveralls.io/github/ngOfficeUIFabric/ng-officeuifabric?branch=master) | [![Coverage Status](https://coveralls.io/repos/ngOfficeUIFabric/ng-officeuifabric/badge.svg?branch=dev&service=github)](https://coveralls.io/github/ngOfficeUIFabric/ng-officeuifabric?branch=dev)

This project, **ng-OfficeUIFabric**, is a community effort to build the [Office UI Fabric](http://dev.office.com/fabric) components as a suite of AngularJS 1.6.x directives to make it easier to use in Angular-based applications.

> This library is intended to be used with AngularJS v1.6. It is not intended for Angular (*aka Angular 2 or Angular 4*). Please refer to issue #405 for a discussion on moving to future versions of Angular. At the moment, this repo is only focused on AngularJS but would like to move to Angular (ng2/ng4) as soon as this project is complete.

## See it running

We have a web site where you can see these directives running at [http://ngOfficeUiFabric.com](http://ngOfficeUiFabric.com). This is a great way to see what components are available and the ease of use for you as a developer.

## Dive Right In

Want to see things working right away? Check out our **[Minimal Path to Awesome](https://github.com/ngOfficeUIFabric/ng-officeuifabric/tree/master/docs/guides/MPA.md)** doc! Using it you'll clone the repo locally, install all the dependencies, run tests, see code coverage reports, build the library & see a working directive demo!

Basic installation & usage information is found on this page... more docs are in the [docs guides](https://github.com/ngOfficeUIFabric/ng-officeuifabric/tree/master/docs/guides).

- [Installation](#installation)
- [Support](#support)
  - [Supported Browsers](#supported-browsers)
  - [Need Help?](#need-help)
  - [Found a Bug?](#think-you-found-a-bug)
- [Contributing to the Project](#contributing-to-the-project)

## Installation

Other than manually downloading the library, **ng-OfficeUIFabric** will be available in the following options. Then you just need to add references to the AngularJS, ngOfficeUiFabric JS & and Office UI Fabric CSS libraries and import the ngOfficeUiFabric modules and you're good to go. Check the [package-ngofficeuifabric](https://github.com/ngOfficeUIFabric/package-ngofficeuifabric/blob/master/README.md) for simple usage info.

## Bower

Install the library (which should also download the [Angular](http://bower.io/search/?q=angular) & [office-ui-fabric](http://bower.io/search/?q=office-ui-fabric) dependent libraries:

```shell
bower install ng-office-ui-fabric --save
```

## NPM

Install the library (which should also download the [Angular](https://www.npmjs.com/package/angular) & [office-ui-fabric](https://www.npmjs.com/package/office-ui-fabric) dependent libraries:

```shell
npm install ng-office-ui-fabric --save
```

## NuGet

Install the library (which should also download the [AngularJS.Core](https://www.nuget.org/packages/ng-office-ui-fabric) & [OfficeUiFabric](https://www.nuget.org/packages/OfficeUIFabric/) dependent libraries.

```shell
Install-Package ng-office-ui-fabric
```

## Direct Download

You can also directly download the built library if you wish. Grab either the unminified `ngOfficeUiFabric.js` or minified `ngOfficeUiFabric.min.js` from the [package-ngofficeuifabric](https://github.com/ngOfficeUIFabric/package-ngofficeuifabric) repo. You will need to also grab copies of [Angular 1.4.*](https://angularjs.org/) and [Office UI Fabric](http://dev.office.com/fabric/getting-started) (*you only need the CSS from Office UI Fabric*). Installing from NPM, Bower or NuGet includes the dependencies.

## CDN

Hosting facilitated by [CDNJS](https://cdnjs.com), a community driven CDN. Simply add a reference in your page to the desired version available on CDNJS ([check this page for the correct CDN reference for the desired version](https://cdnjs.com/libraries/ngOfficeUiFabric)).

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/ngOfficeUiFabric/{{version}}/ngOfficeUiFabric.min.js"></script>
```

> **NOTE**: Be sure to use the most current version!

## Usage

To use the ngOfficeUIFabric in your project, you will need to add a reference to the Office UI Fabric's CSS files (*which the ngOfficeUIFabric takes a dependency on*) and the ngOfficeUIFabric library.

### Add Reference to Office UI Fabric MDL1 Core CSS

At the present time, use the MDL1 version of the Office UI Fabric Core CSS files. This is the 2.6.* branch of the library.

```html
<link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/2.6.3/css/fabric.min.css" />
<link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/2.6.3/css/fabric.components.min.css" />
```

> This assumes you are using the recommended Office UI Fabric CDN reference & not a local reference.

### Add Reference to ngOfficeUIFabric LIbrary

We recommend using the CDN option when including the ngOfficeUIFabric in your projects:

```html
<!-- add AngularJS... make sure to update for the desired version -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/{{VERSION}}/angular.min.js"></script>
<!-- add ngOfficeUIFabric... make sure to update for the desired version -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ngOfficeUiFabric/{{VERSION}}/ngOfficeUiFabric.min.js"></script>
```

## Support

### Supported Browsers

All directives in ng-OfficeUIFabric will work against the same versions that are commonly supported between the [Office UI Fabric](http://dev.office.com/fabric/resources-and-faq) & [AngularJS 1.6.x](https://docs.angularjs.org/guide/ie).

- Google Chrome
- Firefox
- Internet Explorer (IE9+)
- Edge
- Safari

### Think You Found a Bug

First check the [issues](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues) list to see if someone else has already found it and there's an ongoing discussion. If not, create an [issue](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues) or jump in the .

## Contributing to the Project

We want help! Please take a look at the [Contribution Guide](https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/.github/CONTRIBUTING.md) for guidance.
