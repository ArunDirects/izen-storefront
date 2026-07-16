# iZEN Storefront

A premium eyewear storefront demo — React + Vite, deployable as a static site.
Cart, wishlist, compare, checkout, account, and a lightweight admin panel are all
functional against in-memory demo data (no backend yet — see **Backend integration
points** below).

## Project structure

```
├── index.html
├── src/
│   ├── main.jsx        # React entry point
│   ├── App.jsx          # All UI: layout, pages, and the App shell/router
│   ├── data.js           # Product catalog, categories, testimonials, FAQs, etc.
│   ├── index.css         # Design tokens, Tailwind directives, custom animations
│   └── assets/           # Product/category photography and the iZEN logo
├── public/
│   └── _redirects        # SPA fallback routing for Cloudflare Pages
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── wrangler.toml         # Optional, for `wrangler pages deploy`
```

Routing is client-side state (no URL router) — the whole app lives at `/`.

## Local development

Requires Node 18+.

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

To check the production build locally:

```bash
npm run build
npm run preview
```

`npm run build` outputs static files to `dist/`.

## Deploying to Cloudflare Pages

### Option A — Git integration (recommended)

1. Push this project to a GitHub/GitLab repo.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, and pick the repo.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Every push to the connected branch redeploys automatically.

### Option B — CLI (Wrangler)

```bash
npm install -g wrangler
npm run build
wrangler pages deploy dist --project-name izen-storefront
```

Follow the prompts to log in and create the project on first run.

## Backend integration points

This is a front-end demo. The following are wired up in the UI with clear seams,
but need real services behind them:

- **Payments (Razorpay):** `CheckoutPage` in `App.jsx` — form submit currently
  just simulates order placement.
- **Shipping (Shiprocket):** referenced in the product page shipping tab and
  shipping policy; no live rate/tracking calls are made.
- **Email automation:** order confirmation/shipped/delivered, password reset —
  none are sent; the checkout success screen notes where these would trigger.
- **Auth:** `AccountPage` login/register is a local demo (no password check,
  no persistence).
- **Admin panel:** `AdminPage` edits an in-memory copy of the catalog — changes
  don't persist or affect the live storefront. Wire it to a real API/database
  to make it functional.
- **Persistence:** cart, wishlist, and compare are React state only and reset
  on page reload. Swap in `localStorage` or a backend cart API as needed.

## Editing the catalog

All placeholder products are generated deterministically in `src/data.js`
(`PRODUCTS`, built from `CATEGORIES`, `COLORWAYS`, etc.). Replace this with a
real data source (API fetch, CMS, database) when ready — the rest of the app
just expects an array of product objects matching that shape.
