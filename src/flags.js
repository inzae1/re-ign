export function flagPath(id,turn=0){return `assets/flags/${id==='usa'&&turn>=34?'usa46':id}.svg`;}
export function countryFlag(id,turn=0){const image=document.createElement('img');image.src=flagPath(id,turn);image.className='country-flag';image.alt='';image.setAttribute('aria-hidden','true');image.width=32;image.height=20;image.draggable=false;return image;}
