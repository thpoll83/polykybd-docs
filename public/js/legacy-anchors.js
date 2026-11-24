/*
 * legacy-anchors.js: forwards an old #fragment to the sub-page it moved to.
 *
 * reference/hid-protocol, using/overlays, using/languages and using/ai-agents
 * were each one page and are now a section with sub-pages. An old bookmark
 * such as /reference/hid-protocol/#message-formats opens the section index,
 * which no longer has that heading. This script finds the new page in a map
 * and goes there. It acts only when the fragment's target is missing, so a
 * fragment that still exists on the page is left alone.
 *
 * Loaded as a global <head> script (astro.config.mjs). Add an entry when you
 * move a heading to another page; the map lists the old URL and the new one.
 */
(function () {
  if (window.__polyLegacyAnchors) return;
  window.__polyLegacyAnchors = true;

  var MAP = {
  "/reference/hid-protocol/#dimmed-icons": "/reference/hid-protocol/overlay-mapping/#dimmed-icons",
  "/reference/hid-protocol/#firmware-update-and-font-packs": "/reference/hid-protocol/message-formats/#firmware-update-and-font-packs",
  "/reference/hid-protocol/#icon-library-fills": "/reference/hid-protocol/overlay-mapping/#icon-library-fills",
  "/reference/hid-protocol/#identity-and-language": "/reference/hid-protocol/message-formats/#identity-and-language",
  "/reference/hid-protocol/#keys-without-a-legend": "/reference/hid-protocol/overlay-mapping/#keys-without-a-legend",
  "/reference/hid-protocol/#macros-and-crash-record": "/reference/hid-protocol/message-formats/#macros-and-crash-record",
  "/reference/hid-protocol/#mapping-flags": "/reference/hid-protocol/overlay-mapping/#mapping-flags",
  "/reference/hid-protocol/#message-formats": "/reference/hid-protocol/message-formats/#message-formats",
  "/reference/hid-protocol/#one-row-pixel-by-pixel": "/reference/hid-protocol/image-encodings/#one-row-pixel-by-pixel",
  "/reference/hid-protocol/#overlay-addressing": "/reference/hid-protocol/overlay-mapping/#overlay-addressing",
  "/reference/hid-protocol/#overlay-uploads": "/reference/hid-protocol/message-formats/#overlay-uploads",
  "/reference/hid-protocol/#prc-predictive-range-coding": "/reference/hid-protocol/image-encodings/#prc-predictive-range-coding",
  "/reference/hid-protocol/#protocol-versions": "/reference/hid-protocol/protocol-versions/#protocol-versions",
  "/reference/hid-protocol/#qmk-keymap-commands": "/reference/hid-protocol/message-formats/#qmk-keymap-commands",
  "/reference/hid-protocol/#rle-overlay-encoding": "/reference/hid-protocol/image-encodings/#rle-overlay-encoding",
  "/reference/hid-protocol/#settings": "/reference/hid-protocol/message-formats/#settings",
  "/reference/hid-protocol/#worked-example-a-10--10-square": "/reference/hid-protocol/image-encodings/#worked-example-a-10--10-square",
  "/reference/hid-protocol/#worked-example-a-real-icon": "/reference/hid-protocol/image-encodings/#worked-example-a-real-icon",
  "/using/ai-agents/#agents-on-another-computer": "/using/ai-agents/remote-agents/#agents-on-another-computer",
  "/using/ai-agents/#claude-code-cloud-sessions": "/using/ai-agents/remote-agents/#claude-code-cloud-sessions",
  "/using/ai-agents/#cloud-sessions-on-more-than-one-computer": "/using/ai-agents/remote-agents/#cloud-sessions-on-more-than-one-computer",
  "/using/ai-agents/#disconnect-or-delete": "/using/ai-agents/remote-agents/#disconnect-or-delete",
  "/using/ai-agents/#the-browser-extension": "/using/ai-agents/remote-agents/#the-browser-extension",
  "/using/languages/#choosing-which-accent-a-letter-types": "/using/languages/intl-layer/#choosing-which-accent-a-letter-types",
  "/using/languages/#emoji-layer": "/using/languages/emoji-layer/#emoji-layer",
  "/using/languages/#giving-one-letter-several-keys": "/using/languages/intl-layer/#giving-one-letter-several-keys",
  "/using/languages/#japanese-ja-jp-and-ja-us": "/using/languages/cjk-input/#japanese-ja-jp-and-ja-us",
  "/using/languages/#romanian-and-the-comma-below-letters": "/using/languages/intl-layer/#romanian-and-the-comma-below-letters",
  "/using/languages/#symbols": "/using/languages/emoji-layer/#symbols",
  "/using/languages/#the-ime-key-korean-japanese-and-us-english": "/using/languages/cjk-input/#the-ime-key-korean-japanese-and-us-english",
  "/using/languages/#the-intl-layer-accented-letters-on-demand": "/using/languages/intl-layer/#the-intl-layer-accented-letters-on-demand",
  "/using/languages/#what-the-full-set-adds": "/using/languages/intl-layer/#what-the-full-set-adds",
  "/using/languages/#when-a-letter-needs-more-than-one-row": "/using/languages/intl-layer/#when-a-letter-needs-more-than-one-row",
  "/using/overlays/#blender-overlays-that-follow-the-mode": "/using/overlays/mode-aware-apps/#blender-overlays-that-follow-the-mode",
  "/using/overlays/#terminal-programs": "/using/overlays/mode-aware-apps/#terminal-programs",
  "/using/overlays/#vim-emacs-and-nano-overlays-that-follow-the-mode": "/using/overlays/mode-aware-apps/#vim-emacs-and-nano-overlays-that-follow-the-mode",
  "/using/overlays/#which-apps-are-covered": "/using/overlays/supported-apps/#which-apps-are-covered"
};

  function go() {
    var hash = location.hash;
    if (!hash || hash.length < 2) return;
    var id;
    try { id = decodeURIComponent(hash.slice(1)); } catch (e) { return; }
    if (document.getElementById(id)) return;
    var path = location.pathname;
    if (path.charAt(path.length - 1) !== '/') path += '/';
    var target = MAP[path + '#' + id];
    if (target) location.replace(target);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', go);
  } else {
    go();
  }
})();
