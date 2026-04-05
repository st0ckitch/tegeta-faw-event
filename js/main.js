(function () {
  'use strict';

  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');

  // ---- Sticky header shadow on scroll ----
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile nav toggle ----
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    // close when clicking a nav link
    document.querySelectorAll('.main-nav a').forEach(a => {
      a.addEventListener('click', () => {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Reveal on scroll ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---- Language toggle ----
  const langBtns = document.querySelectorAll('.lang-toggle button');
  const applyLang = (lang) => {
    const dict = window.I18N && window.I18N[lang];
    if (!dict) return;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    try { localStorage.setItem('tg_lang', lang); } catch (e) {}
  };
  langBtns.forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  // Restore last-used language
  let savedLang = 'en';
  try { savedLang = localStorage.getItem('tg_lang') || 'en'; } catch (e) {}
  if (savedLang !== 'en') applyLang(savedLang);

})();
