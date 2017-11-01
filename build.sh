#!/bin/bash
set -e
cd "$(dirname "$0")"

MKDOCS_IMAGE=squidfunk/mkdocs-material

echo "OS is $OS."
echo "Building site into `pwd`/site/ folder."

if [[ "$OS" == "Windows_NT" ]]; then
  winpty docker run --rm -it -v /`pwd`://docs $MKDOCS_IMAGE build
else
  docker run --rm -it -v .:/docs $MKDOCS_IMAGE build
fi
