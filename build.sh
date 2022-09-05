#!/usr/bin/env bash
VERSION=0.0.1

TAG_PREFIX='imadjinarium'

docker build -f Dockerfile -t ${TAG_PREFIX}:${VERSION} .
docker push ${TAG_PREFIX}:${VERSION}
