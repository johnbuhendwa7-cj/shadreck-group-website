import {useRef,useState,useEffect} from 'react';
import FlexCarousel from '../react-bits/FlexCarousel.jsx';
import {gallery} from '../../data/gallery.js';
import {presets} from '../../config/presets.js';
import {useCompact} from './useCompact.js';
const Arrow=({back=false})=><svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" style={{transform:back?'rotate(180deg)':undefined}}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6"/></svg>;
export default function WorkCarousel(){
 const host=useRef(null),rail=useRef(null),compact=useCompact(),[staticMode,setStaticMode]=useState(false),[failed,setFailed]=useState(false),[active,setActive]=useState(0);
 const dom=staticMode||failed;
 useEffect(()=>{const lost=e=>{e.preventDefault();setFailed(true);};const element=host.current;element?.addEventListener('webglcontextlost',lost,true);return()=>element?.removeEventListener('webglcontextlost',lost,true);},[dom]);
 useEffect(()=>{if(!dom||!rail.current)return;const element=rail.current;const update=()=>{const cards=[...element.children];const index=cards.reduce((best,card,i)=>Math.abs(card.offsetLeft-element.offsetLeft-element.scrollLeft)<Math.abs(cards[best].offsetLeft-element.offsetLeft-element.scrollLeft)?i:best,0);setActive(index);};element.addEventListener('scroll',update,{passive:true});return()=>element.removeEventListener('scroll',update);},[dom]);
 const step=delta=>{if(dom){const i=(active+delta+gallery.length)%gallery.length;rail.current?.children[i]?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'start'});setActive(i);}else host.current?.querySelector('.flex-carousel')?.dispatchEvent(new KeyboardEvent('keydown',{key:delta<0?'ArrowLeft':'ArrowRight',bubbles:true}));};
 return <div ref={host} className="work-gallery">
  {dom?<div className="static-gallery designed-photo-list" ref={rail} role="region" aria-label="Work photographs" tabIndex={0}>{gallery.map(item=><figure key={item.src}><img src={item.src} alt={item.alt} width="900" height="1200" loading="lazy"/><figcaption>{item.title}</figcaption></figure>)}</div>:<div className="sg-work-carousel"><FlexCarousel {...presets.carousel} cardHeight={compact?.72:.82} maxDpr={compact?1.5:2} squeeze={compact?.1:.2} gap={compact?14:18} items={gallery} onChange={i=>setActive(i)} onFailure={()=>setFailed(true)}/></div>}
 <div className="work-gallery-meta"><div className="work-caption" aria-hidden={!dom}><span className="work-position">{String(active+1).padStart(2,'0')} / 04</span><p>{gallery[active].title}</p></div><div className="gallery-controls"><button onClick={()=>step(-1)} aria-label="Previous work photograph"><Arrow back/></button><button onClick={()=>step(1)} aria-label="Next work photograph"><Arrow/></button></div></div>
 <div className="work-gallery-options"><p>{dom?'Scroll through the photographs.':compact?'Swipe to explore. Tap a photograph to focus.':'Drag to explore. Select a photograph for a closer look.'}</p>{!failed&&<button onClick={()=>{setStaticMode(!staticMode);setActive(0);}}>{staticMode?'Return to gallery':'View photo list'}</button>}</div>
 </div>;
}
