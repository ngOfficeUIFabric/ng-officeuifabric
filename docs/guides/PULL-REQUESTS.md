# Submitting Pull Requests

Before you submit your pull request consider the following guidelines:

- Search [GitHub](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pulls) for an open or closed Pull Request
  that relates to your submission. You don't want to duplicate effort.
- Make your changes in a new git branch:

  ```bash
  git checkout -b my-fix-branch master
  ```

- Be familiar with and adhere to things stated in:
  - [CONTRIBUTING](https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/CONTRIBUTING.md)
  - [CONTRIB-WORKFLOW](CONTRIB-WORKFLOW.md)
  - [CODING](CODING.md)
  - [TESTING](TESTING.md)
- **Include appropriate test cases.**
- Ensure your fork is updated and not behind the upstream **ngofficeuifabric** repo. Refer to these resources for more information on syncing your repo:
    - [GitHub Help: Syncing a Fork](https://help.github.com/articles/syncing-a-fork/)    
    - [AC: Keep Your Forked Git Repo Updated with Changes from the Original Upstream Repo](http://www.andrewconnell.com/blog/keep-your-forked-git-repo-updated-with-changes-from-the-original-upstream-repo)
  
- Push your branch to GitHub:

  ```bash
  git push origin my-fix-branch
  ```

## Before You Submit Your Pull Request

Please do the following checks on your code before you submit a pull request. They do all these same checks manually and if any fail, your PR will be rejected and you will be prompted to address the issues.

> NOTE: these are all done automatically using [TravisCI](https://travis-ci.org) as defined in the `.travis.yml` file in the root of the repo.

- Run the full ngOfficeUIFabric test suite, as described in the [TESTING](TESTING.md), and ensure that all tests pass.
- Run the code vetting script `$ gulp vet-lib-ts` to verify you are meeting all required code style requirements.
- Check the code coverage report generated when running tests to ensure you do not cause the coverage percentage to fall as described in [TESTING](TESTING.md#code-coverage)

Please correct any issues that come up before submitting your PR. Any issues that come up will be listed in the comments for the PR and it will be closed. You can always reopen the PR once you fix the issues, but making sure things are in order before submitting the PR streamlines the process and saves time for everyone involved.

## Submit Your Pull Request
- In GitHub, send a pull request to `ngofficeuifabric:dev`.
  - Do **NOT** push to `ngofficeuifabric:master`.
  - Monitor the automated checks that are performed on your PR when submitted by both Travis CI & Coveralls. If either fails you need to address the issues prior to your submission to be considered for merge. If you need help with this process, jump in the [ngofficeuifabric Slack team](https://ngofficeuifabric.slack.com) and ask for help.
- If we suggest changes then:
  - Make the required updates.
  - Re-run the test suite to ensure tests are still passing.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```bash
    git rebase master -i
    git push -f
    ```

### What Happens if The Build Fails on my Pull Request?

Well, it depends.

If the failure is due to [failing to transpile the TypeScript to JavaScript](https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/.travis.yml#L22-L23), [any failing unit tests](https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/.travis.yml#L26-L27), [code style issues when vetting](https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/.travis.yml#L28-29) or from a significant drop in code coverage, the issues will be mentioned in your PR & it will be closed. You are free to reopen the PR after addressing the issues, resubmitting the code.

However there are other reasons the build may fail that won't cause this...

## After Your Pull Request is Merged

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```bash
  git push origin --delete my-fix-branch
  ```

- Checkout & update the master branch:

  ```bash
  git checkout master -f
  git pull --ff upstream master
  ```

- Checkout & update the dev branch:

  ```bash
  git checkout dev -f
  git pull --ff upstream dev
  ```

- Delete the local branch:

  ```bash
  git branch -D my-fix-branch
  ```
