'use strict';

var args = require('yargs').argv;
var spawn = require('child_process').spawn;
var chalk = require('chalk');
var path = require('path');

var config = require('./gulp.config.js');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

var cwd = process.cwd();

/**
 * yargs variables can be passed in to alter the behavior, when present.
 * Example: gulp vet
 *      or: gulp vet --verbose
 *
 * --verbose  : Various tasks will produce more output to the console.
 */

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

/**
 * Vets all JS for code style.
 */
gulp.task('vet', function(){
  log('Analyzing source with JSHint and JSCS');

  return gulp
    .src(config.allJs, {base: './'})
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jscs());
});

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
/*                         auto / watch tasks                                */
/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

/**
 * Watches for changes in scripts and auto-vets the JS with JSHint & JSCS.
 */
gulp.task('autovet', function(done){
  gulp.watch(['./.jscsrc', './.jshintrc', '**/*.js'], ['vet']);
});


/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
/*                            utility methods                                */
/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg){
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

/**
 * Handle errors by writing to the log, then emit an end event.
 */
function handleError(err){
  $.log(err.toString());
  this.emit('end'); // jshint ignore:line
}

module.exports = gulp;
