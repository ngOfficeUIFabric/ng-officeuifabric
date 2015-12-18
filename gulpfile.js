'use strict';
var fs = require('fs');
var config_1 = require('./build/gulp/config');
var gulp = require('gulp-help')(require('gulp'));
fs.readdirSync(config_1.BuildConfig.GULP_TASKS)
    .filter(function (filename) {
    return filename.match(/\.js$/i);
})
    .map(function (filename) {
    return {
        GulpTask: require(config_1.BuildConfig.GULP_TASKS + '/' + filename).GulpTask,
        name: filename.substr(0, filename.length - 3)
    };
})
    .forEach(function (file) {
    gulp.task(file.name, file.GulpTask.description, file.GulpTask.dependencies, file.GulpTask, {
        aliases: file.GulpTask.aliases,
        options: file.GulpTask.options
    });
});
