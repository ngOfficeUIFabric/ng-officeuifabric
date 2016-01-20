'use strict';
var fs = require('fs');
var build_1 = require('./config/build');
var gulp = require('gulp-help')(require('gulp'));
fs.readdirSync(build_1.BuildConfig.GULP_TASKS)
    .filter(function (filename) {
    return filename.match(/\.js$/i);
})
    .map(function (filename) {
    return {
        GulpTask: require(build_1.BuildConfig.GULP_TASKS + '/' + filename).GulpTask,
        name: filename.substr(0, filename.length - 3)
    };
})
    .forEach(function (file) {
    gulp.task(file.name, file.GulpTask.description, file.GulpTask.dependencies, file.GulpTask, {
        aliases: file.GulpTask.aliases,
        options: file.GulpTask.options
    });
});
