docker build --rm -t auth0-javascript-sample-01-login .
docker run --name auth0-app -d -p 3000:3000 -it auth0-javascript-sample-01-login
