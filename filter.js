const query=document.querySelector('#query'), category=document.querySelector('#category');
const buttons=[...document.querySelectorAll('[data-tab]')], cards=[...document.querySelectorAll('.card')];
const params=new URLSearchParams(location.search);
let tab=buttons.some(b=>b.dataset.tab===params.get('group'))?params.get('group'):'全部';
query.value=params.get('q')||'';category.value=params.get('category')||'';
function render(){
  const terms=query.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let count=0;
  for(const card of cards){
    const match=(tab==='全部'||tab===card.dataset.group)&&(!category.value||category.value===card.dataset.cat)&&terms.every(t=>card.dataset.search.toLowerCase().includes(t));
    card.hidden=!match;if(match) count++;
  }
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tab===tab)));
  document.querySelector('#count').textContent=count+' 项';document.querySelector('#empty').hidden=count!==0;
  const url=new URL(location.href);
  for(const [key,val] of Object.entries({q:query.value,group:tab==='全部'?'':tab,category:category.value})){if(val)url.searchParams.set(key,val);else url.searchParams.delete(key);}
  if(url.href!==location.href)history.replaceState(null,'',url);
}
buttons.forEach(b=>b.onclick=()=>{tab=b.dataset.tab;category.value='';render()});
category.onchange=()=>{tab='全部';render()};query.oninput=render;
document.querySelector('#reset').onclick=()=>{tab='全部';category.value='';query.value='';render()};render();
