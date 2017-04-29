#!/usr/bin/env bash

stack_name="$1"
s3_bucket="$2"
template_path=".sam/packaged.yml"


aws s3 cp "src/api/swagger.yml" "s3://$s3_bucket" \
  && aws cloudformation package \
    --template-file "sam.yml" \
    --s3-bucket "$s3_bucket" \
    --output-template-file "$template_path" \
  && aws cloudformation deploy \
    --template-file "$template_path" \
    --stack-name "$stack_name" \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides ArtifactBucket="$s3_bucket" ImageBucketName="knakayama-image-resizing"
