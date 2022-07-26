FROM node:latest

WORKDIR /var/www

COPY package*.json ./
#COPY package-lock*.json ./

RUN npm i -f

COPY . .

EXPOSE 80

CMD ["npm", "run", "server"]
