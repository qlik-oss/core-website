#!/bin/bash
set -e
cd "$(dirname "$0")"

docker run -v /`pwd`/docs/:/src/ -v /`pwd`/docs/.proselintrc:/root/.proselintrc singapore/lint-condo
