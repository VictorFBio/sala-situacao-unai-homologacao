const base='https://victorfbio.github.io/sala-situacao-unai-homologacao/';
async function get(url) {return fetch(url,{signal:AbortSignal.timeout(20000)});}
const home=await get(base);
if(!home.ok||!home.url.startsWith('https://')) throw Error(`Portal: ${home.status}`);
const version=await get(base+'build-info.json');
let dataPath='data/dashboard-data.json';
if(version.ok) {
  const info=await version.json();
  if(info.environment!=='homologacao'||!Array.isArray(info.modules)) throw Error('Identificação de versão inválida');
  dataPath='painel-de-monitoramento/'+dataPath;
} else if(version.status!==404) throw Error(`Identificação: ${version.status}`);
const data=await get(base+dataPath);
if(!data.ok||typeof (await data.json()).queries!=='object') throw Error('Dados essenciais indisponíveis');
console.log('HTTPS, página principal e JSON essencial responderam.');
