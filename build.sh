#!/bin/bash
set -e
cd "$(dirname "$0")"
if [[ "$OS" == "Windows_NT" ]]; then
    WINPTY=winpty
fi
$WINPTY docker run --rm -it -v /`pwd`://docs squidfunk/mkdocs-material build
