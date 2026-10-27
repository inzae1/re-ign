export function seasonDate(turn){return `${1900+Math.floor(turn/4)}년 ${['겨울','봄','여름','가을'][turn%4]}`;}
export function quarterSnapshot(s){return {turn:s.turn,gold:s.gold,stability:s.stability,sovereignty:s.sovereignty};}
export function makeQuarterReport(before,s){if(s.turn!==before.turn+1)return null;return {turn:s.turn,acknowledged:false,action:s.last,delta:Object.fromEntries(['gold','stability','sovereignty'].map(k=>[k,s[k]-before[k]]))};}
export function pendingQuarterReport(s){const r=s.quarterReport;return !!r&&r.turn===s.turn&&r.acknowledged===false&&typeof r.action==='string'&&['gold','stability','sovereignty'].every(k=>Number.isFinite(r.delta?.[k]));}
