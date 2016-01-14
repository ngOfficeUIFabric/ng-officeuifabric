# Setup Developer Machine

The **[Minimal Path To Awesome](https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/docs/guides/MPA.md)** walks through this process in a much more detailed way; this document is the shortened version for those familiar with Node.js based development.

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
  
  > **NOTE**: If you have an issue with this step, refer to the additional information on this step on the **[Minimal Path To Awesome](/ngofficeuifabric/ng-officeuifabric/blob/master/docs/guides/MPA.md)** guide.

At this point you are good to go and can run the gulp tasks.