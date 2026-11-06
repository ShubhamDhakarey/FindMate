const all=FM.all();
document.getElementById('stats').innerHTML=[['Lost reports',all.filter(i=>i.type==='lost').length,'r'],['Found reports',all.filter(i=>i.type==='found').length,''],['Returned to owners',all.filter(i=>i.status==='returned').length,'b'],['Possible matches',all.filter(i=>i.type==='lost'&&i.status==='missing').reduce((n,i)=>n+FM.matches(i).length,0),'y']].map(s=>`<div class="col-6 col-lg-3"><div class="panel stat ${s[2]}"><h3>${s[1]}</h3><span class="meta">${s[0]}</span></div></div>`).join('');
document.getElementById('recent').innerHTML=all.slice(0,8).map(i=>itemCard(i)).join('')||emptyBox('No reports yet.');
document.getElementById('quick').onsubmit=e=>{e.preventDefault();location.href='search.html?q='+encodeURIComponent(document.getElementById('hq').value)+'&cat='+encodeURIComponent(document.getElementById('hc').value)};
document.getElementById('hc').innerHTML='<option value="">All categories</option>'+catOptions();
