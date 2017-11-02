#!/bin/bash
set -e
cd "$(dirname "$0")"

docker run -v /`pwd`:/src/ singapore/lint-condo
