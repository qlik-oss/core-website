#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "Generating beta markdown page..."

docker_cmd=docker
pwd=$(pwd)

if [[ "$OS" == "Windows_NT" ]]; then
  docker_cmd="winpty docker"
  pwd=/$(pwd -W)
fi

$docker_cmd run --rm -it -v $pwd:/pandoc dalibo/pandocker:latest \
  -s qlik-core-eula.docx \
  -t markdown_strict \
  -o docs/beta.md

content=$(cat docs/beta.md)
echo -e "<!-- markdownlint-disable -->\n<!-- proselint-disable -->\n$content" > docs/beta.md
