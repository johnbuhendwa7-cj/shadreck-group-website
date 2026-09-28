// Adapted from the React Bits source supplied by the client. See docs/MOTION-UPGRADE.md.
import {useLayoutEffect,useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './ScrollFloat.css';
gsap.registerPlugin(ScrollTrigger);
export default function ScrollFloat({children,animationDuration=1,ease='back.out(1.4)',scrollStart='top 95%',scrollEnd='top 62%',stagger=.025}){
 const ref=useRef(null),text=String(children||'');
 useLayoutEffect(()=>{const ctx=gsap.context(()=>{gsap.fromTo('.sf-char',{opacity:.15,yPercent:95,scaleY:1.65,scaleX:.8,transformOrigin:'50% 0%'},{opacity:1,yPercent:0,scaleY:1,scaleX:1,duration:animationDuration,ease,stagger,scrollTrigger:{trigger:ref.current,start:scrollStart,end:scrollEnd,scrub:true,invalidateOnRefresh:true}});},ref);return()=>ctx.revert();},[text,animationDuration,ease,scrollStart,scrollEnd,stagger]);
 return <h2 className="scroll-float" ref={ref}><span className="sr-only">{text.replaceAll('\n',' ')}</span><span aria-hidden="true">{text.split('\n').map((line,i)=><span className="sf-line" key={i}>{line.split(/(\s+)/).map((word,j)=>/\s+/.test(word)?' ':<span className="sf-word" key={j}>{Array.from(word).map((char,k)=><span className="sf-char" key={k}>{char}</span>)}</span>)}</span>)}</span></h2>;
}
