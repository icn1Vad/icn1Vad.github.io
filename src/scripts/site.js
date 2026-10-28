const dialog=document.querySelector('#search-dialog');
const searchInput=document.querySelector('#site-search');
const results=document.querySelector('#search-results');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const searchIndex=JSON.parse(document.querySelector('#search-data')?.textContent||'[]');
document.querySelectorAll('.article-body pre.astro-code').forEach(pre=>{
  const wrapper=document.createElement('div');wrapper.className='code-block';
  const top=document.createElement('div');top.className='code-top';
  const label=document.createElement('span');label.textContent=pre.dataset.language||'code';
  const button=document.createElement('button');button.type='button';button.className='copy-button';button.setAttribute('aria-label','Copy code');button.textContent='Copy';
  top.append(label,button);pre.before(wrapper);wrapper.append(top,pre);
});
function updateSearch(){
  const query=searchInput.value.trim().toLocaleLowerCase();
  const found=query?searchIndex.filter(x=>(x.title+' '+x.text).toLocaleLowerCase().includes(query)):searchIndex;
  results.innerHTML=found.length?found.map(x=>`<a class="search-result" href="${esc(x.url)}"><span>${esc(x.type)}</span><strong>${esc(x.title)}</strong><small>${esc(x.summary)}</small></a>`).join(''):`<p class="search-hint">No results for “${esc(searchInput.value.trim())}”. Try Ceph, Spark, or Agent.</p>`;
}
function openSearch(){if(!dialog.open){dialog.showModal();searchInput.value='';updateSearch();searchInput.focus();}}
document.querySelector('.search-trigger')?.addEventListener('click',openSearch);
document.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
searchInput?.addEventListener('input',updateSearch);
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&dialog.open){e.preventDefault();dialog.close();return;}
  if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName)&&!document.activeElement?.isContentEditable&&!dialog.open){e.preventDefault();openSearch();}
});
document.querySelector('.menu-button')?.addEventListener('click',e=>{
  const menu=document.querySelector('#mobile-nav');menu.hidden=!menu.hidden;e.currentTarget.setAttribute('aria-expanded',String(!menu.hidden));
});
let toastTimer;
function toast(text){const el=document.querySelector('.toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);}
function filterNotes(tag){
  const list=document.querySelector('.writing-list');if(!list||!document.querySelector('.filter-bar'))return;
  let count=0;
  list.querySelectorAll('.note-row').forEach(row=>{const show=tag==='All'||(row.dataset.tags||'').split('|').includes(tag);row.hidden=!show;if(show)count++;});
  document.querySelectorAll('[data-filter]').forEach(button=>{const active=button.dataset.filter===tag;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  document.querySelector('.filter-result').textContent=`${count} ${count===1?'note':'notes'}`;
  let empty=document.querySelector('#filter-empty');
  if(!empty){empty=document.createElement('div');empty.id='filter-empty';empty.className='empty-state';empty.innerHTML='<h2>No notes in this filter yet.</h2><p>Choose another topic or return to all notes.</p><a class="button-primary" href="/writing/">Show all notes ↗</a>';list.append(empty);}
  empty.hidden=count!==0;
}
filterNotes(new URLSearchParams(location.search).get('tag')||'All');
window.addEventListener('popstate',()=>filterNotes(new URLSearchParams(location.search).get('tag')||'All'));
document.addEventListener('click',async e=>{
  const filter=e.target.closest('[data-filter]');
  if(filter){const tag=filter.dataset.filter;const url=new URL(location.href);if(tag==='All')url.searchParams.delete('tag');else url.searchParams.set('tag',tag);history.pushState(null,'',url);filterNotes(tag);}
  const copy=e.target.closest('.copy-button');
  if(copy){try{await navigator.clipboard.writeText(copy.closest('.code-block').querySelector('code').textContent);copy.textContent='Copied';toast('Code copied to clipboard.');setTimeout(()=>{if(copy.isConnected)copy.textContent='Copy';},2000);}catch{toast('Clipboard unavailable. Select the code to copy it.');}}
  const toc=e.target.closest('[data-toc]');
  if(toc){const target=document.getElementById(toc.dataset.toc);if(target){e.preventDefault();target.scrollIntoView({behavior:'instant',block:'start'});}}
  if(e.target.closest('.skip-link')){e.preventDefault();const main=document.querySelector('main');main.focus();main.scrollIntoView({block:'start'});}
});
// Keep links shared from the earlier hash-based prototype useful.
if(location.hash.startsWith('#/'))location.replace(location.origin+location.hash.slice(1));
