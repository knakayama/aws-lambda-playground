#!/usr/bin/env bash

s3_prefix="$1"
s3_bucket="$2"

aws cloudformation package \
  --template-file "sam.yml" \
  --s3-bucket "$s3_bucket" \
  --s3-prefix "$s3_prefix" \
  --output-template-file ".sam/packaged.yml"
