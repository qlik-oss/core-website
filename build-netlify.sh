#!/usr/bin/env bash

cd deprecation-notice/ && ./build-deprecation-notice.sh
cp _redirects ./site
