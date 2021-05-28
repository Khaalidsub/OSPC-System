#!/bin/bash
export DOMAIN=oscp-test.club
echo "Docker will be composed"
docker-compose -f docker-compose.yml up -d --build