#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "Building site into `pwd`/site/ folder."

docker_cmd=docker
find_cmd="sudo find"
mv_cmd="sudo mv"
pwd=$(pwd)

if [[ "$OS" == "Windows_NT" ]]; then
  docker_cmd="winpty -Xallow-non-tty docker"
  pwd=/$(pwd -W)
  find_cmd="find"
  mv_cmd="mv"
fi

$docker_cmd run --rm -it --name mkdocs -v $pwd:/docs squidfunk/mkdocs-material:3.0.3 build

$find_cmd ./site/assets -type f -printf "%T@ %p\n" | sort -nr | cut -d\  -f2- > files.txt
$find_cmd ./site/images -type f -printf "%T@ %p\n" | sort -nr | cut -d\  -f2- >> files.txt
$mv_cmd files.txt site/files.txt


