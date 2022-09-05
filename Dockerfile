FROM node:14

WORKDIR /var/www

COPY . .
COPY package.json .

RUN npm install
RUN npm run build:client:ssr

ENV PORT 80

CMD npm run start:server

