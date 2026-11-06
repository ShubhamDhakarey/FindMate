const q=new URLSearchParams(location.search),$=id=>document.getElementById(id);
$('cat').innerHTML='<option value="">All categories</option>'+catOptions();
$('q').value=q.get('q')||'';$('cat').value=q.get('cat')||'';
function run(){const t=$('q').value.toLowerCase().trim(),l=$('loc').value.toLowerCase().trim(),c=$('cat').value,ty=$('type').value,s=$('status').value;
 const r=FM.all().filter(i=>(!t||(i.name+' '+i.description+' '+i.category).toLowerCase().includes(t))&&(!l||i.location.toLowerCase().includes(l))&&(!c||i.category===c)&&(!ty||i.type===ty)&&(!s||i.status===s));
 $('count').textContent=r.length+' item'+(r.length===1?'':'s')+' found';
 $('results').innerHTML=r.map(i=>itemCard(i)).join('')||emptyBox('No items match these filters. Try fewer keywords.','<a href="report-lost.html" class="btn btn-teal">Report a lost item</a>')}
['q','loc','cat','type','status'].forEach(id=>$(id).addEventListener('input',run));
$('reset').onclick=()=>{['q','loc','cat','type','status'].forEach(id=>$(id).value='');run()};
run();
