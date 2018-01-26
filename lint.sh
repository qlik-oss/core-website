#!/bin/bash
set -e
cd "$(dirname "$0")"

if [[ "$OS" == "Windows_NT" ]]; then
  pwd=$(pwd -W)
else
  pwd=$(pwd)
fi

docker run --rm -v $pwd/docs/:/src/ -v $pwd/docs/.proselintrc:/root/.proselintrc singapore/lint-condo:0.18.0
