import path from 'path';
import middleware from './render/hmr';

const express = require('express');
const { connection } = require('../../api/index');
require('../../api/models/user');

require('dotenv').config();

const PORT = 8080;

const port = process.env.PORT || PORT;

connection();
const app = express();

app.use(express.static(path.join(__dirname, '../../dist/')));
app.use(middleware);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на  http://localhost:${port}`);
});
