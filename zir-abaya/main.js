const PRODUCTS=[
 {id:1,cat:'classic',en:'Noor Black Abaya',ar:'عباية نور سوداء',price:420,c1:'#2a2522',c2:'#0e0c0b'},
 {id:2,cat:'classic',en:'Layla Open Abaya',ar:'عباية ليلى مفتوحة',price:480,c1:'#3a322b',c2:'#15110e'},
 {id:3,cat:'embroidered',en:'Sahar Embroidered Abaya',ar:'عباية سحر مطرزة',price:690,c1:'#4a3d2e',c2:'#1a1511'},
 {id:4,cat:'embroidered',en:'Dana Pearl Cuff Abaya',ar:'عباية دانة بأكمام اللؤلؤ',price:760,c1:'#5a4a38',c2:'#211b15'},
 {id:5,cat:'everyday',en:'Reem Linen Abaya – Sand',ar:'عباية ريم كتان – رملي',price:390,c1:'#c9b79c',c2:'#8c7a60'},
 {id:6,cat:'everyday',en:'Hana Linen Abaya – Olive',ar:'عباية هناء كتان – زيتي',price:390,c1:'#7d7a5c',c2:'#3f3d2c'},
 {id:7,cat:'occasion',en:'Aaliyah Satin Abaya',ar:'عباية عالية ساتان',price:890,c1:'#6b4a45',c2:'#2a1816'},
 {id:8,cat:'occasion',en:'Maha Crepe Abaya',ar:'عباية مها كريب',price:820,c1:'#2f3a3a',c2:'#101616'}];
const T={
 en:{add:'Add to bag',bag:'Bag',empty:'Your bag is empty.',total:'Total',checkout:'Order via WhatsApp',remove:'Remove',all:'All',classic:'Classic',embroidered:'Embroidered',everyday:'Everyday',occasion:'Occasion',lang:'العربية',cur:'SAR'},
 ar:{add:'أضف إلى الحقيبة',bag:'الحقيبة',empty:'حقيبتك فارغة.',total:'المجموع',checkout:'اطلب عبر واتساب',remove:'إزالة',all:'الكل',classic:'كلاسيكي',embroidered:'مطرز',everyday:'يومي',occasion:'مناسبات',lang:'English',cur:'ر.س'}};
const WA='966500000000'; // TODO: replace with your WhatsApp number (country code, no +)
let lang=localStorage.zl||'en',cart=JSON.parse(localStorage.zc||'[]'),filter='all';
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
function setLang(){document.documentElement.lang=lang;document.documentElement.dir=lang=='ar'?'rtl':'ltr';
 $$('[data-en]').forEach(e=>e.textContent=e.dataset[lang]);
 $$('[data-ph-en]').forEach(e=>e.placeholder=e.dataset[lang=='ar'?'phAr':'phEn']);
 $('#lang').textContent=T[lang].lang;render();drawer()}
function render(){const g=$('#products');if(!g)return;
 const f=$('#filters');if(f&&!f.children.length)['all','classic','embroidered','everyday','occasion'].forEach(k=>{const b=document.createElement('button');b.dataset.k=k;b.onclick=()=>{filter=k;render()};f.append(b)});
 if(f)[...f.children].forEach(b=>{b.textContent=T[lang][b.dataset.k];b.className=b.dataset.k==filter?'on':''});
 const lim=g.dataset.limit?+g.dataset.limit:99;
 g.innerHTML=PRODUCTS.filter(p=>filter=='all'||p.cat==filter).slice(0,lim).map(p=>`<div class="card"><div class="ph" style="--c1:${p.c1};--c2:${p.c2}"></div><h3>${p[lang]}</h3><div class="price">${T[lang].cur} ${p.price}</div><button class="btn" onclick="add(${p.id})">${T[lang].add}</button></div>`).join('')}
function add(id){cart.push(id);save();$('#drawer').classList.add('open')}
function rm(i){cart.splice(i,1);save()}
function save(){localStorage.zc=JSON.stringify(cart);drawer()}
function drawer(){const t=T[lang],items=cart.map(id=>PRODUCTS.find(p=>p.id==id));
 $('#count').textContent=cart.length;
 $('#items').innerHTML=items.length?items.map((p,i)=>`<li><span>${p[lang]}<br><small>${t.cur} ${p.price}</small></span><button onclick="rm(${i})">${t.remove}</button></li>`).join(''):`<li>${t.empty}</li>`;
 const sum=items.reduce((a,p)=>a+p.price,0);$('#sum').textContent=`${t.cur} ${sum}`;
 const msg=encodeURIComponent('Zir Abaya order:\n'+items.map(p=>'- '+p.en+' ('+p.price+' SAR)').join('\n')+'\nTotal: '+sum+' SAR');
 $('#wa').href=`https://wa.me/${WA}?text=${msg}`;$('#wa').textContent=t.checkout}
document.addEventListener('DOMContentLoaded',()=>{
 $('#lang').onclick=()=>{lang=lang=='en'?'ar':'en';localStorage.zl=lang;setLang()};
 $('#bag').onclick=()=>$('#drawer').classList.toggle('open');
 $('#close').onclick=()=>$('#drawer').classList.remove('open');
 $('#year').textContent=new Date().getFullYear();setLang()});
