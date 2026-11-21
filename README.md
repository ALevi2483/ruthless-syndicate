# Ruthless Syndicate • website redesign prototype

A dependency-free HTML/CSS/JS demonstration, built for a private GitHub repository and Cloudflare Pages. It is not the official store and is not production-ready commerce software.

## Upload to GitHub
1. Create a private repository named `ruthless-syndicate` (empty, no generated README).
2. Extract the ZIP on your computer. Upload the **public** folder and README.md at repository root. Do not upload the ZIP itself.
3. Commit to `main`.

## Preview locally
Open `public/index.html` in your browser. For a more accurate hosting test, from the repository folder run `python -m http.server 8000 --directory public`, then visit `http://localhost:8000`. No Node, install commands or API keys needed.

## Cloudflare Pages
Create a Pages project from Git, connect GitHub and select your repo. Production branch: `main`. Framework preset: None. Build command: blank (or `exit 0` if required). Build output directory: `public`. Root directory: leave default. Deploy. Use the generated temporary `pages.dev` address. Do NOT point the real domain at this demo. A private GitHub repo does not make its deployment private: configure and verify Cloudflare Access for the actual demo hostname and any preview/deployment hostnames before sharing. Robots/noindex headers are not authentication. Alternatively show the local site only. Official guide: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Editing the website
- `public/css/style.css`: shared layout, typography, palette, responsive design.
- `public/js/site.js`: shared header/footer, page layouts, filters, cart, form and event rendering.
- `public/data/catalog.js`: centralized merchandise, athlete profiles, event records and contact links. Add new products here; valid categories are mens, womens, accessories, new-releases, collections, clearance. Sample sizes/category assignments are not merchant-confirmed. Product statuses: `confirm` (demo add-to-bag), `soldout` (disabled). Add or replace product image references in the rendering code when approved photos are available. Use local image files, not unapproved hotlinks.
- `public/assets/`: original vector placeholders for hero, apparel and concept mark. Replace with authorized brand photography and logo. No actual athlete portrait or actual merchandise photo is included.
- HTML pages are intentionally thin shells; `body data-page` controls which template renders. All paths are relative so local preview works.
- Events are separated by date in JavaScript. Enter dates as YYYY-MM-DD; the demo uses UTC dates and the archived May 16 event from the original site. Confirm date/time and time zone for production.

## Demo functionality
28 pages; mobile menu; product search and sorting; product details; localStorage cart with sizes / quantities / removals; sold-out item disabled; simulated checkout; six athlete pages; event archive; local-only sponsorship form; policy placeholders. New releases and clearance show empty states until confirmed listings are added. No live orders, payments, inventory, analytics, email registration, account authentication or server-side form submission. Newsletter and affiliate tracking are not included. Private GitHub does not protect public hosting.

## Source references (publicly listed, not live or verified stock)
- https://www.ruthlesssyndicate.com/ (athletes, leadership, event announcement)
- https://www.ruthlesssyndicate.com/store/p7/Black-Ruthless-Syndicate-Loyalty-Tee.html
- https://www.ruthlesssyndicate.com/store/p10/Black-Ruthless-Syndicate-Loyalty-Hoodie.html
- https://www.ruthlesssyndicate.com/store/p9/Black-Ruthless-Syndicate-Loyalty-Snapback-Hat.html
- https://www.ruthlesssyndicate.com/store/p12/Steven-Ninja-Nguyen-Black-Oversized-Crop-Tee.html
- Instagram handle and email are preliminary contact references; verify ownership before production.

## Before going live
Obtain client approval, authorized images, current athlete details and merchant catalog. Confirm Square/Shopify, shipping, tax, returns, privacy and terms. Implement merchant-owned checkout with server-side validated product IDs, prices and inventory, webhook verification, API credentials stored in server secrets, and proper error handling. Never put secrets in GitHub or frontend JS. Integrate a secured application backend and anti-spam if needed. Add actual SEO page content/metadata, sitemap and redirects, accessibility and performance checks, production monitoring and order fulfillment testing. Remove noindex and demo labels ONLY after authorization and readiness. Avoid collecting real customer data in this demo.

