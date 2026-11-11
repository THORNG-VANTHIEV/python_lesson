(function(){
  // Menu drawer: slide-over on phones, collapsible sidebar on wider screens
  var NAV_KEY='pyk-nav', body=document.body;
  var nav=document.getElementById('toc-nav'), toggle=document.getElementById('nav-toggle'), closeBtn=document.getElementById('nav-close');
  var phone=window.matchMedia('(max-width:900px)');
  var background=document.querySelectorAll('.topbar,.hero,main');
  function syncToggle(){
    var open=phone.matches?body.classList.contains('drawer-open'):!body.classList.contains('nav-collapsed');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'បិទម៉ឺនុយ':'បើកម៉ឺនុយ');
  }
  function setDrawer(open,restoreFocus){
    body.classList.toggle('drawer-open',open);
    background.forEach(function(el){el.inert=open;});
    syncToggle();
    if(open){
      var cur=nav.querySelector('a.active');
      if(cur)nav.scrollTop=cur.offsetTop-nav.clientHeight/2;
      closeBtn.focus({preventScroll:true});
    }else if(restoreFocus){
      // The toggle sits in the sticky bar, inside scroll-padding: a plain focus() would scroll the page.
      toggle.focus({preventScroll:true});
    }
  }
  toggle.addEventListener('click',function(){
    if(phone.matches){setDrawer(true);return;}
    var collapsed=body.classList.toggle('nav-collapsed');
    try{localStorage.setItem(NAV_KEY,collapsed?'closed':'open');}catch(e){}
    syncToggle();
  });
  closeBtn.addEventListener('click',function(){setDrawer(false,true);});
  document.getElementById('scrim').addEventListener('click',function(){setDrawer(false,true);});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&body.classList.contains('drawer-open'))setDrawer(false,true);
  });
  nav.addEventListener('click',function(e){
    if(phone.matches&&e.target.closest('a'))setDrawer(false,false);
  });
  phone.addEventListener('change',function(){setDrawer(false,false);});
  syncToggle();
})();
