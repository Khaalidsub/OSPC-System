#!/bin/bash
export DOMAIN=localhost
echo "Docker will be composed"
docker-compose -f docker-compose.dev.yml up -d --build