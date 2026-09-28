// Aceternity Animated Testimonials image-stack and text-transition pattern,
// adapted to real services instead of testimonial content. No autoplay.
import {useEffect,useRef,useState} from 'react';
import {motion,AnimatePresence,useReducedMotion} from 'motion/react';
import {services} from '../../data/services.js';
import Icon from './Icons.jsx';
export default function ServiceShowcase(){
 const fromHash=()=>Math.max(0,services.findIndex(s=>'#'+s.slug===location.hash));
 const [active,setActive]=useState(fromHash),root=useRef(null),reduced=useReducedMotion();const item=services[active];
 const select=i=>{setActive(i);history.replaceState(null,'','#'+services[i].slug);};
 useEffect(()=>{const sync=()=>setActive(fromHash());window.addEventListener('hashchange',sync);if(location.hash)requestAnimationFrame(()=>root.current?.scrollIntoView({block:'start',behavior:'instant'}));return()=>window.removeEventListener('hashchange',sync);},[]);
 useEffect(()=>{const align=()=>{if(innerWidth>767)return;const nav=root.current?.querySelector('.showcase-nav'),button=nav?.children[active];if(nav&&button)nav.scrollTo({left:button.offsetLeft-nav.offsetLeft-(nav.clientWidth-button.clientWidth)/2,behavior:reduced?'instant':'smooth'});};align();window.addEventListener('resize',align);return()=>window.removeEventListener('resize',align);},[active,reduced]);
 return <div className="service-showcase" ref={root}>
  <div className="service-stack" style={{'--service-ratio':item.ratio}} aria-hidden="true">{services.map((s,i)=><motion.div key={s.slug} className="service-stack-card" initial={false} animate={{opacity:i===active?1:.5,scale:i===active?1:.94,rotate:i===active?0:(i%2?3:-3),y:i===active&& !reduced?[0,-18,0]:0,zIndex:i===active?10:services.length-i}} transition={{duration:reduced?0:.6,ease:[.22,1,.36,1]}}><img src={s.image} alt="" width="1200" height="1000" style={{objectPosition:'center'}} draggable="false"/></motion.div>)}</div>
  <div className="service-showcase-copy">
   <div className="service-showcase-top"><span className="service-kicker">OUR EXPERTISE</span><span className="service-count">{item.number} / 06</span></div>
   <AnimatePresence mode="wait" initial={false}><motion.div className="service-story" key={item.slug} initial={{opacity:reduced?1:0,y:reduced?0:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-8}} transition={{duration:.2}}><h2>{item.title}</h2><p>{item.text.split(' ').map((word,i)=><motion.span key={i} initial={{opacity:reduced?1:.2,filter:reduced?'none':'blur(2px)'}} animate={{opacity:1,filter:'blur(0px)'}} transition={{duration:.25,delay:reduced?0:i*.008}}>{word}{' '}</motion.span>)}</p><a className="text-link" href={item.enquiry}>Discuss your project <Icon/></a></motion.div></AnimatePresence>
   <nav className="showcase-nav" aria-label="Choose a service">{services.map((s,i)=><button key={s.slug} id={s.slug} aria-current={i===active?'true':undefined} onClick={()=>select(i)} onKeyDown={e=>{if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?5:(i+(e.key==='ArrowDown'?1:5))%6;select(next);root.current.querySelectorAll('.showcase-nav button')[next].focus({preventScroll:true});}}}><span>{s.number}</span>{s.title}<Icon name={i===active?'arrow':'plus'}/></button>)}</nav>
   <div className="service-steps"><span className="sr-only" role="status">Selected service: {item.title}</span><button className="round-control" aria-label="Previous service" onClick={()=>select((active+5)%6)}><Icon name="back"/></button><button className="round-control" aria-label="Next service" onClick={()=>select((active+1)%6)}><Icon/></button></div>
  </div>
 </div>;
}
