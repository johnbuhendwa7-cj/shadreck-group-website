import {readFile,readdir,writeFile} from 'node:fs/promises';
const license=await readFile('vendor/react-bits-registry/LICENSE.md','utf8');
const lock=JSON.parse(await readFile('package-lock.json','utf8'));
let notices=`Shadreck Group website — third-party software notices\n\nReact Bits: https://reactbits.dev\nSource: https://github.com/DavidHDev/react-bits\nRetrieved 2026-09-28. Components used as part of this website.\n\n${license}\n`;
for(const [folder,pkg] of Object.entries(lock.packages)){
 if(!folder||pkg.dev)continue;
 const names=await readdir(folder).catch(()=>[]);const licenses=names.filter(n=>/^licen[sc]e(?:\.|$)/i.test(n));
 notices+=`\n\n--- ${folder.replace('node_modules/','')} ${pkg.version} (${pkg.license||'see package'}) ---\n`;
 for(const name of licenses)notices+=await readFile(folder+'/'+name,'utf8').catch(()=>'');
}
await writeFile('public/third-party-notices.txt',notices);
const sources=[];for(const name of ['FoldText','SplitText','BlurText','StrokeText','AccordionGallery','FlexCarousel']){
 const snapshot=JSON.parse(await readFile(`vendor/react-bits-registry/${name}.json`,'utf8'));sources.push({name,url:`https://reactbits.dev/r/${name}-JS-CSS.json`,retrieved:'2026-09-28',method:'Direct official JSON download; files materialised manually to avoid CLI CSS/reset changes.',dependencies:snapshot.dependencies,registryDependencies:snapshot.registryDependencies||[],files:snapshot.files.map(f=>f.path)});
}
await writeFile('vendor/react-bits-registry/provenance.json',JSON.stringify(sources,null,2));
console.log('Saved software notices and exact component provenance.');
