import path from 'path';
import middleware from './render/hmr';

const express = require('express');
// const path = require('path');
require('dotenv').config();

const PORT = 8080;

const port = process.env.PORT || PORT;

const app = express();

app.use(express.static(path.join(__dirname, '../../dist/')));
app.use(middleware);

//
// // @ts-ignore
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на  http://localhost:${port}`);
});
