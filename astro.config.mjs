import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://thpoll83.github.io',
  base: '/polykybd-docs',
  integrations: [
    starlight({
      title: 'PolyKybd',
      description: 'Documentation for the PolyKybd Split72 — a split ergonomic keyboard where every key has its own OLED display.',
      // logo: {
      //   src: './src/assets/polykybd-logo.svg',
      //   replacesTitle: false,
      // },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/thpoll83/PolyKybd' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/gW8JescH7M' },
      ],
      sidebar: [
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
          label: 'Firmware',
          items: [
            { label: 'Overview', slug: 'firmware/overview' },
            { label: 'Flashing the Firmware', slug: 'firmware/flashing' },
            { label: 'Keymaps & Layers', slug: 'firmware/keymaps' },
            { label: 'Unicode & Language Input', slug: 'firmware/unicode' },
          ],
        },
        {
          label: 'Host Software',
          items: [
            { label: 'What is PolyKybdHost?', slug: 'software/overview' },
            { label: 'Installation', slug: 'software/installation' },
            { label: 'Using PolyKybdHost', slug: 'software/usage' },
            { label: 'Keymap Editor', slug: 'software/keymap-editor' },
            { label: 'Multi-Machine Setup', slug: 'software/multi-machine' },
          ],
        },
        {
          label: 'Development',
          items: [
            { label: 'Firmware Development', slug: 'development/firmware' },
            { label: 'Display Graphics', slug: 'development/display-graphics' },
            { label: 'Hardware & PCB Modification', slug: 'development/hardware' },
            { label: 'Contributing', slug: 'development/contributing' },
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
