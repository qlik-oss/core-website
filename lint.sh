#!/bin/bash
set -e
cd "$(dirname "$0")"

docker run -v /`pwd`:/src/ -v /`pwd`/.proselintrc:/root/.proselintrc singapore/lint-condo
