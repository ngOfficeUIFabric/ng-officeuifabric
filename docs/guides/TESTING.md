# Testing the Library

This describes the guidelines developer should follow to run & create tests.

- All code must have valid, **passing** unit tests
- All code should have 100% test coverage or good reasons why it doesn't meet 100% coverage 

## Testing Overview

- [Jasmine](http://jasmine.github.io/) is used as the test framework for this project.
- [Karma](http://karma-runner.github.io) is used as the test runner for all Angular unit tests.
- [Protractor](https://angular.github.io/protractor/#/) is used for as the test runner for all Angular end-to-end (E2E) tests. 

Run all tests using the provided gulp task **test**:

```shell
$ gulp test
```

This includes two Karma reporters: 
 - **progress**: This writes a summary of the test results & details for any failing tests.
 - **coverage**. This is used to create the code coverage reports with Istanbul.

To view each test that's run, use the `--specs` argument:

```shell
$ gulp test --specs
```

This will replace the **progress** reporter with the **spec** reporter and write each test & outcome to the console.

## Test Validation

When PR's are submitted, all tests must pass before they will be reviewed. This is done automatically using [Travis CI](https://travis-ci.org). Once a PR is submitted, Travis kicks in and automatically runs all tests for the specified platforms. If there are any failures, you should address them and commit changes to your PR until your tests pass.

## Code Coverage

Any new or changed code should be adequately covered by unit tests. Like tests this is run automatically when a PR is submitted using [Coveralls](https://coveralls.io/). Any PR's that lower the code coverage % with new code submission will be scrutinized before being merged. Depending on the reason for the drop in code coverage %, the PR may be rejected or the submitter may be requested to address it with more tests.

Coverage reports are also generated every time tests are run locally. To view a code coverage report, after running tests, open the code coverage report found in `/coverage/lcov-report/index.html` in a browser.