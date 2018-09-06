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

$docker_cmd run --rm -it --name mkdocs -v $pwd:/docs squidfunk/mkdocs-material:3.0.3 build -v > build_log.txt

FILE_NAME="files.txt";

while IFS=: read -r c1 c2; do
  if [[ $c1 == *"Copying media file"* ]]; then
    echo $c2 >> $FILE_NAME
  fi
done < build_log.txt

rm "build_log.txt"
mv $FILE_NAME site/$FILE_NAME

# CONTAINER_ID=$(docker ps -qf "name=mkdocs")
# echo "image ID is $CONTAINER_ID"
# $docker_cmd exec -it $CONTAINER_ID "sh ls -lha"  > filelist.txt
# echo "docker should have execur´ted stuff.."
# $docker_cmd kill $CONTAINER_ID 
# $docker_cmd rm $CONTAINER_ID 
# echo "docker killl and remove"
