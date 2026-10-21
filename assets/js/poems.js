(() => {
 const poems = Array.isArray(window.POEMS) ? window.POEMS : [];
 const list = document.getElementById('poemList'); const search = document.getElementById('poemSearch');
 const title = document.getElementById('poemTitle'); const body = document.getElementById('poemBody');
 const number = document.getElementById('poemNumber'); const counter = document.getElementById('poemCounter');
 const prev = document.getElementById('prevPoem'); const next = document.getElementById('nextPoem');
 let active = 0;
 function renderList(){
   list.replaceChildren(); const q=(search.value||'').trim().toLowerCase();
   poems.forEach((p,i)=>{if(!(`${p.id} ${p.title} ${p.text}`).toLowerCase().includes(q))return;
     const b=document.createElement('button'); b.type='button'; b.className='poem-item'+(i===active?' active':'');
     const n=document.createElement('span'); n.textContent=String(i+1).padStart(2,'0')+'.';
     const t=document.createElement('span'); t.className='poem-item-title'; t.textContent=p.title;
     b.append(n,t); b.setAttribute('aria-current',i===active?'true':'false'); b.addEventListener('click',()=>{active=i;render();}); list.appendChild(b);
   });
 }
 function render(){
   if(!poems.length){title.textContent='Collection unavailable';body.textContent='The poem collection could not be loaded.';return;}
   const p=poems[active]; title.textContent=p.title; number.textContent=`POEM ${String(active+1).padStart(2,'0')}`;
   counter.textContent=`${String(active+1).padStart(2,'0')} / ${String(poems.length).padStart(2,'0')}`;
   body.replaceChildren(); (p.text||'').split(/\n\s*\n/).filter(Boolean).forEach(part=>{const para=document.createElement('p');para.textContent=part;body.appendChild(para);});
   prev.disabled=active===0;next.disabled=active===poems.length-1;renderList();
   if(window.innerWidth<760) document.querySelector('.poem-content')?.scrollIntoView({behavior:'smooth',block:'start'});
 }
 prev.addEventListener('click',()=>{if(active>0){active--;render();}}); next.addEventListener('click',()=>{if(active<poems.length-1){active++;render();}});
 search.addEventListener('input',renderList); document.getElementById('year').textContent=new Date().getFullYear(); render();
 document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'&&active>0){active--;render();} if(e.key==='ArrowRight'&&active<poems.length-1){active++;render();}});
})();