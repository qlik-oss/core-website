#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "Generating eula markdown page..."

docker_cmd=docker
pwd=$(pwd)

if [[ "$OS" == "Windows_NT" ]]; then
  docker_cmd="winpty docker"
  pwd=/$(pwd -W)
fi

$docker_cmd run --rm -it -v $pwd:/pandoc dalibo/pandocker:latest \
  -s qlik-core-eula.docx \
  -t markdown_strict \
  -o docs/eula.md

content=$(cat docs/eula.md)
echo -e "<!-- markdownlint-disable -->\n<!-- proselint-disable -->\n$content" > docs/eula.md
