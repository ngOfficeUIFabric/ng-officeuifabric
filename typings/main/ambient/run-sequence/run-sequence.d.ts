// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/40c60850ad6c8175a62d5ab48c4e016ea5b3dffe/run-sequence/run-sequence.d.ts
// Type definitions for run-sequence
// Project: https://github.com/OverZealous/run-sequence
// Definitions by: Keita Kagurazaka <https://github.com/k-kagurazaka>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare module "run-sequence" {
    import gulp = require('gulp');

    interface IRunSequence {
        (...streams: (string | string[] | gulp.TaskCallback)[]): NodeJS.ReadWriteStream;

        use(gulp: gulp.Gulp): IRunSequence;
    }

    var _tmp: IRunSequence;
    export = _tmp;
}