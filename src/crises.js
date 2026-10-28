import {historyTurn} from './calendar.js?v=20261028-fx';
// Scripted fictional crises: separate from researched historical news.
export const forcedCrises=[
 {id:'harvest-shock',turn:10,when:'1902년 3분기',title:'흉작과 곡가 폭등',body:'곡물 수입과 긴급 구휼비가 국고를 덮쳤습니다.',flat:10,rate:.25,stability:-4,military:0},
 {id:'credit-shock',turn:22,when:'1905년 3분기',title:'금융 경색과 예금 인출',body:'신용이 얼어붙고 예금 인출이 몰려 긴급 자금이 투입됩니다.',flat:14,rate:.30,stability:-5,military:0},
 {id:'port-shock',turn:33,when:'1908년 2분기',title:'항만 폭풍과 복구 지출',body:'폭풍으로 항구의 물자와 시설이 파손되어 복구비가 발생했습니다.',flat:12,rate:.20,stability:-3,military:-2}
];
export function applyForcedCrises(s){s.crisisSeen||=[];s.crisisReport=null;for(const c of forcedCrises){if(c.turn!==historyTurn(s)||s.crisisSeen.includes(c.id))continue;const before=s.gold,bill=c.flat+Math.ceil(before*c.rate),loss=Math.min(before,bill),shortfall=before<bill?4:0;s.crisisSeen.push(c.id);s.gold-=loss;if(bill>loss)s.arrears=(s.arrears||0)+bill-loss;s.stability=Math.max(0,s.stability+c.stability-shortfall);s.military=Math.max(0,s.military+c.military);s.crisisReport={id:c.id,goldLost:loss,bill,shortfall,stabilityLoss:-c.stability+shortfall,militaryLoss:Math.abs(c.military)};const result=`피할 수 없는 위기 · ${c.title} · 국고 −${loss}만 · 민심 −${s.crisisReport.stabilityLoss}${c.military?' · 군사력 −'+(-c.military):''}${shortfall?' · 비상자금 부족':''}`;s.last=result;s.log.unshift(`${c.when} · ${result}`);}return s.crisisReport;}
