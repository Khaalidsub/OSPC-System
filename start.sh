#!/bin/bash
export DOMAIN=ospc-test.club
echo "Docker will be composed"
docker-compose down
docker-compose -f docker-compose.yml up -d --build