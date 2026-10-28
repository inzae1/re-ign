import {startYear} from './calendar.js?v=20261028-buttons';
import {military1870,personnel1870to1910,countryEconomy1870,stability1870} from './setup-1870.js?v=20261028-buttons';
import {historicalMilitary,militaryAnnualChange} from './military-history.js?v=20261028-buttons';
import {worldEvents} from './world-history.js?v=20261028-buttons';
// Initial scores, tax yields and all numerical effects are game modelling choices, not archival statistics.
export const countryProfiles={
 qing:{gold:250,military:historicalMilitary.qing.score,stability:48,tax:14,maintenance:13,context:'의화단 사태·배상 부담과 신정 개혁'},
 russia:{gold:400,military:historicalMilitary.russia.score,stability:48,tax:24,maintenance:22,context:'대규모 군대·러일전쟁·1905년 혁명'},
 japan:{gold:240,military:historicalMilitary.japan.score,stability:62,tax:18,maintenance:17,context:'군비 확대·외채 조달·러일전쟁의 부담'},
 britain:{gold:600,military:historicalMilitary.britain.score,stability:68,tax:30,maintenance:26,context:'보어전쟁과 해군 유지·드레드노트 경쟁'},
 france:{gold:430,military:historicalMilitary.france.score,stability:58,tax:23,maintenance:20,context:'공화국 정치·드레퓌스 사건·영불협상'},
 germany:{gold:450,military:historicalMilitary.germany.score,stability:62,tax:27,maintenance:24,context:'산업·군비 확대와 유럽 해군 경쟁'},
 usa:{gold:500,military:historicalMilitary.usa.score,stability:66,tax:31,maintenance:23,context:'산업 성장·1907년 금융 공황·함대 세계 순항'},
 italy:{gold:220,military:historicalMilitary.italy.score,stability:51,tax:14,maintenance:13,context:'제한된 재정 여력과 1908년 메시나 대지진'},
 austria:{gold:300,military:historicalMilitary.austria.score,stability:46,tax:20,maintenance:18,context:'다민족 제국의 긴장과 보스니아 병합'},
 ottoman:{gold:130,military:historicalMilitary.ottoman.score,stability:40,tax:12,maintenance:13,context:'재정 부담과 1908년 헌정 복구'},
 siam:{gold:80,military:historicalMilitary.siam.score,stability:58,tax:9,maintenance:7,context:'출라롱꼰 시기의 행정·사회 개혁'},
 brazil:{gold:150,military:historicalMilitary.brazil.score,stability:49,tax:13,maintenance:11,context:'공화정 도시 개혁과 1904년 백신 반란'}
};
const world=(id,impacts)=>{const e=worldEvents.find(e=>e.id===id);return {id:'world-'+id,turn:e.turn,when:e.when,title:e.title,source:e.source,impacts};};
const event=(id,when,title,source,impacts)=>({id,when,title,source,turn:(Number(when.slice(0,4))-1900)*4+Math.floor((Number(when.slice(5,7))-1)/3),impacts});
export const countryEvents=[
 world('boxer1900',{qing:{gold:-65,military:-14,stability:-12}}),
 event('boxer-protocol','1901-09','신축조약과 청의 배상 부담','https://history.state.gov/historicaldocuments/frus1907p1/d153',{qing:{gold:-60,stability:-7,military:-3}}),
 world('boer1902',{britain:{gold:16,stability:5,military:2}}),
 world('cordiale1904',{france:{stability:4},britain:{stability:3}}),
 event('war-finance','1904-02','러일전쟁 전비와 일본의 외채 조달','https://www.jacar.go.jp/english/exhibition/nichiro/19040217.htm',{japan:{gold:-45,military:3,stability:-4},russia:{gold:-40,military:-3,stability:-5}}),
 event('vaccine-revolt','1904-11','브라질 백신 반란','https://www12.senado.leg.br/institucional/arquivo/cont-arquivo-s/interesses-politicos-e-descaso-social-alimentaram-revolta-da-vacina-em-1904',{brazil:{gold:-20,military:-3,stability:-16}}),
 event('russian-revolution','1905-01','피의 일요일과 러시아 혁명','https://tile.loc.gov/storage-services/master/frd/frdcstdy/ru/russiacountrystu00curt/russiacountrystu00curt.pdf',{russia:{gold:-40,military:-9,stability:-20}}),
 event('siam-reform','1905-04','시암 노예제 폐지법','https://culture.ssru.ac.th/en/news/view/news443',{siam:{gold:-8,stability:9,military:1}}),
 world('tsushima1905',{russia:{gold:-25,military:-12,stability:-7},japan:{military:6,gold:-15}}),
 world('portsmouth1905',{russia:{stability:5},japan:{military:4,gold:-12}}),
 event('hibiya','1905-09','일본 히비야 소요와 계엄','https://www.jacar.go.jp/english/exhibition/nichiro/19050906.htm',{japan:{stability:-14,gold:-10}}),
 world('dreadnought1906',{britain:{military:5,gold:-25},germany:{military:3,gold:-18}}),
 world('quake1906',{usa:{gold:-35,stability:-5}}),
 world('dreyfus1906',{france:{stability:6}}),
 world('panic1907',{usa:{gold:-90,stability:-13},britain:{gold:-25,stability:-3},france:{gold:-20,stability:-3},germany:{gold:-20,stability:-3}}),
 event('young-turk','1908-07','오스만 제국 헌정 복구','https://history.state.gov/historicaldocuments/frus1908/ch139',{ottoman:{gold:-12,military:-3,stability:8}}),
 event('bosnia','1908-10','오스트리아·헝가리의 보스니아 병합','https://hansard.parliament.uk/commons/1910-04-11/debates/14f5684e-4b66-4a2b-9489-42b73ebb98d0/BosniaAndHerzegovina',{austria:{gold:-20,military:3,stability:-7},ottoman:{gold:-10,stability:-6}}),
 event('messina','1908-12','메시나 대지진과 복구 부담','https://www.protezionecivile.gov.it/en/pubblicazione/emergency-management-earthquake-calabria-sicily-december-28-1908/',{italy:{gold:-45,military:-3,stability:-8}}),
 world('fleet1909',{usa:{military:4,gold:-15,stability:3}})
].sort((a,b)=>a.turn-b.turn);
const cap=n=>Math.max(0,Math.min(100,Math.round(n)));
function tick(s,turn){for(const [id,profile]of Object.entries(countryProfiles)){const p=startYear(s)<1900?{...profile,...countryEconomy1870[id]}:profile,c=s.countryStates[id];c.lastChanges={gold:0,military:0,stability:0};c.investments=[];const before={gold:c.gold,military:c.military,stability:c.stability};if(turn>0){c.gold=Math.max(0,c.gold+p.tax+Math.floor(turn/24)-p.maintenance-(c.stability<30?4:0));if(turn%4===0&&c.gold>p.maintenance){c.gold-=4;c.military=cap(c.military+(c.militaryDiverged?0:annualChange(id,startYear(s)+Math.floor(turn/4))));}const fighting=s.war?.phase==='active'&&s.war.enemyId===id,controlled=!!s.annexed?.[id];const baseline=startYear(s)<1900?military1870[id].score:profile.military,year=startYear(s)+Math.floor(turn/4),goal=Math.min(95,Math.round(startYear(s)<1900&&year<1900?baseline+(profile.military-baseline)*(year-1870)/30:profile.military+Math.floor((year-1900)/8))+3);if(!fighting&&!controlled&&turn%2===0&&turn>(c.rebuildAfter??-1)&&c.gold>p.maintenance*2&&c.stability>=30&&c.military<goal){c.gold-=2;c.military=cap(c.military+1);c.investments.push('군비 투자');}if(turn%2===0&&c.gold>p.maintenance&&!controlled&&c.stability<Math.min(75,(startYear(s)<1900?stability1870[id]:profile.stability)+10)){c.gold--;c.stability=cap(c.stability+1);c.investments.push('민생 투자');}if(c.gold===0){c.military=cap(c.military-3);c.stability=cap(c.stability-2);}if(c.stability<25)c.military=cap(c.military-2);}const events=countryEvents.filter(e=>e.turn===turn+(startYear(s)-1900)*4&&e.impacts[id]);for(const e of events){if(s.annexed?.[id])continue;for(const [key,n]of Object.entries(e.impacts[id])){if(key==='military'&&c.militaryDiverged)continue;c[key]=key==='gold'?Math.max(0,c[key]+n):cap(c[key]+n);}c.history.push(e.id);c.latestEvent=e.id;}for(const key of ['gold','military','stability'])c.lastChanges[key]=c[key]-before[key];c.turn=turn;if(s.intelligence?.[id]&&s.intelUntil?.[id]>=turn&&s.intelligence[id].turn<turn&&!(s.war?.phase==='active'&&s.war.enemyId===id)){s.intelligence[id]={turn,gold:c.gold,military:c.military,stability:c.stability};}}}
export function initializeWorld(s){s.countryStates||={};for(const [id,p]of Object.entries(countryProfiles))s.countryStates[id]||={gold:startYear(s)<1900?countryEconomy1870[id].gold:p.gold,military:startYear(s)<1900?military1870[id].score:p.military,stability:startYear(s)<1900?stability1870[id]:p.stability,history:[],latestEvent:null,turn:-1,lastChanges:{gold:0,military:0,stability:0}};s.worldTurn??=-1;advanceWorld(s);}
export function advanceWorld(s){if(!s.countryStates)return initializeWorld(s);while(s.worldTurn<s.turn){s.worldTurn++;tick(s,s.worldTurn);}}
export function validWorld(s){return Number.isInteger(s.worldTurn)&&s.worldTurn>=0&&s.worldTurn<=s.turn&&Object.keys(countryProfiles).every(id=>{const c=s.countryStates?.[id];return c&&Number.isInteger(c.gold)&&c.gold>=0&&['military','stability'].every(k=>Number.isInteger(c[k])&&c[k]>=0&&c[k]<=100)&&Array.isArray(c.history)&&c.history.every(id=>countryEvents.some(e=>e.id===id))&&Number.isInteger(c.turn)&&c.turn<=s.turn;});}
export function changeCountry(s,id,delta){const c=s.countryStates?.[id];if(!c)return;if(delta.military){c.militaryDiverged=true;if(delta.military<0)c.rebuildAfter=s.turn+4;}for(const [key,n]of Object.entries(delta)){const before=c[key];c[key]=key==='gold'?Math.max(0,c[key]+n):cap(c[key]+n);c.lastChanges[key]=(c.lastChanges[key]||0)+c[key]-before;}}

function annualChange(id,year){const a=personnel1870to1910[id]?.[year-1],b=personnel1870to1910[id]?.[year];if(!a||!b)return 0;return Math.max(-3,Math.min(3,Math.round(Math.log(b/a)*5)));}
