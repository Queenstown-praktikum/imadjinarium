import path from 'path';
import middleware from './render/hmr';

const express = require('express');
const bodyParser = require('body-parser');

const { connection } = require('../../api/index');
require('../../api/models/index');
const { UserRouter } = require('../../api/routes/user');

require('dotenv').config();

const PORT = 8080;

const port = process.env.PORT || PORT;

connection();
const app = express();

app.use(bodyParser.json());
app.use('/user', UserRouter);
app.use(express.static(path.join(__dirname, '../../dist/')));
app.use(middleware);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на  http://localhost:${port}`);
});
