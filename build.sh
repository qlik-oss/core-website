#!/bin/bash
set -e
cd "$(dirname "$0")"

MKDOCS_IMAGE=squidfunk/mkdocs-material

echo "Building site into `pwd`/site/ folder."

if [[ "$OS" == "Windows_NT" ]]; then
  echo "OS is Windows."
  winpty docker run --rm -it -v /`pwd`://docs $MKDOCS_IMAGE build
else
  echo "OS is Unix."
  docker run --rm -it -v `pwd`:/docs $MKDOCS_IMAGE build
fi
