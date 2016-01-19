# Setup Developer Machine

The **[Minimal Path To Awesome](MPA.md)** walks through this process in a much more detailed way; this document is the shortened version for those familiar with Node.js based development.

1. Install **[Node.js](https://nodejs.org)**
1. Install global Node.js dependencies:

  ```bash
  $ npm install -g typescript tsd
  ```

1. Clone the repo
1. Install all project-specific dependencies:

  ```bash
  $ npm install
  ```
1. Download all TypeScript type definitions:

  ```bash
  $ tsd install -r -o --save-dev
  ```
1. Transpile all TypeScript

  ```bash
  $ tsc -p ./
  ```

  > **NOTE**: This is required as all gulp tasks are written in TypeScript.
  
  > **NOTE**: If you have an issue with this step, refer to the additional information on this step on the **[Minimal Path To Awesome](MPA.md)** guide.

At this point you are good to go and can run the gulp tasks.

## Setting Up Continuous Builds

We use TravisCI for continuous builds of the library. All PR's and pushes to `master` & `dev` are run through this process. We strongly recommend you enable TravisCI on your forked repo to test before submitting your PR. If the TravisCI build fails for you, it will fail for us (and vice versa). If it fails, we will reject your PR so please test your work first!

### GITHUB API: GitHub Rate Limit Exceeded

Because we are using TypeScript type definitions from https://definitelytyped.org, [the build is configured to download all type definitions](https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/.travis.yml#L20-L21) using the **tsd** utility which uses the Github API to download TypeScript type definitions. The challenge with this is that Github's API limits the number of anonymous API requests to 60/hour. If you exceed this number, TSD will throw an error and break the build with the message *GitHub rate limit exceeded* which [you can easily see in the build logs](https://travis-ci.org/ngOfficeUIFabric/ng-officeuifabric#L1542-L1547).

The fix is to [set an environment variable that contains a GitHub API token](https://github.com/DefinitelyTyped/tsd#tsdrc) that's tied to your account to bump this limit up to 5,000 API calls. However this [does not apply to pull requests](https://docs.travis-ci.com/user/pull-requests). TravisCI does not include secured environment variables in builds triggered by pull requests.

