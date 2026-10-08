const targets=[
  {base:'https://saladesituacaounai.online/',environment:'producao',cloudflare:true},
  {base:'https://homologacao.sala-situacao-unai.pages.dev/',environment:'homologacao',cloudflare:true},
  {base:'https://victorfbio.github.io/sala-situacao-unai-homologacao/',environment:'homologacao',cloudflare:false},
];
async function get(url) {return fetch(url,{signal:AbortSignal.timeout(20000)});}
for(const {base,environment,cloudflare} of targets) {
const home=await get(base);
if(!home.ok||!home.url.startsWith('https://')) throw Error(`Portal: ${home.status}`);
const version=await get(base+'build-info.json');
let dataPath='data/dashboard-data.json';
if(version.ok) {
  const info=await version.json();
  if(info.environment!==environment||!Array.isArray(info.modules)) throw Error(`Identificação de versão inválida: ${base}`);
  if(cloudflare&&(info.hosting?.provider!=='cloudflare-pages'||info.basePath!=='/')) throw Error(`Hospedagem inesperada: ${base}`);
  dataPath='painel-de-monitoramento/'+dataPath;
} else if(cloudflare||version.status!==404) throw Error(`Identificação: ${base}: ${version.status}`);
const data=await get(base+dataPath);
if(!data.ok||typeof (await data.json()).queries!=='object') throw Error('Dados essenciais indisponíveis');
console.log(`HTTPS, versão e JSON essencial responderam: ${base}`);
}
