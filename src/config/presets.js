export const presets = {
 fold:{splitBy:'char',hinge:'top',trigger:'scroll',duration:0.65,stagger:0.032,ease:'power3.out',perspective:700,creaseShading:0.55,fontSize:'var(--hero-type)',fontWeight:700,color:'#FFFFFF',className:'sg-hero-fold'},
 split:{delay:22,duration:0.6,ease:'power3.out',splitType:'chars',from:{opacity:0,y:24},to:{opacity:1,y:0},threshold:0.1,rootMargin:'-60px',textAlign:'left'},
 blur:{delay:90,animateBy:'words',direction:'top',animationFrom:{filter:'blur(5px)',opacity:0,y:-12},animationTo:[{filter:'blur(2px)',opacity:0.6,y:2},{filter:'blur(0px)',opacity:1,y:0}],className:'sg-about-statement'},
 accordion:{defaultIndex:4,expandRatio:0.52,trigger:'hover',height:480,gap:12,radius:2,accentColor:'#E30B22',overlayColor:'#11141B',textColor:'#FFFFFF',tilt:2,parallax:0.2,grayscale:false},
 carousel:{preset:'liquid',intro:'rise',cardHeight:0.7,gap:12,squeeze:0.2,focusOnClick:true,captions:false,autoplay:false,captureWheel:false,bend:0.08,liquid:0.06,dispersion:0,followCursor:false},
 stroke:{text:'SHADRECK',strokeColor:'#E30B22',fillColor:'#F6F5F1',strokeWidth:1.4,drawDuration:1.6,fillDelay:0.2,stagger:0.05,ease:'power2.out',trigger:'scroll',fillMode:'wipe',fontSize:128,fontWeight:700,letterSpacing:-4,className:'sg-footer-word'}
};
