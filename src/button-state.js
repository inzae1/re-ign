// A completed action is not a toggle. Keep its result visible without suggesting it can run again.
export function markButton(button,state,label){
 button.dataset.buttonState=state;
 button.classList.toggle('action-selected',state==='done'||state==='queued');
 button.querySelector(':scope > .button-state-badge')?.remove();
 if(state==='done'||state==='queued'){
  button.disabled=true;
  button.querySelector(':scope > .selection-check')?.remove();
  const badge=button.ownerDocument.createElement('span');badge.className='button-state-badge';badge.textContent='✓ '+(label||(state==='queued'?'준비됨':'완료'));button.append(badge);
 }
 return button;
}
export function setCurrent(button,current){button.classList.toggle('active',current);button.setAttribute('aria-pressed',String(current));}
