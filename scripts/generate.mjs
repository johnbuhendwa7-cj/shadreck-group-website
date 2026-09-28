import { writeFile, mkdir } from 'node:fs/promises';
import { pages,site } from '../src/config/site.js';
import { shell } from '../templates/partials/shared.js';
import { home,servicePage,work,about } from '../templates/pages.js';
for(const [i,render] of [home,servicePage,work,about].entries()) await writeFile(pages[i].file,shell(pages[i],render()));
await mkdir('public',{recursive:true});
await writeFile('public/robots.txt',site.launchApproved&&site.productionOrigin?'User-agent: *\nAllow: /\n':'User-agent: *\nDisallow: /\n');
if(site.productionOrigin&&site.launchApproved){
 await writeFile('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p=>`<url><loc>${site.productionOrigin.replace(/\/$/,'')}/${p.file}</loc></url>`).join('')}</urlset>`);
}
console.log('Generated four complete static pages.');
