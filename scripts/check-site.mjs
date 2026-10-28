import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
const files=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else files.push(p);}}
walk(root);
const failures=[];
const htmlFiles=files.filter(p=>p.endsWith('.html'));
for(const file of htmlFiles){
  const html=fs.readFileSync(file,'utf8');
  if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)failures.push(`${file}: expected one H1`);
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    const target=match[1].replaceAll('&amp;','&');
    if(!target.startsWith('/')||target.startsWith('//'))continue;
    const pathname=decodeURIComponent(target.split(/[?#]/)[0]);
    const resolved=path.join(root,pathname);
    const exists=fs.existsSync(resolved)&&(fs.statSync(resolved).isFile()||fs.existsSync(path.join(resolved,'index.html')));
    if(!exists)failures.push(`${path.relative(root,file)}: missing ${target}`);
  }
  if(/LOCAL PREVIEW|noindex|127\.0\.0\.1|[A-Z]:\\\\|320210\d+|186[ -]?5466[ -]?2297/.test(html))failures.push(`${file}: preview or private data found`);
  for(const privateRepo of ['personal-ledger-agent','proofspace-midframe'])if(html.includes(`github.com/icn1Vad/${privateRepo}`))failures.push(`${file}: private repository link`);
}
for(const file of ['rss.xml','sitemap.xml','assets/kaifeng-yan-cv.pdf','assets/kaifeng-yan-cv-zh.pdf'])if(!fs.existsSync(path.join(root,file)))failures.push(`Missing ${file}`);
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(`Validated ${htmlFiles.length} HTML pages, internal assets and links, feed, sitemap, CV, and public-data boundaries.`);
