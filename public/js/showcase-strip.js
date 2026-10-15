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
 * Where it does not, the hero and the strip move into one block, .pk-stage,
 * that sticks under the header. Its wrapper, .pk-stage-outer, is taller than
 * the stage by the row's overflow, so each pixel of vertical scrolling moves
 * the row one pixel left while the hero stays put above it. Once the last tile
 * is in view the stage unsticks and the page scrolls on. The tiles shrink
 * (down to MIN_TILE) so the hero and the strip fit the viewport together; if
 * they still do not, the stage sticks with its bottom edge on the viewport's.
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
    if (!panel || !track) return;
    var hero = document.querySelector('.hero');

    var outer = null;
    var stage = null;
    var distance = 0;
    var stickyTop = 0;

    strip.classList.add('is-js');

    // Move the hero and the strip into one sticky stage, once.
    function buildStage() {
      if (stage || !hero) return;
      outer = document.createElement('div');
      outer.className = 'pk-stage-outer';
      stage = document.createElement('div');
      stage.className = 'pk-stage';
      hero.parentNode.insertBefore(outer, hero);
      outer.appendChild(stage);
      stage.appendChild(hero);
      stage.appendChild(strip);
    }

    function tileHeight(viewport) {
      var byWidth = ((viewport - 2 * GUTTER) * 9) / 16;
      var tile = Math.min(MAX_TILE, byWidth);
      if (!hero) return tile;
      var room = window.innerHeight - headerBottom() - GUTTER;
      var spare = room - hero.offsetHeight - GUTTER;
      return Math.min(tile, Math.max(MIN_TILE, spare));
    }

    function layout() {
      var viewport = document.documentElement.clientWidth;
      track.style.transform = '';
      track.style.removeProperty('--pk-tile-h');

      // Measure at the CSS tile size to decide between a row and a scroller.
      panel.style.width = viewport + 'px';
      panel.style.marginLeft = -strip.getBoundingClientRect().left + 'px';
      if (track.scrollWidth <= viewport) {
        strip.classList.add('is-row');
        strip.classList.remove('is-scrolling');
        if (outer) outer.style.height = '';
        if (stage) stage.style.top = '';
        distance = 0;
        return;
      }

      buildStage();
      strip.classList.add('is-scrolling');
      strip.classList.remove('is-row');
      track.style.setProperty('--pk-tile-h', tileHeight(viewport) + 'px');
      panel.style.marginLeft = -strip.getBoundingClientRect().left + 'px';

      distance = Math.max(0, track.scrollWidth - viewport);
      var top = headerBottom();
      var stageHeight = stage ? stage.offsetHeight : panel.offsetHeight;
      // Stick under the header, or bottom-aligned when the stage is taller
      // than the space below the header.
      stickyTop = Math.min(top, window.innerHeight - stageHeight);
      if (stage) {
        stage.style.top = stickyTop + 'px';
        outer.style.height = stageHeight + distance + 'px';
      }
      update();
    }

    function scrollerTop() {
      return (outer || strip).getBoundingClientRect().top;
    }

    function update() {
      if (!distance) return;
      var shift = stickyTop - scrollerTop();
      shift = Math.min(distance, Math.max(0, shift));
      track.style.transform = 'translateX(' + -shift + 'px)';
    }

    // Scroll the page so a focused tile comes into view. The browser would
    // otherwise leave it hidden off to the side of the stuck stage.
    track.addEventListener('focusin', function (event) {
      if (!distance) return;
      var tile = event.target.closest('.pk-strip__track > *');
      if (!tile) return;
      var viewport = document.documentElement.clientWidth;
      var want = tile.offsetLeft - (viewport - tile.offsetWidth) / 2;
      want = Math.min(distance, Math.max(0, want));
      var outerTop = scrollerTop() + window.scrollY;
      window.scrollTo(0, outerTop - stickyTop + want);
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
