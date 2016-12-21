import * as fs from 'fs';
import { BuildConfig } from './build/config/build';
let gulp: any = require('gulp-help')(require('gulp'));

/**
 * yargs variables can be passed in to alter the behavior, when present.
 * Example: gulp serve-dev
 *
 * --verbose  : Various tasks will produce more output to the console.
 */

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

// load all gulp tasks (located in ./build/gulp/tasks)
fs.readdirSync(BuildConfig.GULP_TASKS)
  .filter((filename: any) => {
    return filename.match(/\.js$/i);
  })
  .map((filename: string) => {
    return <IGulpTaskFile>{
      GulpTask: require(BuildConfig.GULP_TASKS + '/' + filename).GulpTask,
      name: filename.substr(0, filename.length - 3)
    };
  })
  .forEach((file: IGulpTaskFile) => {
    gulp.task(
      file.name,
      file.GulpTask.description,
      file.GulpTask.dependencies,
      file.GulpTask,
      {
        aliases: file.GulpTask.aliases,
        options: file.GulpTask.options
      }
    );
  });
