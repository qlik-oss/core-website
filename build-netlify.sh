#!/usr/bin/env bash

pip install --upgrade pip --quiet 
pip install mkdocs-material --quiet 
mkdocs build
cp _redirects ./site
find ./site/assets -type f -printf "%T@ %p\n" | sort -nr | cut -d\  -f2- > ./site/files.txt
find ./site/images -type f -printf "%T@ %p\n" | sort -nr | cut -d\  -f2- >> ./site/files.txt



