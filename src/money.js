// Simulation amounts are stored in units of 10,000 won, including legacy saves.
export function won(value){return `${Math.round(Math.abs(value)*10000).toLocaleString('ko-KR')}원`;}
export function currencyText(value){if(typeof value!=='string')return value;return value.replace(/국고\s*([+−-]?)(\d+)(만)?/g,(match,sign,n,unit,offset,text)=>{if(!unit&&/^[\d,]*원/.test(text.slice(offset+match.length)))return match;return `국고 ${sign}${won(Number(n))}`;}).replace(/([+−-]?)(\d+)만/g,(_,sign,n)=>sign+won(Number(n)));}
