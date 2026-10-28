export const taxOptions={light:{name:'감세',gold:9,stability:2,burden:-2},normal:{name:'통상 징수',gold:15,stability:-3,burden:0},heavy:{name:'강제 징수',gold:28,stability:-11,burden:3}};
export function taxPolicy(s,a){const tax=taxOptions[s.taxMode]||taxOptions.normal,drag=Math.min(12,(s.taxBurden||0)*2);return {...a,delta:{...a.delta,gold:Math.max(2,tax.gold-drag),stability:tax.stability},taxBurden:tax.burden};}
export function settleTaxation(s,a){s.taxBurden=Math.max(0,Math.min(8,(s.taxBurden||0)+(a.taxBurden??-1)));}
export function validTaxation(s){return (s.taxMode===undefined||Object.hasOwn(taxOptions,s.taxMode))&&(s.taxBurden===undefined||Number.isInteger(s.taxBurden)&&s.taxBurden>=0&&s.taxBurden<=8);}
