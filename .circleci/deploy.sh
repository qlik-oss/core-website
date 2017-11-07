#!/bin/bash

# This script follows a practice regarding variables.
# UPPER_CASE = Externally defined variables (system or otherwise)
# lower_case = Script-owned variables

required_env_vars=(
  "BUILD_NUMBER"
  "BRANCH_NAME"
  "TARGET_USER"
  "TARGET_HOST"
)

check_failed=0

for i in ${required_env_vars[@]}; do
  is_set=$(env | grep ^${i}= | wc -l | tr -d ' ')
  if [ "$is_set" == "0" ]; then
    echo "Missing environment variable: $i"
    check_failed=1
  fi
done

if [ "$check_failed" == "1" ]; then
  echo "Cannot continue."
  exit 1
fi

latest_name=$(echo $BRANCH_NAME | tr '/' '_')
target_machine="$TARGET_USER@$TARGET_HOST"
target_path="~/docs/$BUILD_NUMBER"
latest_path="~/docs/$latest_name"
ssh_opts=
if [ ! -z "$CERT_PATH" ]; then
  ssh_opts="-i $CERT_PATH"
fi

# create the new remote folder first:
ssh $ssh_opts $target_machine "mkdir -p $target_path"
# copy all files from the new site into the new remote folder:
scp $ssh_opts -r ./site/. $target_machine:$target_path
# also update latest for this branch:
ssh $ssh_opts $target_machine "cd docs && ln -sfn ./$BUILD_NUMBER ./$latest_name"

echo "Atomic URL: https://$TARGET_HOST/docs/$BUILD_NUMBER"
echo "Latest URL: https://$TARGET_HOST/docs/$latest_name"
