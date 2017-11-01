#!/bin/bash
set -e
cd "$(dirname "$0")"

MKDOCS_IMAGE=squidfunk/mkdocs-material

if [[ "$OS" == "Windows_NT" ]]; then
  winpty docker run --rm -it -p 8000:8000 -v /`pwd`://docs $MKDOCS_IMAGE
else
  docker run --rm -it -p 8000:8000 -v `pwd`:/docs $MKDOCS_IMAGE
fi
