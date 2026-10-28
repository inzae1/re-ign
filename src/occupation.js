// Owner identity persists independently of the current war or later enemy changes.
export function occupyCity(s,city,country){s.occupied??=[];s.occupationOwners??={};if(!s.occupied.includes(city))s.occupied.push(city);s.occupationOwners[city]=country;}
export function liberateCity(s,city){s.occupied=s.occupied.filter(id=>id!==city);if(s.occupationOwners)delete s.occupationOwners[city];}
export function occupierOf(s,city){return s.occupied?.includes(city)?s.occupationOwners?.[city]||null:null;}
export function initializeOccupation(s,countries){
 s.occupationOwners??={};if(typeof s.occupationOwners!=='object'||Array.isArray(s.occupationOwners))return;
 for(const city of s.occupied){if(s.occupationOwners[city])continue;
 const current=s.war&&s.war.mode!=='offensive'&&(s.war.target===city||city==='seoul'&&s.war.capitalAssault||city==='seoul'&&s.war.fronts?.[2]?.integrity===0)?s.war:null;
 const archived=s.warArchive.find(w=>w.target===city&&['defeat','truce'].includes(w.outcome));
 const record=current||archived,id=record?.enemyId||Object.keys(countries).find(id=>countries[id].name===record?.enemy);
 if(id&&countries[id])s.occupationOwners[city]=id;
 }
}
