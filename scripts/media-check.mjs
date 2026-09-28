import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.TEST_ORIGIN||'http://127.0.0.1:4173',out='docs/media-refinement';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome'}),report={base,viewports:[],checks:[],errors:[]};
const c=await browser.newContext(),p=await c.newPage();p.on('pageerror',e=>report.errors.push(e.message));
async function shot(selector,name,width){await p.locator(selector).first().evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-100,behavior:'instant'}));await p.waitForTimeout(900);await p.screenshot({path:`${out}/${name}-${width}.jpg`,quality:90});}
for(const width of [320,390,768,1024,1440,1920]){
 await p.setViewportSize({width,height:width<768?844:1000});
 for(const route of ['index','services','work-equipment','about-contact']){
  await p.goto(`${base}/${route}.html`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(650);
  assert.equal(await p.locator('.hero-play,.carousel-play').count(),0);
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  if(width<768){assert.equal(await p.locator('.hero-poster').evaluate(el=>getComputedStyle(el).objectFit),'contain');}
  if(width===390||width===1440)await p.screenshot({path:`${out}/${route}-hero-${width}.jpg`,quality:90});
  if(route==='index'){
   await p.locator('.proof-photo').scrollIntoViewIfNeeded();await p.waitForTimeout(400);
   assert((await p.locator('.proof-photo img').getAttribute('src')).endsWith('truck-hd.webp'));
   assert.equal(await p.locator('.proof-photo img').evaluate(e=>getComputedStyle(e).objectFit),'contain');
   if(width===390||width===1440){await shot('.proof','new-truck',width);await shot('.services-preview','home-services',width);}
  }
  if(route==='services'){
   await p.locator('.service-showcase').scrollIntoViewIfNeeded();
   for(let i=0;i<6;i++){await p.locator('.showcase-nav button').nth(i).click();await p.waitForTimeout(700);assert.equal(await p.locator('.service-stack img').nth(i).evaluate(e=>getComputedStyle(e).objectFit),'contain');if((width===390||width===1440)&&(i===0||i===4))await shot('.service-showcase',`service-${i}`,width);}
  }
  if(route==='work-equipment'){
   await p.locator('.apple-gallery').scrollIntoViewIfNeeded();await p.locator('.apple-card').first().focus();await p.waitForTimeout(700);
   if(width===390||width===1440)await shot('.apple-gallery','gallery',width);
   const photos=await p.locator('.apple-card img').evaluateAll(els=>els.map(e=>({fit:getComputedStyle(e).objectFit,loaded:e.complete&&e.naturalWidth>0})));
   assert(photos.every(e=>e.fit==='contain'&&e.loaded));
   await p.locator('.apple-card').first().click();assert(await p.locator('dialog').evaluate(d=>d.open));await p.keyboard.press('Escape');
  }
  if(route==='about-contact'&&(width===390||width===1440))await shot('.story','about-truck',width);
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));report.viewports.push({width,route,overflow:false});
 }
}
await p.setViewportSize({width:390,height:844});
for(const route of ['index','services','work-equipment','about-contact']){
 await p.goto(`${base}/${route}.html`);await p.waitForTimeout(700);for(let y=0;y<await p.evaluate(()=>document.body.scrollHeight);y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(120);}await p.waitForTimeout(800);
 const result=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
}
report.checks.push('24 route/viewport combinations: no overflow, full-frame phone hero media, replacement truck and all six service images; four mobile axe scans clear');
await p.setViewportSize({width:1440,height:1000});
for(const route of ['index','services','work-equipment']){
 await p.goto(`${base}/${route}.html`);await p.waitForFunction(()=>{const v=document.querySelector('video');return v.readyState>=2&&!v.paused;});await p.locator('video').evaluate(v=>{v.currentTime=v.duration-.2;});await p.waitForTimeout(650);assert(await p.locator('video').evaluate(v=>v.loop&&!v.paused&&v.currentTime<2));
 await p.locator('.site-footer').scrollIntoViewIfNeeded();await p.waitForTimeout(250);assert(await p.locator('video').evaluate(v=>v.paused));await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(450);assert(await p.locator('video').evaluate(v=>!v.paused));
}
report.checks.push('All three videos loop through their endpoint and resume on return to the hero without controls');
await p.goto(`${base}/work-equipment.html`);await p.locator('.apple-gallery').scrollIntoViewIfNeeded();await p.mouse.move(0,0);await p.waitForTimeout(3500);let x=await p.locator('.apple-rail').evaluate(e=>e.scrollLeft);await p.waitForTimeout(800);assert(await p.locator('.apple-rail').evaluate(e=>e.scrollLeft)>x+10);await p.locator('.apple-card').first().hover();x=await p.locator('.apple-rail').evaluate(e=>e.scrollLeft);await p.waitForTimeout(600);assert(Math.abs(await p.locator('.apple-rail').evaluate(e=>e.scrollLeft)-x)<2);
report.checks.push('Automatic carousel movement and hover pause retained without a pause button');
const reduced=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844}}),r=await reduced.newPage();await r.goto(`${base}/index.html`);assert(await r.locator('video').evaluate(v=>v.paused));await r.goto(`${base}/work-equipment.html`);await r.locator('.apple-gallery').scrollIntoViewIfNeeded();assert.equal(await r.locator('.apple-gallery').getAttribute('data-motion'),'paused');await reduced.close();report.checks.push('Reduced-motion preference retained');
assert.deepEqual(report.errors,[]);await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));await browser.close();console.log(JSON.stringify(report));
