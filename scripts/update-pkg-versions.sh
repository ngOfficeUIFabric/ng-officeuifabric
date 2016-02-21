#!/bin/bash

# NOTE: DO NOT RUN THIS SCRIPT UNLESS CREATING A RELEASE!!!!!!!!
#   This should only be done by the project owner(s). If it is run by mistake, it will
#   require cleanup in the main repos resulting in rewriting history & likey screwingup
#   most forks.
#
# This script is only used when creating a new release. It expects the following:
#   1. to be run from the `master` branch
#   2. all updates to be included in the release that need to be applied 
#       have been applied to local `master` including updating package.json to 
#       the desired release version, the correct angular, office ui fabric & other
#       dependencies & the changelog.md has been updated
#
# The script will do the following things:
#   1. remove any previous compiles in `/dist`
#   2. get the version from this repo's pacakge.json - this will be the version 
#       of the release
#   3. compile the library to production & debug mode
#   4. clone a copy of package-ngofficeuifabric to a temp location
#   5. copy the compiled library & changelog to the cloned package-ngofficeuifabric
#   6. update the package-ngofficeuifabric repo with the following changes by calling
#       update-pkg-versions.js:
#     6.1. update bower.json with current library dependencies
#     6.2. update bower.json with current library version
#     6.3. update package.json with current library dependencies
#     6.4. update package.json with current library version
#   7. update this repo's origin master:
#     7.1. push any pending commits => origin master
#     7.2. tag with the current version & push tags to origin
#   8. update the cloned package repo's origin master:
#     8.1. add all changed files
#     8.2. commit everything with comment "release(): [version]"
#     8.3. push commit => origin master
#     8.4. tag with the current version & push tags to origin
#   9. remove cloned package repo temp folder
#
# Usage:
# $ sh update-pkg-versions.sh --git-push-dryrun=(true|false)
# ^^^ this will default to --git-push-dryrun=true meaning that all git push commands
#     will have the `--dry-run` argument added and thus, nothing is push to remotes
# ^^^ to ensure these things run, you must specify --git-push-dryrun=false

function init {
  # setup paths
  SRC_PATH=$PWD
  PKG_PATH="$(mktemp -d)"
}

function run {
  cd ..


  # pre cleaning
  echo ".. pre cleaning"
  rm -Rf dist


  # get version
  VERSION="$(readJsonProp "package.json" "version")"


  # compile production & debug library
  echo ".. compiling prod & debug library"
  gulp build-lib
  gulp build-lib --dev


  # clone packaging repo
  echo ".. clone packaging repo"
  git clone https://github.com/ngOfficeUIFabric/package-ngofficeuifabric \
    $PKG_PATH --depth=2


  # copy built library & changelog
  echo ".. copying built library & changelog"
  cp -Rf dist/*.js $PKG_PATH
  cp -Rf changelog.md $PKG_PATH/changelog.md


  # update versions & dependencies in package.json & bower.json
  echo ".. updating versions & dependencies in package.json & bower.json"
  node scripts/update-pkg-versions.js --src=$PWD --pkg=$PKG_PATH


  # update source repo
  echo ".. updating source repo ng-officeuifabric"
  cd $SRC_PATH

  echo ".. .. pushing origin master"
  git push -q origin master

  echo ".. .. adding tag for version $VERSION & pushing orign master"
  git tag -f $VERSION
  git push --tags


  # update packaging repo
  echo ".. updating packaging repo package-ngofficeuifabric"
  cd $PKG_PATH

  echo ".. .. adding & commiting changes to package repo"
  git add -A

  git commit -m "release(): $VERSION"
  echo ".. .. pushing origin master"
  git push -q origin master

  echo ".. .. adding tag for version $VERSION & pushing orign master"
  git tag -f $VERSION
  git push --tags


  # remove temp folder
  echo ".. removing temp folder at:"
  echo ".. .. $PKG_PATH"
  cd $SRC_PATH
  rm -rf $PKG_PATH
}

source $(dirname $0)/utils.inc
