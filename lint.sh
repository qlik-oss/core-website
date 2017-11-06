#!/bin/bash
set -e
cd "$(dirname "$0")"

docker run --rm -v /`pwd -W`/docs/:/src/ -v /`pwd -W`/docs/.proselintrc:/root/.proselintrc singapore/lint-condo
