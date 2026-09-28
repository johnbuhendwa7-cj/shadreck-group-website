import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.TEST_ORIGIN||'http://127.0.0.1:4173',out='docs/motion-upgrade';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome'});const report={base,pages:[],errors:[]};
for(const width of [1440,390]){
 const context=await browser.newContext({viewport:{width,height:width===390?844:900},isMobile:width===390,hasTouch:width===390,recordVideo:{dir:out,size:{width,height:width===390?844:900}}});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 async function section(selector,name){await page.locator(selector).evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-108,behavior:'smooth'}));await page.waitForTimeout(selector==='.site-footer'?3500:1700);await page.screenshot({path:`${out}/${name}-${width}.jpg`,quality:88});}
 for(const route of ['index','services','work-equipment','about-contact']){
  await page.goto(`${base}/${route}.html`);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(2000);await page.screenshot({path:`${out}/${route}-hero-${width}.jpg`,quality:88});
  if(route==='index'){await section('.proof','home-proof');await section('.services-preview','home-services');}
  if(route==='services'){await section('.services-section','services-showcase');await page.locator('.showcase-nav button').nth(4).click();await page.waitForTimeout(1100);await page.screenshot({path:`${out}/services-selected-${width}.jpg`,quality:88});}
  if(route==='work-equipment'){await section('.work-section','work-gallery');await page.mouse.move(0,0);await page.waitForTimeout(2200);await page.locator('.apple-card').first().click();await page.waitForTimeout(700);await page.screenshot({path:`${out}/work-dialog-${width}.jpg`,quality:88});await page.keyboard.press('Escape');await section('.work-planning','work-planning');}
  if(route==='about-contact'){await section('.story','about-story');await section('#enquire','contact');}
  await section('.site-footer',route+'-footer');
  report.pages.push({route,width,...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,fonts:document.fonts.check('700 48px "Barlow Semi Condensed"')&&document.fonts.check('400 16px Manrope')}))});
 }
 const video=page.video();await context.close();await video.saveAs(`${out}/walkthrough-${width}.webm`);
}
await writeFile(out+'/capture-report.json',JSON.stringify(report,null,2));await browser.close();console.log(JSON.stringify(report));
