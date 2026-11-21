/* js/site.js
   Ruthless Syndicate Website
   Complete replacement file
*/

'use strict';

(() => {
 const D = window.RS_DATA;
 const page = document.body.dataset.page;
 const main = document.querySelector('#main');

 const $ = (s, root = document) => root.querySelector(s);
 const $$ = (s, root = document) => [...root.querySelectorAll(s)];

 const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({
   '&': '&amp;',
   '<': '&lt;',
   '>': '&gt;',
   '"': '&quot;',
   "'": '&#39;'
 }[c]));

 document.addEventListener('error', e => {
   const img = e.target;

   if (!(img instanceof HTMLImageElement)) return;

   const fallback = img.dataset.fallback;

   if (fallback) {
     delete img.dataset.fallback;
     img.alt = img.dataset.fallbackAlt || 'Illustrative placeholder';
     img.src = fallback;
   } else if (img.hasAttribute('data-optional-photo')) {
     img.hidden = true;
   }
 }, true);

 const photo = (src, alt, fallback = '', className = '') =>
   `<img src="${esc(src || fallback)}"
      alt="${esc(src ? alt : fallback ? 'Illustrative placeholder' : '')}"
      class="${esc(className)}"
      ${fallback
        ? `data-fallback="${esc(fallback)}" data-fallback-alt="Illustrative placeholder"`
        : 'data-optional-photo'}
      loading="lazy" decoding="async">`;

 const productPhoto = p =>
   photo(p.image, p.name, `assets/${p.kind}.svg`);

 const portrait = (a, large = false) =>
   `<div class="athlete-art${large ? ' portrait-large' : ''}">
      ${a.image ? photo(a.image, '', '', 'portrait-photo') : ''}
      <small>${esc(a.sport.toUpperCase())} / TEAM RS</small>
      <strong>${esc(a.alias)}</strong>
    </div>`;

 const money = n => new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD'
 }).format(n);

 const href = id => `${id}.html`;

 const link = (id, label) =>
   `<a href="${href(id)}"
      ${id === page ? 'aria-current="page"' : ''}>
      ${esc(label)}
    </a>`;

 const btn = (id, label, alt = false) =>
   `<a class="btn${alt ? ' alt' : ''}" href="${href(id)}">
      ${esc(label)} <span aria-hidden="true">↗</span>
    </a>`;

 const brand =
   `<a class="brand" href="index.html"
      aria-label="Ruthless Syndicate home">
      <img src="assets/mark.svg" alt="" width="45" height="45">
      <span>RUTHLESS<small>SYNDICATE</small></span>
    </a>`;

 const categories = [
   ['shop', 'All apparel'],
   ['mens', 'Men'],
   ['womens', 'Women'],
   ['accessories', 'Accessories'],
   ['new-releases', 'New releases'],
   ['collections', 'Athlete editions'],
   ['clearance', 'Clearance']
 ];

 const productBy = id => D.products.find(p => p.id === id);
 const athleteBy = id => D.athletes.find(a => a.id === id);

 let bag = [];

 try {
   const raw = JSON.parse(
     localStorage.getItem('rs-demo-bag-v1') || '[]'
   );

   if (Array.isArray(raw)) {
     bag = raw.filter(i =>
       productBy(i.id)?.sizes.includes(i.size) &&
       productBy(i.id).status !== 'soldout' &&
       Number.isInteger(i.qty) &&
       i.qty > 0 &&
       i.qty <= 20
     );
   }
 } catch {}

 const sum = () =>
   bag.reduce((n, i) => n + productBy(i.id).price * i.qty, 0);

 function save() {
   try {
     localStorage.setItem('rs-demo-bag-v1', JSON.stringify(bag));
   } catch {}

   const b = $('#bag-count');

   if (b) {
     b.textContent = bag.reduce((n, i) => n + i.qty, 0);
   }
 }

 let toastTimer;

 function toast(t) {
   const e = $('#toast');
   e.textContent = t;
   e.classList.add('show');

   clearTimeout(toastTimer);

   toastTimer = setTimeout(() => {
     e.classList.remove('show');
   }, 3200);
 }

 /* HEADER AND NAVIGATION */

 $('#header').innerHTML = `
   <div class="demo-bar">
     Unofficial redesign concept · Demo only · No live purchases
   </div>

   <div class="nav">

     ${brand}

     <nav id="navigation" class="navlinks"
          aria-label="Main navigation">

       ${[
         ['shop', 'Shop'],
         ['athletes', 'Team Ruthless'],
         ['events', 'Fight Central'],
         ['about', 'Meet the Syndicate'],
         ['sponsorship', 'Sponsorships']
       ].map(([id, n]) => link(id, n)).join('')}

     </nav>

     <button class="menu"
             id="menu"
             aria-controls="navigation"
             aria-expanded="false">
       Menu
     </button>

     <a class="bag" href="cart.html">
       BAG (<span id="bag-count">0</span>)
     </a>

   </div>

   <nav class="subnav" aria-label="Shop categories">
     ${categories.map(([id, n]) => link(id, n)).join('')}
   </nav>
 `;

 const menu = $('#menu');
 const navigation = $('#navigation');

 function setMenu(open) {
   navigation.classList.toggle('open', open);
   menu.setAttribute('aria-expanded', String(open));
 }

 menu.addEventListener('click', () => {
   setMenu(menu.getAttribute('aria-expanded') === 'false');
   if (menu.getAttribute('aria-expanded') === 'true') {
     navigation.querySelector('a').focus();
   }
 });

 $('#header').addEventListener('keydown', event => {
   if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
     setMenu(false);
     menu.focus();
   }
 });

 matchMedia('(max-width: 960px)').addEventListener('change', () => setMenu(false));

 const socialIcons = {
   Facebook: '<path d="M14 21v-8h3l.5-3H14V8c0-1 .4-2 2-2h2V3h-3c-2.5 0-4 1.5-4 4v3H8v3h3v8z" fill="currentColor" stroke="none"/>',
   YouTube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/>',
   Instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
   Email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>'
 };

 const socialLinks = () => `
   <ul class="social-links">
     ${[
       ['Facebook', D.social.facebook],
       ['Instagram', D.social.instagram],
       ['YouTube', D.social.youtube],
       ['Email', `mailto:${D.contact}`]
     ].filter(([, url]) => url).map(([label, url]) => `
       <li><a href="${esc(url)}">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.8" aria-hidden="true" focusable="false">
           ${socialIcons[label]}
         </svg>
         ${label}
       </a></li>`).join('')}
   </ul>`;

 /* FOOTER */

 $('#footer').innerHTML = `
   <div class="footer">

     <div class="footer-grid">

       <div>
         ${brand}

         <p class="muted small">
           Loyalty. Discipline. Ruthless pursuit.
         </p>

         <p class="muted small">
           Independent redesign demonstration.
           Not an official live store.
         </p>
       </div>

       <div>
         <h3>Explore</h3>

         ${[
           ['shop', 'Shop all'],
           ['athletes', 'Team Ruthless'],
           ['events', 'Fight Central'],
           ['about', 'Our story'],
           ['sponsorship', 'Sponsorship'],
           ['lorenzo-hunt-signing', 'Latest signing']
         ].map(([id, n]) => link(id, n)).join('')}
       </div>

       <div>
         <h3>Support</h3>

         ${[
           ['contact', 'Contact'],
           ['faq', 'FAQ'],
           ['shipping', 'Shipping'],
           ['returns', 'Returns'],
           ['cart', 'Your bag']
         ].map(([id, n]) => link(id, n)).join('')}
       </div>

       <div>
         <h3>Connect</h3>

         <a href="${esc(D.original)}"
            target="_blank"
            rel="noopener">
           Original website ↗
         </a>

         ${socialLinks()}

         ${link('privacy', 'Privacy')}
         ${link('terms', 'Terms')}

       </div>

     </div>

     <div class="footer-bottom">
       © ${new Date().getFullYear()} Ruthless Syndicate concept.
       Demo catalog; visual assets subject to approval.
       No affiliation or endorsement implied.
     </div>

   </div>
 `;

 save();

 /* SHARED PAGE COMPONENTS */

 const head = (
   title,
   sub = '',
   eyebrow = 'RUTHLESS SYNDICATE'
 ) => `
   <section class="pagehead">
     <div>
       <div class="eyebrow">${esc(eyebrow)}</div>
       <h1>${esc(title)}</h1>
       ${sub ? `<p>${esc(sub)}</p>` : ''}
     </div>
   </section>
 `;

 const sectionTitle = (small, title, url, label) => `
   <div class="section-top">

     <div>
       <div class="eyebrow">${esc(small)}</div>
       <h2>${esc(title)}</h2>
     </div>

     ${url
       ? `<a class="textlink" href="${esc(url)}">
            ${esc(label)} ↗
          </a>`
       : ''}

   </div>
 `;

 const prod = p => `
   <article class="card">

     <a class="product-img"
        href="product.html?id=${encodeURIComponent(p.id)}">

       ${productPhoto(p)}

       <span class="tag">${esc(p.tag)}</span>

     </a>

     <div class="card-body">

       <h3>
         <a href="product.html?id=${encodeURIComponent(p.id)}">
           ${esc(p.name)}
         </a>
       </h3>

       <div class="muted small">
         ${esc(p.color)} ·
         ${p.status === 'soldout'
           ? 'Sold out on source'
           : 'Catalog preview'}
       </div>

       <div class="product-foot">

         <span class="price">${money(p.price)}</span>

         <a class="textlink"
            href="product.html?id=${encodeURIComponent(p.id)}">
           View ↗
         </a>

       </div>

     </div>

   </article>
 `;

 const roster = a => `
   <article class="card">

     <a href="${href(a.id)}">

       ${portrait(a)}

       <div class="card-body">
         <h3>${esc(a.name)}</h3>
         <span class="textlink">Explore profile ↗</span>
       </div>

     </a>

   </article>
 `;

 const community = `
   <section class="newsletter">

     <div>

       <div class="eyebrow" style="color:#fff">
         THE NEXT GENERATION
       </div>

       <h2>Join the syndicate.</h2>

       <p>
         For athletes, partners and the community behind the brand.
       </p>

     </div>

     ${btn('sponsorship', 'Explore partnerships')}

   </section>
 `;

 const huntSigning = `
   <section class="signing-feature" aria-labelledby="latest-signing">
     <div class="section">
       <p class="eyebrow">Latest signing</p>
       <h2 id="latest-signing">Lorenzo “The Juggernaut” Hunt</h2>
       <p>The professional bare-knuckle boxer joins Team Ruthless.</p>
       <div class="actions">
         ${btn('lorenzo-hunt-signing', 'Read the announcement')}
         ${btn('lorenzo-hunt', 'Meet Lorenzo Hunt', true)}
       </div>
     </div>
   </section>
 `;

 /* HOMEPAGE */

 function home() {
   main.innerHTML = `

     <section class="hero">

       <div class="hero-content">

         <div class="eyebrow">
           Fight culture / Performance / Streetwear
         </div>

         <h1>
           BUILT FOR<br>
           THE <span>RUTHLESS.</span>
         </h1>

         <p>
           For the ones who show up, put in the work and
           refuse to settle. In the gym. In the cage. In life.
         </p>

         <div class="actions">

           ${btn('shop', 'Shop the collection')}

           ${btn('athletes', 'Meet the team', true)}

         </div>

       </div>

     </section>

     ${huntSigning}

     <div class="ticker">
       <span>LOYALTY</span>
       <span>DISCIPLINE</span>
       <span>RUTHLESS PURSUIT</span>
     </div>

     <section class="section">

       ${sectionTitle(
         '01 / The collection',
         'Gear up.',
         'shop.html',
         'Shop all apparel'
       )}

       <div class="grid">
         ${D.products.slice(0, 4).map(prod).join('')}
       </div>

     </section>

     <div class="brand-character">
       <img src="images/branding/ruthless-syndicate-character.webp"
            alt="Ruthless Syndicate’s illustrated fighter in a green flat cap and torn white shirt"
            width="1100" height="733" loading="lazy" decoding="async">
     </div>

     <section class="feature">

       <div class="feature-art" aria-hidden="true">
         <strong>RS.</strong>
       </div>

       <div class="feature-copy">

         <div class="eyebrow">
           02 / The fight community
         </div>

         <h2>
           More than<br>the cage.
         </h2>

         <p class="muted">
           Explore the Combat Zone 92 sponsorship in Fight Central
           and meet the athletes featured by Ruthless Syndicate.
         </p>

         <div class="actions">

           ${btn('events', 'Fight central')}

           ${btn('sponsorship', 'Sponsorships', true)}

         </div>

       </div>

     </section>

     <section class="section">

       ${sectionTitle(
         '03 / Team ruthless',
         'The roster.',
         'athletes.html',
         'Meet all athletes'
       )}

       <div class="grid three">
         ${D.athletes.map(roster).join('')}
       </div>

     </section>

     ${community}

     <section class="section follow-section" aria-labelledby="follow-heading">
       <h2 id="follow-heading">Follow the Syndicate</h2>
       <p>Follow the brand for apparel releases, athlete news, and event announcements.</p>
       ${socialLinks()}
     </section>

   `;
 }

 /* SHOP AND PRODUCT CATEGORIES */

 const shopTitles = {
   shop: 'Shop all',
   mens: 'Men’s apparel',
   womens: 'Women’s apparel',
   accessories: 'Accessories',
   'new-releases': 'New releases',
   clearance: 'Clearance',
   collections: 'Athlete collections'
 };

 function shop() {

   let list = page === 'shop'
     ? D.products
     : D.products.filter(p => p.categories.includes(page));

   main.innerHTML =

     head(
       shopTitles[page],
       'Explore the collection. Product photos, variants, pricing and stock require merchant approval.'
     ) +

     `<section class="section">

       <div class="filters">

         ${categories.map(([id, n]) => `
           <a href="${href(id)}"
              class="${page === id ? 'active' : ''}">
             ${esc(n)}
           </a>
         `).join('')}

       </div>

       <div class="toolbar">

         <input id="search"
                type="search"
                aria-label="Search products"
                placeholder="Search merchandise…">

         <select id="sort" aria-label="Sort products">

           <option value="default">Featured</option>
           <option value="low">Price: low to high</option>
           <option value="high">Price: high to low</option>
           <option value="name">Name: A to Z</option>

         </select>

       </div>

       <div id="result-count" class="muted small" role="status">
       </div>

       <div id="products"
            class="grid"
            style="margin-top:15px">
       </div>

       ${page === 'collections'
         ? `<div style="margin-top:45px">

              ${sectionTitle('Team RS', 'Explore the athletes')}

              <div class="grid three">
                ${D.athletes.map(roster).join('')}
              </div>

            </div>`
         : ''}

     </section>`;

   function render() {

     const q = $('#search').value.toLowerCase().trim();
     const sort = $('#sort').value;

     let items = list.filter(p =>
       `${p.name} ${p.color} ${p.tag}`.toLowerCase().includes(q)
     );

     if (sort === 'low') {
       items.sort((a, b) => a.price - b.price);
     }

     if (sort === 'high') {
       items.sort((a, b) => b.price - a.price);
     }

     if (sort === 'name') {
       items.sort((a, b) => a.name.localeCompare(b.name));
     }

     $('#result-count').textContent =
       `${items.length} demo product${items.length === 1 ? '' : 's'}`;

     $('#products').innerHTML = items.length

       ? items.map(prod).join('')

       : `<div class="empty">

            ${q
              ? 'No matching products.'
              : 'No confirmed listings in this category yet.'}

            <a class="textlink" href="shop.html">
              Browse all apparel ↗
            </a>

          </div>`;
   }

   $('#search').addEventListener('input', render);
   $('#sort').addEventListener('change', render);

   render();
 }

 /* INDIVIDUAL PRODUCT PAGE */

 function product() {

   const p = productBy(
     new URLSearchParams(location.search).get('id')
   );

   if (!p) {

     main.innerHTML =
       head('Product not found') +
       `<section class="section">
          ${btn('shop', 'Browse merchandise')}
        </section>`;

     return;
   }

   document.title = `${p.name} | Ruthless Syndicate`;

   main.innerHTML = `

     <section class="section">

       <p class="small muted">
         <a href="shop.html">Shop</a> / ${esc(p.name)}
       </p>

       <div class="split">

         <div class="detail-image">
           ${productPhoto(p)}
         </div>

         <div class="detail">

           <div class="eyebrow">${esc(p.tag)}</div>

           <h1>${esc(p.name)}</h1>

           <div class="price">${money(p.price)}</div>

           <p class="muted">${esc(p.description)}</p>

           <form id="add-form">

             <label for="size">Size (as listed by the store)</label>

             <select id="size" required>
               ${p.sizes.map(s => `
                 <option>${esc(s)}</option>
               `).join('')}
             </select>

             <label for="qty">Quantity</label>

             <input id="qty"
                    type="number"
                    min="1"
                    max="20"
                    value="1"
                    required>

             <div class="actions">

               <button class="btn full"
                       ${p.status === 'soldout' ? 'disabled' : ''}>

                 ${p.status === 'soldout'
                   ? 'Sold out on source'
                   : 'Add to demo bag'}

               </button>

             </div>

           </form>

           <div class="notice">
             Demo only. No stock is reserved and no order
             can be placed. Prices are snapshots, not live offers.
           </div>

           <a class="textlink"
              href="${esc(p.source)}"
              target="_blank"
              rel="noopener">
             See photos, current availability, and purchase options ↗
           </a>

           ${p.athlete
             ? `<p>${btn(p.athlete, 'Meet the athlete', true)}</p>`
             : ''}

         </div>

       </div>

     </section>

     <section class="section">

       ${sectionTitle(
         'More gear',
         'Explore the collection'
       )}

       <div class="grid">

         ${D.products
           .filter(x => x.id !== p.id)
           .map(prod)
           .join('')}

       </div>

     </section>

   `;

   $('#add-form').addEventListener('submit', e => {

     e.preventDefault();

     if (p.status === 'soldout') return;

     const size = $('#size').value;
     const qty = Number($('#qty').value);

     if (
       !p.sizes.includes(size) ||
       !Number.isInteger(qty) ||
       qty < 1 ||
       qty > 20
     ) return;

     let item = bag.find(i =>
       i.id === p.id && i.size === size
     );

     if (item && item.qty + qty > 20) {
       toast('Maximum 20 per size in the demo bag.');
       return;
     }

     if (item) {
       item.qty += qty;
     } else {
       bag.push({
         id: p.id,
         size,
         qty
       });
     }

     save();

     toast('Added to your demo bag.');

   });
 }

 /* SHOPPING CART */

 function cart() {

   main.innerHTML =

     head(
       'Your bag',
       'Review your sample order. No payments or orders are processed.'
     ) +

     `<section class="section" id="cart-content"></section>`;

   function render() {

     const c = $('#cart-content');

     if (!bag.length) {

       c.innerHTML = `

         <div class="empty">

           Your bag is empty.

           <div class="actions">
             ${btn('shop', 'Explore the shop')}
           </div>

         </div>

       `;

       return;
     }

     c.innerHTML = `

       <div class="split">

         <div>

           ${bag.map((i, n) => {

             const p = productBy(i.id);

             return `

               <article class="cart-row">

                 ${productPhoto(p)}

                 <div>

                   <strong>${esc(p.name)}</strong>

                   <div class="muted small">
                     Size ${esc(i.size)}
                   </div>

                   <button class="plain remove"
                           data-i="${n}">
                     Remove
                   </button>

                 </div>

                 <input class="quantity"
                        data-i="${n}"
                        aria-label="Quantity for ${esc(p.name)} size ${esc(i.size)}"
                        type="number"
                        min="1"
                        max="20"
                        value="${i.qty}">

                 <strong class="row-total">
                   ${money(p.price * i.qty)}
                 </strong>

               </article>

             `;

           }).join('')}

         </div>

         <aside class="summary">

           <h2>Order summary</h2>

           <div class="summary-line">

             <span>Subtotal</span>

             <strong>${money(sum())}</strong>

           </div>

           <p class="muted small">
             Shipping and taxes not calculated in this prototype.
           </p>

           ${btn('checkout', 'Demo checkout')}

           <p>${link('shop', 'Continue shopping')}</p>

         </aside>

       </div>

     `;

     $$('.remove', c).forEach(b => {

       b.addEventListener('click', () => {

         bag.splice(Number(b.dataset.i), 1);
         save();
         render();

       });

     });

     $$('.quantity', c).forEach(b => {

       b.addEventListener('change', () => {

         const idx = Number(b.dataset.i);
         const n = Number(b.value);

         if (Number.isInteger(n) && n >= 1 && n <= 20) {
           bag[idx].qty = n;
         }

         save();
         render();

       });

     });

   }

   render();
 }

 /* DEMONSTRATION CHECKOUT */

 function checkout() {

   main.innerHTML =

     head(
       'Demo checkout',
       'A preview of the purchase flow. No personal or financial information is collected.'
     ) +

     `<section class="section">

       <div class="summary"
            style="max-width:650px;margin:auto">

         <h2>
           ${bag.length
             ? 'Review your demo order'
             : 'Your bag is empty'}
         </h2>

         ${bag.map(i => `

           <div class="summary-line">

             <span>
               ${esc(productBy(i.id).name)}
               · ${esc(i.size)} × ${i.qty}
             </span>

             <strong>
               ${money(productBy(i.id).price * i.qty)}
             </strong>

           </div>

         `).join('')}

         <div class="summary-line">

           <strong>Subtotal</strong>

           <strong>${money(sum())}</strong>

         </div>

         <div class="notice">
           Live checkout is intentionally disabled.
           A merchant-owned Square or Shopify checkout
           will replace this screen after approval.
         </div>

         ${bag.length

           ? `<button class="btn full" id="mock-order">
                Complete demo (no charge)
              </button>`

           : btn('shop', 'Return to shop')}

         <div id="checkout-result" role="status"></div>

       </div>

     </section>`;

   $('#mock-order')?.addEventListener('click', () => {

     $('#checkout-result').textContent =
       'Demo complete. No order was submitted and no money was charged.';

     $('#mock-order').disabled = true;

     bag = [];

     save();

   });
 }

 /* ATHLETE ROSTER */

 function athletes() {

   main.innerHTML =

     head(
       'Team Ruthless',
       'The athletes featured by the brand, across combat sports and basketball.'
     ) +

     huntSigning + `<section class="section">

       <div class="grid three">

         ${D.athletes.map(roster).join('')}

       </div>

     </section>

     ${community}`;

 }

 /* INDIVIDUAL ATHLETE PROFILES */

 function profile(a) {

   const gear = D.products.filter(p => p.athlete === a.id);

   main.innerHTML =

     head(
       a.name,
       a.sport,
       'TEAM RUTHLESS / ATHLETE PROFILE'
     ) +

     `<section class="section">

       <div class="split">

         ${portrait(a, true)}

         <div class="detail">

           <div class="eyebrow">The athlete</div>

           <h2>${esc(a.alias)}</h2>

           <p>${esc(a.bio)}</p>


           <div class="actions">

             ${btn('athletes', 'Back to roster', true)}

             ${gear.length ? '<a class="btn" href="#athlete-gear">Signature merchandise</a>' : ''}

           </div>

         </div>

       </div>

     </section>

     ${gear.length ? `
       <section class="section" id="athlete-gear">
         <h2>Signature merchandise</h2>
         <div class="grid">${gear.map(prod).join('')}</div>
       </section>
     ` : ''}

     ${community}`;

 }

 /* FIGHT CENTRAL AND EVENTS */

 function events() {

   const today = new Date().toISOString().slice(0, 10);

   const sort = (a, b) => (a.date ?? '9999').localeCompare(b.date ?? '9999');

   const cards = list => list.length

     ? list.map(e => `

       <article class="event">

         ${e.image
           ? photo(e.image, e.title, '', 'event-photo')
           : ''}

         ${e.date ? `<time class="eyebrow" datetime="${esc(e.date)}">

           ${esc(
             new Date(e.date + 'T12:00:00Z')
               .toLocaleDateString('en-US', {
                 dateStyle: 'long',
                 timeZone: 'UTC'
               })
           )}

         </time>` : '<p class="eyebrow">Date to be announced</p>'}

         <h3>${esc(e.title)}</h3>

         <div class="muted">${esc(e.location)}</div>

         <p>${esc(e.description)}</p>
         ${e.doors && e.start ? `<p>Doors ${esc(e.doors)} · Fights ${esc(e.start)} (local time)</p>` : ''}

         <a class="textlink"
            href="${esc(e.source)}"
            target="_blank"
            rel="noopener">
           ${esc(e.sourceLabel)} ↗
         </a>

       </article>

     `).join('')

     : `<div class="empty">
          No verified upcoming events in the demo.
          Check the original website or promoter
          for current schedules.
        </div>`;

   main.innerHTML =

     head(
       'Fight Central',
       'Event announcements, sponsorships and the fight community.'
     ) +

     `<section class="section">

       ${sectionTitle('On the calendar', 'Upcoming events')}

       ${cards(
         D.events
           .filter(e => !e.date || e.date >= today)
           .sort(sort)
       )}

       <div style="margin-top:50px">

         ${sectionTitle('The archive', 'Past events')}

         ${cards(
           D.events
             .filter(e => e.date && e.date < today)
             .sort((a, b) => sort(b, a))
         )}

       </div>

     </section>`;

 }

 /* COMPANY STORY AND LEADERSHIP */

 function about() {

   main.innerHTML =

     head(
       'Meet the Syndicate',
       'The leadership and athletes behind Ruthless Syndicate.'
     ) +

     `<section class="section">

       <div class="copy">

         <div class="eyebrow">The standard</div>

         <h2>More than apparel.</h2>

         <p>
           Ruthless Syndicate connects combat sports,
           training and everyday streetwear around
           a shared culture of consistency and dedication.
         </p>

         <p>
           <a class="textlink" href="athletes.html">Explore the athlete roster ↗</a>
         </p>

       </div>

     </section>

     <section class="section">

       <h2>Leadership</h2>

       <div class="grid">

         ${D.leadership.map(({name, role, bio, image}) => `

           <article class="card">

             <div class="athlete-art">

               ${image ? photo(image, '', '', 'portrait-photo') : ''}

               <strong aria-hidden="true">

                 ${esc(
                   name
                     .split(' ')
                     .map(n => n[0])
                     .join('')
                 )}

               </strong>

             </div>

             <div class="card-body">

               <h3>${esc(name)}</h3>

               <p class="muted small">
                 ${esc(role)}
               </p>
               <p>${esc(bio)}</p>

             </div>

           </article>

         `).join('')}

       </div>

     </section>

     ${community}`;

 }

 /* SPONSORSHIP APPLICATION */

 function sponsorship() {

   main.innerHTML =

     head(
       'Sponsorships & partnerships',
       'Explore the brand’s involvement in combat sports and its athlete community.'
     ) +

     `<section class="section">

       <div class="grid partnership-grid">
         <article class="card card-body">
           <h2>Combat Zone MMA</h2>
           <p>Ruthless Syndicate announced a platinum sponsorship for Combat Zone’s 2026 season at SNHU Arena in Manchester, New Hampshire.</p>
           <p><a class="textlink" href="${esc(D.sponsorshipSource)}">Read the sponsorship announcement ↗</a></p>
           ${btn('events', 'Explore Fight Central', true)}
         </article>
         <article class="card card-body">
           <h2>Athlete collaborations</h2>
           <p>Explore Team Ruthless, the signing of Lorenzo “The Juggernaut” Hunt, and the Steven “Ninja” Nguyen apparel edition.</p>
           <p><a class="textlink" href="lorenzo-hunt.html#hunt-inquiries">Inquire about Lorenzo Hunt ↗</a></p>
           <div class="actions">
             ${btn('athletes', 'Meet the athletes', true)}
             ${btn('collections', 'Browse athlete editions', true)}
           </div>
         </article>
       </div>

       <div class="form">
         <h2>Demo sponsorship application</h2>

         <div class="notice">

           This form is a local-only demonstration.
           Use fictional information.
           Nothing is sent or stored.

         </div>

         <form id="sponsor-form">

           <div class="fieldrow">

             <div>

               <label for="first">First name</label>

               <input id="first"
                      required
                      placeholder="Sample first name">

             </div>

             <div>

               <label for="last">Last name</label>

               <input id="last"
                      required
                      placeholder="Sample last name">

             </div>

           </div>

           <label for="email">Email</label>

           <input id="email"
                  type="email"
                  placeholder="demo@example.com"
                  required>

           <label for="sport">Sport</label>

           <select id="sport" required>

             <option value="">Select a sport</option>
             <option>MMA</option>
             <option>Boxing</option>
             <option>Bare-knuckle boxing</option>
             <option>Weightlifting</option>
             <option>Basketball</option>
             <option>Other</option>

           </select>

           <label for="social">
             Social profile (optional)
           </label>

           <input id="social"
                  type="url"
                  placeholder="https://example.com/profile">

           <label for="bio">
             Tell us about your goals
           </label>

           <textarea id="bio"
                     required
                     placeholder="Sample achievements and reasons for applying">
           </textarea>

           <div class="actions">

             <button class="btn">
               Preview application submission
             </button>

           </div>

         </form>

         <p id="form-result" role="status"></p>

       </div>

     </section>`;

   $('#sponsor-form').addEventListener('submit', e => {

     e.preventDefault();

     $('#form-result').textContent =
       'Demo complete. Your application was not stored or sent.';

     e.target.reset();

   });

 }

 /* CONTACT PAGE */

 function contact() {

   main.innerHTML =

     head(
       'Contact',
       'Get in touch with the brand through its official channels.'
     ) +

     `<section class="section copy">

       <h2>General inquiries</h2>

       <p>
         For actual inquiries or orders, use the original
         Ruthless Syndicate website. This redesign is not
         a live support channel.
       </p>

       <p>

         <a href="mailto:${esc(D.contact)}">
           ${esc(D.contact)}
         </a>

       </p>

       <p>

         <a href="${esc(D.original)}"
            target="_blank"
            rel="noopener">
           Visit the original website ↗
         </a>

       </p>

       ${socialLinks()}

       <h2>Athlete partnerships</h2>

       <p>

         ${btn(
           'sponsorship',
           'Explore the demo application'
         )}

       </p>

     </section>`;

 }

 /* WEBSITE POLICIES */

 const policies = {

   shipping: [

     'Shipping',

     'Shipping rates, destinations, carriers and fulfillment timeframes will be supplied by Ruthless Syndicate. No products are shipped from this demo.'

   ],

   returns: [

     'Returns',

     'The merchant must approve its return window, eligible products, refund process and exchange terms before launch. No returns or refunds are processed here.'

   ],

   privacy: [

     'Privacy',

     'This prototype stores only demo cart product IDs, sizes and quantities in your browser’s local storage. The sponsorship form is not submitted or saved. A production privacy notice and tracking consent review are required before launch.'

   ],

   terms: [

     'Terms of service',

     'This is an independent website redesign concept, not an official store. Illustrations, proposed features and sample variants are for demonstration only. No purchases, contractual transactions or applications are accepted. Production terms must be approved by the merchant.'

   ]

 };

 function policy() {

   const [title, body] = policies[page];

   main.innerHTML =

     head(title, 'Prototype policy page') +

     `<section class="section copy">

       <div class="notice">
         Not the company’s approved policy.
       </div>

       <p>${esc(body)}</p>

       <p>

         For current official information, visit

         <a href="${esc(D.original)}">
           RuthlessSyndicate.com
         </a>.

       </p>

       ${btn('contact', 'Contact')}

     </section>`;

 }

 /* FREQUENTLY ASKED QUESTIONS */

 function faq() {

   const qs = [

     [
       'Can I buy merchandise here?',
       'No. This is an unofficial concept with a simulated shopping bag and checkout. Use the original website for actual purchases.'
     ],

     [
       'Are the prices and stock current?',
       'The sample prices come from publicly listed products. Prices, sizes, photographs and inventory must be verified before launch.'
     ],

     [
       'Where can I see upcoming fights?',
       'Visit Fight Central for events included in the demonstration. Check the official promoter for live schedules.'
     ],

     [
       'How can I apply for sponsorship?',
       'The sponsorship page previews a proposed application workflow; it does not submit information. Contact the brand through its official channels.'
     ]

   ];

   main.innerHTML =

     head('Frequently asked questions') +

     `<section class="section copy">

       ${qs.map(([q, a]) => `

         <details>

           <summary>${esc(q)}</summary>

           <p class="muted">${esc(a)}</p>

         </details>

       `).join('')}

     </section>`;

 }

 /* PAGE ROUTING */

 if (page === 'index') {

   home();

 } else if (Object.hasOwn(shopTitles, page)) {

   shop();

 } else if (page === 'product') {

   product();

 } else if (page === 'cart') {

   cart();

 } else if (page === 'checkout') {

   checkout();

 } else if (page === 'athletes') {

   athletes();

 } else if (page === 'lorenzo-hunt' || page === 'lorenzo-hunt-signing') {

   // The athlete profile and announcement have static content.

 } else if (athleteBy(page)) {

   profile(athleteBy(page));

 } else if (page === 'events') {

   events();

 } else if (page === 'about') {

   about();

 } else if (page === 'sponsorship') {

   sponsorship();

 } else if (page === 'contact') {

   contact();

 } else if (page === 'faq') {

   faq();

 } else if (Object.hasOwn(policies, page)) {

   policy();

 } else {

   main.innerHTML =

     head(
       'Page not found',
       'The page you are looking for is not here.'
     ) +

     `<section class="section">

       ${btn('index', 'Back to home')}

     </section>`;

 }

})();

/* END OF FILE: js/site.js
   Next required replacement: css/style.css
*/
