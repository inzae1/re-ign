export function flagPath(id,turn=0){return `assets/flags/${id==='usa'&&turn>=34?'usa46':id}.svg`;}
function flagImage(id,turn){const image=document.createElement('img');image.src=flagPath(id,turn);image.alt='';image.setAttribute('aria-hidden','true');image.width=32;image.height=20;image.draggable=false;return image;}
export function countryFlag(id,turn=0){
  if(id==='austria'){const pair=document.createElement('span');pair.className='country-flag flag-pair';pair.setAttribute('aria-hidden','true');pair.title='오스트리아·헝가리 국기 병기';pair.append(flagImage('austria',turn),flagImage('hungary',turn));return pair;}
  const image=flagImage(id,turn);image.className='country-flag';return image;
}
