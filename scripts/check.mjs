import {readFile,readdir,stat,access} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pages} from '../src/config/site.js';
import {services} from '../src/data/services.js';
import {validateEnquiry,deliverEnquiry} from '../src/components/shadreck/enquiry.js';
const htmls=await Promise.all(pages.map(async p=>[p.file,await readFile('dist/'+p.file,'utf8')]));
for(const [file,html] of htmls){
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: one H1`);
 assert.equal((html.match(/<footer/g)||[]).length,1,`${file}: one footer`);
 assert(!/BRICKOX|Terms of Up|Lorem ipsum|testimonials|picsum\.photos/.test(html),`${file}: demo content`);
 for(const match of html.matchAll(/(?:src|href|poster)="([^"#]+)"/g)){
  const url=match[1].replaceAll('&amp;','&');if(/^(https?:|mailto:|tel:|data:)/.test(url))continue;
  const [target,hash]=url.split('#');const clean=target.split('?')[0];
  await access(path.join('dist',clean));
  if(hash&&clean.endsWith('.html'))assert((await readFile(path.join('dist',clean),'utf8')).includes(`id="${hash}"`),`Missing anchor: ${url}`);
 }
 assert(html.includes('noindex,nofollow'),'Preview indexing disabled');
}
const files=[];async function walk(dir){for(const f of await readdir(dir)){const p=path.join(dir,f);if((await stat(p)).isDirectory())await walk(p);else files.push(p);}}await walk('dist');
assert.equal(files.filter(f=>f.endsWith('.html')).length,4);
assert(!files.some(f=>/originals|registry|node_modules|\.zip$|\.woff|\.ttf|manifest-source|\.env/.test(f)));
const serviceHTML=htmls.find(([name])=>name==='services.html')[1];for(const service of services)assert(serviceHTML.includes(`id="${service.slug}"`));
assert.equal(validateEnquiry({name:'',phone:'',email:'',message:''}).length,3);
assert.equal(validateEnquiry({name:'Test',phone:'0123456789',email:'',message:'Test only'}).length,0);
await assert.rejects(()=>deliverEnquiry('/mock',{},async()=>({ok:false})));
await assert.rejects(()=>deliverEnquiry('/mock',{},async()=>({ok:true,json:async()=>({delivered:false})})));
assert.equal((await deliverEnquiry('/mock',{},async()=>({ok:true,json:async()=>({delivered:true})}))).delivered,true);
console.log(`PASS: ${htmls.length} pages, all local references/deep links, one H1/footer, six services, preview noindex, clean build and enquiry adapter success/failure mocks. ${files.length} production files.`);
