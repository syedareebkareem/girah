# CROCHET SHOP — FULL PROJECT CONTEXT

> A complete reference for a fresh Claude/context session. Read everything here before touching code.
> **FRONTEND ONLY.** No backend, no API, no auth. All data is static in `src/data/products.js`; all state persists in `localStorage`.

---

## WHAT WE ARE MAKING

A **fully client-side React e-commerce storefront** for a fictional handmade crochet brand called **CrochetShop**. It simulates a real shop: browse by category, search, filter, sort, paginate, wishlist, quick-view, product detail with reviews, cart (sidebar + page), 3-step checkout with full validation, order confirmation, account page with order history.

Because there is no backend, "checkout" does **not** process real payments — it validates a (fake) card, records the order into `localStorage`, and shows a confirmation. Everything resets on a fresh browser.

### Core Philosophy
- **Purely frontend** — user must be aware nothing is wired to a server.
- **Visual identity = "warm artisan maker"** — cream background, terracotta/rust accents, deep ink text, pine-green highlights, serif display headings (Fraunces) + humanist sans body (Manrope) + monospace accents (IBM Plex Mono). This identity was set in a recent redesign and is the foundation for the upcoming beautification phase.
- **Guard rails for the assistant**: never change `src/data/products.js` structure, `context/*` API shapes, or the `localStorage` keys (`cart`, `wishlist`, `reviews`, `orders`), because those are the stable contract of the app. Visual changes are welcome and expected.

---

## HOW TO RUN

```bash
npm install
npm run dev        # Vite dev server (hot reload)
npm run build      # production build -> dist/
npm run preview    # serve the production build
npm run lint       # oxlint (11 warnings, 0 errors currently)
```

- Node project, Vite 8, React 19, React Router 7, Tailwind CSS 4.
- Deployed on **Vercel** (git-import, auto-deploy on push). `vercel.json` rewrites all routes to `index.html` for SPA deep-linking.
- GitHub repo: `syedareebkareem/girah` (public), branch `main`.

---

## FOLDER STRUCTURE

```
crochet-shop/
├── index.html                  # HTML shell; loads fonts + mounts #root
├── package.json                # deps & scripts
├── vite.config.js              # Vite config (react plugin)
├── postcss.config.js           # Tailwind 4 postcss plugin
├── tailwind.config.js          # Tailwind theme (colors + fonts)
├── vercel.json                 # SPA rewrite for Vercel
├── .gitignore                  # node_modules, dist
├── README.md
├── TESTING.md                  # manual QA test guide
├── context.md                  # <-- this file
└── src/
    ├── main.jsx                # entry; mounts App, imports globals.css + index.css
    ├── App.jsx                 # providers + Router + routes (+ lazy code-split pages)
    ├── App.css                 # DEAD — unused, nothing imports it (beautify candidate)
    ├── index.css               # GLOBAL STYLE SHEET — most visual rules
    ├── styles/globals.css      # Tailwind directives + base body + scrollbar + toast class
    ├── asset/hero.png, react.svg, vite.svg
    ├── data/products.js        # PRODUCTS[] (17) + CATEGORIES[] (5) — static catalog
    ├── utils/validation.js     # zod checkoutSchema
    ├── context/
    │   ├── CartContext.jsx     # cart items + toast notifications
    │   ├── OrderContext.jsx    # placed orders history
    │   ├── SearchContext.jsx   # search query + results
    │   ├── FilterContext.jsx   # (unused) filter state — NOT wired into App
    │   ├── WishlistContext.jsx # wishlist items
    │   └── ReviewContext.jsx   # per-product user reviews
    ├── components/
    │   ├── cart/CartSidebar.jsx    # slide-in cart drawer from header
    │   ├── common/Header.jsx       # sticky header: logo, nav, icons
    │   ├── common/MobileMenu.jsx   # slide-in mobile nav drawer
    │   ├── common/SearchAutocomplete.jsx # header search with live suggestions
    │   ├── common/Footer.jsx       # footer (Shop/Help/Newsletter)
    │   ├── common/Toast.jsx        # toast notification (inline styled)
    │   ├── common/Breadcrumbs.jsx
    │   ├── common/Pagination.jsx
    │   ├── common/QuantitySelector.jsx
    │   ├── common/ChainDivider.jsx # SVG wave divider — CREATED BUT NOT YET USED (beautify hook)
    │   ├── common/ErrorBoundary.jsx# class-based error catch-all
    │   └── products/
    │       ├── ProductCard.jsx     # grid card: image, wishlist, quick-view, info, add-to-cart
    │       ├── QuickViewModal.jsx  # modal from card hover
    │       ├── ReviewSection.jsx   # rating summary + write-a-review form
    │       ├── ProductFilters.jsx  # sidebar filter controls (category/price/stock)
    │       └── ImageGallery.jsx    # main image + thumbnails + lightbox
    └── pages/
        ├── Home.jsx            # hero, categories, new arrivals, trust section
        ├── Shop.jsx            # filter + sort + paginate grid
        ├── ProductDetail.jsx   # gallery, info, add-to-cart, reviews, related
        ├── Cart.jsx            # line items + order summary
        ├── SearchResults.jsx   # results grid from search
        ├── About.jsx           # static marketing page
        ├── Contact.jsx         # contact form + info + FAQ
        ├── Checkout.jsx        # 3-step checkout (shipping→payment→review)
        ├── OrderConfirmation.jsx # post-order "success" page
        ├── Wishlist.jsx        # saved items grid
        ├── Account.jsx         # order history + counts
        └── NotFound.jsx        # 404
```

---

## DEPENDENCIES (package.json)

### dependencies
- `react` ^19.2.8, `react-dom` ^19.2.8
- `react-router-dom` ^7.18.3 — routing
- `react-hook-form` ^7.86.0 — forms
- `@hookform/resolvers` ^5.9.1 — zod integration
- `zod` ^3.25.76 — schema validation
- `axios` ^1.20.0 — **installed but unused** (no API calls)
- `@tailwindcss/postcss` ^4.3.3

### devDependencies
- `vite` ^8.2.2, `@vitejs/plugin-react` ^6.1.0
- `tailwindcss` ^4.3.3, `postcss` ^8.5.26, `autoprefixer` ^10.5.4
- `oxlint` ^1.79.0 (linter)
- `@types/react`, `@types/react-dom`

---

## ROUTING (src/App.jsx)

Providers (outer→inner): `ErrorBoundary → CartProvider → OrderProvider → SearchProvider → WishlistProvider → ReviewProvider → Router`.

| Route | Lazy page |
|-------|-----------|
| `/` | Home (eager) |
| `/shop` | Shop |
| `/product/:id` | ProductDetail |
| `/cart` | Cart |
| `/search` | SearchResults |
| `/about` | About |
| `/contact` | Contact |
| `/checkout` | Checkout |
| `/order-confirmation/:orderId` | OrderConfirmation |
| `/wishlist` | Wishlist |
| `/account` | Account |
| `*` | NotFound |

All pages except Home are lazy-loaded (`React.lazy`) with a `PageLoader` spinner fallback.

---

## STATE MANAGEMENT (Contexts)

- **CartContext** (`localStorage: "cart"`) — `cartItems`, `addToCart`, `removeFromCart`, `updateQuantity`, `getTotalPrice`, `getTotalItems`, plus toast state (`showToast`, `toastMessage`, `toastType`, `showToastMessage`). **Note:** toast is owned by CartContext, so any component calling `showToastMessage` must be under CartProvider (it is).
- **OrderContext** (`localStorage: "orders"`) — `orders`, `currentOrder`, `createOrder`.
- **SearchContext** — `searchQuery`, `searchResults`, `performSearch`, `clearSearch` (in-memory, not persisted).
- **WishlistContext** (`localStorage: "wishlist"`) — `wishlistItems`, `toggleWishlist`, `isInWishlist`, `removeFromWishlist`.
- **ReviewContext** (`localStorage: "reviews"`) — per-product reviews; `addReview(productId, review)`, `getReviews(productId)`.
- **FilterContext** — defined but **NOT used** in App.jsx and not referenced by components. Shop.jsx manages filters locally. Dead-ish; beautification could clean it up.

---

## ⭐ VISUAL / STYLE SYSTEM — READ THIS BEFORE BEAUTIFYING ⭐

The next phase is **beautification**. Everything visual lives in three categories. **This is the key map.**

### 1. THE DESIGN TOKEN SOURCE OF TRUTH — `src/index.css` `:root`

Single palette + legacy aliases. **Change tokens here to re-theme the whole app instantly** (unless a component has hard-coded inline colors — see the inline-style hazard below).

```css
:root {
  --cream:       #FBF3E7;   /* page background */
  --cream-dark:  #F3E8D7;   /* section tint / off-white */
  --ink:         #2B2118;   /* headings / primary text / footer bg */
  --rust:        #C4592E;   /* PRIMARY brand accent (buttons, prices) */
  --rust-dark:   #A8471F;
  --pine:        #3A5A40;   /* secondary green (secondary buttons, trust bg) */
  --pine-dark:   #2C4531;
  --mustard:     #E3A857;   /* rating stars / made-to-order */
  --blush:       #E8B4B8;   /* wishlist hover */
  --border-light:#E4D5BF;
  /* legacy aliases (components still using old names resolve here) */
  --primary: var(--rust);  --primary-dark: var(--rust-dark);
  --accent: var(--pine);   --text-dark: var(--ink);
  --text-light:#8A7A66;    --bg-off: var(--cream-dark);
}
```

### 2. FILES THAT CONTROL THE VISUALS (best → worst place to edit)

| File | What it styles | Beautification priority |
|------|----------------|-------------------------|
| `src/index.css` | **ALL global design**: grid utils, flex/text/color/padding/margin utility classes, `.btn`/`.btn-primary`/`.btn-secondary` (pill buttons), `.container`, `.card`, `.header`/`.nav`/`.logo`/`.icon-btn`/`.cart-badge`, `.footer`, `.hero`, `.section`, `.product-card` family (image, badge, wishlist, title, rating, price, status, Add-to-Cart button), `.trust-section`, `.yarn-tag`, `.mobile-only`, responsive breakpoints, quick-view reveal. | ⭐ PRIMARY — use CSS classes here for global chrome |
| `src/styles/globals.css` | Tailwind directives, base `body` bg/color/font, scrollbar styling, `.toast` classes (success/error). | secondary |
| `index.html` | **Font loading** (Google Fonts: Fraunces, Manrope, IBM Plex Mono) + `<title>`. Change fonts here. | secondary |
| `tailwind.config.js` | Tailwind theme tokens (colors + `display`/`sans`/`mono` fonts). | only if using Tailwind classes |
| `src/components/**` + `src/pages/**` | Each has **inline `style={{...}}` objects** for most of their look (see hazard below). | ⭐ where page/component-specific layouts live |

### 3. THE INLINE-STYLE HAZARD (critical for beautification)

**Most components style themselves with inline `style={{...}}` objects, not CSS classes.** So `index.css` changes will NOT always take effect. Inline styles override the stylesheet. If you want to re-theme a component, you must edit it directly.

The CSS classes in `index.css` are mainly used by: Header, Footer, Home (hero/sections/trust), ProductCard, Shop layout. Pages like **Checkout, Cart, Contact, About, Account, OrderConfirmation, Wishlist, ProductDetail, SearchResults, NotFound, and all modals/sidebars** rely predominantly on **inline styles with hard-coded hex colors**, many of which still reference the **OLD palette**:

- Old `#B8C5B5` (sage) and `#F8F8F7`/`#2D2D2D`/`#999999`/`#D9D9D9` / `#E74C3C` / `#27AE60` / `#F39C12` / `#FFD700` still appear in many component files and **look off-brand** compared to the new cream/rust/pine theme.

**Files still using old hard-coded hex colors (big beautification targets):**
- `Checkout.jsx`, `Cart.jsx`, `Contact.jsx`, `About.jsx`, `Account.jsx`, `OrderConfirmation.jsx`, `Wishlist.jsx`, `NotFound.jsx`, `SearchResults.jsx`, `ProductDetail.jsx` (buttons/stock pill), `ImageGallery.jsx`, `ProductFilters.jsx`, `CartSidebar.jsx`, `MobileMenu.jsx`, `SearchAutocomplete.jsx`, `QuickViewModal.jsx`, `ReviewSection.jsx`, `ErrorBoundary.jsx`, `Pagination.jsx`, `QuantitySelector.jsx`, `Breadcrumbs.jsx`.

**Recommendation for the beautify pass:** consolidate these inline hex values to the CSS variables (e.g. `var(--rust)`, `var(--ink)`, `var(--cream-dark)`, `var(--mustard)`) or give components class hooks, so future theming is centralized.

### 4. READY-TO-USE BEAUTIFY RESOURCES (defined but not yet deployed)

- **`.yarn-tag`** class in `index.css` — a cute "yarn skein tag" label (dashed pine border, mono font). Defined but **used nowhere** yet. Good for category labels / product badges.
- **`ChainDivider.jsx`** — an SVG sine-wave "crochet chain" divider (default color `#C4592E`, background `#FBF3E7`). Created but **NOT imported/used anywhere**. Great for section dividers on Home, About, etc.
- **`.card` / `.product-card`** shadows and hover lifts are already set up; pages that hand-roll cards don't use them yet.

---

## KNOWN GAPS / THINGS TO FIX

1. **Old palette bleeding**: many components (see inline-style hazard) still use pre-redesign hex colors — inconsistent with new theme. Highest-value beautify work.
2. **`OrderConfirmation.jsx`** has a bug: `useEffect` calls `window.location.reload()` after clearing localStorage cart — it forces a full page reload on mount every time. Also destructures `cartItems` from `useCart` unused (lint warns). Should be refactored to clear cart without reloading.
3. **`Shop.jsx` uses `window.innerWidth` during render** (line 93) to toggle mobile filters — SSR/asterisk anti-pattern, causes lint warning; better to toggle with CSS `@media` or the `.mobile-filter-toggle` class (its button is `display:none` and never becomes visible — the mobile filter toggle is effectively broken).
4. **`FilterContext.jsx` is dead code** — not mounted, not used. Clean up or wire in.
5. **`SearchAutocomplete.jsx`** uses `onBlur` + `setTimeout` which can leave the dropdown open; minor UX.
6. **`axios`, `App.css`, `src/assets/*` (react.svg, vite.svg)** are unused leftovers (build doesn't include them; axios is a dead dep).
7. **`public/images/products/a.jpg`** is committed but not referenced anywhere.
8. **Footer/About/Contact links** are mostly `href="#"` placeholders (no real social/FAQ pages). Newsletter subscribe button does nothing (just visually there).
9. **`ProductDetail.jsx` `♡` wishlist button** on the right of Add-to-Cart is **non-functional** (no onClick) — it does not toggle wishlist, unlike the card's wishlist. Uses old `#B8C5B5`.
10. **Lint = 11 warnings, 0 errors.** Warnings: `window.innerWidth` in render (Shop), unused `cartItems` (OrderConfirmation), React Compiler memoization notes on `useForm`/`watch`.
11. **Footer** is styled dark (`--ink` bg) but its inner `<h3>/<a>` text colors are still hard-coded `#2D2D2D`/`#999999` from the old theme — text may be low-contrast on the dark footer. Verify visually.
12. **`globals.css` `.toast.*` classes are effectively unused** — `Toast.jsx` hard-codes its colors inline (already updated to new palette). Can consolidate.

---

## RECOMMENDED NEXT STEPS (beautification, per user)

1. **Standardize palette**: sweep all components replacing old hex (`#B8C5B5`, `#F8F8F7`, `#2D2D2D`, `#999999`, `#D9D9D9`, `#E74C3C`, `#27AE60`, `#F39C12`, `#FFD700`) with the new CSS vars or new-token hex. Dashboard of affected files in the inline-style hazard section.
2. **Introduce design-system components** so pages stop hand-rolling: a shared `Button`, `Input`, `Card`, `Section`, `PageHeader` — pull from `.btn`/`.card`/`.product-card` patterns.
3. **Deploy `.yarn-tag`** and **`ChainDivider`** on Home/About for brand flavor.
4. **Fix mobile filter toggle** in Shop (currently hidden/broken).
5. **Refactor OrderConfirmation reload bug** and wire the `♡` button on ProductDetail.
6. **Clean dead code**: FilterContext, axios, App.css, unused assets.
7. **Brand interior pages** (Checkout/Cart/Contact/About/Account/OrderConfirmation/NotFound) to match the new artisan theme.

---

## QUICK FILE-ROLE CHEAT SHEET

- **`App.jsx`** — providers + router + lazy pages. Don't break the provider nesting or localStorage-backed contexts.
- **`Header.jsx`** — desktop nav + icon buttons (search toggle, account, wishlist w/ badge, cart w/ badge) + mobile menu drawer + search panel.
- **`ProductCard.jsx`** — the reusable product tile (uses `.product-card` classes + inline for wishlist/quick-view).
- **`Shop.jsx`** — local filter/sort/pagination logic (does NOT use FilterContext).
- **`ProductDetail.jsx`** — gallery + info + reviews + related. Note `images = [product.image × 4]` (same image 4x, no real gallery).
- **`Checkout.jsx`** — 3-step form, react-hook-form + zod, shipping cost watch, creates order on step 3.
- **`OrderConfirmation.jsx`** — reads order by `:orderId`, clears cart with a reload bug (see gaps).
- **`CartContext.jsx`** — distinct from everything else: also owns toast.

---

## FULL SOURCE CODE (current, accurate)

Listed below for each file. This is current as of commit `7865b3d` (redesign applied).

### index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <title>CrochetShop — Handmade with Heart</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### package.json
```json
{
  "name": "crochet-shop",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": { "dev": "vite", "build": "vite build", "lint": "oxlint", "preview": "vite preview" },
  "dependencies": {
    "@hookform/resolvers": "^5.9.1",
    "@tailwindcss/postcss": "^4.3.3",
    "axios": "^1.20.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-hook-form": "^7.86.0",
    "react-router-dom": "^7.18.3",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "autoprefixer": "^10.5.4",
    "oxlint": "^1.79.0",
    "postcss": "^8.5.26",
    "tailwindcss": "^4.3.3",
    "vite": "^8.2.2"
  }
}
```

### vite.config.js
```js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
export default defineConfig({ plugins: [react()] })
```

### postcss.config.js
```js
export default { plugins: { '@tailwindcss/postcss': {} } }
```

### tailwind.config.js
```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#FBF3E7', 'cream-dark': '#F3E8D7', ink: '#2B2118',
        rust: '#C4592E', 'rust-dark': '#A8471F',
        pine: '#3A5A40', 'pine-dark': '#2C4531',
        mustard: '#E3A857', blush: '#E8B4B8',
      },
      fontFamily: { display: ['Fraunces','serif'], sans: ['Manrope','sans-serif'], mono: ['"IBM Plex Mono"','monospace'] },
    },
  },
  plugins: [],
}
```

### vercel.json
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### src/main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>,
)
```

### src/App.jsx
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import { SearchProvider } from './context/SearchContext'
import { WishlistProvider } from './context/WishlistContext'
import { ReviewProvider } from './context/ReviewContext'
import ErrorBoundary from './components/common/ErrorBoundary'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Toast from './components/common/Toast'
import Home from './pages/Home'

const Shop = lazy(() => import('./pages/Shop'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const SearchResults = lazy(() => import('./pages/SearchResults'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Account = lazy(() => import('./pages/Account'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: '4px solid #F0F0F0', borderTop: '4px solid #B8C5B5', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <CartProvider><OrderProvider><SearchProvider><WishlistProvider><ReviewProvider>
        <Router>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
            <Header />
            <main style={{ flexGrow: 1 }}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <Toast />
          </div>
        </Router>
      </ReviewProvider></WishlistProvider></SearchProvider></OrderProvider></CartProvider>
    </ErrorBoundary>
  )
}
export default App
```

### src/index.css (full, current)
```css
:root {
  --cream: #FBF3E7; --cream-dark: #F3E8D7; --ink: #2B2118;
  --rust: #C4592E; --rust-dark: #A8471F; --pine: #3A5A40; --pine-dark: #2C4531;
  --mustard: #E3A857; --blush: #E8B4B8; --border-light: #E4D5BF;
  --primary: var(--rust); --primary-dark: var(--rust-dark); --accent: var(--pine);
  --text-dark: var(--ink); --text-light: #8A7A66; --bg-off: var(--cream-dark);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif; background: var(--cream); color: var(--ink); line-height: 1.6; }
html, body, #root { width: 100%; height: 100%; }
h1, h2, h3, .font-display { font-family: 'Fraunces', serif; }
img { max-width: 100%; height: auto; }
a { color: inherit; text-decoration: none; }
button { cursor: pointer; border: none; font-family: inherit; }

.grid-1 { display: grid; grid-template-columns: 1fr; gap: 24px; }
.grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
.grid-5 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; }
@media (max-width: 768px) { .grid-2, .grid-4, .grid-5 { grid-template-columns: 1fr; } }

.flex { display: flex; } .flex-col { flex-direction: column; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.items-center { align-items: center; } .justify-between { justify-content: space-between; }
.text-center { text-align: center; }
.text-sm { font-size: 14px; } .text-lg { font-size: 18px; } .text-xl { font-size: 20px; }
.text-2xl { font-size: 24px; } .text-3xl { font-size: 28px; } .text-4xl { font-size: 36px; }
.text-5xl { font-size: 48px; } .text-6xl { font-size: 56px; }
.font-bold { font-weight: 700; } .font-semibold { font-weight: 600; } .font-medium { font-weight: 500; }
.text-dark { color: var(--ink); } .text-light { color: var(--text-light); } .text-primary { color: var(--rust); }
.bg-white { background: white; } .bg-off { background: var(--cream-dark); }
.bg-primary { background: var(--rust); color: white; }
.border-bottom { border-bottom: 1px solid var(--border-light); }
.border-top { border-top: 1px solid var(--border-light); }

.px-4 { padding-left: 16px; padding-right: 16px; } .px-6 { padding-left: 24px; padding-right: 24px; } .px-8 { padding-left: 32px; padding-right: 32px; }
.py-4 { padding-top: 16px; padding-bottom: 16px; } .py-6 { padding-top: 24px; padding-bottom: 24px; }
.py-12 { padding-top: 48px; padding-bottom: 48px; } .py-16 { padding-top: 64px; padding-bottom: 64px; } .py-20 { padding-top: 80px; padding-bottom: 80px; }
.mt-2 { margin-top: 8px; } .mt-3 { margin-top: 12px; } .mt-4 { margin-top: 16px; } .mt-8 { margin-top: 32px; }
.mt-12 { margin-top: 48px; } .mt-16 { margin-top: 64px; }
.mb-2 { margin-bottom: 8px; } .mb-3 { margin-bottom: 12px; } .mb-4 { margin-bottom: 16px; } .mb-8 { margin-bottom: 32px; } .mb-12 { margin-bottom: 48px; }

.btn { padding: 13px 32px; border-radius: 100px; font-weight: 700; font-size: 13px; letter-spacing: 0.06em; transition: all 0.25s ease; text-transform: uppercase; cursor: pointer; border: none; display: inline-block; }
.btn-primary { background: var(--rust); color: white; box-shadow: 0 4px 14px rgba(196,89,46,0.28); }
.btn-primary:hover { background: var(--rust-dark); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(196,89,46,0.35); }
.btn-secondary { background: transparent; color: var(--pine); border: 2px solid var(--pine); }
.btn-secondary:hover { background: var(--pine); color: white; }

.container { max-width: 1280px; margin-left: auto; margin-right: auto; padding-left: 16px; padding-right: 16px; }
.card { background: white; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 10px rgba(43,33,24,0.06); transition: all 0.3s ease; }
.card:hover { box-shadow: 0 8px 24px rgba(43,33,24,0.10); }

.header { position: sticky; top: 0; z-index: 50; background: var(--cream); border-bottom: 2px solid var(--ink); }
.header-inner { display: flex; justify-content: space-between; align-items: center; height: 84px; max-width: 1280px; margin: 0 auto; padding: 0 16px; }
.logo { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 600; color: var(--ink); }
.logo-accent { color: var(--rust); font-style: italic; }
.nav { display: flex; gap: 32px; }
.nav a { font-weight: 700; font-size: 14px; color: var(--ink); transition: color 0.3s ease; position: relative; }
.nav a:hover { color: var(--rust); }
@media (max-width: 768px) { .nav { display: none; } .header-inner { height: 64px; } }
.icon-btn { background: transparent; font-size: 22px; cursor: pointer; padding: 8px; transition: transform 0.2s ease; color: var(--ink); }
.icon-btn:hover { transform: scale(1.1); color: var(--rust); }
.cart-badge { position: absolute; top: -2px; right: -2px; background: var(--rust); color: white; font-size: 11px; font-weight: 700; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; border: 2px solid var(--cream); }

.footer { background: var(--ink); color: var(--cream); margin-top: 64px; }
.footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 32px; padding: 56px 16px; }
@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr; } }

.hero { background: linear-gradient(180deg, var(--cream-dark), var(--cream)); padding: 88px 16px 64px; text-align: center; }
.hero h1 { font-family: 'Fraunces', serif; font-size: 52px; font-weight: 600; margin-bottom: 16px; color: var(--ink); }
@media (max-width: 768px) { .hero h1 { font-size: 34px; } }

.section { max-width: 1280px; margin: 0 auto; padding: 64px 16px; }
.section h2 { font-family: 'Fraunces', serif; font-size: 38px; font-weight: 600; margin-bottom: 48px; text-align: center; color: var(--ink); }

.product-card { background: white; border-radius: 14px; overflow: hidden; transition: all 0.3s ease; box-shadow: 0 2px 10px rgba(43,33,24,0.06); }
.product-card:hover { box-shadow: 0 10px 28px rgba(43,33,24,0.12); transform: translateY(-3px); }
.product-image { width: 100%; aspect-ratio: 1; background: var(--cream-dark); overflow: hidden; position: relative; }
.product-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.product-card:hover .product-image img { transform: scale(1.06); }
.product-badge { position: absolute; top: 12px; right: 12px; background: var(--rust); color: white; padding: 6px 12px; border-radius: 100px; font-size: 11px; font-weight: 700; font-family: 'IBM Plex Mono', monospace; }
.product-wishlist { position: absolute; top: 12px; left: 12px; background: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 18px; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.product-wishlist:hover { background: var(--blush); }
.product-info { padding: 18px; }
.product-title { font-family: 'Fraunces', serif; font-weight: 500; color: var(--ink); margin-bottom: 8px; font-size: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-rating { display: flex; align-items: center; margin-bottom: 12px; }
.product-rating .stars { color: var(--mustard); margin-right: 8px; }
.product-rating .count { font-size: 12px; color: var(--text-light); font-family: 'IBM Plex Mono', monospace; }
.product-price { margin-bottom: 12px; }
.product-price .current { font-size: 18px; font-weight: 700; color: var(--rust); font-family: 'IBM Plex Mono', monospace; }
.product-price .original { font-size: 13px; color: var(--text-light); text-decoration: line-through; margin-left: 8px; font-family: 'IBM Plex Mono', monospace; }
.product-status { font-size: 11px; font-weight: 700; margin-bottom: 12px; display: block; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'IBM Plex Mono', monospace; }
.product-status.in-stock { color: var(--pine); }
.product-status.made-to-order { color: var(--mustard); }
.product-card button { width: 100%; padding: 12px; background: var(--ink); color: white; font-weight: 700; border-radius: 100px; cursor: pointer; transition: all 0.3s ease; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
.product-card button:hover { background: var(--rust); }

.trust-section { background: var(--pine); padding: 56px 16px; }
.trust-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px; max-width: 1280px; margin: 0 auto; text-align: center; }
.trust-item { font-size: 32px; margin-bottom: 16px; }
.trust-title { font-family: 'Fraunces', serif; font-weight: 600; color: white; margin-bottom: 8px; font-size: 20px; }
.trust-desc { font-size: 14px; color: rgba(255,255,255,0.75); }

.yarn-tag { display: inline-flex; align-items: center; gap: 6px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--pine); background: rgba(58,90,64,0.08); border: 1px dashed var(--pine); border-radius: 6px; padding: 4px 10px; }

@media (max-width: 768px) {
  .mobile-only { display: flex !important; }
  .container { padding-left: 16px; padding-right: 16px; }
  .section { padding: 40px 16px; } .section h2 { font-size: 28px; margin-bottom: 28px; }
  .hero { padding: 56px 16px; } .header-inner { padding: 0 12px; } .icon-btn { font-size: 20px; padding: 6px; }
}
@media (max-width: 900px) { .shop-layout { grid-template-columns: 1fr !important; } }
.product-card:hover .quick-view-btn { opacity: 1 !important; }
```

### src/styles/globals.css (full, current)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #root { background: #FBF3E7; color: #2B2118; font-family: 'Manrope', sans-serif; -webkit-font-smoothing: antialiased; width: 100%; }
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #F3E8D7; }
::-webkit-scrollbar-thumb { background: #C4592E; border-radius: 6px; }
::-webkit-scrollbar-thumb:hover { background: #A8471F; }
button, a, input { transition: all 0.3s ease; }
.toast { position: fixed; top: 20px; right: 20px; padding: 14px 22px; border-radius: 10px; z-index: 9999; animation: slideIn 0.3s ease; font-family: 'Manrope', sans-serif; font-weight: 600; }
@keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
.toast.success { background: #3A5A40; color: white; }
.toast.error { background: #C4592E; color: white; }
body { line-height: 1.6; }
img { max-width: 100%; height: auto; }
```

### src/data/products.js (structure)
```js
// PRODUCTS: array of 17 objects, each: { id, name, price, originalPrice|null, image (Unsplash URL), category ('blankets'|'amigurumi'|'home-decor'|'hats'|'scarves'), rating, reviews, stock ('in-stock'|'made-to-order'), description }
// CATEGORIES: array of 5 objects: { id, name, slug, image }
```
(Full catalog not repeated here — read the file for exact 17 products. Images are remote Unsplash URLs, not local files.)

### Contexts, components, pages
Full source of every remaining file (`CartContext`, `OrderContext`, `SearchContext`, `FilterContext`, `WishlistContext`, `ReviewContext`, `Header`, `MobileMenu`, `SearchAutocomplete`, `Footer`, `Toast`, `Breadcrumbs`, `Pagination`, `QuantitySelector`, `ChainDivider`, `ErrorBoundary`, `ProductCard`, `QuickViewModal`, `ReviewSection`, `ProductFilters`, `ImageGallery`, `CartSidebar`, and all 12 pages) is in the live source tree. Read the individual files for their exact current contents — the earlier sections of this doc summarize their behavior, routing, and the inline-style adornment each needs for beautification.
