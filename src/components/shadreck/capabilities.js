import { services } from '../../data/services.js';
export function bindCapabilities(root){
 const rows=[...root.querySelectorAll('details')],photo=root.querySelector('.capability-photo'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let active=-1,revision=0;
 function select(index,{animate=true,hash=false}={}){
  if(index<0||index>=rows.length)return;
  const next=services[index],oldHeights=rows.map(row=>row.getBoundingClientRect().height);
  rows.forEach((row,i)=>{row.getAnimations().forEach(a=>a.cancel());row.open=i===index;row.querySelector('summary').setAttribute('aria-expanded',String(i===index));});
  if(animate&&!reduced.matches)rows.forEach((row,i)=>{const end=row.getBoundingClientRect().height;if(oldHeights[i]!==end)row.animate([{height:oldHeights[i]+'px'},{height:end+'px'}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'});});
  if(active!==index){
   active=index;const request=++revision;const img=new Image();img.src=next.image;img.alt=next.alt;img.width=1200;img.height=1000;img.style.objectPosition=index===4?'center 12%':'center';
   img.decode().catch(()=>{}).then(()=>{if(request!==revision)return;photo.replaceChildren(img);if(animate&&!reduced.matches)img.animate([{opacity:.35,transform:'scale(1.025)'},{opacity:1,transform:'scale(1)'}],{duration:600,easing:'cubic-bezier(.22,1,.36,1)'});});
   root.querySelector('.capability-photo-number').textContent=next.number;root.querySelector('.capability-photo-title').textContent=next.title;
  }
  if(hash)history.replaceState(null,'','#'+next.slug);
 }
 rows.forEach((row,index)=>{
  const summary=row.querySelector('summary');summary.addEventListener('click',e=>{e.preventDefault();select(index,{hash:true});});
  summary.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?rows.length-1:(index+(e.key==='ArrowDown'?1:-1)+rows.length)%rows.length;select(next,{hash:true});rows[next].querySelector('summary').focus({preventScroll:true});}});
 });
 const fromHash=()=>{const index=services.findIndex(s=>'#'+s.slug===location.hash);select(index>=0?index:0,{animate:false});if(index>=0)requestAnimationFrame(()=>rows[index].scrollIntoView({block:'start',behavior:'instant'}));};
 root.classList.add('capability-enhanced');fromHash();window.addEventListener('hashchange',fromHash);
}
