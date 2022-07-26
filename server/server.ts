const express = require('express');
const path = require('path');

const PORT = 80;

//process.env.PORT - для Heroku

const port =  process.env.PORT || PORT;

const app = express();

app.use(express.static('dist'));

// @ts-ignore
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Сервер запущен на  http://localhost:${port}`);
});
