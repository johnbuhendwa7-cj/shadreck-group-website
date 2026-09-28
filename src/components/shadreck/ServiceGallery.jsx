import {useState} from 'react';
import AccordionGallery from '../react-bits/AccordionGallery.jsx';
import {useCompact} from './useCompact.js';
import {presets} from '../../config/presets.js';
import {services} from '../../data/services.js';
const items=services.map(s=>({image:s.image,alt:s.alt,label:s.title,link:s.link,number:s.number}));
export default function ServiceGallery(){
 const compact=useCompact(),[active,setActive]=useState(4),selected=services[active];
 return <div className={compact?'service-gallery service-gallery-touch':'service-gallery'}>
  <AccordionGallery key={compact?'touch':'wide'} {...presets.accordion} items={items} defaultIndex={active} orientation={compact?'vertical':'horizontal'} height={compact?350:480} gap={compact?8:12} expandRatio={compact?.57:.52} tilt={compact?0:1} parallax={compact?0:.15} trigger={compact?'click':'hover'} selectionOnly={compact} onActiveChange={setActive}/>
  {compact&&<div className="service-selection"><span>{selected.number} / 06</span><a className="text-link" href={selected.link}>Explore {selected.title}<svg className="arrow-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.7"/></svg></a></div>}
 </div>;
}
