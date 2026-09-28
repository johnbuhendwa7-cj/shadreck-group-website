import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.TEST_ORIGIN||'http://127.0.0.1:4173';
const browser=await chromium.launch({channel:'chrome',headless:true});
const out='docs/validation';await mkdir(out,{recursive:true});
const report={base,date:new Date().toISOString(),routes:[],responsive:[],accessibility:[],consoleErrors:[],failedRequests:[],checks:[]};
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage();
page.on('pageerror',e=>report.consoleErrors.push(e.message));
page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(base))report.failedRequests.push({url:r.url(),status:r.status()});});
const routes=['index.html','services.html','work-equipment.html','about-contact.html'];
for(const route of routes){
 await page.goto(base+'/'+route);await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1800);
 const metrics=await page.evaluate(()=>({title:document.title,h1:document.querySelectorAll('h1').length,font:getComputedStyle(document.querySelector('h1')).fontFamily,fontsLoaded:document.fonts.check('700 48px "Barlow Semi Condensed"')&&document.fonts.check('400 16px Manrope'),overflow:document.documentElement.scrollWidth>innerWidth}));
 report.routes.push({route,...metrics});assert.equal(metrics.h1,1);assert.equal(metrics.overflow,false);
 // Scroll the full page to load lazy images and finish each entrance effect.
 await revealPage(page);
 await page.screenshot({path:`${out}/${route.replace('.html','')}-desktop.png`,fullPage:true});
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();report.accessibility.push({route,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>n.target)}))});
}
for(const width of [360,390,430,768,1024,1440,1920]){
 await page.setViewportSize({width,height:width===1440?720:900});
 for(const route of routes){await page.goto(base+'/'+route);await page.waitForTimeout(500);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);report.responsive.push({route,width,overflow});assert.equal(overflow,false,`${route} at ${width}px`);}
}
await page.setViewportSize({width:390,height:844});await page.goto(base+'/index.html');
await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');assert.equal(await page.locator('.menu-toggle').evaluate(el=>el===document.activeElement),true);report.checks.push('Mobile menu open / Escape / focus return');
await revealPage(page);await page.screenshot({path:`${out}/home-mobile.png`,fullPage:true});
await page.goto(base+'/about-contact.html?service=bulk-earthworks#enquire');assert.equal(await page.locator('#service').inputValue(),'bulk-earthworks');await page.getByRole('button',{name:'Prepare email enquiry'}).click();assert.equal(await page.locator('#name').getAttribute('aria-invalid'),'true');await page.locator('#name').fill('Website test');await page.locator('#message').fill('Unsent test enquiry');await page.getByRole('button',{name:'Prepare email enquiry'}).click();assert.equal(await page.locator('#phone').getAttribute('aria-invalid'),'true');report.checks.push('Allowlisted prefill and accessible required/contact validation; no live enquiry sent');
await page.goto(base+'/about-contact.html?service=%3Cscript%3E#enquire');assert.equal(await page.locator('#service').inputValue(),'general');
await revealPage(page);await page.screenshot({path:`${out}/contact-mobile.png`,fullPage:true});
await page.setViewportSize({width:1440,height:900});await page.goto(base+'/index.html');await page.locator('[data-effect=accordion]').scrollIntoViewIfNeeded();await page.locator('.ag-panel').first().waitFor();await page.locator('.ag-panel').first().focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('.ag-panel').nth(1).evaluate(el=>el===document.activeElement),true);await page.keyboard.press('Enter');await page.waitForURL('**/services.html#sand-stone');report.checks.push('Accordion arrow focus and Enter navigation');
await page.goto(base+'/work-equipment.html');await page.locator('.gallery-island').scrollIntoViewIfNeeded();await page.waitForTimeout(2500);await page.getByRole('button',{name:'Next work photograph'}).click();await page.waitForTimeout(800);await page.locator('.apple-card').nth(1).click();assert.equal(await page.locator('dialog').evaluate(d=>d.open),true);await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').evaluate(d=>d.open),false);report.checks.push('Apple carousel next control, photograph dialog and Escape close');
const reduced=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const rp=await reduced.newPage();await rp.goto(base+'/index.html');await rp.waitForTimeout(500);assert.equal(await rp.locator('.fold-text').count(),0);assert.equal(await rp.locator('video').evaluate(v=>v.paused),true);report.checks.push('Reduced motion: static title/cards and paused video');await reduced.close();
const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const np=await noJS.newPage();for(const route of routes){await np.goto(base+'/'+route);assert.equal(await np.locator('h1').count(),1);assert.equal(await np.locator('header .nav-links a').count(),4);assert.equal(await np.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);}report.checks.push('All four pages usable with JavaScript disabled');await noJS.close();
await writeFile(`${out}/browser-report.json`,JSON.stringify(report,null,2));await browser.close();
console.log(JSON.stringify(report,null,2));
assert.equal(report.consoleErrors.length,0,'Unexpected browser errors');assert.equal(report.failedRequests.length,0,'Local failed network requests');assert.equal(report.accessibility.flatMap(a=>a.violations).length,0,'Accessibility violations');
async function revealPage(p){
 const height=await p.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<height;y+=650){await p.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),y);await p.waitForTimeout(350);}
 await p.waitForTimeout(3200);
 await p.evaluate(()=>{document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'});});await p.waitForTimeout(2200);
}
