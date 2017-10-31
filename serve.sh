#!/bin/bash
set -e
cd "$(dirname "$0")"
if [[ "$OS" == "Windows_NT" ]]; then
    WINPTY=winpty
fi
$WINPTY docker run --rm -it -p 8000:8000 -v /`pwd`://docs squidfunk/mkdocs-material
