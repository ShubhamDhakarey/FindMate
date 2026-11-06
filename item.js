const id=new URLSearchParams(location.search).get('id'),box=document.getElementById('detail');
function draw(){const it=FM.get(id);
 if(!it){box.innerHTML=emptyBox('This report does not exist or was deleted.','<a href="search.html" class="btn btn-teal">Back to search</a>');return}
 const m=it.status==='returned'?[]:FM.matches(it);
 box.innerHTML=`<div class="col-lg-7">${it.photo?`<img class="detail-img" src="${it.photo}" alt="${esc(it.name)}">`:`<div class="item"><div class="ph c-${it.category}" style="height:300px"><i class="bi bi-${CATS[it.category]||'box-seam'}"></i></div></div>`}</div>
 <div class="col-lg-5"><div class="panel"><div class="d-flex justify-content-between"><span class="ty">${it.type==='lost'?'LOST ITEM':'FOUND ITEM'}</span>${stBadge(it.status)}</div>
 <h2 class="my-2">${esc(it.name)}</h2><p>${esc(it.description)}</p>
 <ul class="list-unstyled meta"><li><i class="bi bi-tag"></i> ${esc(it.category)}</li><li><i class="bi bi-geo-alt"></i> ${esc(it.location)}</li><li><i class="bi bi-calendar3"></i> ${fmtDate(it.date)}</li><li><i class="bi bi-hash"></i> Report ID ${it.id}</li></ul>
 <div class="p-3 rounded mb-3" style="background:#fff7d6"><b>Contact:</b> ${esc(it.contactName)}<br>${esc(it.contact)}</div>
 <label class="form-label fw-bold">Update status</label><div class="btn-group w-100 mb-3">${['missing','found','returned'].map(s=>`<button class="btn btn-${it.status===s?'dark':'outline-dark'}" data-s="${s}">${s[0].toUpperCase()+s.slice(1)}</button>`).join('')}</div>
 <button class="btn btn-outline-danger w-100" id="del"><i class="bi bi-trash"></i> Delete report</button></div></div>
 <div class="col-12"><h4 class="mt-4">Possible matches</h4><div class="row g-3">${m.map(x=>itemCard(x.item,`<div class="mt-2 score">${x.score}% match</div>`)).join('')||emptyBox('No similar reports right now.')}</div></div>`;
 box.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{FM.setStatus(id,b.dataset.s);toast('Status updated');draw()});
 document.getElementById('del').onclick=()=>{if(confirm('Delete this report permanently?')){FM.remove(id);location.href='dashboard.html'}}}
draw();if(new URLSearchParams(location.search).get('new'))toast('Report submitted');
