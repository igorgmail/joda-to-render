import { createRequire } from "module";
const require = createRequire(import.meta.url);

const logger = require('morgan')
const express = require('express');
const fetch = require('node-fetch')
const HTMLParser = require('node-html-parser');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));


async function getCoockies(){
    const resultArray = [];
    let pageNumber = 1
// while(true){
  const response = await fetch(`https://sib.fm/promocat?page=1`)
  const page = await response.text()

  const root = HTMLParser.parse(page);
  const element = root.getElementById('b-c-prize')
  const divArray =  element.querySelectorAll('div>div> .bg-card-cat')
  if(divArray.length === 0) {
    console.log("Item block not found");
    // break
  }
  divArray.forEach((el) => {
    const item = el.getAttribute('item')
    const itemId = `card-c-like-${item}`
    const itemIdElement = el.parentNode.getElementById(itemId)
    const itemIdValue = itemIdElement.innerText.trim()
    resultArray.push({page: pageNumber,id: item,like: itemIdValue})
  })
  pageNumber += 1
// }
resultArray.sort((a, b) => b.like - a.like)
console.log("▶ ⇛ resultArray:", resultArray);

  return resultArray
}


getCoockies()

// app.listen(3001, () => {
//   console.log('Сервер запущен!!');
// });