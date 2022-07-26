FROM node:latest

WORKDIR app/

COPY package*.json ./

RUN npm install -f

COPY . .

EXPOSE 5000

CMD ["npm", "run", "server"]