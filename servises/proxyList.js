// Получаем по API массив обьектов [{host: '220.248.70.237',ip: '220.248.70.237',port: '9002',lastseen: 2984,delay: 760,cid: '1796236',country_code: 'CN',country_name: 'China',city: 'Shanghai',checks_up: '1658',checks_down: '138',anon: '4',http: '1',ssl: '0',socks4: '0',socks5: '0'}, ...]
// Добавляем каждому обьекту поле count(рандомное число от 1 до n)
// Возвращаем массив обьектов с полем count
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fetch = require('node-fetch')

async function getProxyApi(){
  const url = 'http://justapi.info/api/proxylist.php?out=js&country=AMATKHCACNFIFRGEDEGRHKINIDITKZKRNLPLRORUESCHTHTRUAGBUSVN&maxtime=2000&anon=34&code=173997495602816'
  const response = await fetch(url)
  const arrayJson = await response.json()
  return arrayJson
}

function addCount(arrayJson, n){
  return arrayJson.map((el) => {
    el.count = Math.floor(Math.random() * (n - 1 + 1)) + 1
    return el
  })
}

async function getProxyList(){
const arrayProxy = await getProxyApi()
const newArrayProxy = await addCount(arrayProxy, 5)
console.log("GET PROXY LIST LENGTH -- > ", newArrayProxy.length);
return newArrayProxy
}

export default getProxyList;