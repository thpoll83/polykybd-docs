/*
 * youtube-embed.js: click-to-play YouTube embeds that autoplay after consent.
 *
 * A page marks a link with data-pk-youtube="<video id>". Without JavaScript it
 * stays a plain link to the video on youtube.com. With it, nothing contacts
 * YouTube until one of these happens:
 *   - the visitor clicks the link, or
 *   - the visitor has accepted analytics (the pk-analytics-consent key that
 *     consent.js writes) and has not asked for reduced motion. The player then
 *     loads on page load, or the moment they accept on this page.
 * Either way the player starts muted and loads from youtube-nocookie.com.
 *
 * Styling lives in src/styles/custom.css (.pk-embed).
 */
(function () {
  if (window.__polyYoutube) return;
  window.__polyYoutube = true;

  function consented() {
    try {
      return localStorage.getItem('pk-analytics-consent') === 'granted';
    } catch (e) {
      return false;
    }
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function load(link) {
    if (!link.parentNode) return;
    var id = link.getAttribute('data-pk-youtube');
    var frame = document.createElement('iframe');
    frame.className = link.className;
    frame.src =
      'https://www.youtube-nocookie.com/embed/' +
      encodeURIComponent(id) +
      '?autoplay=1&mute=1&playsinline=1&rel=0';
    frame.title = 'PolyKybd video on YouTube';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    link.parentNode.replaceChild(frame, link);
  }

  function autoplayAll() {
    if (!consented() || prefersReducedMotion()) return;
    document.querySelectorAll('a[data-pk-youtube]').forEach(load);
  }

  function start() {
    document.querySelectorAll('a[data-pk-youtube]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        // Let modified clicks open youtube.com in a new tab as usual.
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.button) {
          return;
        }
        event.preventDefault();
        load(link);
      });
    });
    autoplayAll();
  }

  window.addEventListener('pk-consent', autoplayAll);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
