# Submitting Pull Requests

Before you submit your pull request consider the following guidelines:

- Search [GitHub](https://github.com/ngOfficeUIFabric/ng-officeuifabric/pulls) for an open or closed Pull Request
  that relates to your submission. You don't want to duplicate effort.
- Make your changes in a new git branch:

  ```bash
  git checkout -b my-fix-branch master
  ```

- Be familiar with and adhere to things stated in:
  - [CONTRIBUTING](https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/.github/CONTRIBUTING.md)
  - [CONTRIB-WORKFLOW](CONTRIB-WORKFLOW.md)
  - [CODING](CODING.md)
  - [TESTING](TESTING.md)
- **Include appropriate test cases.**
- Ensure your fork is updated and not behind the upstream **ngofficeuifabric** repo. Refer to these resources for more information on syncing your repo:
  - [GitHub Help: Syncing a Fork](https://help.github.com/articles/syncing-a-fork/)    
  - [AC: Keep Your Forked Git Repo Updated with Changes from the Original Upstream Repo](http://www.andrewconnell.com/blog/keep-your-forked-git-repo-updated-with-changes-from-the-original-upstream-repo)
  - Looking for a quick cheat sheet? Look no further:

    ```shell
    # assuming you are in the folder of your locally cloned fork....
    git checkout dev

    # assuming you have a remote named `upstream` pointing official **ng-officeuifabric** repo
    git fetch upstream

    # update your local dev to be a mirror of what's in the main repo
    git pull --rebase upstream dev

    # switch to your branch where you are working, say "issue-xyz"
    git checkout issue-xyz

    # update your branch to update it's fork point to the current tip of dev & put your changes on top of it
    git rebase dev
    ```
  
- Push your branch to GitHub:

  ```bash
  git push origin my-fix-branch
  ```

## Before You Submit Your Pull Request

Please do the following checks on your code before you submit a pull request. They do all these same checks manually and if any fail, your PR will be rejected and you will be prompted to address the issues.

> NOTE: these are all done automatically using [CircleCI](https://circleci.com) as defined in the `circle.yml` file in the root of the repo.

- Run the full ngOfficeUIFabric test suite, as described in the [TESTING](TESTING.md), and ensure that all tests pass.
- Run the code vetting script `$ gulp vet-lib-ts` to verify you are meeting all required code style requirements.
- Check the code coverage report generated when running tests to ensure you do not cause the coverage percentage to fall as described in [TESTING](TESTING.md#code-coverage)

Please correct any issues that come up before submitting your PR. Any issues that come up will be listed in the comments for the PR and it will be closed. You can always reopen the PR once you fix the issues, but making sure things are in order before submitting the PR streamlines the process and saves time for everyone involved.

## Squashing Your Changes to a Single Commit

The branch manager will do this for you if you submit multiple commits in your PR, but if you can do this it will help them out. The idea is to have each change be in it's own commit to keep the commit log clean. This involves taking all the commits and merging them into a single commit with a single comment.

> You can learn more on squashing multiple commits into a single commit and see a video of it in action here: [Squashing Multiple Git Commits Into One](http://www.andrewconnell.com/blog/squash-multiple-git-commits-into-one).

To do this, assuming you are in the branch where you were working on a fix or feature, assuming it's named **issue-xyz**...

- First enter an interactive git session, looking at all your commits since you forked from the `dev` branch:

  ```shell
  git rebase -i dev
  ```

- A text editor will open showing you a list of your commits form oldest (top) to most recent (bottom). Each one has the word `pick` followed by the short ID of the commit and the first part of the commit message. To flatten everything, change `pick` to `f` for all but the top-most commit. For the top-most commit, change `pick` to `r`. Safe the file and exit the editor. You will see Git merge everything together.
  - This says *"merge all commits, ignoring the commit messages, into the oldest commit... and for that one, let's rewrite the commit message"*.

- The text editor will open again giving you a chance to rewrite the commit message. Make the changes desired, save & close the file.

- The last step is to update your forked repo's branch by pushing to it. If you had already pushed the commits you just flattened, you can force overwrite them by doing `git push origin issue-xyz -f` to force the update.

## Submit Your Pull Request
- In GitHub, send a pull request to `ngofficeuifabric:dev`.
  - Include in the title or description of the PR a statement of either of the following to indicate what issue this PR is related to. This will help the source management tools we use:
    - `Closes #000.`
    - `Fixes #000.`
    - `References #000.`
    - If it addresses multiple issues, please enter each of the above on the same line, but written as sentences like: `Closes #000. Closes #000.`
  - Do **NOT** push to `ngofficeuifabric:master`.
  - Monitor the automated checks that are performed on your PR when submitted by both CircleCI & Coveralls. If either fails you need to address the issues prior to your submission to be considered for merge. If you need help with this process, jump in the [ngofficeuifabric Slack team](https://ngofficeuifabric.slack.com) and ask for help.
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

If the failure is due to, (a) failing to transpile the TypeScript to JavaScript, (b) any failing unit tests, (c) code style issues when vetting or from a significant drop in code coverage, the issues will be mentioned in your PR & it will be closed. You are free to reopen the PR after addressing the issues, resubmitting the code.

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
