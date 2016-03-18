// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/5e960679e6f9ae6ce905b1db0ad36fc189cd2eca/gulp-rename/gulp-rename.d.ts
// Type definitions for gulp-rename
// Project: https://github.com/hparra/gulp-rename
// Definitions by: Asana <https://asana.com>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare module "gulp-rename" {
    interface ParsedPath {
        dirname?: string;
        basename?: string;
        extname?: string;
    }

    interface Options extends ParsedPath {
        prefix?: string;
        suffix?: string;
    }

    function rename(name: string): NodeJS.ReadWriteStream;
    function rename(callback: (path: ParsedPath) => any): NodeJS.ReadWriteStream;
    function rename(opts: Options): NodeJS.ReadWriteStream;
    export = rename;
}