import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fetch = require('node-fetch');
import { HttpProxyAgent } from 'http-proxy-agent';
import getProxyList from './proxyList.js'
import testProxy from './testProxy.js'



async function chooseProxy(){
  const proxyList = await getProxyList()
  console.log("Получили прокси --> ", proxyList.length);

  // for(let i = 0; i < proxyList.length; i++){
  //   const isIpTrue = await testProxy(proxyList[i])
  //   if(isIpTrue) ferstStepArray.push(proxyList[i])
  // }

  const firstStepArray = async () => {
    const arr = await Promise.all(proxyList.map(async (el) => {
      const isIpTrue = await testProxy(el)
      if(isIpTrue) return el
    }))

  console.log("TEST", arr.length);
    return arr
  }
  return firstStepArray()
  } 


async function makeProxyList(){
  const oneStep = await chooseProxy()
  console.log("Первый отсев осталось прокси -->", oneStep.length);
}
makeProxyList()