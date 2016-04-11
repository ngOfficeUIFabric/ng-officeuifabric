// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/typed-typings/npm-through2/2b1d39490ad8530546d97babee8cfaaabed9e0cd/index.d.ts
declare module 'through2/index' {
// Type definitions for through2 v 2.0.0
// Project: https://github.com/rvagg/through2
// Original Definitions by: Bart van der Schoor <https://github.com/Bartvds>, jedmao <https://github.com/jedmao>, Georgios Valotasios <https://github.com/valotas>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

import stream = require('stream');

type TransformCallback = (err?: any, data?: any) => void;
type TransformFunction = (chunk: any, encoding: string, callback: TransformCallback) => void;
type FlushCallback = (flushCallback: () => void) => void;

function through2(transformFunction?: TransformFunction, flushFunction?: FlushCallback): NodeJS.ReadWriteStream;
function through2(options?: stream.DuplexOptions, transformFunction?: TransformFunction, flushFunction?: FlushCallback): NodeJS.ReadWriteStream;

namespace through2 {
  export function ctor(options?: stream.DuplexOptions, transformFunction?: TransformFunction, flushFunction?: FlushCallback): NodeJS.ReadWriteStream;
  export function obj(transformFunction?: TransformFunction, flushFunction?: FlushCallback): NodeJS.ReadWriteStream;

  /**
   * Type of `this` inside TransformFunction and FlushCallback.
   */
  export interface This {
    push(data: any): void;
  }
}

export = through2;
}
declare module 'through2' {
import main = require('through2/index');
export = main;
}