# Merging a Pull Request

These instructions are primarily for the repo manager(s) and shared here so contributors can see how things work.

The "auto-merge" process that GitHub provides is not used as it doesn't provide enough control. As such, all merge's are implemented offline in a repo manager's local git.

Process to merge pull requests (PR's) into the main codebase:

1. [Copy the PR into a local branch](#bring-a-pr-into-local-git)
1. [Squashing everything into one commit](#squashing-everything-into-one-commit)
1. [Dealing with Conflicts](#dealing-with-conflicts)
1. [Merging With Dev](#merging-with-dev)

## Bring a PR into Local git

To bring in a pull request, first create a new branch for that pull request off the `ngofficeuifabric:dev` branch & pull the commits from the PR into that branch.

  > **NOTE**: The PR in GitHub will provide a command line option... the two commands in step 1 is what you want to run below. 

For example assuming the user John Doe is submitting a PR #35 that adds a widget directive & they did all work in a branch `feat-widgetdirective`:

```bash
git checkout -b pr35 dev
git pull https://github.com/johndoe/ng-officeuifabric.git feat-widgetdirective
```

If there are any conflicts, go to the [Dealing with conflicts](#dealing-with-conflicts) section below.

If the merge succeeds, use `git diff origin/dev` to see all the new changes that will happen
post-merge.

## Squashing Everything into One Commit

Before merging a pull request into `ngofficeuifabric:dev`, make sure there is only one commit
representing the changes in the pull request, so the git log stays lean.

We will use git's interactive rebase to let us manipulate, merge, and rename
commits in our local history.

To interactively rebase all of your commits that occur after the latest in `ngofficeuifabric:dev`, run:

```bash
git rebase -i origin/dev
```

This will bring up an interactive dialog in your text editor. Follow the instructions
to squash all of your commits into the top one, then rename the top one.

> **NOTE**: A walkthrough of this process can be found here: [AC: Squash Multiple Git Commits Into One](http://www.andrewconnell.com/blog/squash-multiple-git-commits-into-one)

Once this is done, run `git log` and you will see only one commit after `ngofficeuifabric:dev`, representing
everything from the pull request.

Finally, we'll pull from `ngofficeuifabric:dev` with rebase to put all of our local commits on top of
the latest remote.

```bash
git pull --rebase origin dev
```

This may cause conflicts, see below for how to deal with these.

## Dealing with Conflicts

Run the following to see which files are conflicted:

```bash
git status
```

You can open the conflicted files and fix them manually, or if the conflict isn't relevant, run:

```bash
git checkout --theirs <file>
```

To checkout *your local* version of the file.

```bash
git checkout --ours <file>
```

To checkout *their remote* version of the file. (yes, it's backwards).

After all the conflicted files are fixed, run:

```bash
git add -A
git rebase --continue
```

Or if you're pulling from `git am` and fixing conflicts, run:

```bash
git add -A
git am --continue
```

## Merging with dev

Finally, after you've squashed the whole pull request into one commit and made sure
it has no conflicts with the latest `ngofficeuifabric:dev` and tests are run, you're ready to merge it in.

Simply go back to the `ngofficeuifabric:dev` branch:

```bash
git checkout dev
```

Make sure you're up to date in the `ngofficeuifabric:dev` branch too:

```bash
git pull --rebase origin dev
```

And finally, rebase your pull request in from your WIP pull request branch:

```bash
git rebase pr35
```

This will rebase the commits from `pr35-widgetdirective` into dev.

Finally, verify that tests pass and the docs look fine, and make sure
the commit message for the pull request closes the proper issues and lists
breaking changes.

You can amend the commit to change the message:

```bash
git commit --amend
```

This will open the latest commit in your text editor and allow you to add
text. Do **not** forget to add `Close #xxx` to also close the PR; in this case you will add
`Close #143`. Also ensure the commit message includes any references to relevant issues as well.

```bash
git push origin dev
```

Lastly, be sure to cleanup any branches that you were using for this pull request.

```bash
git branch -D pr35
```