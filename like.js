import { createRequire } from "module";
const require = createRequire(import.meta.url);

const randomUseragent = require('random-useragent');

const logger = require('morgan')
const express = require('express');
const fetch = require('node-fetch')
const HTMLParser = require('node-html-parser');
// const request = require('request');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));



async function getCoockies() {
  const randomHeaders = randomUseragent.getRandomData()
  const response = await fetch('https://sib.fm/promocat')
  const page = await response.text()

  const root = HTMLParser.parse(page);
  const element = root.querySelector('[name="csrf-token"]')
  const token = element.getAttribute('content')


  const coockies = await response.headers.get('set-cookie')
  const xsr = coockies.match(/XSRF-TOKEN=.*?(?=;)/)[0]
  const laravel = coockies.match(/laravel_session=.*?(?=;)/)[0]
  const myCoockies = `${xsr}; ${laravel}`
  return [randomHeaders, token, myCoockies]
}

const diaposon = {
  // Секунды
  ot: 2,
  do: 10
}

async function start(count = 10) {

  const timeAut = () => Math.floor(Math.random() * ((diaposon.do * 1000) - (diaposon.ot * 1000) + 1)) + (diaposon.ot * 1000)// Задержка
  for (let i = 0; i < count; i++) {
    await new Promise((r) => setTimeout(r, timeAut()));
    const result = await Like()
    console.log("▶ ⇛ result:", result);
  }
  return `All Done`
}


async function Like() {
  try {
    // формируем headers
    const [randomHeaders, token, coockies] = await getCoockies()
    randomHeaders.Cookie = coockies
    randomHeaders['Content-Type'] = 'application/json'

    const response = await fetch('https://sib.fm/promocat/like', {
      method: 'POST',
      credentials: 'include', // Включаем передачу кук
      headers: randomHeaders,
      body: JSON.stringify({
        _token: token,
        id: '1652'
      }),
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


export default start;
