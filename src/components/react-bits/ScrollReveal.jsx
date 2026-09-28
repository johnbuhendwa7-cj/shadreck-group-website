// React Bits client-supplied source, with scoped lifecycle and semantic paragraph markup.
import {useLayoutEffect,useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './ScrollReveal.css';
gsap.registerPlugin(ScrollTrigger);
export default function ScrollReveal({children,baseOpacity=.7,baseRotation=1,blurStrength=1,enableBlur=true}){
 const ref=useRef(null),text=String(children||'');
 useLayoutEffect(()=>{const ctx=gsap.context(()=>{const trigger={trigger:ref.current,start:'top 92%',end:'bottom 78%',scrub:true,invalidateOnRefresh:true};gsap.fromTo(ref.current,{rotate:baseRotation,transformOrigin:'0% 50%'},{rotate:0,ease:'none',scrollTrigger:trigger});gsap.fromTo('.sr-word',{opacity:baseOpacity,filter:enableBlur?`blur(${blurStrength}px)`:'none'},{opacity:1,filter:'blur(0px)',stagger:.035,ease:'none',scrollTrigger:trigger});},ref);return()=>ctx.revert();},[text,baseOpacity,baseRotation,blurStrength,enableBlur]);
 return <p className="scroll-reveal" ref={ref}><span className="sr-only">{text}</span><span aria-hidden="true">{text.split(/(\s+)/).map((word,i)=>/^\s+$/.test(word)?word:<span key={i} className="sr-word">{word}</span>)}</span></p>;
}
