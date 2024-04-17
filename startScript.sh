#!/bin/bash

# Change to the Clients directory
cd ./Clients

# Build the project
npm run build

sleep 10
# Say build is done
echo "Build is done"

# Change to the API directory
cd ..
cd ./API

# Build the Docker image
docker-compose up --build
