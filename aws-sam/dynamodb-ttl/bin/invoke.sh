#!/usr/bin/env bash

function_name="$1"

aws lambda invoke \
  --function-name "$function_name" \
  --log-type Tail \
  --query 'LogResult' \
  $ops \
  /dev/stdin \
| perl -MMIME::Base64 -ne 'print decode_base64($_)'
