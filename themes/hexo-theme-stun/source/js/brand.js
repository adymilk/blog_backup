(function () {
  'use strict';

  var root = document.documentElement;

  // 1. Fixed header scroll state
  var header = document.getElementById('site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 16) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Theme Toggle
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var isDark = root.classList.toggle('nightmode');
      try { localStorage.setItem('site-theme', isDark ? 'dark' : 'light'); } catch (e) {}
    });
  }

  // 3. Bilingual ZH / EN Toggle
  var langBtn = document.getElementById('lang-toggle');
  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    if (langBtn) langBtn.textContent = lang === 'en' ? '中' : 'EN';
    var nodes = document.querySelectorAll('[data-zh][data-en]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      el.textContent = el.getAttribute(lang === 'en' ? 'data-en' : 'data-zh');
    }
  }
  var currentLang = root.getAttribute('data-lang') === 'en' ? 'en' : 'zh';
  applyLang(currentLang);
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      currentLang = currentLang === 'en' ? 'zh' : 'en';
      applyLang(currentLang);
      try { localStorage.setItem('site-lang', currentLang); } catch (e) {}
    });
  }

  // 4. Mobile Drawer Menu
  var drawer = document.getElementById('mobile-drawer');
  var drawerOpen = document.getElementById('drawer-open');
  var drawerClose = document.getElementById('drawer-close');
  function toggleDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (drawerOpen) drawerOpen.addEventListener('click', function () { toggleDrawer(true); });
  if (drawerClose) drawerClose.addEventListener('click', function () { toggleDrawer(false); });
  if (drawer) {
    var bd = drawer.querySelector('.mobile-drawer__backdrop');
    if (bd) bd.addEventListener('click', function () { toggleDrawer(false); });
  }

  // 5. Search Modal (/search.json, fetched lazily on open)
  var searchModal = document.getElementById('search-modal');
  var searchTrigger = document.getElementById('search-trigger');
  var searchClose = document.getElementById('search-close');
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var searchCache = null;

  function openSearch() {
    if (!searchModal) return;
    searchModal.classList.add('is-open');
    searchModal.setAttribute('aria-hidden', 'false');
    if (searchInput) setTimeout(function () { searchInput.focus(); }, 60);
    if (!searchCache) {
      fetch('/search.json').then(function (r) { return r.json(); }).then(function (data) {
        searchCache = Array.isArray(data) ? data : [];
        renderSearch(searchInput ? searchInput.value : '');
      }).catch(function () {
        if (searchResults) searchResults.innerHTML = '<p class="search-empty">暂无搜索索引</p>';
      });
    }
  }
  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove('is-open');
    searchModal.setAttribute('aria-hidden', 'true');
  }
  function renderSearch(q) {
    if (!searchResults || !searchCache) return;
    var term = (q || '').trim().toLowerCase();
    if (!term) {
      var recent = searchCache.slice(0, 6);
      searchResults.innerHTML = recent.map(function (item) {
        return '<a class="search-item" href="' + item.url + '"><span class="search-item__title">' + item.title + '</span></a>';
      }).join('');
      return;
    }
    var hits = searchCache.filter(function (item) {
      return (item.title && item.title.toLowerCase().indexOf(term) !== -1) ||
             (item.content && item.content.toLowerCase().indexOf(term) !== -1);
    }).slice(0, 10);
    if (!hits.length) {
      searchResults.innerHTML = '<p class="search-empty">未找到匹配的文章</p>';
      return;
    }
    searchResults.innerHTML = hits.map(function (item) {
      return '<a class="search-item" href="' + item.url + '"><span class="search-item__title">' + item.title + '</span></a>';
    }).join('');
  }
  if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchModal) {
    var sbd = searchModal.querySelector('.search-modal__backdrop');
    if (sbd) sbd.addEventListener('click', closeSearch);
  }
  if (searchInput) {
    searchInput.addEventListener('input', function () { renderSearch(searchInput.value); });
  }

  // 6. Copy to Clipboard + Toast
  var toastEl = document.getElementById('toast');
  var toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2200);
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    var val = btn.getAttribute('data-copy');
    if (navigator.clipboard && val) {
      navigator.clipboard.writeText(val).then(function () {
        showToast('已复制：' + val);
      });
    }
  });

  // 6b. Resume PDF Download Feedback
  document.addEventListener('click', function (e) {
    var dl = e.target.closest('.js-download-resume');
    if (dl) showToast('正在下载 PDF 简历：' + (dl.getAttribute('download') || 'Professional_Resume_CN.pdf'));
  });

  // 7. Image Lightbox (loads HD original via data-full only on click)
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  document.addEventListener('click', function (e) {
    var img = e.target.closest('.prose img, .speaking-card__img, .project-detail__cover img, .hero__photo, .ab-hero__img, .r-hero__portrait');
    if (img && lightbox && lightboxImg) {
      lightboxImg.src = img.getAttribute('data-full') || img.currentSrc || img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
    } else if (lightbox && e.target === lightbox) {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeSearch();
      toggleDrawer(false);
      if (lightbox) {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
      }
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // 8. Category Filter Pills on Channel Pages
  document.addEventListener('click', function (e) {
    var chip = e.target.closest('[data-filter]');
    if (!chip) return;
    var val = chip.getAttribute('data-filter');
    var group = chip.closest('[data-filter-group]');
    if (!group) return;
    var chips = group.querySelectorAll('[data-filter]');
    for (var i = 0; i < chips.length; i++) chips[i].classList.remove('is-active');
    chip.classList.add('is-active');
    var items = document.querySelectorAll('[data-category]');
    for (var j = 0; j < items.length; j++) {
      var cat = items[j].getAttribute('data-category') || '';
      items[j].style.display = (val === 'all' || cat.indexOf(val) !== -1) ? '' : 'none';
    }
  });

  // 9. Subtle Scroll Reveal
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    for (var r = 0; r < reveals.length; r++) io.observe(reveals[r]);
  } else {
    for (var r2 = 0; r2 < reveals.length; r2++) reveals[r2].classList.add('is-revealed');
  }

  // 10. Article Reading Progress Bar (GPU-composited transform: scaleX)
  var prog = document.getElementById('reading-progress');
  if (prog) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var h = document.documentElement;
        var max = h.scrollHeight - h.clientHeight;
        var ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        prog.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
        ticking = false;
      });
    }, { passive: true });
  }
})();
