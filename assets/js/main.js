/* eQuran Journey — page interactions & animations.
   Header/footer markup + mobile-nav + forms are handled in partials.js.
   This file handles page-body animations and scroll behaviour. */
(function () {
  'use strict';

  /* ---- Sticky header + scroll progress (header/footer are injected,
          so (re)bind once they're ready) ---- */
  var header, prog;
  function grabChrome() {
    header = document.querySelector('.header');
    prog = document.querySelector('.scroll-prog');
    onScroll();
  }
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 20);
    if (prog) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('partials:ready', grabChrome);
  grabChrome();

  /* ---- Reveal on scroll ---- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  function observeReveals() { document.querySelectorAll('[data-reveal]:not(.in)').forEach(function (el) { io.observe(el); }); }
  observeReveals();
  document.addEventListener('partials:ready', observeReveals);

  /* ---- Counters ---- */
  function animateCount(el) {
    var target = parseFloat(el.dataset.count), suffix = el.dataset.suffix || '', dur = 1600,
        start = performance.now(), isFloat = target % 1 !== 0;
    function tick(now) {
      var p = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3), val = target * eased;
      el.textContent = (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = (isFloat ? target.toFixed(1) : target) + suffix;
    }
    requestAnimationFrame(tick);
  }
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });

  /* ---- Testimonial slider ---- */
  var track = document.querySelector('.testi-track');
  if (track) {
    var slides = track.children.length, idx = 0;
    function perView() { var w = window.innerWidth; return w <= 760 ? 1 : w <= 1080 ? 2 : 3; }
    function maxIdx() { return Math.max(0, slides - perView()); }
    function go(n) {
      idx = Math.min(Math.max(n, 0), maxIdx());
      var card = track.children[0]; if (!card) return;
      var step = card.getBoundingClientRect().width + 26;
      track.style.transform = 'translateX(' + (-idx * step) + 'px)';
    }
    var prev = document.querySelector('.testi-prev'), next = document.querySelector('.testi-next');
    prev && prev.addEventListener('click', function () { go(idx - 1); });
    next && next.addEventListener('click', function () { go(idx + 1); });
    var auto = setInterval(function () { go(idx >= maxIdx() ? 0 : idx + 1); }, 5000);
    var wrap = document.querySelector('.testi-wrap');
    wrap && wrap.addEventListener('mouseenter', function () { clearInterval(auto); });
    wrap && wrap.addEventListener('mouseleave', function () { auto = setInterval(function () { go(idx >= maxIdx() ? 0 : idx + 1); }, 5000); });
    window.addEventListener('resize', function () { go(idx); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.ac-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement, ans = item.querySelector('.ac-a'), open = item.classList.contains('open'),
          group = item.closest('.faq');
      if (group) group.querySelectorAll('.ac.open').forEach(function (o) { if (o !== item) { o.classList.remove('open'); o.querySelector('.ac-a').style.maxHeight = null; } });
      if (open) { item.classList.remove('open'); ans.style.maxHeight = null; }
      else { item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
    });
  });

  /* ---- Magnetic buttons (desktop) ---- */
  if (window.matchMedia('(pointer:fine)').matches) {
    function magnetize() {
      document.querySelectorAll('.hero-actions .btn, .cta-actions .btn').forEach(function (b) {
        if (b.dataset.mag) return; b.dataset.mag = '1';
        b.addEventListener('mousemove', function (e) {
          var r = b.getBoundingClientRect();
          b.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * 0.22 + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.28 - 4) + 'px)';
        });
        b.addEventListener('mouseleave', function () { b.style.transform = ''; });
      });
    }
    magnetize();
  }

  /* ---- Hero parallax ---- */
  var px = document.querySelector('[data-parallax]');
  if (px) window.addEventListener('scroll', function () {
    var y = window.scrollY; if (y < 900) px.style.transform = 'translateY(' + (y * 0.18) + 'px) scale(1.05)';
  }, { passive: true });

  /* ---- Make entire course cards clickable ---- */
  function wireCards() {
    document.querySelectorAll('.course').forEach(function (card) {
      if (card.dataset.clickable) return;
      var link = card.querySelector('.c-link, a[href]');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href) return;
      card.dataset.clickable = '1';
      card.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;   /* let real links work normally */
        window.location.href = href;
      });
    });
  }
  wireCards();
  document.addEventListener('partials:ready', wireCards);

  /* ---- Hero card tilt ---- */
  var tilt = document.querySelector('[data-tilt]');
  if (tilt && window.matchMedia('(pointer:fine)').matches) {
    tilt.addEventListener('mousemove', function (e) {
      var r = tilt.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = 'rotateY(' + x * 6 + 'deg) rotateX(' + (-y * 6) + 'deg)';
    });
    tilt.addEventListener('mouseleave', function () { tilt.style.transform = ''; });
  }
})();
