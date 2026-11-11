(function(){
  // Progress
  var KEY='pyk-done', KM='០១២៣៤៥៦៧៨៩';
  var km=function(n){return String(n).replace(/\d/g,function(d){return KM[d];});};
  var state={};
  try{state=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch(e){state={};}
  var boxes=document.querySelectorAll('input[data-l]');
  function render(){
    var n=0;
    boxes.forEach(function(b){
      var on=!!state[b.dataset.l]; b.checked=on; if(on)n++;
      var link=document.querySelector('.toc a[data-l="'+b.dataset.l+'"]');
      if(link)link.classList.toggle('done',on);
    });
    document.getElementById('prog-text').textContent=km(n)+' / ១២ មេរៀន';
    document.getElementById('prog-bar').style.width=(n/12*100)+'%';
    document.getElementById('bar-prog').textContent='✓ '+km(n)+' / ១២';
  }
  boxes.forEach(function(b){
    b.addEventListener('change',function(){
      state[b.dataset.l]=b.checked;
      try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}
      render();
    });
  });
  render();
})();
