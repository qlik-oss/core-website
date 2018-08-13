#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "Building site into `pwd`/site/ folder."

docker_cmd=docker
pwd=$(pwd)

if [[ "$OS" == "Windows_NT" ]]; then
  docker_cmd="winpty docker"
  pwd=/$(pwd -W)
fi

$docker_cmd run --rm -it -v $pwd:/docs squidfunk/mkdocs-material:3.0.3 build
