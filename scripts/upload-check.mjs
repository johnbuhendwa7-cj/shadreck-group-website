import {chromium} from '@playwright/test';
import {readFile,readdir,stat,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import assert from 'node:assert/strict';
const output=path.resolve('../../Website'),report={checks:[],requests:[],errors:[]};
async function walk(root){const list=[];for(const name of await readdir(root)){const file=path.join(root,name);if((await stat(file)).isDirectory())list.push(...await walk(file));else list.push(file);}return list;}
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const files=await walk(output);assert.equal(files.length,(await walk('dist')).length);
for(const file of files){const relative=path.relative(output,file);assert(!/node_modules|source|\.zip$|package\.json|README|docs[\\/]/i.test(relative));assert.equal(digest(await readFile(file)),digest(await readFile(path.join('dist',relative))));if(/\.(html|css|js)$/.test(file)){const text=await readFile(file,'utf8');assert(!/[\uFFFD]|â€™|Â©|Â·/.test(text));if(file.endsWith('.html'))assert(!text.includes('/src/'));}}
report.checks.push(`${files.length} upload files match dist byte-for-byte; index at root; no source, archives or broken text encoding`);
const browser=await chromium.launch({channel:'chrome'}),context=await browser.newContext(),p=await context.newPage();p.on('pageerror',e=>report.errors.push(e.message));p.on('response',r=>{if(r.url().startsWith('http://127.0.0.1')&&r.status()>=400)report.requests.push(r.url());});
for(const base of ['http://127.0.0.1:4174/','http://127.0.0.1:4174/websites/shadreck/','http://127.0.0.1:4174/websites/shadreck/Website/']){
 for(const route of ['index.html','services.html','work-equipment.html','about-contact.html']){
  await p.goto(base+route);await p.waitForTimeout(500);assert.equal(await p.locator('h1').count(),1);assert((await p.locator('.closing h2').innerText()).startsWith('LET’S GET YOUR'));assert.equal(await p.locator('.hero-play,.carousel-play').count(),0);
 }
}
report.checks.push('All four pages load through root and both nested upload paths; footer text and absence of pause controls checked');
for(const width of [390,1440]){
 await p.setViewportSize({width,height:width===390?844:1000});await p.goto('http://127.0.0.1:4174/websites/shadreck/services.html');await p.locator('.service-showcase').scrollIntoViewIfNeeded();await p.waitForTimeout(900);await p.screenshot({path:`docs/media-refinement/service-0-${width}.jpg`,quality:90});
 await p.locator('.closing').evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-90,behavior:'instant'}));await p.waitForTimeout(4500);await p.screenshot({path:`docs/media-refinement/footer-${width}.jpg`,quality:90});
}
assert.deepEqual(report.errors,[]);assert.deepEqual(report.requests,[]);
await writeFile('docs/media-refinement/upload-report.json',JSON.stringify(report,null,2));await context.close();await browser.close();console.log(report);
