/*
 * photo-zoom.js — site-wide click-to-enlarge lightbox for page-body images.
 *
 * Loaded as a global <head> script (see astro.config.mjs `head`). Every raster
 * image in `.sl-markdown-content` renders as a centered thumbnail (styled in
 * src/styles/custom.css) and opens full-screen on click. One delegated handler
 * covers the whole page, including images added after load.
 *
 * Excluded from zooming: vector art (`*.svg` logos/badges) and linked images
 * (an <img> inside an <a> keeps its link).
 */
(function () {
  if (window.__polyPhotoZoom) return;
  window.__polyPhotoZoom = true;

  var SELECTOR = '.sl-markdown-content img';

  function zoomable(img) {
    if (!img) return false;
    var src = img.currentSrc || img.src || '';
    if (/\.svg(\?|#|$)/i.test(src)) return false; // vector logos/badges stay inline
    if (img.closest('a')) return false; // don't hijack a linked image
    if (img.closest('.photo-zoom-lightbox')) return false; // already enlarged
    return true;
  }

  function closeLightbox() {
    var existing = document.querySelector('.photo-zoom-lightbox');
    if (existing) existing.remove();
  }

  document.addEventListener('click', function (event) {
    var img =
      event.target && event.target.closest
        ? event.target.closest(SELECTOR)
        : null;
    if (!zoomable(img)) return;

    closeLightbox();

    var overlay = document.createElement('div');
    overlay.className = 'photo-zoom-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', img.alt || 'Enlarged image');

    var big = document.createElement('img');
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    overlay.appendChild(big);

    overlay.addEventListener('click', closeLightbox);
    document.body.appendChild(overlay);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeLightbox();
  });
})();
