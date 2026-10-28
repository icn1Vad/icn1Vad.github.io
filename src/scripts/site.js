const dialog=document.querySelector('#search-dialog');
const searchInput=document.querySelector('#site-search');
const results=document.querySelector('#search-results');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const searchIndex=JSON.parse(document.querySelector('#search-data')?.textContent||'[]');

document.querySelectorAll('.article-body pre.astro-code').forEach(pre=>{
  const wrapper=document.createElement('div');wrapper.className='code-block';
  const top=document.createElement('div');top.className='code-top';
  const label=document.createElement('span');label.textContent=pre.dataset.language||'code';
  const button=document.createElement('button');button.type='button';button.className='copy-button';button.setAttribute('aria-label','复制代码');button.textContent='复制';
  top.append(label,button);pre.before(wrapper);wrapper.append(top,pre);
});
function updateSearch(){
  const query=searchInput.value.trim().toLocaleLowerCase();
  const found=query?searchIndex.filter(x=>(x.title+' '+x.text).toLocaleLowerCase().includes(query)):searchIndex;
  results.innerHTML=found.length?found.map(x=>`<a class="search-result" href="${esc(x.url)}"><span>${esc(x.type)}</span><strong>${esc(x.title)}</strong><small>${esc(x.summary)}</small></a>`).join(''):`<p class="search-hint">没有找到“${esc(searchInput.value.trim())}”，可以换一个关键词。</p>`;
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
const topicFilter=document.querySelector('#topic-filter');
function filterNotes(tag){
  if(!topicFilter)return;
  if(![...topicFilter.options].some(option=>option.value===tag))tag='All';
  topicFilter.value=tag;let count=0;
  document.querySelectorAll('.writing-list .note-row').forEach(row=>{const show=tag==='All'||row.dataset.tags.split('|').includes(tag);row.hidden=!show;if(show)count++;});
  document.querySelector('.filter-result').textContent=`${count} 篇`;
  document.querySelector('#filter-empty').hidden=count!==0;
}
filterNotes(new URLSearchParams(location.search).get('tag')||'All');
topicFilter?.addEventListener('change',()=>{const url=new URL(location.href);if(topicFilter.value==='All')url.searchParams.delete('tag');else url.searchParams.set('tag',topicFilter.value);history.pushState(null,'',url);filterNotes(topicFilter.value);});
window.addEventListener('popstate',()=>filterNotes(new URLSearchParams(location.search).get('tag')||'All'));
let toastTimer;
function toast(text){const el=document.querySelector('.toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600);}
document.addEventListener('click',async e=>{
  const copy=e.target.closest('.copy-button');
  if(copy){try{await navigator.clipboard.writeText(copy.closest('.code-block').querySelector('code').textContent);copy.textContent='已复制';toast('代码已复制');setTimeout(()=>{if(copy.isConnected)copy.textContent='复制';},2000);}catch{toast('未能写入剪贴板，请选中代码复制。');}}
  if(e.target.closest('.skip-link')){e.preventDefault();const main=document.querySelector('main');main.focus();main.scrollIntoView({block:'start'});}
});
// Preserve links shared from the original local prototype.
if(location.hash.startsWith('#/'))location.replace(location.origin+location.hash.slice(1));
