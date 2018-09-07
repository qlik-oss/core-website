#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "Building site into `pwd`/site/ folder."

docker_cmd=docker
pwd=$(pwd)

if [[ "$OS" == "Windows_NT" ]]; then
  docker_cmd="winpty -Xallow-non-tty docker"
  pwd=/$(pwd -W)
fi

$docker_cmd run --rm -it --name mkdocs -v $pwd:/docs squidfunk/mkdocs-material:3.0.3 build

find ./site/assets -type f -printf "%T@ %p\n" | sort -nr | cut -d\  -f2- > ./site/files.txt
find ./site/images -type f -printf "%T@ %p\n" | sort -nr | cut -d\  -f2- >> ./site/files.txt


# CONTAINER_ID=$(docker ps -qf "name=mkdocs")
# echo "image ID is $CONTAINER_ID"
# $docker_cmd exec -it $CONTAINER_ID "sh ls -lha"  > filelist.txt
# echo "docker should have execur´ted stuff.."
# $docker_cmd kill $CONTAINER_ID 
# $docker_cmd rm $CONTAINER_ID 
# echo "docker killl and remove"
