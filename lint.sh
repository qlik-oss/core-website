#!/bin/bash
set -e
cd "$(dirname "$0")"

if [[ "$OS" == "Windows_NT" ]]; then
  docker run --rm -v `pwd -W`/docs/:/src/ -v /`pwd -W`/docs/.proselintrc:/root/.proselintrc singapore/lint-condo:0.18.0
else
  docker run --rm -v /`pwd`/docs/:/src/ -v /`pwd`/docs/.proselintrc:/root/.proselintrc singapore/lint-condo:0.18.0
fi
