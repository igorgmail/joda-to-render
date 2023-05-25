import { createRequire } from "module";
const require = createRequire(import.meta.url);


const logger = require('morgan')
const express = require('express');
const fetch = require('node-fetch')
const HTMLParser = require('node-html-parser');
import start from './like.js'

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))



app.get('/count/:num', async (req, res) => {
  const count = req.params?.num
  const result = await start(count)
  if (result) {
    console.log("▶ ⇛ result:", result);
    res.send(`All Done`)
  }
});


app.listen(3001, () => {
  console.log('Сервер запущен!!');
});