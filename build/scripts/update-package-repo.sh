#!/bin/bash

# NOTE: DO NOT RUN THIS SCRIPT UNLESS CREATING A RELEASE!!!!!!!!
#   This should only be done by the project owner(s). If it is run by mistake, it will
#   require cleanup in the main repos resulting in rewriting history & likey screwingup
#   most forks.
#
# This script is only used when creating a new release. It expects the following:
#   1. to be run from the `master` branch
#   2. to be run from the root of the repo
#   3. all updates to be included in the release that need to be applied
#       have been applied to local `master` including updating package.json to
#       the desired release version, the correct angular, office ui fabric & other
#       dependencies & the changelog.md has been updated
#
# The script will do the following things:
#   1. clone a copy of package-ngofficeuifabric to a temp location
#   2. copy the compiled library & changelog to the cloned package-ngofficeuifabric
#   3. update the package-ngofficeuifabric repo with the following changes by calling
#       update-pkg-versions.js:
#     3.1. update bower.json with current library dependencies
#     3.2. update bower.json with current library version
#     3.3. update package.json with current library dependencies
#     3.4. update package.json with current library version
#   4. update the cloned package repo's origin master:
#     4.1. add all changed files
#     4.2. commit everything with comment "release(): [version]"
#     4.3. push commit => origin master
#     4.4. tag with the current version & push tags to origin
#   5. remove cloned package repo temp folder

ARG_DEFS=(
  "--version=(.*)"
  "--src=(.*)"
)

function init {
  # setup paths
  SRC_PATH=$SRC
  PKG_PATH="$(mktemp -d)"
  # setup globals
  REPO_URL="https://github.com/ngOfficeUIFabric/package-ngofficeuifabric"
}

function run {
  # start from root ng-officeuifabric library
  cd $SRC_PATH


  # clone packaging repo
  echo ".. [1 / 5] clone packaging repo"
  git clone $REPO_URL $PKG_PATH --depth=2


  # copy built library & changelog
  echo ".. [2 / 5] copying built library & changelog"
  cp -Rf dist/*.js $PKG_PATH
  cp -Rf changelog.md $PKG_PATH/changelog.md


  # update versions & dependencies in ng-office-ui-fabric.nuspec
  echo ".. [3 / 5] updating versions & dependencies in package.json & bower.json"
  node ./build/scripts/update-package-versions.js --src=$PWD --pkg=$PKG_PATH


  # update packaging repo
  echo ".. [4 / 5] updating packaging repo package-ngofficeuifabric"
  cd $PKG_PATH

  echo ".. .. adding & commiting changes to package repo"
  git add -A

  git commit -m "release(): $VERSION"
  echo ".. .. pushing origin master"
  git push -q origin master

  echo ".. .. adding tag for version $VERSION & pushing orign master"
  git tag -f $VERSION
  echo ".. .. pushing origin master tags"
  git push --tags


  # remove temp folder
  echo ".. [5 / 5] removing temp folder at:"
  echo ".. .. $PKG_PATH"
  cd $SRC_PATH
  rm -rf $PKG_PATH
}

source $(dirname $0)/utils.inc
