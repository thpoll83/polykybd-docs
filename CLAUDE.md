# CLAUDE.md — polykybd-docs

This file provides guidance to Claude Code (claude.ai/code) when working in the
**polykybd-docs** repo — the public documentation site published at
<https://www.polykybd.org>.

For the firmware see [`../qmk_firmware/CLAUDE.md`](../qmk_firmware/CLAUDE.md), for
the host app [`../PolyKybdHost/CLAUDE.md`](../PolyKybdHost/CLAUDE.md). The
**code-review conventions** and **branching rules** in the host file apply here too
— in particular: start each piece of work on a fresh branch cut from the updated
default (**`main`**), and never keep committing to a branch whose PR has merged.

- ⚠️ **CodeRabbit does NOT auto-review this repo** — it is under GitHub's 10-star
  threshold, so every review must be asked for (`@coderabbitai review`). See the
  code-review section of `PolyKybdHost/CLAUDE.md` for that and the other ways a
  PR can look reviewed without having been.
- **So comment `@claude review` — on this repo it is the only reviewer that is
  always available.** `.github/workflows/claude-review.yml` runs the `code-review`
  plugin on demand and posts inline comments; `claude-mention.yml` answers a plain
  `@claude <question>` with the repo and this file loaded. Neither is automatic and
  neither draws on a bot's quota. That combination matters more here than in the
  code repos, because this one stacks **three** gaps at once: no PR CI (above), no
  CodeRabbit auto-review (the note above), and a merge that publishes immediately —
  so "nothing objected" is the default state of a docs PR, not a verdict.
  - ⚠️ Runs bill the `CLAUDE_CODE_OAUTH_TOKEN` owner's Claude **subscription**, so a
    summons is a spend. Both workflows pin `github.actor` on top of the action's own
    write-access + human-actor checks; do **not** add `allowed_non_write_users` or
    `allowed_bots`.
  - ⚠️ Comment and `workflow_dispatch` triggers always run the copy on the **default
    branch**, so neither does anything until merged — you cannot test them on the PR
    that adds them.
  - ⚠️ This repo has no `.claude/settings.json`, and the `settings:` block in both
    workflows is a **pre-emptive** guard against adding one: the action applies a
    checked-in `permissions.allow` list inside the runner, where an unlisted tool is
    denied rather than prompted, and the reviewer then runs green having read
    nothing. Keep the block if you add a settings file.

## Commands

```bash
./preview.sh                  # live-reloading dev server (default)
./preview.sh build            # build + serve the real production output
./preview.sh --port 8080      # …on another port
npm ci --no-audit --no-fund   # plain `npm ci` works; sharp installs fine
npm run build                 # -> dist/ ; expect "N page(s) built"
```

## ⚠️ There is NO CI on pull requests — the local build is the only gate

`.github/workflows/deploy.yml` is the **only** workflow, and it triggers on
`push: [main]` + `workflow_dispatch`. Nothing builds a PR. So a broken build is
not caught by review, by a check, or by anything else — it first appears when the
change is already on `main` and the Pages deploy runs.

**Always `npm run build` before pushing**, and grep the built `dist/` for whatever
you changed rather than trusting the source. A PR here can be fully green with
zero checks having compiled the site (#48, 2026-08-17: the only check was a
CodeRabbit status).

## ⚠️ Merging a page SHIPS it — a host feature ships on a RELEASE

`deploy.yml` runs on `push: [main]`, so a merged docs PR is live within minutes.
The host app is the opposite: a merged PR only bumps the version in `main`, and
users keep running the last **published release** until someone cuts a new one.

That asymmetry is a trap in both directions, and this repo has now been caught by
each of them within one day:

- **Docs lagging code** — PolyKybdHost gated the plaintext window relay off by
  default in 0.10.5 and nothing updated the Multi-Machine page, which went on
  recommending the dead path for six weeks until a user hit it (docs#51,
  2026-08-17).
- **Docs leading code** — the same page's follow-up (docs#52) described browser-URL
  forwarding, which existed only in `main`. Merging it put the live site ahead of
  the newest release (0.12.3 in `main` vs v0.11.10 published), so a reader running
  the released host would again be following steps that cannot work.

**So: a docs PR that describes new host/firmware behaviour waits for the release
that carries it, not merely for the code PR to merge.** Say so in the PR body when
you open it — nothing else will catch it, since there is no CI here and the deploy
is automatic. When a page must land early anyway, name the required version in the
page itself rather than leaving the reader to find out.

## Architecture

Astro **Starlight**. Pages are Markdown/MDX under
`src/content/docs/<section>/<page>.{md,mdx}`; the file path is the URL
(`using/glyph-scripts.mdx` → `/using/glyph-scripts/`).

- **The sidebar is hand-curated** in `astro.config.mjs` (`sidebar: [...]`, by
  `slug`). A new page without an entry there is invisible.
- **`redirects:`** in the same file keeps old URLs alive when a page moves.
  ⚠️ These emit **meta-refresh stub HTML that is not a Starlight page**, so
  nothing from `head` reaches them — a site-wide script lands on the 45 real
  pages, not on the 7 stubs. That is usually what you want (the stub bounces and
  the destination does the work), but it means "every HTML file in `dist/`" and
  "every page" are different counts.
- **`routeMiddleware: './src/starlightRouteData.ts'`** clears `toc`, so there is
  **no right-hand table of contents** and the content takes the freed width. The
  practical consequence: the right side of the viewport carries no chrome, while
  the left has the nav sidebar.
- The **feature → page map**, the section list and the docs-PR flow live in the
  `update-polykybd-docs` skill; use it when a firmware/host feature needs
  documenting.

## Site-wide `<head>` scripts

A script that must run on every page goes in the Starlight **`head:` array** in
`astro.config.mjs`. The established split — set by `photo-zoom.js` and followed by
`consent.js` — is:

- **behaviour** → a plain IIFE in `public/js/<name>.js`, guarded by a
  `window.__polyX` flag so a double-include is harmless;
- **styling** → `src/styles/custom.css`, using Starlight's `--sl-color-*` tokens
  so both themes work without a second rule set.

⚠️ **The dev server renders the same `<head>`.** Anything injected there also runs
under `./preview.sh` — which for an analytics tag meant local previews reporting
into the live property (found 2026-08-17 by fetching the dev server, not by
reading the config). Gate anything that must not run locally on the Astro CLI
command:

```js
const isProductionBuild = process.argv.slice(2)[0] === 'build';
// …then spread it in: ...(isProductionBuild ? tags : [])
```

**Verify a gate in both directions** — present after `npm run build`, absent from
the dev server. One direction alone passes for the wrong reason.

## Analytics & cookie consent

GA4 (`G-8JB88YY4E5`), added 2026-08-17 (#48). The shape is deliberate:

- **Google Consent Mode v2, denied by default.** `gtag('consent','default',…)` is
  queued into `dataLayer` **before** the `gtag.js` loader — Consent Mode requires
  that ordering. Until the visitor accepts, GA sets no cookies and sends only
  cookieless pings.
- `ad_storage` / `ad_user_data` / `ad_personalization` are **denied permanently**
  and never granted; accepting flips `analytics_storage` and nothing else.
- The 🍪 chip sits **bottom-right** (the left would cover the nav sidebar; the
  right is free because the route middleware drops the TOC). Its label links to
  `/reference/website-analytics/`.
- The choice lives in `localStorage` under **`pk-analytics-consent`**, replayed by
  the inline snippet on later visits, so the chip appears once.
- **Consent is withdrawable** — `/reference/website-analytics/` carries a live
  control (`[data-pk-consent-control]`, hydrated by `consent.js`) that toggles both
  ways and **deletes the `_ga*` cookies** on revoke. Consent that cannot be
  withdrawn as easily as it was given is the defect this closed; don't remove it.
- The tag is **build-only** (see the gate above), so previews never report.

## Verifying rendered output (and behaviour) headlessly

Chromium is available in the dev/remote container — **look at the page rather than
reasoning about the markup**, the same rule the other repos apply to glyphs and
icons.

```bash
(cd dist && python3 -m http.server 4500 &)          # serve the real build
# screenshot (add --blink-settings=preferredColorScheme=0 for dark)
/opt/pw-browsers/chromium --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --window-size=1100,800 --screenshot=/tmp/p.png http://localhost:4500/
# DOM *after* scripts have run — this is how you check JS actually did something
/opt/pw-browsers/chromium --headless --no-sandbox --disable-gpu \
  --virtual-time-budget=4000 --dump-dom http://localhost:4500/ > /tmp/dom.html
```

To exercise an interaction, drop a throwaway harness page into `dist/` (it is
gitignored) that stubs any global the script calls (`window.gtag`), clicks the
element, and writes the outcome into a node — then `--dump-dom` and grep the
result. That is how the consent accept/revoke round-trip and the `_ga` cookie
deletion were confirmed.

⚠️ **Grep the attribute, not the tag + class order.** Chromium serialises
`<div data-pk-consent-control="true" class="pk-consent-control">`, so a grep for
`<div class="pk-consent-control"` finds nothing and reads as "the script didn't
run" — it cost a false diagnosis before the DOM was actually inspected. Match on
the distinctive attribute or class alone.

Zoom trick: a small `--window-size` plus `--force-device-scale-factor=3` gives a
crisp close-up of a fixed-position corner element without any cropping tool.
