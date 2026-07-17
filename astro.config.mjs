import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

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
          attrs: { src: '/js/photo-zoom.js', defer: true },
        },
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
          label: 'Assembly',
          items: [
            { label: 'Overview', slug: 'assembly/overview' },
            { label: 'Parts List', slug: 'assembly/parts-list' },
            { label: 'PCB & Gerber Files', slug: 'assembly/pcb' },
            { label: 'Case & Spacer', slug: 'assembly/case' },
            { label: 'Displays & FPC Extension', slug: 'assembly/displays' },
            { label: 'Compatible Switches', slug: 'assembly/compatible-switches' },
            { label: 'Step-by-Step Build Guide', slug: 'assembly/step-by-step' },
          ],
        },
        {
          label: 'Setup',
          items: [
            { label: 'Install PolyKybdHost', slug: 'setup/installation' },
            { label: 'Flash the Firmware', slug: 'setup/flashing' },
          ],
        },
        {
          label: 'Using the Keyboard',
          items: [
            { label: 'Context-Aware Overlays', slug: 'using/overlays' },
            { label: 'Languages & Unicode Input', slug: 'using/languages' },
            { label: 'Glyph Scripts', slug: 'using/glyph-scripts' },
            { label: 'Display Brightness', slug: 'using/brightness' },
            { label: 'Idle & Burn-in Protection', slug: 'using/idle' },
            { label: 'Keymaps & Layers', slug: 'using/keymaps' },
            { label: 'Keymap Editor', slug: 'using/keymap-editor' },
            { label: 'Multi-Machine Setup', slug: 'using/multi-machine' },
          ],
        },
        {
          label: 'Host Software',
          items: [
            { label: 'What is PolyKybdHost?', slug: 'software/overview' },
            { label: 'Using the Tray App', slug: 'software/usage' },
            { label: 'Daemon & Client Model', slug: 'software/architecture' },
            { label: 'Command Line (polyctl)', slug: 'software/cli' },
          ],
        },
        {
          label: 'Firmware',
          items: [
            { label: 'Overview', slug: 'firmware/overview' },
            { label: 'Keyboard Variants', slug: 'firmware/variants' },
            { label: 'Font Packs & Resources', slug: 'firmware/font-packs' },
          ],
        },
        {
          label: 'Hardware',
          items: [
            { label: 'Electronics & Schematics', slug: 'hardware/electronics' },
            { label: 'PCB & Case Modification', slug: 'hardware/modification' },
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
          label: 'HowTo',
          items: [
            { label: 'Add a Keyboard Language', slug: 'howto/add-language' },
            { label: 'Add a Glyph Script', slug: 'howto/add-glyph-script' },
            { label: 'Create App Overlays', slug: 'howto/app-overlays' },
            { label: 'Build & Flash from Source', slug: 'howto/build-and-flash' },
            { label: 'Edit the Keymap', slug: 'howto/edit-keymap' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'HID Protocol', slug: 'reference/hid-protocol' },
            { label: 'Glossary', slug: 'reference/glossary' },
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
