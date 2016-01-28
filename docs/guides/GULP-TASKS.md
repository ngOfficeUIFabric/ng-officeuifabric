# Gulp Tasks

This page describes the tasks, aliases & command line switches you can use within the project for various tasks.

- [About Gulp Tasks](#about-gulp-tasks)
- [Common Task Arguments (options)](#common-task-arguments-options)
- [Task List](#task-list)

## About Gulp Tasks

Gulp us used as the task runner utility for this project. It can run tests, transpile code, vet code for style & convention adherence and build releases. Each tasks is written in TypeScript and dynamically loaded when you execute Gulp.

Therefore you must first transpile all TypeScript to JavaScript (as Gulp only understands JavaScript):

```bash
$ tsc -p ./
```

To get a list of all available tasks, simply run `gulp`.

```bash
$ gulp
```

This causes gulp to dynamically load all tasks specified in `/build/gulp/tasks`. Gulp is actually replaced by the NPM module **[gulp-help](https://npmjs.com/package/gulp-help)** which makes it easy to write self documenting tasks & automatic help output to the console. Each of the tasks in the files found within `/build/gulp/tasks` emits details to **gulp-help** in addition to the task logic.

All configuration information for the build tasks is found within the `/build/config.ts` file.

## Common Task Arguments (options)

Many of the tasks accept optional command line arguments to configure how they run. Each optional argument is included in the output when you run gulp with the `default`, `help` or no specified task:

```bash
$ gulp
[18:38:45] Using gulpfile ~/repos/ac-ng-officeuifabric/gulpfile.js
[18:38:45] Starting 'help'...

Usage
  gulp [TASK] [OPTIONS...]

Available tasks
  vet-ts              Run code quality & style analysis on all TypeScript
   --verbose          Output all TypeScript files being vetted
```

The most common one is `--verbose`. Depending on the task, this will usually output additional details when the task runs. For instance when you run the task `vet-ts` which checks all TypeScript for code quality and conventions, it writes each TypeScript file as it's checked to the console.

## Task List

### `gulp build-lib`

This task uses [webpack](http://webpack.github.io/) to transpile all TypeScript files and then create a webpack bundle.

By default, it creates a minified file with no comments or source maps. If the `--dev` argument is supplied, an un-minified bundle with an inline sourcemap is provided. These files are saved to the folder `/dist` as defined in `/build/config.ts`.

The contents of the transpiled `/src/core/core.ts` is the first file added to the project.

All comments, including sourcemaps, are stripped from these generated library files.

The version number for the file (and what's added in the comment banner within each file) is pulled dynamically from the `package.json` file in the repo. However the version can be manually set using the `--version` argument when running the task.

```bash
$ gulp build-lib
$ gulp build-lib --verbose
$ gulp build-lib --verbose --version=1.2.3
```
### `gulp watch`

If you want automatically run vet, test and build on file save, use this task.

By default, it setups watchers on typescript source files (`src/**/*.ts`), test files (`src/**/*.spec.ts`) and build files (`gulpfile.ts, build/**/*.ts`).

When saving a source or spec file, it will run `vet`, `test` and `build-lib` tasks in a sequence. Errors (if any) will be reported under the console.

When saving build file, only typescript transpilation and vetting will be run.

`gulp watch` supports all common params which are used by other tasks (`debug`, `specs`, `verbose`, `version`, `dev`).

### `gulp clean`

Runs the two tasks `clean-build` & `clean-lib` tasks.

> **NOTE**: After running this task, be aware that no build tasks will work because you have deleted all the JavaScript gulp related files. Therefore you will need to re-transpile your TypeScript: `tsc -p ./`

### `gulp clean-build`

Deletes all generated JavaScript files used in building the project, except those defined in `BuildConfig.BUILD_KEEP_JS` as defined in `/config/build.ts`.

> **NOTE**: After running this task, be aware that no build tasks will work because you have deleted all the JavaScript gulp related files. Therefore you will need to re-transpile your TypeScript: `tsc -p ./`

### `gulp clean-lib`

Deletes all generated JavaScript files for the Angular directives, except those defined in `BuildConfig.LIB_KEEP_JS` as defined in `/config/build.ts`.

### `gulp test`

Runs all unit tests defined in the `/src/components/**/*.spec.ts` files using the karma test runner. The Karma configuration is defined in `/config/karma.ts` file.

If you specify the argument `--specs` the tests (and their results) will be written to the console as they are run. By default the *progress* reporter is used which just summarizes the results and writes out any failing tests.

If you specify the argument `--watch` it will setup watchers and open Chrome for debugging.

Karma also runs *Istanbul* for generation of a code coverage report.

### `gulp browser-sync`
This task used for automatic browser refresh when you change something under demo folder.

Runs [browser-sync](https://github.com/BrowserSync/browser-sync) in a static mode with default port of 3000. After run it opens browser window with url pointed to `http://localhost:3000/`. After that you need to open your demo by using mentioned url, such as `http://localhost:3000/src/components/icon/demo/index.html`, you will see a message at the top right corner `Connected to BrowserSync`. Now you can write you demo, save your assets (css, js, ts) and browser will be automatically refreshed.

### `gulp transpile-ts`

Uses the TypeScript compiler to transpile all TypeScript in the project to JavaScript, including sourcemaps at the end of each file.

### `gulp vet`

Vets all code by running tasks `vet-build-ts` & `vet-lib-ts`.

### `gulp vet-build-ts`

Runs [tslint](https://www.npmjs.com/package/tslint) against all using the rules defined in `/ngofficeuifabric/ng-officeuifabric/blob/master/tslint.json` against all TypeScript build-related files.

### `gulp vet-lib-ts`

Runs [tslint](https://www.npmjs.com/package/tslint) against all using the rules defined in `/ngofficeuifabric/ng-officeuifabric/blob/master/tslint.json` against all TypeScript library-related files.