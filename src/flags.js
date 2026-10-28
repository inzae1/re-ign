export function flagPath(id,turn=0,base=1900){
 const year=base+Math.floor(turn/4),quarter=turn%4;
 let asset=id;
 if(id==='korea'&&year<1899)asset='korea1882';
 if(id==='qing'&&year<1889)asset='qing1862';
 if(id==='brazil'&&(year<1889||year===1889&&quarter<3))asset='brazilEmpire';
 if(id==='russia'&&year<1896)asset='russia1858';
 if(id==='usa')asset=year<1877||year===1877&&quarter<2?'usa37':year<1890||year===1890&&quarter<2?'usa38':year<1891||year===1891&&quarter<2?'usa43':year<1896||year===1896&&quarter<2?'usa44':year<1908||year===1908&&quarter<2?'usa':'usa46';
 return `assets/flags/${asset}.svg`;
}
function flagImage(id,turn,base){const image=document.createElement('img');image.src=flagPath(id,turn,base);image.alt='';if(id==='korea'){const year=base+Math.floor(turn/4),name=year<1897||year===1897&&turn%4<3?'조선':'대한제국';image.title=name+' · '+(year<1899?'초기 태극기':'태극기');}image.setAttribute('aria-hidden','true');image.width=32;image.height=20;image.draggable=false;return image;}
export function countryFlag(id,turn=0,base=1900){
 if(id==='korea'&&(base+Math.floor(turn/4)<1882||base+Math.floor(turn/4)===1882&&turn%4<1)){const seal=document.createElement('span');seal.className='country-flag country-seal';seal.textContent='朝鮮';seal.title='조선 표지 · 태극기 사용 전(국기 아님)';seal.setAttribute('aria-hidden','true');return seal;}
 if(id==='austria'){const pair=document.createElement('span');pair.className='country-flag flag-pair';pair.setAttribute('aria-hidden','true');pair.title='오스트리아·헝가리 국기 병기';pair.append(flagImage('austria',turn,base),flagImage('hungary',turn,base));return pair;}
 const image=flagImage(id,turn,base);image.className='country-flag';return image;
}
