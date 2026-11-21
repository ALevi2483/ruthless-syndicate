# Ruthless Syndicate • website redesign prototype

A dependency-free HTML/CSS/JS demonstration, built for a private GitHub repository and Cloudflare Pages. It is not the official store and is not production-ready commerce software.

## Preview locally

From the checkout root, run `python3 -m http.server 8000` and open `http://localhost:8000`. The static site uses browser JavaScript and requires no build step or API credentials.

For Cloudflare Pages, use `main`, no framework preset, a blank build command and the checkout root (`.`) as the output directory. Keep the draft behind Cloudflare Access on production and preview hostnames. The site's `noindex` metadata and robots rules are for search crawlers.

## Site files

- `css/style.css` defines the shared layout and responsive styles.
- `js/site.js` renders the navigation, catalog, cart, profiles, events and sponsorship application.
- `data/catalog.js` holds catalog, athlete, leadership, event and contact information. Product prices and sizes are draft snapshots. The linked merchant listings are the places to check current price, sizing and availability.
- HTML files provide page titles and descriptions and select the shared templates with `data-page`.

## Demo behavior

The draft supports catalog search and sorting, product details, a local-storage shopping bag, simulated checkout and a local-only sponsorship application. It does not accept orders, payments, registrations or form submissions.

## Sources and launch checklist

- The catalog retains four legacy [official store listing URLs](https://www.ruthlesssyndicate.com/). Confirm each listing, description, price, size, availability and purchase link against the merchant store before publishing. Obtain authorized photos for the Black Loyalty Tee, Black Loyalty Hoodie, Black Loyalty Snapback and Steven “Ninja” Nguyen Crop Tee. The current catalog uses vector illustrations.
- The checked-in Combat Zone 92 poster lists Ruthless Syndicate as a sponsor and shows May 16, SNHU Arena in Manchester, NH, doors at 4 p.m. and fights at 5 p.m. The year comes from the draft event record. Confirm the archive entry with the [promoter](https://czmma.com/) and verify any additional event or partnership before adding it.
- Confirm the existing [brand Instagram link](https://www.instagram.com/ruthlesssyndicate/) and contact address, and supply the official Facebook and YouTube URLs and each athlete's public profile URLs. Confirm the current roster, athlete biographies and leadership roles with the brand.
- Obtain the authorized logo, a Kai Lau Quan portrait, and headshots for Phil Martin, Eric Reid, Ron Martin and Kenny French. Confirm rights for the existing hero, fight-night photograph, event poster and four athlete portraits, and confirm the identities of the people in the uncaptioned hero and fight-night photographs.

## Before going live
Obtain client approval, authorized images, current athlete details and merchant catalog. Confirm Square/Shopify, shipping, tax, returns, privacy and terms. Implement merchant-owned checkout with server-side validated product IDs, prices and inventory, webhook verification, API credentials stored in server secrets, and proper error handling. Never put secrets in GitHub or frontend JS. Integrate a secured application backend and anti-spam if needed. Set canonical URLs and generate a sitemap after confirming the production hostname. Run launch accessibility, performance and order fulfillment checks. Remove noindex and demo labels ONLY after authorization and readiness. Avoid collecting real customer data in this demo.

