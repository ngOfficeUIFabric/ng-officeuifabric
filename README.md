# [Angular](https://angularjs.org) directives specific to the [Office UI Fabric](https://github.com/OfficeDev/office-ui-fabric).

[![npm version](https://badge.fury.io/js/ng-office-ui-fabric.svg)](https://badge.fury.io/js/ng-office-ui-fabric)
[![bower version](https://badge.fury.io/bo/ng-office-ui-fabric.svg)](https://github.com/ngOfficeUIFabric/package-ngofficeuifabric)
[![NuGet version](https://badge.fury.io/nu/ng-office-ui-fabric.svg)](https://badge.fury.io/nu/ng-office-ui-fabric)

[![MIT license](https://img.shields.io/npm/l/express.svg)](https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/LICENSE)
[![Slack Network](http://ngofficeuifabric-slackin.azurewebsites.net/badge.svg)](http://ngofficeuifabric-slackin.azurewebsites.net/)
[![devDependency Status](https://david-dm.org/ngOfficeUIFabric/ng-officeuifabric/dev-status.svg)](https://david-dm.org/ngOfficeUIFabric/ng-officeuifabric#info=devDependencies)

### Branch Status:
master | dev
:------: | :---:
[![Build Status](https://travis-ci.org/ngOfficeUIFabric/ng-officeuifabric.svg?branch=master)](https://travis-ci.org/ngOfficeUIFabric/ng-officeuifabric?branch=master) | [![Build Status](https://travis-ci.org/ngOfficeUIFabric/ng-officeuifabric.svg?branch=dev)](https://travis-ci.org/ngOfficeUIFabric/ng-officeuifabric?branch=dev)
[![Coverage Status](https://coveralls.io/repos/ngOfficeUIFabric/ng-officeuifabric/badge.svg?branch=master&service=github)](https://coveralls.io/github/ngOfficeUIFabric/ng-officeuifabric?branch=master) | [![Coverage Status](https://coveralls.io/repos/ngOfficeUIFabric/ng-officeuifabric/badge.svg?branch=dev&service=github)](https://coveralls.io/github/ngOfficeUIFabric/ng-officeuifabric?branch=dev)

This project, **ng-OfficeUIFabric**, is a community effort to build the [Office UI Fabric](http://dev.office.com/fabric) components as a suite of Angular 1.x directives to make it easier to use in Angular-based applications. **ngOfficeUIFabric** is modeled after the Google sponsored project [Angular Material](https://material.angularjs.org).

**Dive Right In!**

Want to see things working right away? Check out our **[Minimal Path to Awesome](https://github.com/ngOfficeUIFabric/ng-officeuifabric/tree/master/docs/guides/MPA.md)** doc! Using it you'll clone the repo locally, install all the dependencies, run tests, see code coverage reports, build the library & see a working directive demo!

Basic installation & usage information is found on this page... additional docs are in the [docs guides](https://github.com/ngOfficeUIFabric/ng-officeuifabric/tree/master/docs/guides). 

- [Installation](#installation)
- [Support](#support)
  - [Supported Browsers](#supported-browsers)
  - [Need Help?](#need-help)
  - [Found a Bug?](#think-you-found-a-bug)
- [Contributing to the Project](#contributing-to-the-project)

# Installation

Other than manually downloading the library, **ng-OfficeUIFabric** will be available in the following options. Then you just need to add references to the Angular JS, ngOfficeUiFabric JS & and Office UI Fabric CSS libraries and import the ngOfficeUiFabric modules and you're good to go. Check the [package-ngofficeuifabric](https://github.com/ngOfficeUIFabric/package-ngofficeuifabric/blob/master/README.md) for simple usage info.

## Bower

Install the library (which should also download the [Angular](http://bower.io/search/?q=angular) & [office-ui-fabric](http://bower.io/search/?q=office-ui-fabric) libraries as they are configured as dependencies:

```shell
bower install ng-office-ui-fabric --save
```

## NPM

Install the library (which should also download the [Angular](https://www.npmjs.com/package/angular) & [office-ui-fabric](https://www.npmjs.com/package/office-ui-fabric) libraries as they are configured as dependencies:

```shell
npm install ng-office-ui-fabric --save
```

## NuGet

Install the library (which should also download the [AngularJS.Core](https://www.nuget.org/packages/ng-office-ui-fabric) & [OfficeUiFabric](https://www.nuget.org/packages/OfficeUIFabric/) libraries as they are configured as dependencies.

```shell 
Install-Package ng-office-ui-fabric
```

## Direct Download

You can also directly download the built library if you wish. Grab either the unminified `ngOfficeUiFabric.js` or minified `ngOfficeUiFabric.min.js` from the [package-ngofficeuifabric](https://github.com/ngOfficeUIFabric/package-ngofficeuifabric) repo. You will need to also grab copies of [Angular 1.4.*](https://angularjs.org/) and [Office UI Fabric](http://dev.office.com/fabric/getting-started) (*you only need the CSS from Office UI Fabric*). If you install from Bower, NPM or NuGet, the dependencies are pulled in for you.

## CDN

What, no CDN option yet? We need your help! Star this repo because we need at least 100 stars so we can submit to CDNJS!

# Support

## Supported Browsers

All directives in ng-OfficeUIFabric will work against the same versions that are commonly supported between the [Office UI Fabric](http://dev.office.com/fabric/resources-and-faq) & [Anuglar 1.x](https://docs.angularjs.org/guide/ie).

- Google Chrome
- Firefox
- Internet Explorer (IE9+)
- Edge
- Safari

## Need Help?

Jump into the [ngOfficeUIFabric Slack team](http://ngofficeuifabric.slack.com) to join the discussion... if you aren't a member [request an invite](http://ngofficeuifabric-slackin.azurewebsites.net).

## Think You Found a Bug?

First check the [issues](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues) list to see if someone else has already found it and there's an ongoing discussion. If not, submit an [issue](https://github.com/ngOfficeUIFabric/ng-officeuifabric/issues) or jump in the .

# Contributing to the Project

We want help! Please take a look at the [Contribution Guide](CONTRIBUTING.md) for guidelines and jump in the Slack team to discuss how you can help: http://ngofficeuifabric.slack.com... if you aren't a member of the Slack team yet, [request an invite](http://ngofficeuifabric-slackin.azurewebsites.net).