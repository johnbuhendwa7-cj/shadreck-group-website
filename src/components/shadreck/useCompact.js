import {useState,useEffect} from 'react';
export function useCompact(){
 const [compact,setCompact]=useState(()=>matchMedia('(max-width:767px)').matches);
 useEffect(()=>{const media=matchMedia('(max-width:767px)'),change=()=>setCompact(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);
 return compact;
}
