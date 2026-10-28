import {countries} from './strategy.js?v=20261028-command';
export const spyCost=6;
export function readIntel(s,id){return s.intelligence?.[id]||null;}
export function spyChance(s,id){return Math.min(85,55+Math.floor((s.diplomacy[id]?.relation||0)/5)+(s.readiness||0)*3);}
export function spyBlockReason(s,id){if(!countries[id])return '국가를 선택하세요';if(s.ended)return '원정 종료';if(s.event)return '역사 사건에 먼저 대응하세요';if(s.actionUse?.intel===s.turn)return '이번 분기 첩보 완료';if(s.gold<spyCost)return '첩보 비용 60,000원 필요';return '';}
