#!/bin/bash
set -e
cd "$(dirname "$0")"

docker run --rm -v /`pwd`/docs/:/src/ -v /`pwd`/docs/.proselintrc:/root/.proselintrc singapore/lint-condo
