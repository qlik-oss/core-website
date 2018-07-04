#!/bin/bash

set -e
echo $CIRCLE_JOB
# Select the diff from the branch. Grep the changes indicated with the '+' sign. Use grep with extended regex syntax to identify weblinks. Trim text with sed.
URLS=`curl -s -L "https://github.com/qlik-oss/core-website/compare/$CIRCLE_JOB.diff" | grep '+' | grep -Eo '\(https?://[^ ]+\)' | sed 's/^.\(.*\).$/\1/' | uniq`
echo $URLS
for url in $URLS
do 
  if curl --output /dev/null --silent --head --fail "$url"; then
    echo "Working links $url"
  else
    echo "The following link is broken: $url"
    exit 1
  fi 
done
