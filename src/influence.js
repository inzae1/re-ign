import {influence1870} from './setup-1870.js?v=20261029-growth';
import {yearOf,historyTurn,startYear} from './calendar.js?v=20261029-growth';
const initial1900={qing:8,russia:18,japan:24,britain:5,france:4,germany:3,usa:4,italy:1,austria:1,ottoman:0,siam:0,brazil:0};
const cap=n=>Math.max(0,Math.min(100,Math.round(n)));
export function initializeInfluence(s){if(s.influence===undefined)s.influence={...(startYear(s)<1900?influence1870:initial1900)};s.influenceLog??=[];s.influenceTurn??=s.turn;}
export function strongestInfluence(s){initializeInfluence(s);const [id,value]=Object.entries(s.influence).sort((a,b)=>b[1]-a[1])[0];return {id,value};}
export function changeInfluence(s,id,delta,reason){initializeInfluence(s);if(!Object.hasOwn(s.influence,id)||s.annexed?.[id])return;const before=s.influence[id];s.influence[id]=cap(before+delta);if(before!==s.influence[id])s.influenceLog.unshift({turn:s.turn,id,delta:s.influence[id]-before,reason});s.influenceLog=s.influenceLog.slice(0,50);}
export function influenceChanges(s,delta,reason){for(const [id,n]of Object.entries(delta||{}))changeInfluence(s,id,n,reason);}
export function loanCreditor(s){initializeInfluence(s);return Object.keys(s.diplomacy).filter(id=>s.diplomacy[id].relation>=30&&!(s.war?.phase==='active'&&s.war.enemyId===id)).sort((a,b)=>(s.influence[b]+s.diplomacy[b].relation/5)-(s.influence[a]+s.diplomacy[a].relation/5))[0]||null;}
export function policyInfluence(s,id){if(id==='loan'&&yearOf(s)>=1882){const creditor=loanCreditor(s);if(creditor)changeInfluence(s,creditor,8,'차관 의존');}else if(['arms','envoy','garrison','education'].includes(id)){const top=strongestInfluence(s);if(top.value)changeInfluence(s,top.id,yearOf(s)<1882?-1:-2,'자주 역량 확충');}}
export function influenceFloor(s,id){return Math.max(0,...(s.aftermath||[]).filter(r=>r.country===id).map(r=>r.type==='loan'?35:r.type==='adviser'?30:0),...(s.growth?.active||[]).filter(r=>r.country===id).map(r=>r.mode==='customs'?60:r.mode==='command'?40:0));}
export function diplomacyInfluence(s,id,action){if(action==='resist')changeInfluence(s,id,-Math.min(10,Math.max(0,s.influence[id]-influenceFloor(s,id))),'내정 간섭 항의');if(action==='trade')changeInfluence(s,id,3,'통상 의존');if(action==='aid')changeInfluence(s,id,4,'군사 지원 의존');if(action==='alliance'){const top=strongestInfluence(s);if(top.id!==id)changeInfluence(s,top.id,-6,'대항 동맹');changeInfluence(s,id,4,'동맹국 관여');}}
export function advanceInfluence(s){initializeInfluence(s);if(s.influenceTurn===s.turn)return;s.influenceTurn=s.turn;
 for(const [city,id]of Object.entries(s.occupationOwners||{}))if(s.occupied.includes(city))changeInfluence(s,id,4,'도시 점령');
 if(s.war?.phase==='active')changeInfluence(s,s.war.enemyId,1,'교전 압박');
 for(const [id,d]of Object.entries(s.diplomacy))if(d.trade&&s.influence[id]>=20&&s.turn%4===0)changeInfluence(s,id,1,'통상 의존 지속');
 if(s.arrears>=10||s.military<15||s.stability<20){const top=strongestInfluence(s);if(top.value>=25)changeInfluence(s,top.id,1,'내정 취약·체불');}
}
export function influenceWarResult(s){const w=s.war;if(w?.phase==='resolved'&&!(w.victoryPaid&&w.outcome==='victory'))changeInfluence(s,w.enemyId,w.outcome==='victory'?-20:w.outcome==='defeat'?18:w.settlement==='favorable'?-8:w.settlement==='white'?0:8,w.outcome==='victory'?'승전·외세 철수':w.outcome==='defeat'?'패전·개입 확대':'휴전 이권 양보');}
export function influenceNews(s,e){if(e.japanSettlement&&(s.war?.enemyId==='japan'||s.warArchive.some(w=>w.enemyId==='japan')))return;influenceChanges(s,e.influence,e.title);}
export const influenceState=value=>value>=100?'독립 상실':value>=80?'지배 위험':value>=60?'간섭 확대':value>=30?'영향력 존재':'제한적 관여';
export function validInfluence(s){return Array.isArray(s.influenceLog)&&s.influenceLog.every(r=>r&&Object.hasOwn(s.diplomacy,r.id)&&Number.isInteger(r.turn)&&r.turn>=0&&r.turn<=s.turn&&Number.isInteger(r.delta)&&typeof r.reason==='string')&&s.influence&&typeof s.influence==='object'&&!Array.isArray(s.influence)&&Object.keys(s.diplomacy).every(id=>Number.isInteger(s.influence[id])&&s.influence[id]>=0&&s.influence[id]<=100)&&Number.isInteger(s.influenceTurn)&&s.influenceTurn>=0&&s.influenceTurn<=s.turn;}
