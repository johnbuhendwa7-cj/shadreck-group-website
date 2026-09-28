import {chromium} from '@playwright/test';
import {mkdir,writeFile,rename} from 'node:fs/promises';
const stage=process.argv[2]||'baseline';
const base=process.env.TEST_ORIGIN||'http://127.0.0.1:5173';
const out=`docs/polish/${stage}`;await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const report={stage,base,date:new Date().toISOString(),pages:[],errors:[]};
const routes=['index.html','services.html','work-equipment.html','about-contact.html'];
for(const size of process.argv.includes('--record-only')?[]:[{width:1440,height:900},{width:390,height:844}]){
 const mobile=size.width===390;
 const context=await browser.newContext({viewport:size,hasTouch:mobile,isMobile:mobile,deviceScaleFactor:1});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 for(const route of routes){
  await page.goto(`${base}/${route}`);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1600);
  const key=route.replace('.html','')+`-${size.width}`;
  const height=await page.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<height;y+=600){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(260);}
  await page.waitForTimeout(3200);
  const mid=route==='index.html'?'.services-preview':route==='services.html'?'.services-section':route==='work-equipment.html'?'.gallery-island':'#enquire';
  await page.locator(mid).scrollIntoViewIfNeeded();await page.waitForTimeout(1500);await page.screenshot({path:`${out}/${key}-middle.jpg`,quality:85});
  await page.locator('.site-footer').evaluate(e=>scrollTo({top:e.offsetTop,behavior:'instant'}));await page.waitForTimeout(1600);await page.screenshot({path:`${out}/${key}-footer.jpg`,quality:85});
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.locator('video').evaluateAll(vs=>vs.forEach(v=>{v.pause();if(v.readyState>=2)v.currentTime=4;}));await page.waitForTimeout(800);
  await page.screenshot({path:`${out}/${key}-hero.jpg`,quality:85});await page.screenshot({path:`${out}/${key}-full.jpg`,quality:80,fullPage:true});
  report.pages.push({route,...size,...await page.evaluate(()=>({fontDisplay:document.fonts.check('700 48px "Barlow Semi Condensed"'),fontBody:document.fonts.check('400 16px Manrope'),overflow:document.documentElement.scrollWidth>innerWidth,missingImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute('src'))}))});
 }
 await context.close();
}
// Short recordings show actual motion and controls, independently of still captures.
for(const size of [{width:1440,height:900},{width:390,height:844}]){
 try{
  const context=await browser.newContext({viewport:size,hasTouch:size.width===390,isMobile:size.width===390,recordVideo:{dir:out,size}});
  const page=await context.newPage();await page.goto(base+'/index.html');await page.waitForTimeout(5500);
  if(size.width===390){await page.locator('.menu-toggle').click();await page.waitForTimeout(700);await page.keyboard.press('Escape');}
  await page.locator('.services-preview').scrollIntoViewIfNeeded();await page.waitForTimeout(1800);
  if(await page.locator('.ag-panel').count()){await page.locator('.ag-panel').nth(1)[size.width===390?'click':'hover']();await page.waitForTimeout(850);await page.locator('.ag-panel').nth(4)[size.width===390?'click':'hover']();}
  else if(await page.locator('.mobile-service-select').count()){await page.locator('.mobile-service-select').nth(1).click();await page.waitForTimeout(850);await page.locator('.mobile-service-select').nth(4).click();}
  await page.locator('.footer-word').scrollIntoViewIfNeeded();await page.waitForTimeout(3500);
  await page.goto(base+'/work-equipment.html');await page.locator('.gallery-island').scrollIntoViewIfNeeded();await page.waitForTimeout(2200);
  if(await page.getByRole('button',{name:'Next work photograph'}).count()){await page.getByRole('button',{name:'Next work photograph'}).click();await page.waitForTimeout(1200);}
  await page.waitForTimeout(1000);const video=page.video();await context.close();await video.saveAs(`${out}/interactions-${size.width}.webm`);
 }catch(e){report.errors.push(`Recording ${size.width}: ${e.message}`);}
}
await writeFile(`${out}/${process.argv.includes('--record-only')?'recording':'capture'}-report.json`,JSON.stringify(report,null,2));await browser.close();console.log(JSON.stringify(report,null,2));
