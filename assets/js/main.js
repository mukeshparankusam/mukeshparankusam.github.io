(() => {
 const preloader=document.getElementById('preloader');window.addEventListener('load',()=>setTimeout(()=>preloader?.classList.add('done'),450));
 const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
 const toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('nav');
 toggle?.addEventListener('click',()=>{const opened=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(opened));toggle.textContent=opened?'×':'☰';});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.textContent='☰';}));
 const launcher=document.getElementById('aiLauncher'),panel=document.getElementById('chatPanel'),close=document.getElementById('chatClose'),messages=document.getElementById('chatMessages'),form=document.getElementById('chatForm'),input=document.getElementById('chatInput'),newChat=document.getElementById('chatNew'),status=document.getElementById('chatStatus');
 if(!launcher||!panel||!messages||!form||!input)return;
 let history=[];
 const setChat=open=>{panel.classList.toggle('open',open);panel.setAttribute('aria-hidden',String(!open));if(open)input.focus();};
 launcher.addEventListener('click',()=>setChat(!panel.classList.contains('open')));close?.addEventListener('click',()=>setChat(false));
 const addMessage=(text,who)=>{const b=document.createElement('div');b.className=`chat-bubble ${who}`;b.textContent=text;messages.appendChild(b);messages.scrollTop=messages.scrollHeight;return b;};
 newChat?.addEventListener('click',()=>{history=[];messages.replaceChildren();addMessage('Hello! I’m EMKAY AI. What would you like to know?','bot');if(status)status.textContent='New conversation started.';input.focus();});
 form.addEventListener('submit',async e=>{
   e.preventDefault();const question=input.value.trim();if(!question)return;
   addMessage(question,'user');history.push({role:'user',content:question});input.value='';input.disabled=true;const send=form.querySelector('button');if(send)send.disabled=true;
   const pending=addMessage('Thinking…','bot');
   try{
     const endpoint=window.EMKAY_AI_ENDPOINT;
     if(!endpoint){pending.textContent='EMKAY AI is ready, but its secure AI service has not been connected yet. To enable live answers, deploy the included Cloudflare Worker and set its URL in assets/js/config.js.';if(status)status.textContent='Backend setup required for live answers.';return;}
     const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:history.slice(-12)})});
     if(!response.ok)throw new Error(`Service error ${response.status}`);
     const data=await response.json();const reply=data.reply||data.output_text||data.message;
     if(!reply)throw new Error('No reply returned');pending.textContent=reply;history.push({role:'assistant',content:reply});if(status)status.textContent='Connected';
   }catch(err){pending.textContent='I could not connect just now. Please check the AI service configuration or try again later.';if(status)status.textContent='Connection unavailable';history.pop();}
   finally{input.disabled=false;if(send)send.disabled=false;input.focus();messages.scrollTop=messages.scrollHeight;}
 });
})();