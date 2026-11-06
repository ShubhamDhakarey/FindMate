/* Data layer: localStorage CRUD + matching engine */
const KEY='findmate_items_v1';
const FM={
 all(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]}},
 save(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){alert('Storage full. Remove old reports or use a smaller photo.')}},
 get(id){return this.all().find(i=>i.id===id)},
 add(it){const a=this.all();it.id='FM'+Date.now().toString(36).toUpperCase();it.created=new Date().toISOString();it.status=it.type==='lost'?'missing':'found';a.unshift(it);this.save(a);return it},
 setStatus(id,s){const a=this.all(),i=a.find(x=>x.id===id);if(i){i.status=s;this.save(a)}},
 remove(id){this.save(this.all().filter(i=>i.id!==id))},
 words(s){return(s||'').toLowerCase().split(/[^a-z0-9]+/).filter(w=>w.length>2)},
 overlap(a,b){const x=this.words(a),y=this.words(b);return x.length?x.filter(w=>y.includes(w)).length/Math.min(x.length,y.length||1):0},
 score(a,b){let s=0;if(a.category===b.category)s+=30;
  s+=Math.min(1,this.overlap(a.name,b.name)*1.5)*35;
  s+=Math.min(1,this.overlap(a.location,b.location)*1.5)*25;
  s+=Math.min(1,this.overlap(a.description,b.description)*2)*10;
  if(Math.abs(new Date(a.date)-new Date(b.date))<=7*864e5)s+=10;return Math.min(100,Math.round(s))},
 matches(it){return this.all().filter(o=>o.type!==it.type&&o.status!=='returned').map(o=>({item:o,score:this.score(it,o)})).filter(m=>m.score>=40).sort((a,b)=>b.score-a.score)},
 seed(){if(localStorage.getItem(KEY)!==null)return;const d=n=>new Date(Date.now()-n*864e5).toISOString().slice(0,10);
  const s=[['lost','Black Leather Wallet','Accessories','Library, Main Campus',d(2),'Black wallet with college ID and two cards.','Aman','aman@example.com'],
  ['found','Wallet (black leather)','Accessories','Main Campus Library',d(1),'Found near the reading hall, has an ID card inside.','Library Desk','9876543210'],
  ['lost','Samsung Galaxy Phone','Electronics','Bus Stand, Bhopal',d(3),'Blue case, cracked corner on screen.','Riya','riya@example.com'],
  ['found','Blue Backpack','Bags','Canteen',d(1),'Backpack with notebooks and a water bottle.','Security Office','9123456780'],
  ['found','Aadhaar Card','Documents','City Bus No. 12',d(4),'Identity card found under a seat.','Kabir','kabir@example.com']];
  this.save(s.map((r,i)=>({id:'FMDEMO'+i,type:r[0],name:r[1],category:r[2],location:r[3],date:r[4],description:r[5],contactName:r[6],contact:r[7],photo:'',status:r[0]==='lost'?'missing':'found',created:new Date(Date.now()-i*36e5).toISOString()})))}
};
FM.seed();
