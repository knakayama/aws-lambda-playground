#!/usr/bin/env bash

docker run \
  -it \
  -p 4567-4580:4567-4580 \
  -p 8080:8080 \
  -e HOSTNAME=$HOSTNAME \
  -e DEFAULT_REGION=$DEFAULT_REGION \
  -e DATA_DIR=$DATA_DIR \
  atlassianlabs/localstack
