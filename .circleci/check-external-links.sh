#!/bin/bash

cd "$(dirname "$0")"

set -e
STATUS=0
# Select the diff from the branch. Grep the changes indicated with the '+' sign. Use grep with extended regex syntax to identify weblinks. Trim text with sed.
#URLS=$(curl -s -L "https://github.com/qlik-oss/core-website/compare/$CIRCLE_BRANCH.diff" | grep '+' | grep -Eo '\(https?://[^ ]+\)' | sed 's/^.\(.*\).$/\1/' | sed 's/)//g' | uniq)
# Grep all "<url>" references in all HTML/css pages, then remove leading "" from grep, sort it, and make the list unique
URLS=$(grep -Eroih '=\"(http|https)://[^ "]+' --include '*.html' --include '*.css' ../site/ | cut -f 2 -d '"' | sort | uniq)
# echo "Following URLS found: $URLS"

for url in $URLS
do
  sleep 0.1 # Short delay between checks to avoid 429 Too many requests responses
  if [[ $url == *"localhost"* || $url == *"gstatic"* || $url == *"google-analytics"* || $url == *"googletagmanager"* || $url == *"zlib.net"* || $url == *"ampl.com"* ]]; then
    echo "# Skipping: $url"
  elif curl -s -L -f -I -k -o /dev/null "$url"; then
    echo "   Working: $url"
  else
    echo "!   Broken: $url"
    STATUS=1
  fi
done

if [ "$STATUS" -eq "1" ]; then
   exit $STATUS;
fi
