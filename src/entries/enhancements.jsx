import React from 'react';
import { createRoot } from 'react-dom/client';
import Boundary from '../components/shadreck/Boundary.jsx';
import { presets } from '../config/presets.js';
const sources={fold:()=>import('../components/react-bits/FoldText.jsx'),split:()=>import('../components/react-bits/SplitText.jsx'),blur:()=>import('../components/react-bits/BlurText.jsx'),stroke:()=>import('../components/react-bits/StrokeText.jsx'),accordion:()=>import('../components/shadreck/ServiceGallery.jsx'),apple:()=>import('../components/shadreck/AppleCardsCarousel.jsx'),showcase:()=>import('../components/shadreck/ServiceShowcase.jsx'),float:()=>import('../components/react-bits/ScrollFloat.jsx'),reveal:()=>import('../components/react-bits/ScrollReveal.jsx')};
export function enhance(){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('[data-effect]').forEach(node=>{
  const kind=node.dataset.effect,fallback=node.innerHTML,text=['split','float'].includes(kind)?node.innerText.trim():node.innerText.replace(/\n+/g,' ').trim();let root=null,near=kind==='showcase',generation=0;const interactive=['showcase','apple'].includes(kind);
  const sync=async()=>{
   const current=++generation;
   if(reduced.matches&&!interactive){if(root){root.unmount();root=null;node.innerHTML=fallback;}return;}
   if(!near||root)return;
   try{
    const {default:Effect}=await sources[kind]();
    await document.fonts.ready;
    if(current!==generation||(reduced.matches&&!interactive)||root)return;
    let props={...presets[kind],text};
    if(kind==='fold')props.text='WE MOVE\nTHE GROUND.';
    if(kind==='stroke')props=presets.stroke;
    if(kind==='split'){props.tag=node.dataset.tag||'h2';if(innerWidth<768){props.delay=18;props.from={opacity:0,y:14};}}
    if(['apple','showcase','accordion'].includes(kind))props={};
    if(kind==='float'||kind==='reveal'){props={children:text};if(innerWidth<768){if(kind==='float')props.ease='power2.out';else{props.baseRotation=0;props.blurStrength=1;}}}
    root=createRoot(node);root.render(<React.StrictMode><Boundary fallback={fallback}><Effect {...props}/></Boundary></React.StrictMode>);
   }catch{}
  };
  const observer=new IntersectionObserver(([e])=>{if(e.isIntersecting){near=true;observer.disconnect();sync();}},{rootMargin:['apple','float','reveal'].includes(kind)?'240px':'80px'});observer.observe(node);
  reduced.addEventListener('change',sync);if(near)sync();
 });
}
