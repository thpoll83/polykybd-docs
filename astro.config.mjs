import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

export default defineConfig({
  site: 'https://www.polykybd.org',
  base: '/',
  integrations: [
    // Renders ```mermaid code blocks; must come before Starlight.
    mermaid({ theme: 'neutral', autoTheme: true }),
    starlight({
      title: 'PolyKybd',
      description: 'Documentation for PolyKybd — a split ergonomic keyboard where every key has its own OLED display.',
      logo: {
        src: './src/assets/polykybd-logo.svg',
        replacesTitle: false,
      },
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
            { label: 'Install PolyKybdHost', slug: 'software/installation' },
            { label: 'Flash the Firmware', slug: 'firmware/flashing' },
          ],
        },
        {
          label: 'Using the Keyboard',
          items: [
            { label: 'Context-Aware Overlays', slug: 'features/overlays' },
            { label: 'Languages & Unicode Input', slug: 'firmware/unicode' },
            { label: 'Glyph Scripts', slug: 'features/glyph-scripts' },
            { label: 'Display Brightness', slug: 'features/brightness' },
            { label: 'Idle & Burn-in Protection', slug: 'features/idle' },
            { label: 'Keymaps & Layers', slug: 'firmware/keymaps' },
            { label: 'Keymap Editor', slug: 'software/keymap-editor' },
            { label: 'Multi-Machine Setup', slug: 'software/multi-machine' },
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
          label: 'Development',
          items: [
            { label: 'System Model & Data Flow', slug: 'development/system-model' },
            { label: 'Firmware Development', slug: 'development/firmware' },
            { label: 'Display Graphics & Fonts', slug: 'development/display-graphics' },
            { label: 'Hardware & PCB Modification', slug: 'development/hardware' },
            { label: 'Test Rig & CI', slug: 'development/test-rig' },
            { label: 'Contributing', slug: 'development/contributing' },
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
