FROM node:latest

WORKDIR /var/www

COPY package*.json ./
#COPY package-lock*.json ./

RUN npm i -f

COPY . .

EXPOSE 3000

CMD ["npm", "run", "server"]
