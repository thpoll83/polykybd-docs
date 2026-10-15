/*
 * showcase-strip.js: the landing page's row of photos, video and renders.
 *
 * The page marks the strip with [data-pk-strip]:
 *   .pk-strip           the outer block; its height sets the scroll distance
 *     .pk-strip__panel  widened here to the full viewport
 *       .pk-strip__track  the row of tiles
 *
 * Where the whole row fits the viewport (minus a 16px gutter each side), it
 * sits centred and nothing moves. Where it does not, the panel sticks under
 * the header, the outer block grows by the row's overflow, and each pixel of
 * vertical scrolling moves the row one pixel left. When the last tile is in
 * view the panel unsticks and the page scrolls on. Tabbing to a tile that is
 * off to the side scrolls the page until it is in view.
 *
 * Without this script the CSS leaves the strip in the column with its own
 * sideways scrollbar. Styling lives in src/styles/custom.css (.pk-strip).
 */
(function () {
  if (window.__polyStrip) return;
  window.__polyStrip = true;

  var GUTTER = 16;

  function headerBottom() {
    var header = document.querySelector('header.header');
    return header ? header.getBoundingClientRect().bottom : 0;
  }

  function setup(strip) {
    var panel = strip.querySelector('.pk-strip__panel');
    var track = strip.querySelector('.pk-strip__track');
    if (!panel || !track) return;

    var distance = 0;
    var stickyTop = 0;

    strip.classList.add('is-js');

    function layout() {
      var viewport = document.documentElement.clientWidth;
      // Span the viewport: shift the panel left by the column's own offset.
      panel.style.width = viewport + 'px';
      panel.style.marginLeft = -strip.getBoundingClientRect().left + 'px';
      track.style.transform = '';

      distance = Math.max(0, track.scrollWidth - viewport);
      if (distance === 0) {
        strip.classList.add('is-row');
        strip.classList.remove('is-scrolling');
        strip.style.height = '';
        panel.style.top = '';
        return;
      }

      strip.classList.add('is-scrolling');
      strip.classList.remove('is-row');
      // Centre the panel in the space under the header while it is stuck.
      var top = headerBottom();
      var room = window.innerHeight - top;
      stickyTop = top + Math.max(0, (room - panel.offsetHeight) / 2);
      panel.style.top = stickyTop + 'px';
      strip.style.height = panel.offsetHeight + distance + 'px';
      update();
    }

    function update() {
      if (!distance) return;
      var shift = stickyTop - strip.getBoundingClientRect().top;
      shift = Math.min(distance, Math.max(0, shift));
      track.style.transform = 'translateX(' + -shift + 'px)';
    }

    // Scroll the page so a focused tile comes into view. The browser would
    // otherwise leave it hidden off to the side of the stuck panel.
    track.addEventListener('focusin', function (event) {
      if (!distance) return;
      var tile = event.target.closest('.pk-strip__track > *');
      if (!tile) return;
      var viewport = document.documentElement.clientWidth;
      var want = tile.offsetLeft - (viewport - tile.offsetWidth) / 2;
      want = Math.min(distance, Math.max(0, want));
      var stripTop = strip.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, stripTop - stickyTop + want);
    });

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', layout);
    // Image widths depend on their aspect ratio, known once they load.
    track.querySelectorAll('img').forEach(function (img) {
      if (!img.complete) img.addEventListener('load', layout);
    });
    layout();
  }

  function start() {
    document.querySelectorAll('[data-pk-strip]').forEach(setup);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
