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
- Run the full ngOfficeUIFabric test suite, as described in the [TESTING](TESTING.md), and ensure that all tests pass.
- Check the code coverage report generated when running tests to ensure you do not cause the coverage percentage to fall as described in [TESTING](TESTING.md#code-coverage)
- Ensure your fork is updated and not behind the upstream **ngofficeuifabric** repo. Refer to these resources for more information on syncing your repo:
    - [GitHub Help: Syncing a Fork](https://help.github.com/articles/syncing-a-fork/)    
    - [AC: Keep Your Forked Git Repo Updated with Changes from the Original Upstream Repo](http://www.andrewconnell.com/blog/keep-your-forked-git-repo-updated-with-changes-from-the-original-upstream-repo)
  
- Push your branch to GitHub:

  ```bash
  git push origin my-fix-branch
  ```

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

## After your pull request is merged

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
