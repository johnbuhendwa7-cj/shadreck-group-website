import {gallery} from './gallery.js';
export const workCards=gallery.map((item,i)=>({...item,...[
 {category:'MATERIALS & SITE WORK',title:'Keep your project moving.',text:'Construction work brings together materials, machinery and a clear plan for the site. Talk to Shadreck Group about sand and stone supply, earthworks and the support your project needs.',enquiry:'about-contact.html?service=general#enquire'},
 {category:'SITE PREPARATION',title:'Make room for what’s next.',text:'Plot clearing and rubble removal prepare a site for its next stage. Share your location, site access and scope of work so we can discuss your requirements.',enquiry:'about-contact.html?service=plot-clearing#enquire'},
 {category:'BULK EARTHWORKS',title:'Start from solid ground.',text:'Excavation, rock breaking and site preparation for construction projects. Ground conditions and access matter—tell us about your site and the work ahead.',enquiry:'about-contact.html?service=bulk-earthworks#enquire'},
 {category:'SAND & STONE',title:'The right materials for the job.',text:'Building sand, plaster sand, filling sand, Malmesbury mix sand, 3-in-1 sand, grey stone and brown stone. Let us know the material, quantity and project location you have in mind.',enquiry:'about-contact.html?service=sand-stone#enquire'}
][i]}));
