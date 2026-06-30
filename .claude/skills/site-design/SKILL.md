---
name: site-design
description: Build and extend Stefano Baldan's personal site (singintime.github.io) on-brand — palette, typography, structure, and the verify loop. Use for any page work on this site.
---

# Site design — singintime.github.io

The personal hub for Stefano Baldan (folk musician · audio developer · researcher).
Plain static HTML/CSS, no build step, served by GitHub Pages from the repo root.
Use this skill whenever creating or editing pages so the whole site stays of-a-piece.

## Non-negotiables (read first)

1. **No build step, no framework.** Hand-written HTML + one shared `assets/css/main.css`.
   GitHub Pages serves the repo root directly; `.nojekyll` disables Jekyll. Don't add
   Jekyll, npm, bundlers, or a `package.json`.
2. **Self-host fonts. NEVER the Google Fonts CDN.** Stefano is an EU/German resident;
   embedding the Google Fonts CDN sends visitor IPs to Google and is a documented GDPR
   liability. Outfit Light is already at `assets/fonts/Outfit-Light.ttf`, declared once
   via `@font-face` in `main.css`. Add weights by self-hosting the `.ttf`, not via a CDN.
3. **Root-absolute asset paths** (`/assets/...`, `/plugins/`, `/cv/`). This is a user
   Pages site served at the domain root, so absolute paths work from any page depth.
4. **One brand, one stylesheet.** All color/spacing live as CSS variables at the top of
   `main.css`, lifted from the Duono plugin (`DuonoStyle.h`). Retheme there, never inline
   hex values into pages.
5. **Privacy on public pages.** Do not surface home address, phone number, or birthdate
   (the CV lesson). Public pages get email + city at most; full contact details go to
   recruiters privately.

## Brand tokens (from the Duono plugin)

Defined as CSS variables in `assets/css/main.css`:

| token | value | role |
|-------|-------|------|
| `--bg` | `#141210` | page background (a touch darker than the panel) |
| `--panel` | `#1e1c1a` | cards / panels (DuonoStyle PanelBg) |
| `--accent` | `#c8b89a` | sand/cream — primary accent (DuonoStyle Accent) |
| `--accent-bright` | `#e4d6ba` | headings / hover |
| `--text` | `#cdbfae` | body text |
| `--muted` | `#a09080` | secondary text (DuonoStyle Label) |
| `--track` | `#252118` · `--shadow` `#0d0c0b` · `--bevel` `#3a3530` | depth accents |

Type: **Outfit Light (weight 300) everywhere.** Hierarchy comes from size + color, never
weight (there is only the Light cut). Warm, dark, editorial — folk-musician/academic feel,
not SaaS.

## Structure & conventions

```
index.html              Home — single-page parallax scroller, hand-edited (no build step)
plugins/index.html      Plugins index
plugins/duono/index.html  Product landing page pattern
cv/index.html           CV (branded, no Jekyll)
assets/css/main.css     the whole design system
assets/img/             favicon.svg (knob-arc motif) + bg-*.jpg panel photos + per-page imagery
```

- **The home page is one document.** `index.html` holds header + five full-height
  `<section class="panel panel--NAME">` panels (home, music, plugins, research, about) +
  footer, inline. There is **no `sections/` dir and no `build.sh`** — edit `index.html`
  directly. Each panel has a fixed background photo (`.panel--NAME` rule in `main.css`),
  a dark scrim for legibility, and the nav links jump to its `#NAME` anchor.
- **Panel rhythm:** odd panels anchor left, even ones add `class="align-right"` (mirrored
  scrim + right-aligned text, desktop only). Section seams are cut along the waveform motif
  via a CSS `mask` so adjacent photos meet on the wave; the hero draws the wave once on load.
  Face photos anchor `top`; faceless ones center vertically.
- **Deep pages** (`plugins/`, `plugins/duono/`, `cv/`) are separate documents on the light
  theme (`<body class="page-light">`), using the document primitives below, not panels.
- **Header/footer are duplicated inline** in each page (no includes, by design). When you
  change nav, change it in *every* page. Mark the current item with `aria-current="page"`.
- **Adding a home section:** add a `<section class="panel panel--x">` to `index.html` (copy
  an existing panel; add `align-right` if it lands on an even slot), add a `.panel--x`
  background rule in `main.css`, and add the `#x` nav link to **every** page's header.
- **Reusable CSS classes already exist:** `.wrap .panel .panel-inner .eyebrow .lead .btn
  .btn-primary .btn-ghost .card .feature .specs .cv-entry .plugin-shot`. Prefer these over
  new CSS.

## The verify loop (do this every time, before claiming done)

1. Serve locally: `python3 -m http.server 8800` from the repo root (use a fresh port if busy).
2. **Check routes + internal links resolve** (curl each page and every root-absolute
   `href`/`src` for HTTP 200).
3. **Look at the rendered output** — render and screenshot, then actually read the image.
   If the Playwright MCP is available, use it (real viewports incl. **mobile**, interactions).
   Otherwise fall back to headless Chrome:
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
     --force-device-scale-factor=1 --window-size=1200,1600 --screenshot=out.png URL`
4. **Accessibility pass:** body/secondary text must keep adequate contrast on the dark bg;
   every `<img>` needs real `alt`; one `<h1>` per page; nav reachable; tap targets comfortable.
5. Responsive: verify the layout at ~375px (mobile) as well as desktop.

## Faithful plugin-UI imagery

Plugin UIs are custom NanoVG — recreate them as vector SVG from the draw code
(coordinates/colors in the plugin's `*Style.h`/`*Knob.h`/etc.), then rasterize at 3× via a
headless browser for a crisp retina asset. This beats an OS screen-capture and is exact to
source. See `assets/img/duono-ui.png` (built from `DuonoKnob.h` geometry).

## Deploy

Commit to `main`; GitHub Pages auto-builds (Pages enabled, main/root, HTTPS). Live within
~1 min at https://singintime.github.io. Project repos named `<thing>` would shadow a
`/<thing>` folder here — keep everything in this one repo.
