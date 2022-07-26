FROM node:latest

WORKDIR /var/www

COPY package*.json ./

RUN npm install -f

COPY . .

EXPOSE 3000

CMD ["npm", "run", "server"]