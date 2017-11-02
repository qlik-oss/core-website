#!/bin/bash
set -e
cd "$(dirname "$0")"

LINT_CONDO_IMAGE=singapore/lint-condo

if [[ "$OS" == "Windows_NT" ]]; then
  docker run -v /`pwd`:/src/ $LINT_CONDO_IMAGE
else
  docker run -v `pwd`:/src/ $LINT_CONDO_IMAGE
fi
