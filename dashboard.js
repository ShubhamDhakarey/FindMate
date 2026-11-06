let tab='all';const $=id=>document.getElementById(id);
function draw(){const a=FM.all(),r=a.filter(i=>tab==='all'||i.type===tab);
 $('stats').innerHTML=[['Total',a.length,'y'],['Missing',a.filter(i=>i.status==='missing').length,'r'],['Found',a.filter(i=>i.status==='found').length,''],['Returned',a.filter(i=>i.status==='returned').length,'b']].map(s=>`<div class="col-6 col-lg-3"><div class="panel stat ${s[2]}"><h3>${s[1]}</h3><span class="meta">${s[0]}</span></div></div>`).join('');
 document.querySelectorAll('[data-t]').forEach(b=>b.className='btn btn-'+(b.dataset.t===tab?'dark':'outline-dark'));
 $('rows').innerHTML=r.map(i=>`<tr><td><a href="item.html?id=${i.id}" class="fw-bold text-decoration-none">${esc(i.name)}</a><div class="meta">${i.id}</div></td><td>${i.type}</td><td>${esc(i.category)}</td><td>${esc(i.location)}</td><td>${fmtDate(i.date)}</td><td>${stBadge(i.status)}</td>
 <td class="text-nowrap"><select class="form-select form-select-sm d-inline w-auto" data-id="${i.id}" aria-label="Status">${['missing','found','returned'].map(s=>`<option ${s===i.status?'selected':''}>${s}</option>`).join('')}</select> <button class="btn btn-sm btn-outline-danger" data-del="${i.id}" aria-label="Delete"><i class="bi bi-trash"></i></button></td></tr>`).join('')||`<tr><td colspan="7">${emptyBox('No reports here yet.')}</td></tr>`;
 document.querySelectorAll('[data-id]').forEach(s=>s.onchange=()=>{FM.setStatus(s.dataset.id,s.value);toast('Status updated');draw()});
 document.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{if(confirm('Delete this report?')){FM.remove(b.dataset.del);draw()}})}
document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{tab=b.dataset.t;draw()});draw();
