export function seasonDate(turn,startYear=1900){return `${startYear+Math.floor(turn/4)}년 ${['겨울','봄','여름','가을'][turn%4]}`;}
export function quarterSnapshot(s){return {turn:s.turn,gold:s.gold,stability:s.stability,military:s.military};}
export function makeQuarterReport(before,s){if(s.turn!==before.turn+1)return null;return {turn:s.turn,acknowledged:false,action:s.last,delta:Object.fromEntries(['gold','stability','military'].map(k=>[k,s[k]-before[k]]))};}
export function pendingQuarterReport(s){const r=s.quarterReport;return !!r&&r.turn===s.turn&&r.acknowledged===false&&typeof r.action==='string'&&['gold','stability','military'].every(k=>Number.isFinite(r.delta?.[k]));}
