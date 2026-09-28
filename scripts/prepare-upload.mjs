import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {readdir,stat,access,mkdir,cp,rm} from 'node:fs/promises';
const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.dirname(project),root=path.dirname(source),target=path.join(root,'Website'),build=path.join(project,'dist');
if(path.basename(source)!=='Website-Source'||path.basename(project)!=='shadreck-website'||target===project||!target.startsWith(root+path.sep))throw Error('Unexpected folder layout; upload synchronization stopped.');
await access(path.join(build,'index.html'));await mkdir(target,{recursive:true});
const allowed=new Set(['index.html','services.html','work-equipment.html','about-contact.html','assets','robots.txt','sitemap.xml','third-party-notices.txt','.htaccess']);
for(const entry of await readdir(target))if(!allowed.has(entry))throw Error(`Unexpected file in Website: ${entry}. Preserve it outside the upload folder before building.`);
async function files(dir){const entries=[];for(const name of await readdir(dir)){const file=path.join(dir,name);if((await stat(file)).isDirectory())entries.push(...await files(file));else entries.push(file);}return entries;}
const desired=new Set((await files(build)).map(file=>path.relative(build,file)));
// Copy first; only remove obsolete generated files after the new build is in place.
await cp(build,target,{recursive:true});
for(const file of await files(target))if(!desired.has(path.relative(target,file)))await rm(file);
console.log(`FileZilla upload folder refreshed: ${target} (${desired.size} files)`);
