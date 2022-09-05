import path from 'path';
import middleware from './render/hmr';

const express = require('express');
const { Sequelize } = require('sequelize');

// todo: разобраться с SSL required и подключиться к облачной базе
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'queenstown',
  password: 'queenstown',
  port: 5002,
  database: 'postgres_imadjinarium',
  dialectOptions: {
    ssl: false,
  },
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connection();

require('dotenv').config();

const PORT = 8080;

const port = process.env.PORT || PORT;

const app = express();

app.use(express.static(path.join(__dirname, '../../dist/')));
app.use(middleware);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на  http://localhost:${port}`);
});
