#!/bin/bash
export DOMAIN=localhost
echo "Docker will be composed"
docker-compose -f docker-compose.yml up -d --build