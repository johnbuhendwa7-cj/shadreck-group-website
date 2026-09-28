// Decorative loops respect visibility and the system motion preference.
export function bindHeroVideo(video,reduced){
 const hero=video.closest('.hero');let visible=false,blocked=false,pending=false,destroyed=false;
 async function sync(){
  if(destroyed)return;
  if(reduced.matches||document.hidden||!visible){video.pause();return;}
  if(blocked||pending)return;
  if(!video.getAttribute('src'))video.src=video.dataset.src;
  pending=true;video.loop=true;video.muted=true;
  try{await video.play();if(destroyed||reduced.matches||document.hidden||!visible)video.pause();else hero.classList.add('video-ready');}
  catch{blocked=true;hero.classList.remove('video-ready');}finally{pending=false;}
 }
 const visibility=()=>sync(),preference=()=>{if(reduced.matches)hero.classList.remove('video-ready');sync();};
 video.addEventListener('error',()=>{blocked=true;hero.classList.remove('video-ready');video.pause();});
 const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.05});observer.observe(hero);
 document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',preference);
 window.addEventListener('pagehide',()=>{destroyed=true;video.pause();observer.disconnect();document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',preference);});
 window.addEventListener('pageshow',e=>{if(e.persisted){destroyed=false;observer.observe(hero);document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',preference);sync();}});
}
