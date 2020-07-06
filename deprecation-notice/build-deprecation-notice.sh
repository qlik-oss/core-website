#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "Building site into `pwd`/site/ folder."

npm run build
