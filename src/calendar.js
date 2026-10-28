export const DEFAULT_START_YEAR=1870;
export const END_YEAR=1910;
export const startYear=s=>s.startYear??1900;
export const yearOf=s=>startYear(s)+Math.floor(s.turn/4);
export const finalTurn=s=>(END_YEAR-startYear(s))*4;
// Dated datasets keep their original 1900-relative coordinates, including negative early dates.
export const historyTurn=s=>s.turn+(startYear(s)-1900)*4;
export const ownNationName=s=>historyTurn(s)<-9?'조선':'대한제국';
export function nationName(id,turn=0,base=1900){const year=base+Math.floor(turn/4);return id==='germany'&&year<1871?'북독일연방':id==='brazil'&&(year<1889||year===1889&&turn%4<3)?'브라질 제국':null;}
