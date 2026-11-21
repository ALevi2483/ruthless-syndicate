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

- The catalog uses 12 product listings from the [official storefront](https://www.ruthlesssyndicate.com/mens-clothing.html). Prices, size ranges and sold-out labels are snapshots. Each product links to its listing for current availability, photos and purchase. The draft uses illustrations until reuse rights are confirmed for all 12 store product photos.
- The [official sponsorship announcement](https://www.ruthlesssyndicate.com/sponsored-events.html) confirms the Combat Zone 92 date and the 2026 SNHU Arena platinum sponsorship. The [promoter schedule](https://czmma.com/events) lists Combat Zone 94 and identifies Combat Zone 95 as upcoming with its date to be announced.
- The [brand website](https://www.ruthlesssyndicate.com/) identifies the Facebook, Instagram and YouTube accounts and leadership team. The [sponsored athlete page](https://www.ruthlesssyndicate.com/sponsored-athletes.html) supports the profile biographies. Supply confirmed individual profile URLs to add athlete social links.
- Obtain the authorized logo, a Kai Lau Quan portrait, and headshots for Phil Martin, Eric Reid, Ron Martin and Kenny French. Confirm rights for the existing hero, fight-night photograph, event poster and four athlete portraits, and confirm the identities of the people in the uncaptioned hero and fight-night photographs.

## Lorenzo Hunt signing

- The signing was supplied directly by the site maintainer. The [brand athlete roster](https://www.ruthlesssyndicate.com/sponsored-athletes.html) and publicly accessible [brand Instagram profile](https://www.instagram.com/ruthlesssyndicate/) did not establish a public signing announcement. Add the announcement permalink if the brand supplies it.
- [Hunt’s Instagram profile](https://www.instagram.com/thejuggernauthunt/) identifies him and confirms the public account handle. The supplied [BKFC athlete profile](https://www.bkfc.com/fighters/lorenzo-the-juggernaut-hunt) is linked as the fight-coverage source. Cloud network restrictions prevented inspection of BKFC, the fight databases, and combat sports publications. Confirm championship history and any first-ever claim, division and ranking, measurements, hometown, records, results, and future bouts against primary sources before adding them.
- The news article and athlete profile use static HTML, page-specific metadata and structured data. The draft’s robots rules and noindex tags remain active. Set the final hostname before adding canonicals, Open Graph URLs, or sitemap entries.
- Supply an approved portrait with credit and reuse scope, and official highlight or interview URLs with embedding enabled. The profile uses a typographic hero until approved imagery is available.

## Before going live
Obtain client approval, authorized images, current athlete details and merchant catalog. Confirm Square/Shopify, shipping, tax, returns, privacy and terms. Implement merchant-owned checkout with server-side validated product IDs, prices and inventory, webhook verification, API credentials stored in server secrets, and proper error handling. Never put secrets in GitHub or frontend JS. Integrate a secured application backend and anti-spam if needed. Set canonical URLs and generate a sitemap after confirming the production hostname. Run launch accessibility, performance and order fulfillment checks. Remove noindex and demo labels ONLY after authorization and readiness. Avoid collecting real customer data in this demo.

