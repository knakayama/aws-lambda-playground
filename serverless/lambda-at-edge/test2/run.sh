#!/usr/bin/env bash

set -xe

s3_bucket_name="$1"
acm_identifier="$2"
hosted_zone_id="$3"
image_name="lambda-at-edge"
work_dir="workdir"

docker image build --tag "$image_name" .

shift 3

docker container run \
  -it \
  --rm \
  --volume ${PWD}/.serverless:/${work_dir}/.serverless:rw \
  --env AWS_ACCESS_KEY_ID="$(aws configure get aws_access_key_id)" \
  --env AWS_SECRET_ACCESS_KEY="$(aws configure get aws_secret_access_key)" \
  --env S3_BUCKET_NAME="$s3_bucket_name" \
  --env ACM_IDENTIFIER="$acm_identifier" \
  --env HOSTED_ZONE_ID="$hosted_zone_id" \
  "$image_name" \
  run $@
