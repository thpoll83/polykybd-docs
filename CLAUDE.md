# CLAUDE.md: polykybd-docs (www.polykybd.org)

The public documentation site, Astro 7 + Starlight 0.42.

**Rules for all PolyKybd repos** (review, branching, releases, web session limits) are
in `../polykybd-claude/CLAUDE.md`, with the shared skills. If that repo is not attached,
ask the user to attach `thpoll83/polykybd-claude`. Documenting a firmware or host feature
is the `update-polykybd-docs` skill (feature→page map, section list, docs-PR flow).
Headless verification recipes, analytics details and the photo workflow:
[`MAINTAINING.md`](MAINTAINING.md).

## Commands

```bash
./preview.sh                  # live-reloading dev server (./preview.sh build serves the real output)
npm ci --no-audit --no-fund   # plain npm ci works; sharp installs fine
npm run build > /tmp/build.log 2>&1   # -> dist/, expect "N page(s) built"
```

- ⚠️ **Node 22.12+ is required** (Astro 7 on Vite 8; `deploy.yml` pins 22).
- ⚠️ **Never pipe the build into `head`.** SIGPIPE kills it partway and leaves `dist/`
  half written, which looks like broken image handling.
- ⚠️ **Never use the `--ignore-scripts` + `passthroughImageService` fallback on an image
  change.** It skips `sharp`, so the build stops reflecting what the site serves.

## No CI on pull requests

`deploy.yml` is the only workflow and runs on `push: [main]` and `workflow_dispatch`.
Nothing builds a PR, and CodeRabbit must be asked by hand. **Run `npm run build` before
pushing and grep `dist/` for what you changed.** A green PR can have had zero checks
compile the site (#48).

- ⚠️ **An on-demand Claude reviewer was tried and removed (2026-08-20). Don't rebuild
  it.** Three summonses, every run green, zero reviews posted (`permission_denials_count`
  1–2, output hidden), ~$1.30 spent.

## Merging a page ships it

A merged docs PR is live within minutes; host and firmware features reach users only on
a release. Both directions have bitten: the Multi-Machine page kept recommending a path
the host had gated off for six weeks (docs#51), and its follow-up described a feature
that existed only in `main` (docs#52). **A page describing new behaviour waits for the
release that carries it.** Say so in the PR body, or name the required version on the
page.

## Architecture

- **Pages** are `src/content/docs/<section>/<page>.{md,mdx}`; the path is the URL.
  Collection config: `src/content.config.ts` (Astro 6+ refuses the legacy
  `src/content/config.ts`).
- **The sidebar is hand-curated** in `astro.config.mjs`. A page without an entry is
  invisible.
- **`redirects:`** in the same file emit meta-refresh stubs (7 today) that are not
  Starlight pages, so nothing from `head` reaches them. "Every HTML file in `dist/`" and
  "every page" (65 content pages today) are different counts.
- **`routeMiddleware: './src/starlightRouteData.ts'`** clears `toc`, so there is no
  right-hand table of contents and the right side of the viewport is free.
- ⚠️ **Starlight's CSS is in `@layer starlight.*`, and an unlayered rule beats every
  layered one.** A `:root` token override in `src/styles/custom.css` also wins in the
  light theme. Give every token override a `:root[data-theme='light']` value too, and
  check the light theme (Playwright `colorScheme: 'light'`). The failure is silent.

## Site-wide `<head>` scripts and analytics

- **A script for every page goes in Starlight's `head:` array.** Behaviour is a plain
  IIFE in `public/js/<name>.js` guarded by a `window.__polyX` flag; styling goes in
  `custom.css` with `--sl-color-*` tokens.
- ⚠️ **The dev server renders the same `<head>`.** Gate anything that must not run
  locally on `process.argv.slice(2)[0] === 'build'`, and verify the gate both ways:
  present after the build, absent from the dev server.
- **GA4 (`G-8JB88YY4E5`) runs under Consent Mode v2, denied by default**, set before the
  loader. Accepting grants `analytics_storage` only; ad storage is never granted. The
  choice is withdrawable on `/reference/website-analytics/`, and revoking deletes the
  `_ga*` cookies. Don't remove that control. Details: `MAINTAINING.md`.

## Images

- **Write plain markdown `![alt](../../../assets/<section>/<file>)`.** Every non-SVG body
  image renders at 55% of the column (82% under 50rem), centred, click-to-enlarge
  (`custom.css`, `public/js/photo-zoom.js`). `img.landing-showcase` is the one full-width
  opt-out, at most one per page.
- **Assets live in `src/assets/<section>/`** (`assembly`, `firmware`, `hardware`,
  `howto`, `landing`, `overlays`, `reference`, `schematics`, `software`, `using`).
  Astro re-encodes them to WebP.
- **Size photos ~1400 px on the long edge, quality ~82.** 2000 px was tried and reverted.
- ⚠️ **The splash hero caps a photo at ~305 px.** Keep the badge there and put the photo
  in the body.
- ⚠️ **Check what the keycap displays show.** One merge-ready photo was a debug render
  with keycode numbers beside every legend. When one photo of a session is unusable,
  check its siblings.

## Looking at the result

Chromium and Playwright are installed; look at the built page rather than reasoning
about markup. Recipes (screenshots, `--dump-dom`, section clips, interaction harnesses):
`MAINTAINING.md`.

- ⚠️ **Serve `dist/` without SPA mode** (`npx serve dist -l <port>` or
  `python3 -m http.server`). `serve -s` returns the landing page for every route.
- ⚠️ **Stop the server with `pkill -f "[h]ttp.server 4500"` as its own command.**
  The plain pattern, or the literal anywhere else in the same shell command, kills the
  shell running it.
- ⚠️ **Grep Chromium's DOM by attribute, not tag + class order.** It reorders attributes.
