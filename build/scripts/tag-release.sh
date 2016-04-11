#!/bin/bash

ARG_DEFS=(
  "--srcwd=(.*)"
)

function init {
  # get version
  VERSION="$(readJsonProp "$SRCWD/package.json" "version")"
}

function run {
  # make sure version != last tag,
  #   if so, abort as nothing to do
  if isNewVersion $VERSION ; then
    echo "WARN: not a new version; aborting "
    exit 0
  fi

  echo "INFO: adding tag for version $VERSION & pushing orign master"
  git tag -f $VERSION
  git push --tags

}

source $(dirname $0)/utils.inc
