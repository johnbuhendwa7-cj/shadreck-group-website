import {readFile,writeFile} from 'node:fs/promises';
const dir='src/components/react-bits/';
// Reset only these vendored component files from the saved official snapshots.
// This makes the patch command repeatable without accumulating edits.
for(const name of ['FoldText','SplitText','BlurText','StrokeText','AccordionGallery','FlexCarousel']){
 const snapshot=JSON.parse(await readFile(`vendor/react-bits-registry/${name}.json`,'utf8'));
 for(const file of snapshot.files){const leaf=file.path.split('/').at(-1);if(!/^[A-Za-z]+\.(jsx|css)$/.test(leaf))throw new Error('Unexpected source path');await writeFile(dir+leaf,file.content);}
}
let ag=await readFile(dir+'AccordionGallery.jsx','utf8');
ag=ag.replace('setActive((i + 1) % count);','setActive((i + 1) % count);\n      panelRefs.current[(i + 1) % count]?.focus();').replace('setActive((i - 1 + count) % count);','setActive((i - 1 + count) % count);\n      panelRefs.current[(i - 1 + count) % count]?.focus();');
ag=ag.replace('role="list"','role="navigation"').replace('role="listitem"','role={item.link ? undefined : "button"}');
ag=ag.replace("  className = ''", "  className = '',\n  selectionOnly = false,\n  onActiveChange");
ag=ag.replace('  const handleEnter = i => {','  useEffect(() => { onActiveChange?.(active); }, [active, onActiveChange]);\n\n  const handleEnter = i => {');
ag=ag.replace('if (i !== active)', 'if (selectionOnly || i !== active)');
ag=ag.replace("const Tag = item.link ? 'a' : 'div';", "const Tag = selectionOnly ? 'button' : item.link ? 'a' : 'div';");
ag=ag.replace('href={item.link || undefined}', "href={!selectionOnly ? item.link || undefined : undefined}\n            type={selectionOnly ? 'button' : undefined}\n            aria-expanded={selectionOnly ? isActive : undefined}");
ag=ag.replace('role={item.link ? undefined : "button"}', 'role={selectionOnly || item.link ? undefined : "button"}');
ag=ag.replace("aria-current={isActive ? 'true' : undefined}", "aria-current={!selectionOnly && isActive ? 'true' : undefined}");
ag=ag.replace('                  {item.label}', '                  <span className="ag-number">{item.number}</span>{item.label}');
await writeFile(dir+'AccordionGallery.jsx',ag);
let flex=await readFile(dir+'FlexCarousel.jsx','utf8');
flex=flex.replace('  onSelect,','  onSelect,\n  onFailure,\n  maxDpr = 2,');
flex=flex.replace('Math.min(window.devicePixelRatio || 1, 2, Math.sqrt', 'Math.min(window.devicePixelRatio || 1, maxDpr, Math.sqrt');
flex=flex.replace('Math.min(window.devicePixelRatio || 1, 2)', 'Math.min(window.devicePixelRatio || 1, maxDpr)');
flex=flex.replace("gl.getExtension('WEBGL_lose_context')?.loseContext();\n      return undefined;","gl.getExtension('WEBGL_lose_context')?.loseContext();\n      onFailure?.();\n      return undefined;");
flex=flex.replace('if (!alive) return;\n      const s = settingsRef.current;', 'if (!alive || !visible || document.hidden) return;\n      const s = settingsRef.current;');
flex=flex.replace('if (raf || !visible || !alive) return;', 'if (raf || !visible || !alive || document.hidden) return;');
flex=flex.replace('slot.failed = true;', 'slot.failed = true;\n        onFailure?.();');
flex=flex.replace('if (!document.hidden) start();','if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else start();');
await writeFile(dir+'FlexCarousel.jsx',flex);
let blur=await readFile(dir+'BlurText.jsx','utf8');blur=blur.replace('className="inline-block will-change-[transform,filter,opacity]"','style={{display:"inline-block",willChange:"transform, filter, opacity"}}');await writeFile(dir+'BlurText.jsx',blur);
let split=await readFile(dir+'SplitText.jsx','utf8');
split=split.replace('import { useRef,', 'import { Fragment, useRef,').replace('        {text}', "        {text.split('\\n').map((line,i)=><Fragment key={i}>{i>0&&<br/>}{line}</Fragment>)}");
await writeFile(dir+'SplitText.jsx',split);
console.log('Applied documented accessibility/lifecycle patches; originals preserved in registry snapshots.');
for(const name of ['AccordionGallery','FlexCarousel']){
 let source=await readFile(dir+name+'.jsx','utf8');
 const start=source.indexOf('const DEFAULT_ITEMS = ['),end=source.indexOf('\n];',start)+3;
 source=source.slice(0,start)+'const DEFAULT_ITEMS = [];'+source.slice(end);
 await writeFile(dir+name+'.jsx',source);
}
