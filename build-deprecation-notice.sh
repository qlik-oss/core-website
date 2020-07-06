#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "Building site into `pwd`/site/ folder."

parcel build deprecation-notice/index.html -d ./site
