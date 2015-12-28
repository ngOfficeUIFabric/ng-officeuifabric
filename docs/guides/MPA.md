- [Install Dependencies](#install-dependencies)
  - [Node.js & NPM](#nodejs--npm)
  - [Global NPM Packages](#global-npm-packages)
- [Clone the Repository](#clone-the-repository)
- [Install all NPM Packages](#install-all-npm-packages)
- [Transpile the TypeScript for Building](#transpile-the-typescript)
- [List All Gulp Tasks](#list-all-gulp-tasks)
- [Execute All Unit Tests](#execute-all-unit-tests)
- [View Code Coverage Reports](#view-code-coverage-reports)

This page will help you get up to speed as quickly as possible. You will learn how to get a copy of the repository, install the few dependencies required by the project, compile, run tests and check code coverage for the project. 

## Install Dependencies

This project has a few minimal dependencies that must be installed on your developer workstation in order to build and contribute to the project.

### Node.js & NPM

Node.js is used for building & testing the project. Install either the latest stable version of Node.js or the long-term support (LTS) version on your machine from https://nodejs.org.

> **NOTE**: The project has been tested with the 4.2.x LTS version & 5.x stable version. 

> **NOTE**: You can also use Node Version Manager (NVM) to install Node.js if you wish. NVM enables you to have multiple versions of Node.js installed on your machine and switch between them for testing on different versions. This is entirely optional: 
>  - OSX: [nvm](https://github.com/creationix/nvm)
>  - Windows: [nvm-windows](https://github.com/coreybutler/nvm-windows)

Installation of Node.js includes NPM, the package manager for Node.js.

### Global NPM Packages

Many parts of the project are implemented using TypeScript, but more importantly the build process is written in TypeScript. As such, you need to install two NPM packages globally:

- [typescript](https://npmjs.com/package/typescript): main TypeScript compiler
- [tsd](https://npmjs.com/package/tsd): TypeScript type definition manager for DefinatelyTyped [DefinatelyTyped](http://definitelytyped.org/)

```bash
$ npm install -g typescript tsd
```

## Clone the Repository

You need the code, so clone it locally:

```bash
$ git clone https://github.com/ngOfficeUIFabric/ng-officeuifabric.git ng-officeuifabric
```

## Install all NPM Packages

Once you have the codebase, you need to install the NPM packages the repository depends on. Run the following command to download & install all the packages to the local cloned repo:

```bash
$ npm install
```

## Transpile the TypeScript

[Gulp](http://gulpjs.com) is used to automate entire build & test process. All Gulp tasks are written in TypeScript. Because Node.js will not execute TypeScript, you first need to compile the TypeScript to JavaScript. 

You can see this if you try to get a list of all the gulp tasks after cloning the repository... immediately after running gulp, you will get a strange error about not being able to find modules or files:

```bash
$ gulp

module.js:339
    throw err;
    ^

Error: Cannot find module './build/gulp/config'
    at Function.Module._resolveFilename (module.js:337:15)
    at Function.Module._load (module.js:287:25)
    at Module.require (module.js:366:17)
    at require (module.js:385:17)
    at Object.<anonymous> (/Users/ac/Dev/Scratch/ng-officeuifabric/gulpfile.js:3:16)
    at Module._compile (module.js:425:26)
    at Object.Module._extensions..js (module.js:432:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:311:12)
    at Module.require (module.js:366:17)
```

To fix this, you need to transpile the TypeScript to JavaScript. This is a one-time requirement and is not necessary to do this again unless:
- you update the build process such as changing or adding Gulp tasks
- you purge all JavaScript transpiled from TypeScript

First, download all the TypeScript type definitions:

```bash
$ tsd install -r -o --save-dev
```

> **NOTE**: This is also provided as an NPM script... you could just run `npm run-script dev-install` which will run the above command.

Then transpile all the TypeScript to JavaScript. The following command will run the TypeScript compiler, `tsc`, telling it to treat the folder (`./`) as a project (`-p`) by looking at the `tsconfig.json` file in the root fo the folder:

```bash
$ tsc -p ./
```

> **NOTE**: If you get an error running this command, look at the version of `tsc` you are running. If it isn't at least v1.7, you aren't running the most current version. This commonly happens on Windows as the `PATH` environment variable is likely set to use an order version of the TypeScript compiler. You can check this by inspecting the `PATH` variable by executing `echo %PATH%` on the command line. Notice it points to a version other than v1.7. To fix this, change the `path` environment variable to point to the correct version. 
>
> This article explains the issue in more depth: [Which Version of TypeScript is Installed...](http://www.allenconway.net/2015/07/which-version-of-typescript-is.html)

Now you can run gulp:

## List All Gulp Tasks

```bash
$ gulp

[07:10:23] Using gulpfile ~/Dev/Scratch/ng-officeuifabric/gulpfile.js
[07:10:23] Starting 'help'...

Usage
  gulp [TASK] [OPTIONS...]

Available tasks
  build-ts            Builds all TypeScript as JavaScript Aliases: b
   --verbose          Output all TypeScript files being built
  clean               Removes all built files Aliases: c [clean-app-ts, clean-build-ts]
   --verbose          Output all files being removed
  clean-app-ts        Removes all generated JavaScript from TypeScript used in the app
   --verbose          Output all TypeScript files being removed
  clean-build-ts      Removes all generated JavaScript from TypeScript used in the build
   --verbose          Output all TypeScript files being removed
  help                Display this help text.
  test                Executes all tests against the directives Aliases: t, T
   --verbose          Output all directives being tested
  vet                 Vets all built files Aliases: v, V [vet-ts]
   --verbose          Output all TypeScript files being vetted
  vet-ts              Run code quality & style analysis on all TypeScript
   --verbose          Output all TypeScript files being vetted

[07:10:23] Finished 'help' after 1.56 ms
[07:10:23] Starting 'default'...
[07:10:23] Finished 'default' after 4.61 μs
```

## Execute All Unit Tests

To execute all unit tests using Karma with the headless browser PhantomJS on the project, execute the following command:

```bash
$ gulp 

[07:11:14] Using gulpfile ~/Dev/Scratch/ng-officeuifabric/gulpfile.js
[07:11:14] Starting 'test'...
[07:11:14] Testing code with Karma
28 12 2015 07:11:14.673:INFO [karma]: Karma v0.13.16 server started at http://localhost:5793/
28 12 2015 07:11:14.683:INFO [launcher]: Starting browser PhantomJS
28 12 2015 07:11:15.746:INFO [PhantomJS 1.9.8 (Mac OS X 0.0.0)]: Connected on socket ctT9RymieRGTnkMoAAAA with id 91363192
PhantomJS 1.9.8 (Mac OS X 0.0.0): Executed 6 of 6 SUCCESS (0.004 secs / 0.05 secs)
[07:11:15] Karma test run completed
[07:11:15] Finished 'test' after 1.7 s
```

## View Code Coverage Reports

Karma always generates a code coverage report showing the percentages & lines of code that were covered by unit tests. To view the report, locate the following file and open it in the browser:

```
ng-officeuifabric/coverage/PhantomJS 1.9.8 (Mac OS X 0.0.0)/lcov-report/index.html
```

**TADA!!! Minimal Path to Awesome!**