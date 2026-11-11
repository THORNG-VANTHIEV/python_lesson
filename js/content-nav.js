(function () {
  var sections = Array.from(document.querySelectorAll('main > section[id]'));
  var links = Array.from(document.querySelectorAll('.toc a[href^="#"]'));
  var ids = sections.map(function (section) { return section.id; });
  var hero = document.querySelector('.hero');
  var viewbar = document.getElementById('viewbar');
  var viewTitle = document.getElementById('viewbar-title');
  var topbarLocation = document.getElementById('topbar-location');
  var pager = document.getElementById('lesson-pager');
  var current = '';

  function nameFor(id) {
    var section = document.getElementById(id);
    var heading = section && section.querySelector('h2');
    return heading ? heading.textContent.trim() : 'ទំព័រដើម';
  }

  function pagerLink(id, direction) {
    var link = document.createElement('a');
    link.href = '#' + id;
    link.className = 'pager-link pager-' + direction;
    var small = document.createElement('small');
    small.textContent = direction === 'previous' ? '← មាតិកាមុន' : 'មាតិកាបន្ទាប់ →';
    var strong = document.createElement('strong');
    strong.textContent = nameFor(id);
    link.appendChild(small);
    link.appendChild(strong);
    return link;
  }

  function render(id, focusHeading) {
    if (ids.indexOf(id) === -1) id = 'start';
    current = id;
    sections.forEach(function (section) { section.hidden = section.id !== id; });
    links.forEach(function (link) {
      var active = link.hash === '#' + id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    var overview = id === 'start';
    hero.hidden = !overview;
    viewbar.hidden = overview;
    viewTitle.textContent = nameFor(id);
    topbarLocation.textContent = overview ? 'ទំព័រដើម' : nameFor(id);
    pager.hidden = overview;
    pager.replaceChildren();
    if (!overview) {
      var index = ids.indexOf(id);
      if (index > 0) pager.appendChild(pagerLink(ids[index - 1], 'previous'));
      if (index < ids.length - 1) pager.appendChild(pagerLink(ids[index + 1], 'next'));
    }
    document.title = (overview ? 'រៀន Python ពីសូន្យ' : nameFor(id)) + ' | មេរៀន Python ជាភាសាខ្មែរ';
    if (focusHeading) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      var heading = overview ? hero.querySelector('h1') : document.getElementById(id).querySelector('h2');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link || !ids.includes(link.hash.slice(1))) return;
    event.preventDefault();
    var id = link.hash.slice(1);
    if (id === 'start' && current === 'start' && link.classList.contains('button-quiet')) {
      var intro = document.getElementById('start');
      intro.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      var introHeading = intro.querySelector('h2');
      introHeading.tabIndex = -1;
      introHeading.focus({ preventScroll: true });
      return;
    }
    if (id !== current) history.pushState(null, '', '#' + id);
    render(id, true);
  });

  function fromLocation(focusHeading) {
    var id;
    try { id = decodeURIComponent(location.hash.slice(1)) || 'start'; }
    catch (e) { id = 'start'; }
    render(id, focusHeading);
    if (!focusHeading) window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', function () { fromLocation(true); });
  fromLocation(false);
})();
