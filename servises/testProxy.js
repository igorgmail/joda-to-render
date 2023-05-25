// Получает обьект с массива проксей
// проверяет его на сайте api.myip.com совпадает ли ip прокси c ip который определяется
// Если не совпадает(т. е прокси не отрабатывает) --> false
// Если совпадант(прокси работает) --> обьект

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fetch = require('node-fetch');
import { HttpProxyAgent } from 'http-proxy-agent';


async function testProxy(obj){

  const abortController = new AbortController(); // Время ожидания до прерывания запроса
  const timeout = setTimeout(() => {
    abortController.abort();
  }, 5000);

  // const proxyUrl = `http://45.12.30.88:80`;
  const proxyUrl = `http://${obj.ip}:${obj.port}`;
  const proxyAgent = new HttpProxyAgent(proxyUrl);
try {
  const response = await fetch("https://api.myip.com/",{ signal: abortController.signal, agent: proxyAgent });
  const data = await response.json();
  if(data.ip !== obj.ip) return false
  
  console.log(`▶ ⇛ IP OK, ${obj.ip}:${obj.port}`);
  return obj
} catch (error) {
  console.log("Ошибка в testProxy IP --> ",obj.ip);
}

}

// const mockObj = {host: '45.12.30.88',ip: '5.239.245.61',port: '80',lastseen: 2984,delay: 760,cid: '1796236',country_code: 'CN',country_name: 'China',city: 'Shanghai',checks_up: '1658',checks_down: '138',anon: '4',http: '1',ssl: '0',socks4: '0',socks5: '0'}
// console.log("▶ ⇛ testProxy(mockObj):", await testProxy());
export default testProxy