# Setup Developer Machine

The **[Minimal Path To Awesome](MPA.md)** walks through this process in a much more detailed way; this document is the shortened version for those familiar with Node.js based development.

1. Install **[Node.js](https://nodejs.org)**
1. Install global Node.js dependencies:

  ```bash
  $ npm install -g typescript
  ```

1. Clone the repo
1. Install all project-specific dependencies:

  ```bash
  $ npm install
  ```

1. Transpile all TypeScript

  ```bash
  $ tsc -p ./
  ```

  > **NOTE**: This is required as all gulp tasks are written in TypeScript.
  
  > **NOTE**: If you have an issue with this step, refer to the additional information on this step on the **[Minimal Path To Awesome](MPA.md)** guide.

At this point you are good to go and can run the gulp tasks.

## Setting Up Continuous Builds

We use CircleCI for continuous builds of the library. All PR's and pushes to `master` & `dev` are run through this process. We strongly recommend you enable CircleCI on your forked repo to test before submitting your PR. If the CircleCI build fails for you, it will fail for us (and vice versa). If it fails, we will reject your PR so please test your work first!
