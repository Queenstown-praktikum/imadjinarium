const express = require('express');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();


const PORT = 3000;

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
