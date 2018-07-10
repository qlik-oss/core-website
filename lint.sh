#!/bin/bash
set -e
cd "$(dirname "$0")"

docker_cmd=docker
pwd=$(pwd)

if [[ "$OS" == "Windows_NT" ]]; then
  docker_cmd="winpty docker"
  if [[ "$MSYSTEM" == MINGW* ]]; then
    pwd=`echo $pwd | sed 's/\//\/\//g'`
    echo $pwd
  fi
fi

$docker_cmd run --rm -v $pwd/docs/:/src/ -v $pwd/docs/.proselintrc:/root/.proselintrc -it singapore/lint-condo:0.18.0
