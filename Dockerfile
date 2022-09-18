FROM node:14

WORKDIR /var/www

COPY . .
COPY package.json .

RUN apt-get update && apt-get install -y postgresql
RUN npm install
RUN npm run build:client:ssr

CMD npm run start:server

