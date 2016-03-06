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
#   4. update this repo's origin master:
#     4.1. push any pending commits => origin master
#     4.2. tag with the current version & push tags to origin
#   5. call scripts to update package-* & nuget-* distros
#
# Usage:
# $ sh [path-to-script]/release.sh --git-push-dryrun=(true|false)
# ^^^ this will default to --git-push-dryrun=true meaning that all git push commands
#     will have the `--dry-run` argument added and thus, nothing is push to remotes
# ^^^ to ensure these things run, you must specify --git-push-dryrun=false

function init {
  # if set, export --git-push-dryrun so available in other scripts
  export GIT_PUSH_DRYRUN=$GIT_PUSH_DRYRUN
}

function run {
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


  # get version
  VERSION="$(readJsonProp "package.json" "version")"


  # get last tag
  LAST_TAG=$(git describe --tags --abbrev=0)


  # make sure version != last tag,
  # `if so, no release needed so abort
  if [ "$LAST_TAG" == "$VERSION" ]; then
    echo "INFO: not a new version; aborting release script"
    exit 1
  fi


  # pre cleaning
  echo ".. pre cleaning"
  rm -Rf dist


  # compile production & debug library
  echo ".. compiling prod & debug library"
  gulp build-lib
  gulp build-lib --dev


  # update source repo
  echo ".. updating source repo ng-officeuifabric"
  cd $SRC_PATH


  echo ".. .. pushing origin master"
  git push -q origin master


  echo ".. .. adding tag for version $VERSION & pushing orign master"
  git tag -f $VERSION
  git push --tags


  # update the package & nuget repo
  sh ./build/scripts/update-package-repo.sh --version=$VERSION --src=$SRC_PATH
  sh ./build/scripts/update-nuget-repo.sh --version=$VERSION --src=$SRC_PATH
}

source $(dirname $0)/utils.inc
