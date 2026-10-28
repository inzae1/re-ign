import {historyTurn} from './calendar.js?v=20261028-midnight';
// Scores model diplomatic alignment, not historical measurements.
export const initialRelations={qing:50,russia:45,japan:20,britain:40,france:50,germany:40,usa:50,italy:40,austria:40,ottoman:40,siam:40,brazil:40};
export const relationOrigins={qing:'1899 한청통상조약 · 대등한 국교 회복',russia:'1898 고문 철수 이후 · 일본 견제와 이권 경쟁',japan:'1895 을미사변 이후 · 침략 압력',britain:'수교 상태 · 러시아 견제 우선',france:'1900 파리박람회 지원 · 기술·외교 교류',germany:'수교·통상 · 적극적 안전 보장 없음',usa:'수교·통상 · 외교 지원에 대한 기대',italy:'수교·통상 · 제한적 교류',austria:'1892 수교 · 제한적 교류',ottoman:'직접 수교 없음 · 제한적 접촉',siam:'직접 수교 없음 · 제한적 접촉',brazil:'직접 수교 없음 · 제한적 접촉'};
export function relationStatus(s,id){const d=s.diplomacy[id];if(s.annexed?.[id])return {label:'편입',tone:'friendly'};if(s.war?.phase==='active'&&s.war.enemyId===id)return {label:'교전',tone:'hostile'};if(d.allied)return {label:'동맹',tone:'friendly'};return d.relation>=60?{label:'우호',tone:'friendly'}:d.relation<30?{label:'적대',tone:'hostile'}:{label:'중립',tone:'neutral'};}
export const relationEvents=[
 {turn:8,id:'anglo-japanese',name:'영일동맹',deltas:{britain:-8,japan:-4}},
 {turn:13,id:'yongampo',name:'용암포 사건',deltas:{russia:-8}},
 {turn:16,id:'russo-japanese',name:'러일전쟁·한일의정서',deltas:{japan:-12,russia:-5}},
 {turn:22,id:'settlements1905',name:'가쓰라·태프트 대화·제2차 영일동맹·포츠머스 조약',deltas:{usa:-12,britain:-12,russia:-10}},
 {turn:23,id:'protectorate',name:'을사늑약 압력·열강 공관 철수',deltas:{japan:-12,france:-5,germany:-5,italy:-5,austria:-5}},
 {turn:30,id:'hague',name:'헤이그 특사 외교의 한계·정미7조약 압력',deltas:{japan:-8,britain:-4,france:-4,germany:-4}},
 {turn:38,id:'annexation',name:'병합 압력',deltas:{japan:-8}}
];
export function advanceRelations(s){
 s.relationSeen??=relationEvents.filter(e=>e.turn<historyTurn(s)).map(e=>e.id);s.relationChanges=[];
 for(const e of relationEvents){if(e.turn!==historyTurn(s)||s.relationSeen.includes(e.id))continue;s.relationSeen.push(e.id);if(e.turn>=16&&(s.diplomacy.japan.allied||s.war?.enemyId==='japan'||s.warArchive?.some(w=>w.enemyId==='japan')))continue;
 for(const [id,delta]of Object.entries(e.deltas)){const d=s.diplomacy[id];if(d.diverged||d.allied||s.war?.enemyId===id)continue;const before=d.relation;d.relation=Math.max(0,Math.min(100,before+delta));if(before!==d.relation)s.relationChanges.push({id,delta:d.relation-before,reason:e.name});}
 }
}

export function relationOrigin(s,id){if((s.startYear??1900)+Math.floor(s.turn/4)>=1900)return relationOrigins[id];const early={qing:'조공·책봉 관계 · 군사 점령과 구분',japan:'왜관 교역·서계 문제를 둘러싼 갈등',france:'병인양요 이후 대립 · 정식 수교 전',usa:'제너럴셔먼호 사건 이후 긴장 · 정식 수교 전'};return s.contacts?.[id]&&!['qing','japan'].includes(id)?'수교·사절 접촉 · 게임 속 외교 결과':early[id]||'공식 수교 전 · 제한적 접촉';}
