/*
 * consent.js — the analytics consent chip (bottom-left).
 *
 * Loaded as a global <head> script (see astro.config.mjs `head`), alongside the
 * GA4 tag it gates. Google Consent Mode v2 starts with `analytics_storage`
 * denied, so until the visitor accepts, GA sets no cookies and sends only
 * cookieless pings. Accepting flips it to granted for this page load and
 * records the choice in localStorage; the inline snippet in astro.config.mjs
 * replays that on later visits, so the chip is shown exactly once.
 *
 * Deliberately small: a single pill in the bottom-left corner rather than a
 * full-width bar, so it never covers the docs content. Styling lives in
 * src/styles/custom.css.
 */
(function () {
  if (window.__polyConsent) return;
  window.__polyConsent = true;

  var KEY = 'pk-analytics-consent';

  // localStorage throws in some privacy modes; a failure to read must not stop
  // the page (and must not silently re-prompt on every navigation either, so
  // the chip is skipped entirely when storage is unavailable).
  function stored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return 'unavailable';
    }
  }

  function remember(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {
      /* nothing to do — the choice just won't persist */
    }
  }

  function decide(value, chip) {
    remember(value);
    if (value === 'granted' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    chip.setAttribute('data-leaving', 'true');
    // Matches the .28s dismiss transition in custom.css; removing the node
    // outright would cut the fade off mid-way.
    setTimeout(function () {
      if (chip.parentNode) chip.parentNode.removeChild(chip);
    }, 280);
  }

  function build() {
    var chip = document.createElement('div');
    chip.className = 'pk-consent';
    chip.setAttribute('role', 'dialog');
    chip.setAttribute('aria-label', 'Analytics cookies');

    var text = document.createElement('span');
    text.className = 'pk-consent__text';
    text.innerHTML = '<span class="pk-consent__cookie" aria-hidden="true">🍪</span> Analytics?';

    var yes = document.createElement('button');
    yes.type = 'button';
    yes.className = 'pk-consent__btn pk-consent__btn--yes';
    yes.textContent = 'Sure';

    var no = document.createElement('button');
    no.type = 'button';
    no.className = 'pk-consent__btn';
    no.textContent = 'No';

    yes.addEventListener('click', function () {
      decide('granted', chip);
    });
    no.addEventListener('click', function () {
      decide('denied', chip);
    });

    chip.appendChild(text);
    chip.appendChild(yes);
    chip.appendChild(no);
    return chip;
  }

  function show() {
    if (stored()) return; // already decided, or storage unavailable
    var chip = build();
    document.body.appendChild(chip);
    // Next frame, so the entry transition has a starting state to animate from.
    requestAnimationFrame(function () {
      chip.setAttribute('data-visible', 'true');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', show);
  } else {
    show();
  }
})();
