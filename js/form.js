(function () {
  'use strict';

  // Replace this with a real endpoint (Formspree / custom backend) when ready.
  const ENDPOINT = null;

  const tr = (key, fallback) => {
    const lang = document.documentElement.lang || 'en';
    return (window.I18N && window.I18N[lang] && window.I18N[lang][key]) || fallback;
  };

  const validate = (form) => {
    let ok = true;
    form.querySelectorAll('.field').forEach(f => f.classList.remove('error'));
    form.querySelectorAll('[required]').forEach(input => {
      const val = (input.value || '').trim();
      const field = input.closest('.field');
      let invalid = !val;
      if (!invalid && input.type === 'email') {
        invalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      }
      if (!invalid && input.type === 'checkbox') {
        invalid = !input.checked;
      }
      if (input.type === 'checkbox' && input.hasAttribute('required') && !input.checked) {
        invalid = true;
      }
      if (invalid && field) { field.classList.add('error'); ok = false; }
    });
    return ok;
  };

  const showMsg = (form, text, type) => {
    const el = form.querySelector('[data-msg]');
    if (!el) return;
    el.textContent = text;
    el.className = 'form-msg ' + (type || '');
  };

  const collect = (form) => {
    const data = {};
    new FormData(form).forEach((v, k) => {
      if (data[k] !== undefined) {
        if (!Array.isArray(data[k])) data[k] = [data[k]];
        data[k].push(v);
      } else {
        data[k] = v;
      }
    });
    return data;
  };

  const renderSuccess = (form, successKey) => {
    const msg = tr(successKey, 'Thank you! Your submission has been received.');
    const card = document.createElement('div');
    card.className = 'form-success';
    card.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F5B52A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 1rem">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <h3 style="margin-bottom:.5rem">${msg}</h3>
    `;
    card.style.cssText = 'text-align:center; padding:2rem 1rem;';
    form.replaceWith(card);
  };

  const bind = (form, successKey) => {
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate(form)) {
        showMsg(form, tr('msg.error', 'Please fix the errors above.'), 'error');
        return;
      }
      const payload = collect(form);
      console.log('[Tegeta × FAW] form submission →', payload);

      if (ENDPOINT) {
        try {
          const res = await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error('bad response');
        } catch (err) {
          console.error(err);
          showMsg(form, 'Something went wrong. Please try again.', 'error');
          return;
        }
      }

      renderSuccess(form, successKey);
    });
  };

  bind(document.getElementById('regForm'), 'msg.success');
  bind(document.getElementById('testDriveForm'), 'msg.success.td');

})();
