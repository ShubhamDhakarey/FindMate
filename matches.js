const box=document.getElementById('list');
const lost=FM.all().filter(i=>i.type==='lost'&&i.status==='missing');
box.innerHTML=lost.map(l=>({l,m:FM.matches(l)})).filter(x=>x.m.length).map(x=>`<div class="panel mb-4"><h5 class="mb-3"><i class="bi bi-search"></i> You lost: ${esc(x.l.name)} <a class="btn btn-sm btn-outline-dark ms-2" href="item.html?id=${x.l.id}">View report</a></h5><div class="row g-3">${x.m.map(m=>itemCard(m.item,`<div class="mt-2 score">${m.score}% match</div>`)).join('')}</div></div>`).join('')
 ||`<div class="panel">${emptyBox('No matches yet. Matches appear when a found report is similar to a lost one.','<a href="report-found.html" class="btn btn-teal">Report a found item</a>')}</div>`;
