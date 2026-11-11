(function(){
  // Copy buttons
  document.querySelectorAll('.code pre').forEach(function(pre){
    var btn=document.createElement('button');
    btn.className='copy'; btn.type='button'; btn.textContent='ចម្លង';
    btn.addEventListener('click',function(){
      var text=pre.innerText;
      var done=function(){btn.textContent='បានចម្លង';setTimeout(function(){btn.textContent='ចម្លង';},1500);};
      var fallback=function(){var r=document.createRange();r.selectNodeContents(pre);var s=getSelection();s.removeAllRanges();s.addRange(r);btn.textContent='បានជ្រើសរើស';setTimeout(function(){btn.textContent='ចម្លង';},1500);};
      try{navigator.clipboard.writeText(text).then(done,fallback);}catch(e){fallback();}
    });
    pre.parentNode.appendChild(btn);
  });
})();
