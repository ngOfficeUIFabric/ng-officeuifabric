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
#   1. clone a copy of nuget-ngofficeuifabric to the specified $PKGWD path
#   2. copy the compiled library & changelog to the cloned nuget-ngofficeuifabric
#   3. update the nuget-ngofficeuifabric repo with the following changes by calling
#       update-nuget-versions.js:
#     3.1. update ng-office-ui-fabric.nuspec with current library version
#     3.2. update ng-office-ui-fabric.nuspec with current library dependencies
#   4. update the cloned package repo's origin master:
#     4.1. add all changed files
#     4.2. commit everything with comment "release(): [version]"
#     4.3. push commit => origin master
#     4.4. tag with the current version & push tags to origin

ARG_DEFS=(
  "--srcwd=(.*)"
  "--pkgwd=(.*)"
)

function init {
  # setup paths
  SRC_PATH=$SRCWD
  PKG_PATH=$PKGWD/nuget-ngofficeuifabric
  # setup globals
  VERSION="$(readJsonProp "$SRCWD/package.json" "version")"
  REPO_URL="https://github.com/ngOfficeUIFabric/nuget-ngofficeuifabric"
}

function run {
  # make sure version != last tag,
  #   if so, abort as nothing to do
  if isNewVersion $VERSION ; then
    echo "WARN: not a new version; aborting"
    exit 0
  fi

  # clone packaging repo
  echo "DEBUG: [1 / 4] clone packaging repo"
  git clone $REPO_URL $PKG_PATH --depth=2


  # copy built library & changelog
  echo "DEBUG: [2 / 4] copying built library & changelog"
  cp -Rf $SRC_PATH/dist/*.js $PKG_PATH/src/content/Scripts
  cp -Rf $SRC_PATH/CHANGELOG.md $PKG_PATH/CHANGELOG.md


  # update versions & dependencies in ng-office-ui-fabric.nuspec
  echo "DEBUG: [3 / 4] updating versions & dependencies in ng-office-ui-fabric.nuspec"
  node $SRC_PATH/build/scripts/update-nuget-versions.js --src=$SRC_PATH --pkg=$PKG_PATH


  # update packaging repo
  echo "DEBUG: [4 / 4] updating packaging repo nuget-ngofficeuifabric"
  echo "DEBUG: .. adding & commiting changes to package repo"
  git add -A
  git commit -m "release(): $VERSION"
  echo "DEBUG: .. pushing origin master"
  git push -q origin master

  echo "DEBUG: .. adding tag for version $VERSION & pushing orign master"
  git tag -f $VERSION
  echo "DEBUG: .. pushing origin master tags"
  git push --tags
}

source $(dirname $0)/utils.inc
