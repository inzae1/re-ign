import {yearOf} from './calendar.js?v=20261029-growth';
import {changeInfluence,loanCreditor} from './influence.js?v=20261029-growth';

// Historical causes; triggers and consequences are counterfactual game rules.
export const growthEvents=[
 {id:'growth-military',type:'choice',growth:'military',when:'성장에 따른 위기',title:'신식 군대와 구식 군영의 충돌',body:'군비 확장이 군급·지휘 체계 정비를 앞질렀습니다. 구식 군영이 집단 항명합니다.',source:'https://contents.history.go.kr/mobile/nh/view.do?levelId=nh_038_0050_0010_0040_0030',scenario:'1882년 임오군란의 군급 체불·군제 갈등에서 착안한 가상 위기입니다. 시기와 발생 여부는 정책에 따라 달라집니다.',choices:[
  {name:'군급·군제 통합',desc:'증강 효과 절반 · 학교·지방군 정비 2회로 정상화',delta:{}},
  {name:'무력으로 해산',desc:'군사력 25% 이탈 · 민심 −8 · 군영 반란',delta:{stability:-8}},
  {name:'외국 교관에게 지휘 위임',desc:'외국 영향력 +20·최소 40 · 학교·지방군 정비 2회',delta:{}}
 ]},
 {id:'growth-grain',type:'choice',growth:'grain',when:'성장에 따른 위기',title:'수출항의 호황, 치솟는 쌀값',body:'곡물 반출이 늘며 국내 쌀값이 뛰었습니다. 통상 수입과 백성의 식량을 함께 지키기 어렵습니다.',source:'https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i402320',scenario:'개항 후 곡물 유출과 방곡령 분쟁에서 착안한 가상 위기입니다. 모든 교역이 실제로 곡물 수출이었다는 뜻은 아닙니다.',choices:[
  {name:'곡물 반출 제한',desc:'관세·통상 수입 절반 · 구휼 2회로 유통 정상화',delta:{}},
  {name:'국가가 곡물 수입',desc:'4분기 식량 보조금 · 구휼로 기간 단축',delta:{}},
  {name:'수출을 우선',desc:'민심 −18 · 식량 소요 · 구휼·교육 2회 필요',delta:{stability:-18}}
 ]},
 {id:'growth-debt',type:'choice',growth:'debt',when:'성장에 따른 위기',title:'채권국의 관세 관리 요구',body:'반복된 차입에 채권국이 상환 보증을 요구합니다. 자금 조달이 재정 자율성을 압박합니다.',source:'https://contents.history.go.kr/front/hm/view.do?levelId=hm_121_0150',scenario:'차관 의존과 1904년 외국인 재정 고문에 의한 간섭에서 착안한 가상 요구입니다. 실제 조약을 그대로 재현한 사건은 아닙니다.',choices:[
  {name:'관세 관리권 양보',desc:'상환 기간 연장 · 관세·통상 수입 절반 · 영향력 최소 60',delta:{}},
  {name:'국내 재정으로 전환',desc:'증강 효과 절반 · 징세·관세 정비 2회 · 새 차관은 개혁 지연',delta:{}}
 ]}
];
export const growthById=Object.fromEntries(growthEvents.map(e=>[e.id,e]));
const kinds=['military','grain','debt'];
const cap=n=>Math.max(0,Math.min(100,n));
export function initializeGrowth(s){s.growth??={pressure:{military:0,grain:0,debt:0},cooldown:{military:0,grain:0,debt:0},active:[],log:[]};}
function debt(s){return (s.aftermath||[]).filter(r=>r.type==='loan'&&r.country&&!s.annexed?.[r.country]);}
function partnerCount(s){return Object.values(s.diplomacy||{}).filter(d=>d.trade).length;}
function complete(s,r){s.growth.active=s.growth.active.filter(x=>x!==r);s.growth.cooldown[r.kind]=s.turn+12;s.growth.log.unshift({turn:s.turn,kind:r.kind,text:growthLabel(r)+' 해소'});s.growth.log=s.growth.log.slice(0,20);}
export function growthPolicy(s,id){initializeGrowth(s);const g=s.growth,p=g.pressure,modern=yearOf(s)>=1881;
 p.military=Math.max(0,Math.min(8,p.military+(modern&&['arms','envoy'].includes(id)?2:modern&&id==='garrison'?1:['relief','education'].includes(id)?-2:-1)+(s.arrears>=10?1:0)));
 p.grain=Math.max(0,Math.min(8,p.grain+(yearOf(s)>=1876&&s.war?.phase!=='active'&&id==='customs'?2:partnerCount(s)>=2&&id!=='relief'?1:id==='relief'?-3:-1)));
 p.debt=Math.min(8,debt(s).reduce((n,r)=>n+r.principal,0)>=30?p.debt+2:Math.max(0,p.debt-2));
 for(const r of [...g.active]){
  if(r.mode==='customs'&&(!debt(s).length||s.annexed?.[r.country])||r.mode==='command'&&s.annexed?.[r.country]){complete(s,r);continue;}
  if(r.kind==='military'&&['education','garrison'].includes(id)||r.kind==='grain'&&r.mode!=='imports'&&(id==='relief'||r.mode==='unrest'&&id==='education')||r.kind==='debt'&&r.mode==='reform'&&['tax','customs'].includes(id)||r.kind==='military'&&r.mode==='command'&&id==='education')r.progress++;
  if(r.mode==='imports'){r.remaining--;if(id==='relief')r.remaining--;}
  if(r.kind==='debt'&&r.mode==='reform'&&id==='loan')r.progress=0;
  if(r.progress>=2||r.mode==='imports'&&r.remaining<=0)complete(s,r);
 }
}
export function scheduleGrowth(s){initializeGrowth(s);if(s.ended||s.event||s.eventQueue.length)return;const kind=kinds.find(k=>s.growth.pressure[k]>=6&&s.turn>=s.growth.cooldown[k]&&!s.growth.active.some(r=>r.kind===k)&&(k!=='debt'||debt(s).length));if(kind)s.event={...growthById['growth-'+kind]};}
export function growthChoice(s,e,index){if(!e.growth)return;initializeGrowth(s);const kind=e.growth,g=s.growth;g.pressure[kind]=0;g.cooldown[kind]=s.turn+12;const r={kind,mode:'',progress:0,remaining:0,country:null};
 if(kind==='military'){
  if(index===1){const loss=Math.ceil(s.military*.25);s.military-=loss;if(s.rebellion)s.rebellion.strength=cap(s.rebellion.strength+25);else s.rebellion={city:'seoul',strength:45,turns:0,capitalThreat:false,capitalTaken:false};g.log.unshift({turn:s.turn,kind,text:`군영 반란 · 군사력 −${loss}`});g.log=g.log.slice(0,20);return;}
  r.mode=index===0?'integration':'command';if(index===2){r.country=loanCreditor(s);if(r.country)changeInfluence(s,r.country,20,'외국 교관 지휘 위임');}
 }else if(kind==='grain'){r.mode=['restriction','imports','unrest'][index];r.remaining=index===1?4:0;
 }else{r.mode=index===0?'customs':'reform';r.country=debt(s)[0]?.country||null;if(index===0){for(const loan of debt(s))loan.remaining=Math.min(12,loan.remaining+4);if(r.country)changeInfluence(s,r.country,Math.max(0,60-s.influence[r.country]),'관세 관리권 양보');}}
 g.active.push(r);g.log.unshift({turn:s.turn,kind,text:e.choices[index].name});g.log=g.log.slice(0,20);protectGrowth(s);
}
export function growthBalance(s){const b={gold:0,stability:0,military:0};for(const r of s.growth?.active||[]){if(['restriction','customs'].includes(r.mode))b.gold-=Math.ceil(partnerCount(s)/2);if(r.mode==='imports')b.gold-=6+partnerCount(s)*2;if(r.mode==='unrest')b.stability-=4;}return b;}
export function growthDelta(s,id,delta){const out={...delta},active=s.growth?.active||[];if(out.military>0&&active.some(r=>['integration','reform'].includes(r.mode)))out.military=Math.floor(out.military/2);if(id==='customs'&&active.some(r=>['restriction','customs'].includes(r.mode))&&out.gold>0)out.gold=Math.floor(out.gold/2);return out;}
export function protectGrowth(s){for(const r of s.growth?.active||[])if(['command','customs'].includes(r.mode)&&r.country&&!s.annexed?.[r.country]){const floor=r.mode==='customs'?60:40;if(s.influence[r.country]<floor)changeInfluence(s,r.country,floor-s.influence[r.country],'제도적 외세 의존');}}
export function growthLabel(r){return {integration:'군제 통합',command:'외국 지휘권',restriction:'곡물 반출 제한',imports:'식량 보조금',unrest:'식량 소요',customs:'관세 관리권 상실',reform:'재정 개혁'}[r.mode];}
export function growthHint(s,id){const p=s.growth?.pressure||{},active=s.growth?.active||[];if(['arms','envoy','garrison'].includes(id)&&active.some(r=>r.kind==='military'))return '군제 정비 중';if(id==='customs'&&active.some(r=>['restriction','customs'].includes(r.mode)))return '관세 수입 제한';if(['arms','envoy','garrison'].includes(id)&&yearOf(s)>=1881)return p.military>=4&&s.turn>=(s.growth?.cooldown.military||0)?'군영 항명 임박':'군제 갈등 누적';if(id==='customs'&&yearOf(s)>=1876)return p.grain>=4&&s.turn>=(s.growth?.cooldown.grain||0)?'식량 위기 임박':'곡물 유통 부담';if(id==='loan'&&yearOf(s)>=1882)return '반복 차입 시 관세권 요구';return '';}
export function growthWarnings(s){const p=s.growth?.pressure||{};return kinds.filter(k=>p[k]>=4&&s.turn>=s.growth.cooldown[k]&&!s.growth.active.some(r=>r.kind===k)).map(k=>({military:'군급·군제 갈등',grain:'곡물값 상승',debt:'채권국 압박'})[k]);}
export function growthDetail(s,r){return {integration:`증강 효과 절반 · 학교·지방군 정비 ${r.progress}/2`,command:`교관국 영향력 최소 40 · 학교·지방군 정비 ${r.progress}/2`,restriction:`관세·통상 수입 절반 · 구휼 ${r.progress}/2`,imports:`매 분기 국고 −${6+partnerCount(s)*2}만 · ${r.remaining}분기 · 구휼로 단축`,unrest:`매 분기 민심 −4 · 구휼·교육 ${r.progress}/2`,customs:'관세·통상 수입 절반 · 채권국 영향력 최소 60 · 차관 전액 상환으로 해소',reform:`증강 효과 절반 · 징세·관세 정비 ${r.progress}/2 · 새 차관 시 진행 초기화`}[r.mode];}
export function validGrowth(s){initializeGrowth(s);const g=s.growth;if(!g||typeof g!=='object'||Array.isArray(g)||!g.pressure||!g.cooldown||!Array.isArray(g.active)||!Array.isArray(g.log))return false;return kinds.every(k=>Number.isInteger(g.pressure[k])&&g.pressure[k]>=0&&g.pressure[k]<=8&&Number.isInteger(g.cooldown[k])&&g.cooldown[k]>=0&&g.cooldown[k]<=s.turn+12)&&g.active.length<=3&&new Set(g.active.map(r=>r.kind)).size===g.active.length&&g.active.every(r=>({military:['integration','command'],grain:['restriction','imports','unrest'],debt:['customs','reform']})[r.kind]?.includes(r.mode)&&Number.isInteger(r.progress)&&r.progress>=0&&r.progress<2&&Number.isInteger(r.remaining)&&r.remaining>=0&&r.remaining<=4&&(r.country===null||Object.hasOwn(s.diplomacy,r.country)))&&g.log.length<=20&&g.log.every(r=>kinds.includes(r.kind)&&Number.isInteger(r.turn)&&r.turn>=0&&r.turn<=s.turn&&typeof r.text==='string'&&r.text.length<200);}

export function growthChoiceReason(s,e,index){return e?.growth==='military'&&index===2&&!loanCreditor(s)?'지휘를 맡길 외국 없음':'';}

export function refreshGrowth(s){initializeGrowth(s);for(const r of [...s.growth.active])if(r.mode==='customs'&&(!debt(s).length||s.annexed?.[r.country])||r.mode==='command'&&s.annexed?.[r.country])complete(s,r);}
export function growthChoiceDescription(s,e,i){if(e?.growth==='grain'&&i===1)return `국고 −${6+partnerCount(s)*2}만/분기 · 4분기 · 구휼로 단축`;return e.choices[i].desc;}
