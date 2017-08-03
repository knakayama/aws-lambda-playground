#!/usr/bin/env bash

set -eo pipefail

aws_region="ap-northeast-1"

docker image build --tag sls .

docker container run \
  --tty \
  --rm \
  --volume ${PWD}/.serverless:/serverless/.serverless \
  --env AWS_ACCESS_KEY_ID="$(aws configure get aws_access_key_id)" \
  --env AWS_SECRET_ACCESS_KEY="$(aws configure get aws_secret_access_key)" \
  --env AWS_REGION="$aws_region" \
  sls \
  run -- $@
