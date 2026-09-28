// Encode full-resolution image outputs for the web; preserve source PNGs in vendor.
import {chromium} from '@playwright/test';
import {readFile,writeFile,copyFile,unlink} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome'}),page=await browser.newPage();
for(const file of ['01-home/home-shadreck-branded-truck-hd','03-work-equipment/work-earthmoving-enhanced','03-work-equipment/work-tipper-enhanced']){
 const source=`public/assets/media/${file}.png`;
 const bytes=await readFile(source);
 const data=await page.evaluate(async url=>{const img=new Image();img.src=url;await img.decode();const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;canvas.getContext('2d').drawImage(img,0,0);return canvas.toDataURL('image/webp',.96).split(',')[1];},`data:image/png;base64,${bytes.toString('base64')}`);
 await copyFile(source,`vendor/client-supplied/media/${file.split('/').at(-1)}.png`);
 const output=Buffer.from(data,'base64');await writeFile(`public/assets/media/${file}.webp`,output);
 await unlink(source);console.log(`${file}: ${bytes.length} → ${output.length} bytes; full dimensions retained`);
}
await browser.close();
