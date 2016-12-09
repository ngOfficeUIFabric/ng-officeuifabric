#!/bin/bash

# This script is used to automate and speed up the merging of PR's. It prompts for the
#   PR number & source repo+branch at first, then it does the following:
#   1. create a new branch `pr###` from `dev`
#   2. pulls the code from the remote repo+branch into the new local `pr` branch
#   3. removes `node_modules` & `dist` folders
#   4. installs all node modules
#   5. cleans all typescript
#   6. compiles all TypeScript to JavaScript
#   7. vets all code
#   8. runs all tests
#   9. builds library
#   10. launches local demo

echo ""
echo "GETTING A PULL RELEASE AND RUNNING THROUGH THE INITIAL TESTS FOR ANAYLASIS"
echo ""

# jump up to the root of the repo
cd ../..
SRC_PATH=$PWD

# make sure in root of repo
if [ "${SRC_PATH##*/}" != "ng-officeuifabric" ]; then
  echo "ERROR: script must be run from the root of the 'ng-officeuifabric' repo"
  echo "ERROR: you are running from '${SRC_PATH##*/}'"
  exit 1
fi

echo "LOG: current folder: $SRC_PATH"

# prompt for pr# & repo+branch
echo "Please provide the pull release number & the repo+branch where the PR"
echo "  source resides. Get the repo+branch from the PR details, sepecifically the"
echo "  section on the page 'Merging Via Command Line'"
read -p "What PR# is this? (###) " prNum
read -p "Forked repo source of PR? (URL to forked repo) " prForkedRepo
read -p "Forked repo branch of PR? (branch name) " prForkedBranch
read -p "Name of directive to test? (leave blank to skip launching demo) " prDirective

echo ""
echo "Using the following values..."
echo "  pr#:       $prNum"
echo "  repo:      $prForkedRepo"
echo "  branch:    $prForkedBranch"
echo "  directive: $prDirective"
echo ""

# create branch for PR & pull
echo ".. creating new branch & pulling down source in PR"
git checkout dev
git checkout -b pr$prNum
git pull $prForkedRepo $prForkedBranch

# clean up
echo ".. clean out node_modules & build libraries"
rm -rf node_modules
rm -rf dist

# get all modules
echo ".. installing node modules"
yarn install

# compile typescript (to run the gulp clean command)
echo ".. compile TypeScript"
npm run build:ts

# clean all typescript (get rid of everything before running a clean build)
echo ".. remove all TypeScript"
gulp clean

# compile typescript
echo ".. recompiling all TypeScript"
npm run build:ts

# vet all code
echo ".. vetting all library TypeScript"
gulp vet-lib-ts --verbose

# run all tests
echo ".. running all tests"
gulp test --verbose

# build library
echo ".. build the library files"
npm run build:lib

# open demo
if [[ -n "${prDirective// }" ]]; then
  echo ".. opening demo"
  open src/components/$prDirective/demo/index.html
else
  echo ".. skipping demo"
fi

echo "FINISHED PR CHECK SCRIPT!"
