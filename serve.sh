#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

docker_cmd=docker
pwd=$(pwd)

if [[ "$OS" == "Windows_NT" ]]; then
  docker_cmd="winpty docker"
  pwd=/$(pwd -W)
fi

$docker_cmd run --rm -it -p 8000:8000 -v $pwd:/docs squidfunk/mkdocs-material:3.0.3
