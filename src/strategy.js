import {portSupport,annexCountry,surrenderReason,foreignOccupation,captureForeignCity,releaseForeignCity,advanceConquest} from './conquest.js?v=20261029-finance';
import {changeInfluence,influenceFloor} from './influence.js?v=20261029-finance';
import {allianceReason,aidReason,enlist,coalitionTurn} from './alliance.js?v=20261029-finance';
import {relations1870} from './setup-1870.js?v=20261029-finance';
import {startYear} from './calendar.js?v=20261029-finance';
import {occupyCity,liberateCity,initializeOccupation} from './occupation.js?v=20261029-finance';
import {initialRelations} from './relations.js?v=20261029-finance';
import {foreignCities,findForeignCity,raidOrders} from './foreign-cities.js?v=20261029-finance';
import {changeCountry} from './country-simulation.js?v=20261029-finance';
export const countries={
 qing:{name:'청',flag:'清',color:'#d5b25e',initial:42,aid:{supplies:32,gold:8,morale:5}},
 russia:{name:'러시아 제국',flag:'Р',color:'#8baac3',initial:28,aid:{army:16,supplies:15,blockade:-18}},
 japan:{name:'일본 제국',flag:'日',color:'#cb8177',initial:18,aid:{army:12,supplies:24,blockade:-10}},
 britain:{name:'대영제국',flag:'英',color:'#d4a1ad',initial:24,aid:{supplies:16,blockade:-22}},
 france:{name:'프랑스',flag:'仏',color:'#9fbfd2',initial:22,aid:{army:10,supplies:20,morale:6}},
 germany:{name:'독일제국',flag:'独',color:'#b3afc6',initial:20,aid:{army:18,supplies:12}},
 usa:{name:'미국',flag:'米',color:'#b6c7d9',initial:30,aid:{gold:10,supplies:24}},
 italy:{name:'이탈리아 왕국',flag:'伊',color:'#c7ca91',initial:16,aid:{army:8,supplies:20}},
 austria:{name:'오스트리아-헝가리',flag:'墺',color:'#d6c096',initial:14,aid:{army:12,supplies:14,morale:8}},
 ottoman:{name:'오스만제국',flag:'土',color:'#c8b08d',initial:18,aid:{army:10,supplies:18,morale:8}},
 siam:{name:'시암 왕국',flag:'暹',color:'#b4c99c',initial:32,aid:{gold:4,supplies:28}},
 brazil:{name:'브라질',flag:'伯',color:'#c8d29b',initial:18,aid:{gold:6,supplies:24}}
};
const aidLabels={army:'병력',supplies:'보급',blockade:'봉쇄',morale:'사기',gold:'국고'};
export function aidDescription(id){const a=countries[id].aid,kit={army:a.army?Math.max(1,Math.floor(a.army/6)):0,supplies:Math.ceil((a.supplies||0)/4),blockade:Math.ceil((a.blockade||0)/4),morale:Math.ceil((a.morale||0)/3),gold:Math.ceil((a.gold||0)/4)};return '분기 지원 · '+Object.entries(kit).filter(([,v])=>v).map(([key,value])=>`${aidLabels[key]} ${value>0?'+':'−'}${Math.abs(value)}${key==='gold'?'만':key==='blockade'?'%':''}`).join(' · ');}
for(const [id,c]of Object.entries(countries)){c.specialty=aidDescription(id);c.initial=initialRelations[id];}

export function orderBlockReason(s,id){if(id!=='truce')return '';const w=s.war;if(w?.phase!=='active')return '교전 중에만 가능';if(w.occupationStage)return '';if(w.round<2)return '최소 2분기 교전 후 교섭 가능';const allied=Object.entries(s.diplomacy).some(([id,c])=>c.allied&&id!==w.enemyId);return w.enemyArmy<=55||allied||w.army<=25||w.fronts.some(f=>f.integrity===0)?'':'적 전력 55 이하·동맹·전선 함락·아군 25 이하 중 하나 필요';}
export const orders={defend:{name:'진지 방어',cost:4,description:'진지를 보강해 전선 손실을 줄입니다.',bonus:16},assault:{name:'반격 작전',cost:12,description:'적 전력을 크게 줄이지만 병력·보급 소모가 큽니다.',bonus:22},supply:{name:'보급선 확보',cost:10,description:'보급 +26, 봉쇄 −8. 이번 교전 방어는 약해집니다.',bonus:0},truce:{name:'휴전 교섭',cost:10,description:'2분기 교전 후 협상. 전황에 따라 도시 반환·현상 유지·배상 조건이 달라집니다.',bonus:0}};
const cap=v=>Math.max(0,Math.min(100,Math.round(v)));
const roll=s=>{s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296;};
export function initializeStrategy(s){s.concessions ??=0;s.invasionCooldownUntil??=0;s.invasionReport??=null;s.contacts??=Object.fromEntries(Object.keys(countries).map(id=>[id,startYear(s)>=1900||['qing','japan'].includes(id)]));s.diplomacy ||= {};for(const [id,c]of Object.entries(countries))if(s.diplomacy[id]===undefined)s.diplomacy[id]={relation:startYear(s)<1900?relations1870[id]:initialRelations[id],allied:false,trade:false};s.cityDamage ||=Object.fromEntries(['seoul','pyongyang','wonsan','busan'].map(id=>[id,0]));s.occupied ||= [];s.warArchive ||= [];initializeOccupation(s,countries);s.strategyReport ||=null;}
export function economyDamage(s){return Math.ceil(Object.values(s.cityDamage||{}).reduce((a,b)=>a+b,0)/100)+(s.occupied?.length||0)*2;}
export function treatyIncome(s){return Object.values(s.diplomacy||{}).filter(c=>c.trade).length;}
export function warCosts(s){if(s.war?.phase!=='active')return {gold:0,stability:0,military:0};return {gold:-6-Math.floor(s.war.blockade/25),stability:-2-s.occupied.length,military:0};}
export function effectivePolicy(s,id,a){const d={...a.delta};if(s.war?.phase==='active'&&id==='customs')d.gold=Math.floor(d.gold*(1-s.war.blockade/125));return d;}
export function beginCampaign(s,target='busan',enemy='japan'){if(s.war?.phase==='active')return s.war;initializeStrategy(s);const foreign=s.countryStates?.[enemy];if(foreign){changeCountry(s,enemy,{gold:-20});foreign.militaryDiverged=true;}const broken=s.diplomacy[enemy].allied;s.diplomacy[enemy].allied=false;s.diplomacy[enemy].trade=false;s.diplomacy[enemy].relation=0;s.diplomacy[enemy].diverged=true;if(broken)s.military=Math.max(0,s.military-3);s.war={id:`${s.turn}-${s.seed}-${s.warArchive.length}`,startedTurn:s.turn,model:2,enemyId:enemy,enemy:countries[enemy].name,target,phase:'active',round:0,total:null,outcome:null,capitalAssault:s.occupied.includes(target),army:s.military,enemyArmy:foreign?foreign.military:82,supplies:58+s.railways*4+portSupport(s).initialSupply,morale:72,blockade:42,fronts:[{id:'coast',name:target==='pyongyang'?'서북 국경선':'항만 방어선',integrity:70},{id:'rail',name:'철도 보급로',integrity:80},{id:'capital',name:'한성 외곽',integrity:90}],supportUsed:[],coalition:{},initialArmy:s.military,initialGold:s.gold,initialDamage:s.cityDamage[target]||0,report:[broken?'동맹이 파기되었습니다. 전쟁이 시작됩니다.':'항만 상륙 위협. 보급로와 한성을 지켜야 합니다.']};return s.war;}
export function peacePosition(s){const w=s.war;return w.army+w.fronts[0].integrity*.25-w.enemyArmy-w.blockade*.2;}
export function treatyOptions(s){const w=s.war;if(!w?.pendingTreaty)return [];return w.outcome==='victory'||w.settlement==='favorable'?[...(w.outcome==='victory'&&w.mode==='offensive'&&!w.occupationStage&&w.objectiveCity&&!foreignOccupation(s,w.enemyId,w.objectiveCity)?[{id:'occupy',name:'점령 작전 계속',note:'12만 · 최대 3분기 · 보급 20·군사 25 필요',disabled:s.gold<12||s.military<25||w.supplies<20}]:[]),...(w.outcome==='victory'&&w.mode==='offensive'?[{id:'surrender',name:'항복 요구',note:surrenderReason(s)||'국가 전체 편입',disabled:!!surrenderReason(s)}]:[]),...(Object.values(s.foreignOccupation||{}).some(c=>c.country===w.enemyId)?[{id:'return-city',name:'도시 반환',note:'점령 도시 반환 · 적 영향력 −12 · 관계 +15'}]:[]),{id:'reparations',name:w.mode==='offensive'?'배상 받고 철군':'배상금 청구',note:'상대국 잔여 국고에서 최대 20만 수령'},{id:'sovereignty',name:'이권 회수',note:'이권 양보 1단계 철폐 · 적 영향력 −8'}]:[{id:'pay',name:'배상금 지급',note:'국고 20만 지출 · 부족분 체불'},{id:'concession',name:'이권 양보',note:'분기 국고 −1만 · 군사력 −2 · 적 영향력 +6'}];}
export function selectTreaty(s,id){const w=s.war,o=treatyOptions(s).find(o=>o.id===id);if(!o||o.disabled)return false;const enemy=s.countryStates[w.enemyId],beforeTreatyGold=s.gold;if(id==='occupy'){w.initialGold=beforeTreatyGold-(w.summary?.battleTreasuryChange??0);s.gold-=12;w.phase='active';w.pendingTreaty=false;w.outcome=null;w.occupationStage=true;w.occupationRounds=0;w.victoryPaid=true;w.report=['적 주력 격퇴 · 점령 작전 준비'];s.actionUse.war=s.turn;s.queuedOrder={turn:s.turn,id:'assault'};w.terms.push('점령 작전 계속');return true;}if(!w.terms.includes('불가침 8분기'))w.terms.push('불가침 8분기');s.invasionCooldownUntil=s.turn+8;if(id==='surrender'&&!annexCountry(s))return false;if(id==='return-city'){for(const c of Object.values(s.foreignOccupation||{}))if(c.country===w.enemyId)releaseForeignCity(s,c.country,c.city);changeInfluence(s,w.enemyId,-12,'도시 반환 조약');s.diplomacy[w.enemyId].relation=cap(s.diplomacy[w.enemyId].relation+15);w.terms.push('점령 도시 반환 · 영향력 −12');}if(id==='reparations'){if(w.mode==='offensive')for(const c of Object.values(s.foreignOccupation||{}))if(c.country===w.enemyId)releaseForeignCity(s,c.country,c.city);const amount=Math.min(20,enemy.gold);changeCountry(s,w.enemyId,{gold:-amount});s.gold+=amount;w.terms.push('배상금 '+amount+'만 수령');}if(id==='sovereignty'){s.concessions=Math.max(0,s.concessions-1);changeInfluence(s,w.enemyId,-8,'전후 이권 회수');w.terms.push('이권 회수 · 적 영향력 −8');}if(id==='pay'){const paid=Math.min(20,s.gold);s.gold-=paid;s.arrears+=20-paid;changeCountry(s,w.enemyId,{gold:paid});w.terms.push('배상금 20만 · 체불 '+(20-paid)+'만');}if(id==='concession'){s.concessions=Math.min(3,s.concessions+1);changeInfluence(s,w.enemyId,6,'전후 이권 양보');w.terms.push('이권 양보 1단계');}w.pendingTreaty=false;w.treaty=id;if(w.summary){w.summary.treatyGold=s.gold-beforeTreatyGold;w.summary.treasuryChange=(w.summary.battleTreasuryChange??w.summary.treasuryChange)+w.summary.treatyGold;}const archived=s.warArchive.find(a=>w.id?a.id===w.id:a.turn===(w.endedTurn??s.turn)&&a.enemyId===w.enemyId);if(archived){archived.terms=[...w.terms];archived.treaty=id;archived.summary={...w.summary};}return true;}
function endCampaign(s,outcome,mutual=false){const w=s.war;s.invasionCooldownUntil=s.turn+8;w.phase='resolved';w.endedTurn=s.turn;w.outcome=outcome;w.settlement=mutual?'white':outcome==='truce'?(peacePosition(s)>=15?'favorable':peacePosition(s)>=-12?'white':'unfavorable'):outcome;w.terms=[];w.pendingTreaty=outcome==='defeat'||outcome==='victory'||w.settlement==='favorable'||w.settlement==='unfavorable';
 if(outcome==='victory'){if(w.mode==='offensive'&&w.objectiveCity){w.terms.push(foreignOccupation(s,w.enemyId,w.objectiveCity)?findForeignCity(w.enemyId,w.objectiveCity).name+' 확보':'도시 미점령 · 적 전력 격퇴');}if(!w.victoryPaid)s.stability=cap(s.stability+5);const held=s.occupied.filter(city=>s.occupationOwners[city]===w.enemyId);for(const city of held)liberateCity(s,city);w.terms.push(held.length?'점령 도시 '+held.length+'곳 반환':w.mode==='offensive'&&!w.occupationStage?'적 주력 격퇴 · 전후 방침 선택':'적군 철수');if(w.mode!=='offensive'||w.occupationStage)w.terms.push('불가침 8분기');w.report.push('승전 · 전후 방침 선택');}
 else if(outcome==='defeat'){for(const c of Object.values(s.foreignOccupation||{}))if(c.country===w.enemyId)releaseForeignCity(s,c.country,c.city);s.military=cap(s.military-8);s.stability=cap(s.stability-8);if(w.mode!=='offensive'){occupyCity(s,w.target,w.enemyId);w.terms.push('항만 점령');if(w.fronts[2].integrity===0||w.capitalAssault){occupyCity(s,'seoul',w.enemyId);w.terms.push('수도 함락');}}else w.terms.push('원정군 철수');w.terms.push('불가침 8분기');w.report.push('패전 · 전쟁 피해와 점령 유지');}
 else {if(w.settlement==='unfavorable')for(const c of Object.values(s.foreignOccupation||{}))if(c.country===w.enemyId)releaseForeignCity(s,c.country,c.city);s.stability=cap(s.stability-2);if(w.settlement==='favorable'){for(const city of [...s.occupied])if(s.occupationOwners[city]===w.enemyId)liberateCity(s,city);w.terms.push('유리한 휴전 · 점령군 철수');}else w.terms.push(w.settlement==='white'?(mutual?'양군 전력 붕괴 · 휴전':'현상 유지 휴전'):'불리한 휴전 · 배상 협상');w.terms.push('불가침 8분기');w.report.push(w.terms[0]);}
 w.summary={militaryLoss:Math.max(0,(w.initialArmy??w.army)-s.military),treasuryChange:s.gold-(w.initialGold??s.gold),battleTreasuryChange:s.gold-(w.initialGold??s.gold),treatyGold:0,damage:w.mode==='offensive'?(foreignOccupation(s,w.enemyId,w.objectiveCity)?.damage||0):Math.max(0,(s.cityDamage[w.target]||0)-(w.initialDamage||0)),damageScope:w.mode==='offensive'?'목표 도시':'국내 시설',allies:Object.entries(w.coalition||{}).map(([id,a])=>({id,...a}))};
 if(w.id)s.warArchive=s.warArchive.filter(a=>a.id!==w.id);s.warArchive.unshift({id:w.id,enemyId:w.enemyId,enemy:w.enemy,target:w.target,turn:s.turn,rounds:w.round,outcome,terms:[...w.terms],summary:w.summary});s.warArchive=s.warArchive.slice(0,12);
}
function occupationTurn(s,order){const w=s.war;w.occupationRounds++;w.report=[];const ports=portSupport(s);w.supplies=cap(w.supplies+ports.supply);if(ports.supply)w.report.push(`해외 항만 보급 +${ports.supply}`);if(order==='supply')w.supplies=cap(w.supplies+26);w.supplies=cap(w.supplies-12);s.military=cap(s.military-(w.supplies<10?7:3));w.army=s.military;advanceConquest(s,order,w.supplies>=10?10:-15);w.report.push(`점령 작전 ${w.occupationRounds}/3 · 진척 ${w.cityProgress}% · 보급 ${w.supplies}`);if(s.military<=8||w.supplies===0)endCampaign(s,'defeat');else if(foreignOccupation(s,w.enemyId,w.objectiveCity)||w.occupationRounds>=3||order==='truce')endCampaign(s,'victory');}
export function campaignTurn(s,policy={},order='defend'){const w=s.war;if(w?.phase!=='active')return;if(w.occupationStage){occupationTurn(s,order);return;}w.army=s.military;w.round++;w.report=[];const ports=portSupport(s);w.supplies=cap(w.supplies+ports.supply);w.blockade=cap(w.blockade-ports.blockade);if(ports.supply)w.report.push(`해외 항만 ${ports.ports.length}곳 · 보급 +${ports.supply} · 봉쇄 −${ports.blockade}%`);coalitionTurn(s,countries);const foreign=s.countryStates?.[w.enemyId];if(foreign)changeCountry(s,w.enemyId,{gold:-8});if([3,5].includes(w.round)){if(!foreign||foreign.gold>=4){if(foreign)changeCountry(s,w.enemyId,{gold:-4});w.enemyArmy=cap(w.enemyArmy+6);w.report.push('적 후속 부대 도착 · 적 전력 +6');}else w.report.push('적국 재정 부족 · 증원 중단');}if(foreign?.gold===0){w.enemyArmy=cap(w.enemyArmy-5);w.report.push('적국 군수 대금 부족 · 적 전력 −5');}if(s.gold===0){w.supplies=cap(w.supplies-12);w.report.push('국고 고갈로 군수 대금 연체 · 보급 −12');}if(order==='truce'){endCampaign(s,'truce');w.army=s.military;return;}if(order==='supply'){w.supplies=cap(w.supplies+26);w.blockade=cap(w.blockade-8);}if(order==='defend')w.army=cap(w.army+2);if(policy.defense){w.supplies=cap(w.supplies+policy.defense*2);}if(policy.income)w.supplies=cap(w.supplies+5);if(policy.group==='civil'&&!policy.income)w.morale=cap(w.morale+2);if(policy.name==='군사 교관 초빙'){w.blockade=cap(w.blockade-6);w.enemyArmy=cap(w.enemyArmy-2);}w.supplies=cap(w.supplies-10+s.railways*2-(order==='assault'?8:0));const shortage=w.supplies<18;const loss=3+Object.keys(s.foreignOccupation||{}).length+Math.floor(w.blockade/22)+(shortage?6:0)+(order==='assault'?4+Math.min(6,Math.floor(w.enemyArmy/Math.max(10,w.army)*2)):0);w.army=cap(w.army-loss);s.military=w.army;w.morale=cap(w.morale-3-(shortage?5:0)-s.occupied.length*2);const front=w.fronts.find(f=>f.integrity>0)||w.fronts[2];const balance=w.army*.58+w.morale*.18+front.integrity*.12+(orders[order]?.bonus||0)*(order==='assault'?Math.max(.2,Math.min(1,w.supplies/35))*Math.min(1.2,w.army/Math.max(20,w.enemyArmy)):1)-w.enemyArmy*.64-w.blockade*.15+(roll(s)-.5)*9;const hit=balance<0?Math.min(25,Math.ceil(8-balance*.38)):order==='assault'?0:2;front.integrity=cap(front.integrity-hit+(balance>8&&order==='defend'?4:0));w.enemyArmy=cap(w.enemyArmy-Math.max(2,Math.round(w.army*.04)+(order==='assault'?Math.round(8*Math.min(1.5,w.army/Math.max(20,w.enemyArmy))*Math.max(.2,Math.min(1,w.supplies/35))):0)+(balance>0?1:0)));w.blockade=cap(w.blockade+3);const damage=5+Math.ceil(hit/3);if(w.mode==='offensive')changeCountry(s,w.enemyId,{gold:-Math.ceil(damage/2)});else s.cityDamage[w.target]=cap(s.cityDamage[w.target]+damage);w.report.push(`${front.name} ${hit?'−'+hit:'유지'} · 병력 −${loss} · 보급 ${w.supplies}`);w.report.push(`${w.enemy} 전력 ${w.enemyArmy} · 봉쇄 ${w.blockade}% · ${w.mode==='offensive'?'원정 교두보 '+w.fronts[0].integrity+'%':'항만 피해 '+s.cityDamage[w.target]+'%'}`);if(shortage){s.stability=cap(s.stability-3);w.report.push('보급 부족으로 병력 손실 증가 · 민심 −3');}if(w.mode!=='offensive'&&w.fronts[0].integrity===0&&!s.occupied.includes(w.target)){occupyCity(s,w.target,w.enemyId);s.military=cap(s.military-5);s.stability=cap(s.stability-4);w.report.push('항구가 점령되었습니다. 피난민 발생 · 군사력 −5 · 민심 −4');}advanceConquest(s,order,balance);if(s.military<=8&&w.enemyArmy<=8&&w.fronts[2].integrity>0)endCampaign(s,'truce',true);else if(s.military<=8||w.morale<=8||w.fronts[2].integrity===0)endCampaign(s,'defeat');else if(w.enemyArmy<=18||(w.round>=6&&w.enemyArmy<=35&&w.army>15))endCampaign(s,'victory');else if(w.round>=8)endCampaign(s,s.occupied.includes(w.target)?'defeat':'truce');if(foreign)changeCountry(s,w.enemyId,{military:-2});w.army=s.military;s.strategyReport=w.report.join(' / ');}
export function diplomacyOptions(s,id){const c=countries[id]&&s.diplomacy[id];if(!c||s.annexed?.[id])return [];const enemy=s.war?.phase==='active'&&s.war.enemyId===id;return [
{id:'resist',name:'내정 간섭 항의',cost:8,description:'영향력 −10 · 관계 −6',reason:s.influence?.[id]<=influenceFloor(s,id)&&influenceFloor(s,id)>0?'담보·교관 계약 해소 필요':'',disabled:enemy||!(s.influence?.[id]>influenceFloor(s,id))},
{id:'envoy',name:'친선 사절 파견',cost:6,description:'관계 +18. 국정 정책과 별도입니다.',disabled:enemy},
{id:'trade',name:c.trade?'통상 협약 체결됨':'통상 협약',cost:5,description:'관계 40 이상 · 분기 수입 +1만. ',disabled:enemy||!s.contacts?.[id]||c.trade||c.relation<40},
{id:'alliance',name:c.allied?'동맹 체결됨':'방위 동맹 제안',cost:20,description:allianceReason(s,id)||'4년 방위 조약 · 분담금 2만/지원 분기',reason:allianceReason(s,id),disabled:enemy||!s.contacts?.[id]||!!allianceReason(s,id)},
{id:'aid',name:'참전 요청',cost:0,description:'다음 교전부터 지속 지원 · 분담금 2만/분기',reason:aidReason(s,id),disabled:!!aidReason(s,id)}];}
export function conductDiplomacy(s,id,action){const c=s.diplomacy?.[id],o=c&&diplomacyOptions(s,id).find(o=>o.id===action);if(!o||o.disabled||s.gold<o.cost)return false;s.gold-=o.cost;if(action==='resist')c.relation=cap(c.relation-6);if(action==='trade'||action==='alliance')c.diverged=true;if(action==='envoy')c.relation=cap(c.relation+18);if(action==='trade'){c.tradeSince=s.turn;c.trade=true;c.relation=cap(c.relation+5);}if(action==='alliance'){c.allianceUntil=s.turn+16;c.allied=true;c.relation=cap(c.relation+8);}if(action==='aid')enlist(s,id);return true;}
export function repairCity(s,id){if(s.war?.phase==='active'||s.occupied.includes(id)||!s.cityDamage[id]||s.gold<8)return false;s.gold-=8;s.cityDamage[id]=Math.max(0,s.cityDamage[id]-35);s.stability=cap(s.stability+3);return true;}
export function negotiateReturn(s,id){if(s.war?.phase==='active'||!s.occupied.includes(id)||s.gold<15||s.military<45||!Object.values(s.diplomacy).some(c=>c.allied))return false;s.gold-=15;liberateCity(s,id);return true;}

export function declarationBlockReason(s,id){
 if(!countries[id])return '국가를 선택하세요';
 if(s.annexed?.[id])return '우리 지배 지역';
 if(s.ended)return '종료된 원정입니다';
 if(s.event)return '역사 사건에 먼저 대응하세요';
 if(s.war?.phase==='active')return '진행 중인 전쟁을 먼저 끝내세요';
 if(s.gold<20)return '동원비 200,000원 필요';
 if(s.military<35)return '군사력 35 이상 필요';
 if(s.war?.pendingTreaty)return '전후 조약을 먼저 선택하세요';
 const last=s.warArchive.find(w=>w.enemy===countries[id].name);
 if(last&&s.turn-last.turn<8)return `종전 후 ${8-(s.turn-last.turn)}분기 재정비 필요`;
 return '';
}
export function declareCampaign(s,id){
 if(declarationBlockReason(s,id))return false;
 const preMobilizationGold=s.gold;s.gold-=20;s.stability=cap(s.stability-6);
 for(const [other,d]of Object.entries(s.diplomacy))if(other!==id)d.relation=cap(d.relation-8);
 const w=beginCampaign(s,id==='qing'?'pyongyang':id==='russia'?'wonsan':'busan',id);
 w.initialGold=preMobilizationGold;w.mode='offensive';w.capitalAssault=false;w.objectiveCity=foreignCities[id].find(c=>c.coastal&&!foreignOccupation(s,id,c.id))?.id||foreignCities[id].find(c=>!foreignOccupation(s,id,c.id))?.id;w.cityProgress=0;
 w.fronts=[{id:'coast',name:'원정 교두보',integrity:70},{id:'rail',name:'원정 보급로',integrity:80},{id:'capital',name:'원정군 본진',integrity:90}];
 w.report=[`${w.enemy}에 선전포고 · 동원비 200,000원 · 민심 −6 · 다른 국가 관계 −8`];
 return true;
}

export function raidBlockReason(s,country,cityId,kind){
 const city=findForeignCity(country,cityId),o=raidOrders[kind];
 if(!city||!o)return '작전 대상을 선택하세요';
 if(foreignOccupation(s,country,cityId))return '우리 군 주둔지';
 if(kind==='bombard'&&!city.coastal)return '해군 포격은 항구 도시에서만 가능';
 return declarationBlockReason(s,country)||(s.gold<o.cost?`원정 준비비 ${o.cost}만 필요`:'');
}
export function raidCampaign(s,country,cityId,kind){
 if(raidBlockReason(s,country,cityId,kind))return false;
 const city=findForeignCity(country,cityId),o=raidOrders[kind];
 declareCampaign(s,country);s.gold-=o.cost-20;s.stability=cap(s.stability-4);s.military=cap(s.military-o.ownMilitary);
 for(const [id,d]of Object.entries(s.diplomacy))if(id!==country)d.relation=cap(d.relation-4);
 changeCountry(s,country,{gold:-o.enemyGold,military:-o.enemyMilitary,stability:-3});
 const w=s.war;w.cause='surprise';w.attackCity=cityId;w.objectiveCity=cityId;w.cityProgress=0;w.raidKind=kind;w.enemyArmy=cap(w.enemyArmy-o.enemyMilitary-8);w.army=s.military;
 w.fronts[0].name=city.name+' 교두보';w.report=[`${city.name} ${o.name} · 선전포고 없이 교전 개시`];
 return true;
}

export function recoveryBlockReason(s,id,kind='repair'){
 if(!Object.hasOwn(s.cityDamage,id)||!['repair','return'].includes(kind))return '복구 대상 없음';
 if(s.ended)return '원정 종료';
 if(s.event)return '사건 대응 필요';
 if(s.war?.phase==='active')return '교전 종료 후 가능';
 if(s.actionUse?.civic===s.turn)return '이번 대응 완료 · 다음 계절에 가능';
 if(kind==='return')return !s.occupied.includes(id)?'점령지 아님':s.gold<15?'국고 150,000원 필요':s.military<45?'군사력 45 필요':!Object.values(s.diplomacy).some(c=>c.allied)?'동맹국 1개 필요':'';
 return s.occupied.includes(id)?'점령군 철수 후 가능':!s.cityDamage[id]?'복구할 피해 없음':s.gold<8?'국고 80,000원 필요':'';
}
