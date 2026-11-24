import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// URL for a script in public/, with a hash of its content as ?v=. GitHub Pages
// lets browsers cache public/ files for 10 minutes under the same URL, so
// without it a visitor can run an old script against the new (hashed) CSS for
// that long after a deploy. That happened with showcase-strip.js after #125.
function versioned(path) {
  const body = readFileSync(new URL(`./public${path}`, import.meta.url));
  return `${path}?v=${createHash('sha256').update(body).digest('hex').slice(0, 8)}`;
}

// Google Analytics (GA4), emitted ONLY for a real `astro build`.
//
// Astro loads this file for every CLI command and puts the command name in
// argv, so `astro dev` (what ./preview.sh runs by default) leaves the tag out
// entirely — otherwise a local docs preview reports pageviews into the live
// property. `astro preview` just serves the already-built output, so the tag
// it shows is whatever the preceding build emitted.
const isProductionBuild = process.argv.slice(2)[0] === 'build';

// Consent Mode v2. The defaults deny storage, so on a first visit GA sets no
// cookies and sends only cookieless pings; public/js/consent.js flips
// `analytics_storage` to granted when the visitor accepts, and replays that
// choice from localStorage on later visits (which is why this runs before the
// gtag.js loader — the queued consent state must be in dataLayer first).
const GA_MEASUREMENT_ID = 'G-8JB88YY4E5';
const googleAnalyticsTags = [
  {
    tag: 'script',
    content: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied'
});
try {
  if (localStorage.getItem('pk-analytics-consent') === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`,
  },
  {
    tag: 'script',
    attrs: {
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
    },
  },
  {
    tag: 'script',
    attrs: { src: versioned('/js/consent.js'), defer: true },
  },
];

export default defineConfig({
  site: 'https://www.polykybd.org',
  base: '/',
  // Redirects for pages that moved when the docs were reorganized into the
  // Setup / Using the Keyboard sections (keeps old bookmarks working).
  redirects: {
    '/software/installation': '/setup/installation/',
    '/firmware/flashing': '/setup/flashing/',
    '/firmware/unicode': '/using/languages/',
    '/firmware/keymaps': '/using/keymaps/',
    '/software/keymap-editor': '/using/keymap-editor/',
    '/software/multi-machine': '/using/multi-machine/',
    // Hardware got its own top-level section; the modification page moved out
    // of Development.
    '/development/hardware': '/hardware/modification/',
    // WinCompose is a Windows setup step; the old Rev.2 boards are hardware.
    '/software/wincompose': '/setup/wincompose/',
    '/reference/old-rev2-boards': '/hardware/old-rev2-boards/',
  },
  integrations: [
    // Renders ```mermaid code blocks; must come before Starlight.
    mermaid({ theme: 'neutral', autoTheme: true }),
    starlight({
      title: 'PolyKybd',
      description: 'Documentation for PolyKybd — a split ergonomic keyboard where every key has its own OLED display.',
      // Site-wide click-to-enlarge lightbox for page-body photos. The thumbnail
      // styling lives in src/styles/custom.css; this script (public/js/) opens
      // the full-screen view on click. Global so every page's photos behave the
      // same without a per-page wrapper.
      head: [
        {
          tag: 'script',
          attrs: { src: versioned('/js/photo-zoom.js'), defer: true },
        },
        // Click-to-play YouTube embeds that autoplay only after analytics
        // consent. Not build-gated: in a dev run it reads the same stored
        // choice, and with no consent.js loaded it simply stays click-to-play.
        {
          tag: 'script',
          attrs: { src: versioned('/js/youtube-embed.js'), defer: true },
        },
        // The landing page's photo/video strip: one row where it fits, moved
        // sideways by vertical scrolling where it does not.
        {
          tag: 'script',
          attrs: { src: versioned('/js/showcase-strip.js'), defer: true },
        },
        // Forwards an old #fragment to the sub-page its heading moved to.
        {
          tag: 'script',
          attrs: { src: versioned('/js/legacy-anchors.js'), defer: true },
        },
        // Google Analytics, consent-gated and build-only — see the tag list at
        // the top of this file. Spread so a dev run injects nothing at all.
        ...(isProductionBuild ? googleAnalyticsTags : []),
      ],
      logo: {
        light: './src/assets/polytasten-logo.svg',
        dark: './src/assets/polytasten-logo-dark.svg',
        replacesTitle: false,
      },
      // Drop the "On this page" table of contents (desktop right sidebar and
      // the mobile "On this page" bar) so the content — especially the wide
      // flowchart / sequence diagrams — gets the full page width. The route
      // middleware clears `toc` at the data level, which also removes the
      // `data-has-toc` layout marker so no empty right column is reserved; the
      // freed width is handed to the content in src/styles/custom.css.
      routeMiddleware: './src/starlightRouteData.ts',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/thpoll83/PolyKybd' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/gW8JescH7M' },
      ],
      sidebar: [
        {
          label: 'Introduction',
          items: [
            { label: 'Architecture & Ecosystem', slug: 'introduction/architecture' },
          ],
        },
        {
          label: 'Setup',
          items: [
            { label: 'Install PolyKybdHost', slug: 'setup/installation' },
            { label: 'Install WinCompose (Windows)', slug: 'setup/wincompose' },
            { label: 'Flash the Firmware', slug: 'setup/flashing' },
            { label: 'Flash from an Android Phone', slug: 'setup/flashing-android' },
          ],
        },
        {
          label: 'Using the Keyboard',
          items: [
            {
              label: 'Getting Started',
              items: [
                { label: 'First Start & Tutorial', slug: 'using/first-run' },
                { label: 'Tutorials', slug: 'using/tutorials' },
              ],
            },
            {
              label: 'App-Aware Keys',
              items: [
                { label: 'Context-Aware Overlays', slug: 'using/overlays' },
                { label: 'Supported Apps', slug: 'using/overlays/supported-apps' },
                { label: 'Overlays That Follow the Mode', slug: 'using/overlays/mode-aware-apps' },
                { label: 'Website-Aware Overlays', slug: 'using/website-detection' },
                { label: 'Apps With No Overlay', slug: 'using/generic-overlays' },
                { label: 'Shortcut Hints', slug: 'using/shortcut-hints' },
              ],
            },
            {
              label: 'Typing & Legends',
              items: [
                { label: 'Languages & Unicode Input', slug: 'using/languages' },
                { label: 'The Intl Layer', slug: 'using/languages/intl-layer' },
                { label: 'Japanese & Korean Input', slug: 'using/languages/cjk-input' },
                { label: 'Emoji Layer', slug: 'using/languages/emoji-layer' },
                { label: 'Emoji Search', slug: 'using/emoji-search' },
                { label: 'Glyph Scripts', slug: 'using/glyph-scripts' },
                { label: 'Legend Size', slug: 'using/legend-size' },
              ],
            },
            {
              label: 'Keymaps & Layers',
              items: [
                { label: 'Keymaps & Layers', slug: 'using/keymaps' },
                { label: 'Keymap Editor', slug: 'using/keymap-editor' },
                { label: 'Macros', slug: 'using/macros' },
                { label: 'MIDI Layer', slug: 'using/midi' },
                { label: 'Trackpad', slug: 'using/trackpad' },
              ],
            },
            {
              label: 'Display & Lighting',
              items: [
                { label: 'Display Brightness', slug: 'using/brightness' },
                { label: 'RGB Lighting', slug: 'using/rgb-lighting' },
                { label: 'Idle & Burn-in Protection', slug: 'using/idle' },
                { label: 'Demo Mode', slug: 'using/demo-mode' },
              ],
            },
            {
              label: 'Workflows',
              items: [
                { label: 'Multi-Machine Setup', slug: 'using/multi-machine' },
                { label: 'AI Agent Keys', slug: 'using/ai-agents' },
                { label: 'AI Agents in the Cloud', slug: 'using/ai-agents/remote-agents' },
              ],
            },
            {
              label: 'Extras',
              items: [
                { label: 'Mines', slug: 'using/mines' },
              ],
            },
          ],
        },
        {
          label: 'Host Software',
          items: [
            { label: 'What is PolyKybdHost?', slug: 'software/overview' },
            { label: 'Using the Tray App', slug: 'software/usage' },
            { label: 'Settings Reference', slug: 'software/settings' },
            { label: 'Daemon & Client Model', slug: 'software/architecture' },
            { label: 'Command Line (polyctl)', slug: 'software/cli' },
            { label: 'Reporting a Problem', slug: 'software/reporting-problems' },
          ],
        },
        {
          label: 'Firmware',
          items: [
            { label: 'Overview', slug: 'firmware/overview' },
            { label: 'Keyboard Variants', slug: 'firmware/variants' },
            { label: 'Font Packs & Resources', slug: 'firmware/font-packs' },
            {
              label: 'Beyond Stock QMK',
              collapsed: true,
              items: [
                { label: 'What PolyKybd Adds', slug: 'beyond-qmk/overview' },
                { label: 'Firmware Update over HID', slug: 'beyond-qmk/firmware-update' },
                { label: 'Firmware Signing', slug: 'beyond-qmk/signing' },
                { label: 'Crash Handler & Watchdog', slug: 'beyond-qmk/crash-handler' },
                { label: 'The Second Core (core1)', slug: 'beyond-qmk/core1' },
                { label: '200 MHz System Clock', slug: 'beyond-qmk/system-clock' },
                { label: 'Split Link Sync', slug: 'beyond-qmk/split-link' },
                { label: 'Main-Loop Profiler', slug: 'beyond-qmk/loop-profiler' },
                { label: 'Community Modules', slug: 'beyond-qmk/community-modules' },
                { label: 'PRC Image Decoder', slug: 'beyond-qmk/prc-decoder' },
              ],
            },
          ],
        },
        {
          label: 'Hardware & Assembly',
          items: [
            { label: 'Electronics & Schematics', slug: 'hardware/electronics' },
            { label: 'PCB & Case Modification', slug: 'hardware/modification' },
            { label: 'Old Rev.2 Boards (2023)', slug: 'hardware/old-rev2-boards' },
            {
              label: 'Assembly Guide',
              collapsed: true,
              items: [
                { label: 'Overview', slug: 'assembly/overview' },
                { label: 'Parts List', slug: 'assembly/parts-list' },
                { label: 'PCB & Gerber Files', slug: 'assembly/pcb' },
                { label: 'Case & Spacer', slug: 'assembly/case' },
                { label: 'Displays & FPC Extension', slug: 'assembly/displays' },
                { label: 'Compatible Switches', slug: 'assembly/compatible-switches' },
                { label: 'Keycap Stems', slug: 'assembly/keycap-stems' },
                { label: 'Tenting Legs & LED Diffuser', slug: 'assembly/printed-extras' },
                { label: 'Step-by-Step Build Guide', slug: 'assembly/step-by-step' },
              ],
            },
          ],
        },
        {
          label: 'Customize & Extend',
          items: [
            { label: 'Edit the Keymap', slug: 'howto/edit-keymap' },
            { label: 'Add a Keyboard Language', slug: 'howto/add-language' },
            { label: 'Add a Glyph Script', slug: 'howto/add-glyph-script' },
            { label: 'Create App Overlays', slug: 'howto/app-overlays' },
            { label: "Make Your App's Shortcuts Readable", slug: 'howto/app-shortcuts-for-developers' },
            { label: 'Build & Flash from Source', slug: 'howto/build-and-flash' },
          ],
        },
        {
          label: 'Development',
          items: [
            { label: 'System Model & Data Flow', slug: 'development/system-model' },
            { label: 'Firmware Development', slug: 'development/firmware' },
            { label: 'Display Graphics & Fonts', slug: 'development/display-graphics' },
            { label: 'Test Rig & CI', slug: 'development/test-rig' },
            { label: 'Contributing', slug: 'development/contributing' },
          ],
        },
        {
          label: 'Reference',
          items: [
            {
              label: 'HID Protocol',
              items: [
                { label: 'Overview & Report Format', slug: 'reference/hid-protocol' },
                { label: 'Message Formats', slug: 'reference/hid-protocol/message-formats' },
                { label: 'Image Encodings', slug: 'reference/hid-protocol/image-encodings' },
                { label: 'Overlay Mapping & Addressing', slug: 'reference/hid-protocol/overlay-mapping' },
                { label: 'Protocol Versions', slug: 'reference/hid-protocol/protocol-versions' },
              ],
            },
            { label: 'Glossary', slug: 'reference/glossary' },
          ],
        },
        {
          label: 'Privacy',
          items: [
            { label: 'Usage Data & Privacy', slug: 'software/telemetry' },
            { label: 'Website Analytics', slug: 'reference/website-analytics' },
            { label: 'Browser Extension Privacy', slug: 'reference/browser-extension-privacy' },
          ],
        },
      ],
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/thpoll83/polykybd-docs/edit/main/',
      },
    }),
  ],
});
