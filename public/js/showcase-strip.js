/*
 * showcase-strip.js: the landing page's row of photos, video and renders.
 *
 * The page marks the strip with [data-pk-strip]:
 *   .pk-strip           the outer block
 *     .pk-strip__panel  widened here to the full viewport
 *       .pk-strip__track  the row of tiles
 *
 * Where the whole row fits the viewport (minus a 16px gutter each side), it
 * sits centred under the hero and nothing moves.
 *
 * Where it does not, the page column (.sl-container: the hero, the strip and
 * everything below it) is wrapped in .pk-pin and sticks under the header. A
 * spacer after it, as tall as the row's overflow, gives the scroll distance:
 * each pixel of vertical scrolling moves the row one pixel left while the
 * hero above and the content below stay put. Once the last tile is in view
 * the column unsticks and the page scrolls on. The tiles shrink (down to
 * MIN_TILE) so the hero, the strip and the heading after it fit the viewport
 * together; if the hero and the strip alone still
 * do not, the column sticks with the strip's bottom edge on the viewport's.
 * Tabbing to a tile that is off to the side scrolls the page until it is in
 * view.
 *
 * Without this script the CSS leaves the strip in the column with its own
 * sideways scrollbar. Styling lives in src/styles/custom.css (.pk-strip).
 */
(function () {
  if (window.__polyStrip) return;
  window.__polyStrip = true;

  var GUTTER = 16;
  var MAX_TILE = 405; // a 720px-wide 16:9 tile
  var MIN_TILE = 240;

  function headerBottom() {
    var header = document.querySelector('header.header');
    return header ? header.getBoundingClientRect().bottom : 0;
  }

  function setup(strip) {
    var panel = strip.querySelector('.pk-strip__panel');
    var track = strip.querySelector('.pk-strip__track');
    var column = strip.closest('.sl-container');
    if (!panel || !track || !column) return;

    var pin = null;
    var spacer = null;
    var distance = 0;
    var stickyTop = 0;

    strip.classList.add('is-js');

    // Wrap the column in .pk-pin, with the spacer after it, once.
    function buildPin() {
      if (pin) return;
      pin = document.createElement('div');
      spacer = document.createElement('div');
      spacer.setAttribute('aria-hidden', 'true');
      column.parentNode.insertBefore(pin, column);
      pin.appendChild(column);
      pin.appendChild(spacer);
    }

    // The first block after the strip (the "Browse the docs" heading) and the
    // gap before it, which should also show under the stuck strip.
    function nextBlockHeight() {
      var next = strip.nextElementSibling;
      if (!next) return 0;
      return next.getBoundingClientRect().bottom - panel.getBoundingClientRect().bottom;
    }

    function tileHeight(viewport) {
      var byWidth = ((viewport - 2 * GUTTER) * 9) / 16;
      var tile = Math.min(MAX_TILE, byWidth);
      // Where the strip's top lands once the column sticks under the header.
      var stripTop =
        headerBottom() +
        panel.getBoundingClientRect().top -
        column.getBoundingClientRect().top;
      var spare = window.innerHeight - GUTTER - stripTop - nextBlockHeight();
      return Math.min(tile, Math.max(MIN_TILE, spare));
    }

    function unpin() {
      if (pin) pin.classList.remove('pk-pin');
      if (spacer) spacer.style.height = '';
      column.style.top = '';
      distance = 0;
    }

    function layout() {
      var viewport = document.documentElement.clientWidth;
      // Measure as a plain row: no pin, no scrolling padding, CSS tile size.
      unpin();
      strip.classList.remove('is-scrolling');
      track.style.transform = '';
      track.style.removeProperty('--pk-tile-h');
      panel.style.width = viewport + 'px';
      panel.style.marginLeft = -strip.getBoundingClientRect().left + 'px';
      if (track.scrollWidth <= viewport - 2 * GUTTER) {
        strip.classList.add('is-row');
        return;
      }

      buildPin();
      pin.classList.add('pk-pin');
      strip.classList.add('is-scrolling');
      strip.classList.remove('is-row');
      track.style.setProperty('--pk-tile-h', tileHeight(viewport) + 'px');
      panel.style.marginLeft = -strip.getBoundingClientRect().left + 'px';

      distance = Math.max(0, track.scrollWidth - viewport);
      spacer.style.height = distance + 'px';
      // Stick under the header, or higher when the strip's bottom edge would
      // otherwise fall below the viewport.
      var stripBottom =
        panel.getBoundingClientRect().bottom - column.getBoundingClientRect().top;
      stickyTop = Math.min(headerBottom(), window.innerHeight - stripBottom);
      column.style.top = stickyTop + 'px';
      update();
    }

    function update() {
      if (!distance) return;
      var shift = stickyTop - pin.getBoundingClientRect().top;
      shift = Math.min(distance, Math.max(0, shift));
      track.style.transform = 'translateX(' + -shift + 'px)';
    }

    // Scroll the page so a focused tile comes into view. The browser would
    // otherwise leave it hidden off to the side of the stuck column.
    track.addEventListener('focusin', function (event) {
      if (!distance) return;
      var tile = event.target.closest('.pk-strip__track > *');
      if (!tile) return;
      var viewport = document.documentElement.clientWidth;
      var want = tile.offsetLeft - (viewport - tile.offsetWidth) / 2;
      want = Math.min(distance, Math.max(0, want));
      var pinTop = pin.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, pinTop - stickyTop + want);
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
