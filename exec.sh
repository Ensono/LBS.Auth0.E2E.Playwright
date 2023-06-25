#!/usr/bin/env bash
docker build -t auth0-javascript-sample-01-login .
docker run --name auth0-app -d --init -p 3000:3000 -it auth0-javascript-sample-01-login