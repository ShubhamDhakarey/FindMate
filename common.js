/* Shared UI: navbar, footer, cards, toast, helpers */
const CATS={Electronics:'phone',Documents:'file-earmark-text',Bags:'bag',Accessories:'watch',Books:'book',Other:'box-seam'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtDate=d=>new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
const stBadge=s=>`<span class="st ${s}">${s[0].toUpperCase()+s.slice(1)}</span>`;
function catOptions(sel){return Object.keys(CATS).map(c=>`<option ${c===sel?'selected':''}>${c}</option>`).join('')}
function itemCard(it,extra=''){return `<div class="col-sm-6 col-lg-4 col-xl-3"><div class="item">
 <div class="ph c-${it.category}" ${it.photo?`style="background-image:url('${it.photo}')"`:''}>${it.photo?'':`<i class="bi bi-${CATS[it.category]||'box-seam'}"></i>`}</div>
 <div class="body"><div class="d-flex justify-content-between mb-1"><span class="ty ${it.type}">${it.type==='lost'?'LOST':'FOUND'}</span>${stBadge(it.status)}</div>
 <h6 class="fw-bold mb-1">${esc(it.name)}</h6><div class="meta"><i class="bi bi-geo-alt"></i> ${esc(it.location)}<br><i class="bi bi-calendar3"></i> ${fmtDate(it.date)}</div>${extra}</div>
 <a href="item.html?id=${it.id}" class="btn btn-sm btn-outline-dark m-3 mt-0">View details</a></div></div>`}
function emptyBox(msg,link){return `<div class="empty col-12"><i class="bi bi-inbox"></i><p class="mt-2">${msg}</p>${link||''}</div>`}
function toast(msg){const b=document.createElement('div');b.className='toastbox';b.innerHTML=`<div class="toast show text-bg-dark"><div class="toast-body"><i class="bi bi-check-circle text-warning"></i> ${esc(msg)}</div></div>`;document.body.appendChild(b);setTimeout(()=>b.remove(),2600)}
function resizeImage(file,cb){const r=new FileReader();r.onload=e=>{const im=new Image();im.onload=()=>{const m=600,k=Math.min(1,m/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.7))};im.src=e.target.result};r.readAsDataURL(file)}
document.addEventListener('DOMContentLoaded',()=>{
 const p=document.body.dataset.page,L=[['index','Home','index.html'],['report-lost','Report Lost','report-lost.html'],['report-found','Report Found','report-found.html'],['search','Search','search.html'],['matches','Matches','matches.html'],['dashboard','Dashboard','dashboard.html']];
 document.getElementById('nav').innerHTML=`<nav class="navbar navbar-expand-lg"><div class="container"><a class="brand" href="index.html"><i class="bi bi-tag-fill"></i> FindMate</a>
 <button class="navbar-toggler bg-light" data-bs-toggle="collapse" data-bs-target="#nv" aria-label="Menu"><span class="navbar-toggler-icon"></span></button>
 <div class="collapse navbar-collapse" id="nv"><ul class="navbar-nav ms-auto">${L.map(l=>`<li><a class="nav-link ${l[0]===p?'active':''}" href="${l[2]}">${l[1]}</a></li>`).join('')}</ul></div></div></nav>`;
 document.getElementById('foot').innerHTML=`<footer><div class="container d-flex flex-wrap justify-content-between"><span><b class="text-white">FindMate</b> – Lost &amp; Found Management System</span><span>Data is saved in your browser (LocalStorage).</span></div></footer>`;
});
