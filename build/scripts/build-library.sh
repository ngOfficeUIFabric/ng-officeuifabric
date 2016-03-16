#!/bin/bash

ARG_DEFS=(
  "--srcwd=(.*)"
  "--artifactwd=(.*)"
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

  # build library
  echo "INFO: compiling prod & debug library"
  gulp build-lib
  gulp build-lib --dev

  # copy library to artifacts
  cp $SRCWD/dist/** $ARTIFACTWD
}

source $(dirname $0)/utils.inc
