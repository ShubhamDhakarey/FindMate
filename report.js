const form=document.getElementById('reportForm'),type=form.dataset.type;
document.getElementById('category').innerHTML='<option value="">Select category</option>'+catOptions();
document.getElementById('date').max=new Date().toISOString().slice(0,10);
let photo='';
document.getElementById('photo').onchange=e=>{const f=e.target.files[0],pv=document.getElementById('preview');if(!f)return;
 if(!f.type.startsWith('image/')){alert('Please choose an image file.');e.target.value='';return}
 resizeImage(f,d=>{photo=d;pv.src=d;pv.style.display='block'})};
form.onsubmit=e=>{e.preventDefault();form.classList.add('was-validated');if(!form.checkValidity())return;
 const v=id=>document.getElementById(id).value.trim();
 const it=FM.add({type,name:v('name'),category:v('category'),location:v('location'),date:v('date'),description:v('description'),contactName:v('contactName'),contact:v('contact'),photo});
 location.href='item.html?id='+it.id+'&new=1'};
