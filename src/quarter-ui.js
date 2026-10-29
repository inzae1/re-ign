import {currencyText,won} from './money.js?v=20261029-campaign2';
import {seasonDate,pendingQuarterReport} from './quarter-report.js?v=20261029-campaign2';
import {worldNewsAt} from './world-history.js?v=20261029-campaign2';
const el=(tag,text,cl)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=currencyText(text);if(cl)n.className=cl;return n;};
function sourceLink(item){const a=el('a','자료 확인 ↗','brief-source');a.href=item.source;a.target='_blank';a.rel='noopener noreferrer';return a;}
export function worldContext(turn,startYear=1900){const section=el('section',undefined,'brief-world'),news=worldNewsAt(turn,startYear);section.append(el('small',news.recent?'직전 세계 소식 · 당시 보도 시점':'같은 시기, 세계에서는'),el('h3','세계의 흐름'));if(!news.items.length)section.append(el('p','이 시점에 등록된 세계 소식은 없습니다.'));for(const item of news.items){const article=el('article');article.append(el('small',item.when.replace('-','.')+' · '+item.region),el('strong',item.title),el('p',item.body),sourceLink(item));section.append(article);}section.append(el('small','실제 역사 자료 · 소식 자체로 자원이 변하지 않습니다.'));return section;}
// A short date interlude replaces the blocking quarterly report.
export function createQuarterBriefing(getState,onConfirm,onBegin=()=>{}){
 const dialog=el('dialog',undefined,'season-transition');dialog.id='quarter-briefing';dialog.setAttribute('aria-labelledby','quarter-title');dialog.tabIndex=-1;document.body.append(dialog);
 let timer=null,finish=null;
 dialog.addEventListener('cancel',e=>{e.preventDefault();finish?.();});
 dialog.addEventListener('click',()=>finish?.());
 return s=>{
  if(!pendingQuarterReport(s)||dialog.open)return;
  const report=s.quarterReport,title=el('h2',undefined,'season-transition-title'),[year,season]=seasonDate(s.turn,s.startYear??1900).split(' ');
  title.id='quarter-title';title.append(el('span',year,'season-year'),document.createTextNode(' '),el('span',season,'season-name'));dialog.replaceChildren(title);
  finish=()=>{if(!dialog.open)return;clearTimeout(timer);const current=getState();if(current===s&&current.quarterReport===report)report.acknowledged=true;dialog.close();finish=null;onConfirm();};
  onBegin();dialog.showModal();dialog.focus({preventScroll:true});timer=setTimeout(()=>finish?.(),1600);
 };
}
export function worldHeadline(turn,startYear=1900){return worldNewsAt(turn,startYear).items[0]?.title||'세계 소식';}
export function quarterSummary(s){
 const box=el('div',undefined,'quarter-summary'),r=s.quarterReport;if(!r||r.turn!==s.turn)return box;
 box.append(el('p',r.action));const changes=el('div',undefined,'quarter-summary-changes');for(const [key,name]of [['gold','국고'],['stability','민심'],['military','군사력']]){const value=r.delta[key];changes.append(el('span',`${name} ${value>0?'+':value<0?'−':''}${key==='gold'?won(value):Math.abs(value)}`,value<0?'loss':'gain'));}box.append(changes);return box;
}
