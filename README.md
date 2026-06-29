# singintime.github.io

Personal site for Stefano Baldan — folk musician, audio developer, researcher.
Plain static HTML/CSS, no build step. GitHub Pages serves it straight from the
repo root (`.nojekyll` disables Jekyll processing).

## Structure

```
index.html              Home / hub (Work cards: Plugins & CV live, Music/Research soon)
plugins/index.html      Plugins index
plugins/duono/index.html  Duono landing page (the donationware page)
cv/index.html           CV (migrated in from the old standalone repo)
assets/
  css/main.css          Brand system — palette + type lifted from the Duono plugin
  fonts/Outfit-Light.ttf Self-hosted (GDPR-safe; do NOT swap for the Google CDN)
  img/                  favicon.svg, duono-null-proof.png
```

## Brand tokens

All colors are CSS variables at the top of `assets/css/main.css`, taken from
`DuonoStyle.h` (accent `#c8b89a`, panel `#1e1c1a`, etc.). Retheme there.
Type is Outfit Light throughout; hierarchy comes from size + color, not weight.

## Before going live — edit these

- `plugins/duono/index.html`: replace `https://YOUR-STORE.lemonsqueezy.com/buy/duono`
  (two places) with your real Lemon Squeezy checkout URL, and link the manual PDF.
- `index.html`: tweak the hero eyebrow / lead to taste.
- Flip a `card is-soon` → `a class="card" href="..."` as each section goes live.

## Deploy

```sh
cd singintime.github.io
git init
git add -A
git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:singintime/singintime.github.io.git
git push -u origin main
```

Then on GitHub: the repo **must** be named `singintime.github.io`. Settings →
Pages → Source: `main` / root. Live at https://singintime.github.io within a
minute or two.

### Retiring the old `cv` repo (do this, or `/cv` won't update)

A separate `github.com/singintime/cv` project repo currently owns the `/cv` path
and **takes precedence** over this repo's `cv/` folder. After pushing, either
**delete** that repo or disable its Pages (Settings → Pages → Source: None);
otherwise the old Jekyll CV keeps serving and the new one stays shadowed.

## Custom domain (later)

Add a `CNAME` file containing your domain (e.g. `stefanobaldan.com`), set the DNS
records GitHub shows you, and tick "Enforce HTTPS" once the cert is issued.

## Local preview

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```
