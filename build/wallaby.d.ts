declare module 'wallaby' {
  namespace wallaby {
    /**
     * Wallaby configuration settings.
     *
     * @typedef WallabyConfig
     * @type {Object}
     *
     * @property {Object=}     compilers - File patterns as keys and compiler functions as values.
     * @property {boolean=}    debug - Flag if debug messages written to Wallaby console (default=false).
     * @prooperty {IWallabyEnvironment=} env - Specify a different test runner or change the runner settings.
     * @property {string[] | IWallabyFilePattern[]}   files - Specifies an array of source files or file name patterns to copy to the local cache.
     * @property {Function=}  postprocessor - Function that runs for every batch of file changes after all compilers and preprocessors.
     * @property {string=}  testFramework - Specifies the name and version of the testing framework you are using for your tests.
     * @property {string[] | IWallabyFilePattern[]}   tests - Specifies an array of test files or test file name patterns to copy to the local cache..
     * @property {IWallabyWorkers=} workers - Degree of parallelism used to run your tests and controls the way wallaby re-uses workers.
     *
     * @see {@link https://wallabyjs.com/docs/config/overview.html} for details.
     */
    interface IWallabyConfig {
      comilers?: any;
      debug?: boolean;
      env?: IWallabyEnvironment;
      files: string[] | IWallabyFilePattern[];
      postprocessor: any;
      testFramework?: string;
      tests: string[] | IWallabyFilePattern[];
      workers?: IWallabyWorkers;
    }

    /**
     * Wallaby file pattern.
     *
     * @typedef WallabyFilePattern
     * @type {Object}
     *
     * @property {string}   pattern - File name or file pattern.
     * @property {boolean=}   ignore - Used to completely exclude the file from Wallaby (default=false).
     * @property {boolean=}   instrument - Determines if file is instrumented (default=true).
     * @property {boolean=}   load - Determines if the file is loaded to sandbox HTML via script tag .(default=true).
     *
     * @see {@link https://wallabyjs.com/docs/config/files.html} for details.
     */
    interface IWallabyFilePattern {
      pattern: string;
      ignore?: boolean;
      instrument?: boolean;
      load?: boolean;
    }

    /**
     * Wallaby environment configuration.
     *
     * @typedef WallabyEnvironment
     * @type {object}
     *
     * @property  {IWallabyEnvironmentParameters=}  params - set parameters on environment.
     * @property  {string=}  runner - Path of local Node / PhantomJs / Electron.
     * @property  {string=}  type - Specify a different test runner or change the runner settings.
     *
     * @see {@link https://wallabyjs.com/docs/config/runner.html} for details.
     */
    interface IWallabyEnvironment {
      params?: IWallabyEnvironmentParameters;
      runner?: string;
      type?: string;
    }

    /**
     * Wallaby environment parameters.
     *
     * @typedef WallabyEnvironmentParameters
     * @type {object}
     *
     * @property  {string=}  env - Semicolon-separated spawed runner process env variables.
     * @property  {string=}  runner - Space-separated spawed runner process flags.
     *
     * @see {@link https://wallabyjs.com/docs/config/runner.html} for details.
     */
    interface IWallabyEnvironmentParameters {
      env?: string;
      runner?: string;
    }

    /**
     * Wallaby worker configuration.
     *
     * @typedef WallabyWorkers
     * @type {object}
     *
     * @property  {boolean=}  recycle - Specifies the degree of parallelism used to run your tests and
     *                                  controls the way wallaby re-uses workers.
     *
     * @see {@link https://wallabyjs.com/docs/config/workers.html} for details.
     */
    interface IWallabyWorkers {
      recycle?: boolean;
    }

  }
  export = wallaby;
}
