/*
 * consent.js — the analytics consent chip, and the revoke control.
 *
 * Loaded as a global <head> script (see astro.config.mjs `head`), alongside the
 * GA4 tag it gates — and, like that tag, only in a real build. Google Consent
 * Mode v2 starts with `analytics_storage` denied, so until the visitor accepts,
 * GA sets no cookies and sends only cookieless pings. Accepting flips it to
 * granted for this page load and records the choice in localStorage; the inline
 * snippet in astro.config.mjs replays that on later visits, so the chip is
 * shown exactly once.
 *
 * Two pieces:
 *   - the chip: a single pill in the bottom-left corner rather than a
 *     full-width bar, so it never covers the docs content. Its label links to
 *     the analytics page for anyone who wants to know what they're agreeing to.
 *   - the control: whatever the analytics page marks with
 *     [data-pk-consent-control] becomes a live "your current setting" widget,
 *     so consent can be withdrawn as easily as it was given.
 *
 * Styling lives in src/styles/custom.css.
 */
(function () {
  if (window.__polyConsent) return;
  window.__polyConsent = true;

  var KEY = 'pk-analytics-consent';
  var DETAILS_URL = '/reference/website-analytics/';

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

  function tell(state) {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: state });
    }
  }

  // Withdrawing consent stops future storage, but GA's existing cookies would
  // otherwise sit there until they expire — so clear them too. Both the exact
  // host and the registrable domain are tried, since GA sets its cookies on the
  // latter (".polykybd.org") and a cookie can only be expired by a matching
  // domain/path pair.
  function clearGaCookies() {
    var parts = location.hostname.split('.');
    var domains = ['', location.hostname];
    if (parts.length > 1) domains.push('.' + parts.slice(-2).join('.'));

    document.cookie.split(';').forEach(function (entry) {
      var name = entry.split('=')[0].trim();
      if (name !== '_ga' && name.indexOf('_ga_') !== 0) return;
      domains.forEach(function (domain) {
        document.cookie =
          name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      });
    });
  }

  function apply(value) {
    remember(value);
    if (value === 'granted') {
      tell('granted');
    } else {
      tell('denied');
      clearGaCookies();
    }
    refreshControl();
  }

  /* ---------------------------------------------------------------- chip -- */

  function dismiss(chip) {
    chip.setAttribute('data-leaving', 'true');
    // Matches the .28s dismiss transition in custom.css; removing the node
    // outright would cut the fade off mid-way.
    setTimeout(function () {
      if (chip.parentNode) chip.parentNode.removeChild(chip);
    }, 280);
  }

  function buildChip() {
    var chip = document.createElement('div');
    chip.className = 'pk-consent';
    chip.setAttribute('role', 'dialog');
    chip.setAttribute('aria-label', 'Analytics cookies');

    var text = document.createElement('span');
    text.className = 'pk-consent__text';

    var cookie = document.createElement('span');
    cookie.className = 'pk-consent__cookie';
    cookie.setAttribute('aria-hidden', 'true');
    cookie.textContent = '🍪';

    // The label itself is the link — it costs no extra width, and the chip is
    // too small to explain what is being agreed to.
    var link = document.createElement('a');
    link.className = 'pk-consent__link';
    link.href = DETAILS_URL;
    link.textContent = 'Analytics?';
    link.title = 'What this collects, and how to change your mind later';

    text.appendChild(cookie);
    text.appendChild(document.createTextNode(' '));
    text.appendChild(link);

    var yes = document.createElement('button');
    yes.type = 'button';
    yes.className = 'pk-consent__btn pk-consent__btn--yes';
    yes.textContent = 'Sure';

    var no = document.createElement('button');
    no.type = 'button';
    no.className = 'pk-consent__btn';
    no.textContent = 'No';

    yes.addEventListener('click', function () {
      apply('granted');
      dismiss(chip);
    });
    no.addEventListener('click', function () {
      apply('denied');
      dismiss(chip);
    });

    chip.appendChild(text);
    chip.appendChild(yes);
    chip.appendChild(no);
    return chip;
  }

  function showChip() {
    if (stored()) return; // already decided, or storage unavailable
    var chip = buildChip();
    document.body.appendChild(chip);
    // Next frame, so the entry transition has a starting state to animate from.
    requestAnimationFrame(function () {
      chip.setAttribute('data-visible', 'true');
    });
  }

  /* ------------------------------------------------------------- control -- */

  // The analytics page ships a static fallback inside the control element. It
  // is replaced here, so if this script never runs (local preview, JS off) the
  // page still says something true: nothing is being collected either way.
  function refreshControl() {
    var host = document.querySelector('[data-pk-consent-control]');
    if (!host) return;

    var current = stored();
    var granted = current === 'granted';
    host.textContent = '';
    host.className = 'pk-consent-control';

    var state = document.createElement('p');
    state.className = 'pk-consent-control__state';
    state.innerHTML =
      'Analytics is currently <strong>' +
      (granted ? 'on' : 'off') +
      '</strong> in this browser.' +
      (current ? '' : ' You have not been asked yet.');

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pk-consent-control__btn';
    btn.textContent = granted ? 'Turn analytics off' : 'Turn analytics on';
    btn.addEventListener('click', function () {
      apply(granted ? 'denied' : 'granted');
      var chip = document.querySelector('.pk-consent');
      if (chip) dismiss(chip); // a decision here answers the chip too
    });

    host.appendChild(state);
    host.appendChild(btn);
  }

  function start() {
    refreshControl();
    showChip();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
