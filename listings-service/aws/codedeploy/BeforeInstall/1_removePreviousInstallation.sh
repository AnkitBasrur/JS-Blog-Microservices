#!/bin/sh

deployment_dir=/opt/microservices-demo/listings-service
if [ -d "$deployment_dir" ] && [ -x "$deployment_dir" ]; then
  rm -rf "$deployment_dir"
fi