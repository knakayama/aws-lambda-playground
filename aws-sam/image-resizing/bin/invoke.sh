#!/usr/bin/env bash

stack_name="image-resizing"
function_name="$1"

aws lambda invoke \
  --function-name "$(aws cloudformation describe-stack-resource \
    --stack-name "$stack_name" \
    --logical-resource-id "$function_name" \
    --query 'StackResourceDetail.PhysicalResourceId' \
    --output text)" \
  --log-type Tail \
  --query 'LogResult' \
  $ops \
  /dev/stdin \
  | perl -MMIME::Base64 -ne 'print decode_base64($_)'
