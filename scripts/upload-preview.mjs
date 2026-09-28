// Local verification server: exposes ONLY the generated Website directory.
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../../Website');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4','.txt':'text/plain'};
createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://127.0.0.1');let pathname=decodeURIComponent(url.pathname);
  if(['/websites/shadreck','/websites/shadreck/Website'].includes(pathname)){res.writeHead(301,{Location:pathname+'/'});res.end();return;}
  pathname=pathname.replace(/^\/websites\/shadreck\/(?:Website\/)?/,'/');
  if(pathname.endsWith('/'))pathname+='index.html';
  const file=path.resolve(root,'.'+pathname),extension=path.extname(file);
  if(!file.startsWith(root+path.sep)||!types[extension]||!(await stat(file)).isFile()){res.writeHead(404);res.end();return;}
  const bytes=await readFile(file),headers={'Content-Type':types[extension],'Cache-Control':'no-cache','Accept-Ranges':'bytes'};
  const match=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  if(match){const start=Number(match[1]),end=Math.min(match[2]?Number(match[2]):bytes.length-1,bytes.length-1);if(start>end){res.writeHead(416);res.end();return;}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${bytes.length}`,'Content-Length':end-start+1});res.end(bytes.subarray(start,end+1));}
  else{res.writeHead(200,{...headers,'Content-Length':bytes.length});res.end(bytes);}
 }catch{res.writeHead(404);res.end();}
}).listen(4174,'127.0.0.1',()=>console.log(`Upload-only preview: http://127.0.0.1:4174/websites/shadreck/ (root: ${root})`));
