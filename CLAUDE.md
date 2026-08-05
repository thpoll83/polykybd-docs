# CLAUDE.md — polykybd-docs

Guidance for Claude Code (claude.ai/code) when working in the **polykybd-docs** repo — the
public documentation site (Astro + Starlight, published at `www.polykybd.org`).

For *what* to document when a feature changes, use the **`update-polykybd-docs`** skill (it
owns the page map, the user-voice rules and the separate-PR flow). This file covers the
things that bit us while working *in* the repo.

The **code review conventions** and **branching rules** in the sibling repos' `CLAUDE.md`
apply here too — in particular, start each piece of work on a fresh branch cut from the
updated default (**`main`** here) and never keep committing to a branch whose PR merged.

## Building

Plain `npm ci` works and installs `sharp`, so the build does real image processing:

```bash
npm ci --no-audit --no-fund
npx astro build            # expect "44 page(s) built", no errors
```

⚠️ The `--ignore-scripts` + `passthroughImageService` fallback documented in
`update-polykybd-docs` is **not** the default path, and must never be used on a change
involving images: passthrough disables resize and WebP conversion, so the build stops
reflecting what the site actually serves and any size check silently measures the source
file instead.

## Images

- **Every non-SVG image in the page body renders at 55% of the column, centred, with
  click-to-enlarge.** The rule lives in `src/styles/custom.css`
  (`.sl-markdown-content img:not([src$='.svg'])`), and the lightbox is
  `public/js/photo-zoom.js`, wired in globally from `astro.config.mjs`. You get this for
  free by writing plain markdown `![alt](../../../assets/<section>/<file>)` — there is no
  wrapper component to remember. SVG wordmarks/badges are excluded and keep their natural
  size.
- **Full width is an opt-out, not a choice per image.** `img.landing-showcase` is the one
  escape hatch (100% width), used for the landing page's lead photo. Keep it to one per
  page at most.
- **Assets live in `src/assets/<section>/`** mirroring the docs sections (`assembly/`,
  `using/`, `firmware/`, `hardware/`, `howto/`, `overlays/`, `schematics/`, `landing/`).
  Astro fingerprints and re-encodes them to WebP at build.
- **Size photos at ~1400px on the long edge** (quality ~82). That matches the images
  already in the repo (1024–1400px) and is still ~2.5× the 551px render size, so the
  lightbox stays sharp. 2000px was tried and reverted — it is ~3.6× oversampling and
  roughly doubles page weight for no visible gain.
- ⚠️ **A photo in the Starlight splash hero is capped at about 305px wide** — *narrower*
  than a body image at 55%. A dark, detailed photo is wasted there. Keep the badge in the
  hero slot and put the photo in the body as a `landing-showcase`.

### Vetting a photo before it ships

The subject of most of these photos is a keyboard whose keys are displays, so **check what
the displays are showing, not just the composition.** One shot that looked perfect turned
out to be a debug render — every keycap showed its keycode number beside the legend
(`7 302`, `y 290`). It reached a merge-ready PR before anyone noticed.

When one photo from a shooting session turns out to be unusable, **check its siblings** —
they are usually the same state. Conversely, when a photo *is* good, prefer one where the
displays carry meaningful content (a real layout, AltGr symbols, a named layout on the
status OLED); that is what makes a PolyKybd photo worth more than a product shot.

## Verifying a change

- ⚠️ **Serve the built site WITHOUT `-s`.** `npx serve -s dist` enables SPA mode and
  silently returns `index.html` for *every* route — screenshots of three different pages
  came back as three copies of the landing page. Use `npx serve dist -l <port>`.
- **Measure rendered images in the browser rather than reading the CSS.** Playwright with
  the pre-installed Chromium (`executablePath: '/opt/pw-browsers/chromium'`) is enough:
  walk `.sl-markdown-content img`, and compare each `getBoundingClientRect().width` against
  the container's. Expect 55% everywhere and 100% only for `landing-showcase`.
- ⚠️ `naturalWidth === 0` in such a measurement means the image is **lazy-loaded below the
  fold**, not broken — confirm by checking `dist/_astro/` for the emitted asset before
  reporting a problem.
- **Check both themes.** The site renders in the viewer's light/dark preference; a dark
  photo against the light theme reads very differently. Playwright's `colorScheme` option
  covers it.

## Getting photos out of Google Drive

Photos usually arrive as a Drive folder link. The path that works:

1. **Google Photos album URLs are a dead end** — `photos.google.com/album/...` redirects to
   `accounts.google.com/ServiceLogin`. Ask for the files in Drive instead.
2. **The Drive connector can list but not deliver.** `search_files` is fine for
   enumerating, but `download_file_content` returns base64 *into the conversation* (a 5 MB
   photo is millions of characters — unusable for more than a file or two), and
   `read_file_content` returns an empty string for `image/jpeg`.
3. **Ask the owner to set the folder to "Anyone with the link → Viewer"**, then fetch from
   the shell:

   ```bash
   curl -sSL -o "$name" "https://drive.google.com/uc?export=download&id=$id"
   file "$name"          # ALWAYS verify
   ```

   ⚠️ Without sharing, curl returns Google's **sign-in page as HTML** under your `.jpg`
   filename — `file` is what catches it. (Files over ~25 MB add a virus-scan interstitial
   that needs a confirm token; ordinary photos do not.)

⚠️ **`search_files` pagination repeats the first page.** Feeding the returned
`nextPageToken` back returned the *identical* 50 files with a fresh token. Page with a
timestamp cursor instead:

```
parentId = '<folder id>' and createdTime < '<oldest createdTime seen so far>'
```

This is not cosmetic: a folder that reported 47 files actually held 87, and the missing
half contained the photos the user actually wanted. **Confirm you have the whole folder
before proposing anything based on its contents.**

### Cataloguing a large drop

Reading dozens of full-size photos individually is slow and burns context. Build labelled
contact sheets instead (Pillow; `pip install pillow`) — a 4×3 grid of ~460px thumbnails per
sheet, each cell captioned with an index and the filename's timestamp — then read the
sheets. That is enough to identify subjects and pick candidates; only open the shortlist at
full size. Remember `ImageOps.exif_transpose()`, or phone photos come out rotated.
