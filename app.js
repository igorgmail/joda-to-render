import { createRequire } from "module";
const require = createRequire(import.meta.url);


const logger = require('morgan')
const express = require('express');
const fetch = require('node-fetch')
const HTMLParser = require('node-html-parser');
// const request = require('request');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));



async function getCoockies(){
  const response = await fetch('https://sib.fm/promocat')
  const page = await response.text()

  const root = HTMLParser.parse(page);
  const element = root.querySelector('[name="csrf-token"]')
  const token = element.getAttribute('content')


  const coockies = await response.headers.get('set-cookie')
  const xsr = coockies.match(/XSRF-TOKEN=.*?(?=;)/)[0]
  const laravel = coockies.match(/laravel_session=.*?(?=;)/)[0]
  const myCoockies = `${xsr}; ${laravel}`
  return [token, myCoockies]
}

async function start(){
  
  const timeAut = () => Math.floor(Math.random() * (10000 - 2000 + 1000)) + 2000// Задержка
  for(let i = 0; i < 4; i++){
    await new Promise((r) => setTimeout(r, timeAut()));
      const result = await Like()
      console.log("▶ ⇛ result:", result);
  }
}


async function Like(){
  try {
    const [token, coockies] = await getCoockies()
    const response = await fetch('https://sib.fm/promocat/like', {
      method: 'POST',
      credentials: 'include', // Включаем передачу кук
      headers: {
        'Cookie': coockies,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _token: token,
        id: '505'}),
        redirect: 'follow'
    });

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      console.log("⇛ Ошибка поставить Like response.body -> ", response.body);
    }
  } catch (error) {
    console.log("▶ ⇛ 'Произошла ошибка Like':", error);
  }
}


start()


// app.listen(3001, () => {
//   console.log('Сервер запущен!!');
// });