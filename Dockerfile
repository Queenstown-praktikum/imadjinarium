FROM node:latest

WORKDIR /var/www

COPY package*.json ./

RUN npm i -f

COPY . .

EXPOSE 3000

CMD ["npm", "run", "server"]
