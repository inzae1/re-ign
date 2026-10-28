import {historyTurn} from './calendar.js?v=20261028-influence';
import {changeInfluence} from './influence.js?v=20261028-influence';
// Dates are historical lower bounds. Conditional demands and numerical terms are counterfactual.
const rows=[
 ['qing',1882,3,'청 상인의 내지 통상 요구','1882년 조청상민수륙무역장정은 청 상인의 통상 특권과 청의 종주권 주장을 담았습니다.','https://contents.history.go.kr/mobile/hm/view.do?levelId=hm_115_0050','상업 특권'],
 ['japan',1904,2,'일본의 재정 고문 파견 요구','1904년 제1차 한일협약으로 일본이 추천하는 재정·외교 고문을 두도록 강요받았습니다.','https://contents.history.go.kr/front/hm/view.do?levelId=hm_121_0150','재정 고문'],
 ['russia',1896,0,'러시아의 광산 이권 요구','1896년 러시아인 니시첸스키가 경성·경원 지역의 광산 채굴권을 얻었습니다.','https://theme.archives.go.kr/next/koreaOfRecord/CoalMine.do','광산 이권'],
 ['britain',1885,1,'영국 함대의 항만 사용 요구','영국은 러시아를 견제하려고 1885~1887년 거문도를 점령했습니다.','https://api.parliament.uk/historic-hansard/commons/1887/feb/03/the-northern-pacific-evacuation-of-port','항만 사용권'],
 ['france',1896,2,'프랑스의 철도 부설권 요구','1896년 7월 프랑스 회사에 경의철도 부설권을 허가했습니다. 허가가 철도의 실제 완공을 뜻하지는 않습니다.','https://sillok.history.go.kr/id/kza_13307003_001','철도 이권'],
 ['germany',1895,3,'세창양행의 광산 계약 요구','1895년 독일 영사는 은산 광산 채굴권을 세창양행에 허가해 달라고 요청했습니다.','https://dcollection.korea.ac.kr/srch/srchDetail/000000120177','광산 계약'],
 ['usa',1895,2,'미국 기업의 운산 광산 계약','1895년 운산 금광 계약은 미국인 사업가에게 채굴권과 세금 면제 등의 조건을 부여했습니다.','https://contents.history.go.kr/front/ht/view.do?levelId=ht_003_0040_0030_0030','채굴권'],
 ['italy',1908,3,'메시나 대지진의 여파','1908년 12월 28일 지진과 해일이 메시나와 레조칼라브리아를 강타했습니다.','https://www.protezionecivile.gov.it/en/pubblicazione/emergency-management-earthquake-calabria-sicily-december-28-1908/','구호 협약'],
 ['austria',1908,3,'보스니아 병합 위기','1908년 오스트리아·헝가리의 보스니아·헤르체고비나 병합이 외교 위기를 일으켰습니다.','https://hansard.parliament.uk/commons/1910-04-11/debates/14f5684e-4b66-4a2b-9489-42b73ebb98d0/BosniaAndHerzegovina','납품 계약'],
 ['ottoman',1908,2,'오스만 헌정 복구의 파장','1908년 7월 청년 튀르크 혁명으로 오스만의 헌정 체제가 복구되었습니다.','https://history.state.gov/historicaldocuments/frus1908/ch139','기술 협약'],
 ['siam',1905,1,'시암의 노예제 폐지법','시암은 점진적 개혁 끝에 1905년 노예제 폐지법을 시행했습니다.','https://culture.ssru.ac.th/en/news/view/news443','개혁 교류'],
 ['brazil',1904,3,'브라질 백신 폭동의 여파','1904년 리우데자네이루에서 백신 접종 정책을 둘러싼 폭동이 일어났습니다.','https://www12.senado.leg.br/institucional/arquivo/cont-arquivo-s/interesses-politicos-e-descaso-social-alimentaram-revolta-da-vacina-em-1904','통상 재협약']
];
export const influenceEvents=rows.flatMap(([country,year,quarter,title,basis,source,right],i)=>[0,...(i<7?[1]:[])].map(stage=>({
 id:`influence-${country}-${stage}`,country,stage,threshold:stage?65:35,minTurn:(year-1900)*4+quarter,type:'choice',when:`${year}년 역사에서 착안`,source,
 title:stage?`${title} · 특권 확대`:title,
 body:i<7?`${right}의 ${stage?'확대':'허용'}를 요구합니다. 지원을 받으면 외세의 관여도 깊어집니다.`:'의존하던 상대국의 변화가 교역과 기술 협약에 번지고 있습니다. 관계를 재정비해야 합니다.',
 scenario:`${basis}\n현재의 요구·국내 파급과 군수 기술 지원 계약은 영향력에 따라 발생하는 대체역사입니다.`,
 choices:[
 {name:i<7?'요구 수용':'협력 유지',desc:'국고 +12만 · 8분기 매분기 국고 −2만 / 군사 +1 · 영향력 +8',delta:{gold:12},influence:{[country]:8},relation:6,contract:{label:right,duration:8,fee:2,training:1}},
 {name:'기한 제한 협상',desc:'국고 −4만 · 4분기 매분기 군사 +1 / 국고 −1 · 영향력 +3',cost:4,delta:{gold:-4},influence:{[country]:3},relation:-4,contract:{label:right,duration:4,fee:1,training:1}},
 {name:i<7?'특권 거부':'의존 축소',desc:'민심 +3 · 영향력 −6 · 관계 −15',delta:{stability:3},influence:{[country]:-6},relation:-15}
 ]
})));
// Distant powers transmit their domestic shocks; they do not acquire invented Korean colonies.
const spillovers={
 italy:[['구호단 파견','국고 −8만 · 민심 +2 · 관계 +12 · 영향력 −4',{gold:-8,stability:2},12,-4],['구호금만 지원','국고 −4만 · 관계 +5',{gold:-4},5,0],['협약 정리','관계 −10 · 영향력 −8 · 통상 중단',{},-10,-8]],
 austria:[['납품처 다변화','국고 −6만 · 군사 +3 · 영향력 −8',{gold:-6,military:3},-5,-8],['기존 납품 유지','국고 −8만 · 군사 +5 · 영향력 +4',{gold:-8,military:5},5,4],['계약 중단','군사 −3 · 영향력 −10 · 통상 중단',{military:-3},-12,-10]],
 ottoman:[['헌정 조사단 파견','국고 −6만 · 민심 +5 · 영향력 −4',{gold:-6,stability:5},8,-4],['기술 협력 유지','국고 −4만 · 군사 +3 · 영향력 +3',{gold:-4,military:3},5,3],['고문단 소환','군사 −2 · 영향력 −8 · 통상 중단',{military:-2},-8,-8]],
 siam:[['신분제 개혁 연구','국고 −8만 · 민심 +8 · 영향력 −5',{gold:-8,stability:8},10,-5],['상호 시찰단 교환','국고 −4만 · 민심 +3 · 영향력 +2',{gold:-4,stability:3},6,2],['교류 축소','영향력 −8 · 관계 −8 · 통상 중단',{},-8,-8]],
 brazil:[['교역처 분산','국고 −6만 · 영향력 −8',{gold:-6},-4,-8],['운송 손실 인수','국고 −10만 · 민심 +2 · 관계 +8',{gold:-10,stability:2},8,2],['거래 철수','국고 −3만 · 영향력 −10 · 통상 중단',{gold:-3},-12,-10]]
};
for(const e of influenceEvents)if(spillovers[e.country])e.choices=spillovers[e.country].map(([name,desc,delta,relation,influence],i)=>({name,desc,delta,relation,influence:{[e.country]:influence},...(delta.gold<0?{cost:-delta.gold}:{}),endTrade:i===2}));
const byId=Object.fromEntries(influenceEvents.map(e=>[e.id,e]));
export function initializeInfluenceEvents(s){s.influenceEventHistory??=[];s.foreignContracts??=[];s.influenceEventTurn??=-4;}
export function scheduleInfluenceEvent(s){initializeInfluenceEvents(s);if(s.ended||s.event||s.eventQueue?.length||s.turn-s.influenceEventTurn<2)return false;
 const e=influenceEvents.filter(e=>historyTurn(s)>=e.minTurn&&s.influence[e.country]>=e.threshold&&!s.annexed?.[e.country]&&!(s.war?.phase==='active'&&s.war.enemyId===e.country)&&!s.influenceEventHistory.some(r=>r.id===e.id)&&(e.stage===0||s.influenceEventHistory.some(r=>r.id===`influence-${e.country}-0`&&s.turn-r.turn>=4))).sort((a,b)=>s.influence[b.country]-s.influence[a.country]||a.stage-b.stage)[0];
 if(!e)return false;s.event={...e};s.influenceEventTurn=s.turn;s.influenceEventHistory.push({id:e.id,turn:s.turn,choice:null});return true;
}
export function applyInfluenceChoice(s,e,c,index){if(!byId[e.id])return;initializeInfluenceEvents(s);const r=s.influenceEventHistory.find(r=>r.id===e.id);if(r)r.choice=index;const d=s.diplomacy[e.country];d.relation=Math.max(0,Math.min(100,d.relation+c.relation));if(c.endTrade)d.trade=false;if(c.contract){s.foreignContracts=s.foreignContracts.filter(r=>r.country!==e.country);s.foreignContracts.push({country:e.country,event:e.id,until:s.turn+c.contract.duration,...c.contract});}}
export function contractBalance(s){return (s.foreignContracts||[]).filter(r=>r.until>s.turn&&!s.annexed?.[r.country]).reduce((a,r)=>({gold:a.gold-r.fee,military:a.military+r.training}),{gold:0,military:0});}
export function advanceContracts(s){initializeInfluenceEvents(s);s.foreignContracts=s.foreignContracts.filter(r=>r.until>s.turn&&!s.annexed?.[r.country]);if(s.turn%4===0)for(const r of s.foreignContracts)changeInfluence(s,r.country,1,r.label+' 지속');}
export function validInfluenceEvents(s){initializeInfluenceEvents(s);return Number.isInteger(s.influenceEventTurn)&&s.influenceEventTurn>=-4&&s.influenceEventTurn<=s.turn&&Array.isArray(s.influenceEventHistory)&&new Set(s.influenceEventHistory.map(r=>r.id)).size===s.influenceEventHistory.length&&s.influenceEventHistory.every(r=>byId[r.id]&&Number.isInteger(r.turn)&&r.turn>=0&&r.turn<=s.turn&&(r.choice===null||Number.isInteger(r.choice)&&r.choice>=0&&r.choice<3))&&Array.isArray(s.foreignContracts)&&new Set(s.foreignContracts.map(r=>r.country)).size===s.foreignContracts.length&&s.foreignContracts.every(r=>{const e=byId[r.event];return e&&e.country===r.country&&e.choices.some(c=>c.contract&&['duration','fee','training','label'].every(k=>c.contract[k]===r[k]))&&Number.isInteger(r.until)&&r.until>=0&&r.until<=s.turn+8;});}
