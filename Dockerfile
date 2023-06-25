FROM node:bullseye-slim

RUN mkdir /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "binaries/www"]