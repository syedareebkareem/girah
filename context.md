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
    ├── App.jsx                 # providers (Cart→Order→Search→Wishlist→Review) + Router + static routes
    ├── index.css               # GLOBAL STYLE SHEET — most visual rules
    ├── styles/globals.css      # Tailwind directives + base body + scrollbar + toast class
    ├── data/products.js        # PRODUCTS[] (12) + CATEGORIES[] (5) — static catalog
    ├── utils/validation.js     # zod checkoutSchema
    ├── context/
    │   ├── CartContext.jsx     # cart items + toast notifications
    │   ├── OrderContext.jsx    # placed orders history (orders, createOrder)
    │   ├── SearchContext.jsx   # search query + results
    │   ├── WishlistContext.jsx # wishlist items (persisted)
    │   └── ReviewContext.jsx   # per-product user reviews
    ├── components/
    │   ├── cart/CartSidebar.jsx    # slide-in cart drawer from header
    │   ├── common/Header.jsx       # sticky header: logo, nav, icons, search panel, mobile nav
    │   ├── common/SearchAutocomplete.jsx # header search with live suggestions (used by Header)
    │   ├── common/Footer.jsx       # footer (Shop/Help/Newsletter)
    │   ├── common/Toast.jsx        # toast notification (inline styled)
    │   ├── common/ScrollToTop.jsx  # scrolls to top on route change
    │   ├── common/Breadcrumbs.jsx
    │   ├── common/Pagination.jsx
    │   ├── common/QuantitySelector.jsx
    │   ├── common/ChainDivider.jsx # SVG wave divider — CREATED BUT NOT YET USED (beautify hook)
    │   ├── common/ErrorBoundary.jsx# class-based error catch-all
    │   └── products/
    │       ├── ProductCard.jsx     # grid card: image, wishlist, info, add-to-cart
    │       ├── QuickViewModal.jsx  # modal from card hover
    │       ├── ReviewSection.jsx   # rating summary + write-a-review form
    │       ├── ProductFilters.jsx  # sidebar filter controls (category/price/stock)
    │       └── ImageGallery.jsx    # main image + thumbnails + lightbox
    └── pages/
        ├── Home.jsx            # hero, categories, new arrivals, trust section
        ├── Shop.jsx            # filter + sort grid
        ├── ProductDetail.jsx   # gallery, info, add-to-cart, reviews, related
        ├── Cart.jsx            # line items + order summary
        ├── SearchResults.jsx   # results grid from search
        ├── Wishlist.jsx        # saved items grid
        ├── Account.jsx         # order history + counts
        ├── About.jsx           # static marketing page
        ├── Contact.jsx         # contact form + info + FAQ
        ├── Checkout.jsx        # 3-step checkout (shipping→payment→review)
        ├── OrderConfirmation.jsx # post-order "success" page
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

All pages are imported statically (no lazy-loading / code-splitting in the current build). `ScrollToTop` scrolls to top on route change; `<main className="page-fade">` animates page transitions.

---

## STATE MANAGEMENT (Contexts)

- **CartContext** (`localStorage: "cart"`) — `cartItems`, `addToCart`, `removeFromCart`, `updateQuantity`, `getTotalPrice`, `getTotalItems`, plus toast state (`showToast`, `toastMessage`, `toastType`, `showToastMessage`). **Note:** toast is owned by CartContext, so any component calling `showToastMessage` must be under CartProvider (it is).
- **OrderContext** (`localStorage: "orders"`) — `orders`, `createOrder`. (`currentOrder` state was removed; order id comes from `createOrder` return value.)
- **SearchContext** — `searchQuery`, `searchResults`, `performSearch`, `clearSearch` (in-memory, not persisted).
- **WishlistContext** (`localStorage: "wishlist"`) — `wishlistItems`, `toggleWishlist`, `isInWishlist`, `removeFromWishlist`.
- **ReviewContext** (`localStorage: "reviews"`) — per-product reviews; `addReview(productId, review)`, `getReviews(productId)`.

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
- `Checkout.jsx`, `Cart.jsx`, `Contact.jsx`, `About.jsx`, `OrderConfirmation.jsx`, `NotFound.jsx`, `ImageGallery.jsx`, `ProductFilters.jsx`, `CartSidebar.jsx`, `QuickViewModal.jsx`, `ReviewSection.jsx`, `ErrorBoundary.jsx`, `QuantitySelector.jsx`, `Breadcrumbs.jsx`.
- **Now on the new theme** (restyled, do not regress): `Account.jsx`, `Wishlist.jsx`, `SearchResults.jsx`, `SearchAutocomplete.jsx`, `Pagination.jsx`, `ProductDetail.jsx`, `ProductCard.jsx`, `Header.jsx`.

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
4. **All products use the same image** (`/images/products/blanket-1.jpg`) — every product/category shows identical photography. If more local images are added later, wire them into `products.js`.
5. **`SearchAutocomplete.jsx`** uses `onBlur` + `setTimeout` which can leave the dropdown open; minor UX.
6. **`axios` dependency is unused** (a dead dep). No API calls exist anywhere.
7. **`Shop.jsx`** does NOT read the `?category=` query param that Home's category cards link to (`/shop?category=...`), so category cards don't pre-filter the shop.
8. **Footer/About/Contact links** are mostly `href="#"` placeholders (no real social/FAQ pages). Newsletter subscribe button does nothing (just visually there).
9. **Wishlist is client-side only** (localStorage via `WishlistContext`); hearts on `ProductCard`/`ProductDetail` and the `/wishlist` page all work together.
10. **Lint = 6 warnings, 0 errors.** Warnings: `window.innerWidth` in render (Shop), unused `cartItems` (OrderConfirmation), React Compiler memoization notes on `useForm`/`watch`, `setState` in effect (SearchAutocomplete).
11. **Footer** is styled dark (`--ink` bg) but its inner `<h3>/<a>` text colors are still hard-coded `#2D2D2D`/`#999999` from the old theme — text may be low-contrast on the dark footer. Verify visually.
12. **`globals.css` `.toast.*` classes are effectively unused** — `Toast.jsx` hard-codes its colors inline (already updated to new palette). Can consolidate.

---

## RECOMMENDED NEXT STEPS (beautification, per user)

1. **Standardize palette**: sweep all components replacing old hex (`#B8C5B5`, `#F8F8F7`, `#2D2D2D`, `#999999`, `#D9D9D9`, `#E74C3C`, `#27AE60`, `#F39C12`, `#FFD700`) with the new CSS vars or new-token hex. Dashboard of affected files in the inline-style hazard section.
2. **Introduce design-system components** so pages stop hand-rolling: a shared `Button`, `Input`, `Card`, `Section`, `PageHeader` — pull from `.btn`/`.card`/`.product-card` patterns.
3. **Deploy `.yarn-tag`** and **`ChainDivider`** on Home/About for brand flavor.
4. **Fix mobile filter toggle** in Shop (currently hidden/broken).
5. **Refactor OrderConfirmation reload bug** (see gap #2).
6. **Remove the unused `axios` dep** and any other dead deps.
7. **Brand interior pages** (Checkout/Cart/Contact/About/OrderConfirmation/NotFound) to match the new artisan theme — Account/Wishlist/SearchResults already done.

---

## QUICK FILE-ROLE CHEAT SHEET

- **`App.jsx`** — providers (Cart→Order→Search→Wishlist→Review) + router (statically imported routes). Don't break the provider nesting or localStorage-backed contexts.
- **`Header.jsx`** — desktop nav + icon buttons (search toggle→SearchAutocomplete panel, account, wishlist w/ badge, cart w/ badge) + inline mobile nav panel + cart sidebar.
- **`ProductCard.jsx`** — the reusable product tile (uses `.product-card` classes; wishlist heart wired to `WishlistContext`).
- **`Shop.jsx`** — local filter/sort logic (no central filter context).
- **`ProductDetail.jsx`** — gallery + info + reviews + related. Note `images = [product.image × 4]` (same image 4x, no real gallery).
- **`SearchResults.jsx`** — reads `useSearch()` query/results; paginated grid.
- **`Wishlist.jsx`** / **`Account.jsx`** — consume `WishlistContext` / `OrderContext` respectively.
- **`Checkout.jsx`** — 3-step form, react-hook-form + zod, shipping cost watch, creates order on step 3.
- **`OrderConfirmation.jsx`** — reads order by `:orderId`, clears cart with a reload bug (see gaps).
- **`CartContext.jsx`** — distinct from everything else: also owns toast.

---

# FULL SOURCE CODE — EVERY FILE

> **IMPORTANT — snapshot accuracy:** These blocs were captured during earlier documentation passes. After the restore/cleanup change, the following are **stale** (show the pre-change version) — read the live files for authoritative code:
> - `src/App.jsx` (providers Search/Wishlist/Review re-mounted; `/search`, `/wishlist`, `/account` routes re-added; static imports, no lazy loading)
> - `src/components/common/Header.jsx` (search autocomplete, wishlist link+badge, account link restored; inline mobile nav)
> - `src/components/common/SearchAutocomplete.jsx` + `Pagination.jsx` (restyled to artisan theme)
> - `src/components/products/ProductCard.jsx` + `src/pages/ProductDetail.jsx` (wishlist hearts wired to `WishlistContext`)
> - `src/pages/SearchResults.jsx`, `src/pages/Wishlist.jsx`, `src/pages/Account.jsx` (restyled to artisan theme)
> - **Deleted files** (kept below only as historical records, labeled DEAD): `App.css`, `common/MobileMenu.jsx`, `context/FilterContext.jsx`, `src/assets/*` (react.svg, vite.svg, hero.png).
> - Also note the catalog is **12 products**, not 17; `OrderContext` exposes `orders` + `createOrder` (no `currentOrder`).

---

## // ROOT FILES

### package.json
```json
{
  "name": "crochet-shop",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
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

### vite.config.js
```js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

### postcss.config.js
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FBF3E7',
        'cream-dark': '#F3E8D7',
        ink: '#2B2118',
        rust: '#C4592E',
        'rust-dark': '#A8471F',
        pine: '#3A5A40',
        'pine-dark': '#2C4531',
        mustard: '#E3A857',
        blush: '#E8B4B8',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Manrope', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

### vercel.json
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## // src/ ENTRY

### src/main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
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

// Lazy-loaded pages (code-split for faster initial load)
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
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '4px solid #F0F0F0',
          borderTop: '4px solid #B8C5B5',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <OrderProvider>
          <SearchProvider>
            <WishlistProvider>
              <ReviewProvider>
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
              </ReviewProvider>
            </WishlistProvider>
          </SearchProvider>
        </OrderProvider>
      </CartProvider>
    </ErrorBoundary>
  )
}

export default App
```

### src/App.css (DEAD — unused, nothing imports it)
```css
/* Leftover Vite template CSS. NOT imported anywhere. Candidate for deletion. */

.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
```

---

## // src/ STYLE SHEETS

### src/index.css (full, current)
```css
:root {
  --cream: #FBF3E7;
  --cream-dark: #F3E8D7;
  --ink: #2B2118;
  --rust: #C4592E;
  --rust-dark: #A8471F;
  --pine: #3A5A40;
  --pine-dark: #2C4531;
  --mustard: #E3A857;
  --blush: #E8B4B8;
  --border-light: #E4D5BF;

  /* legacy aliases so old components don't break during rollout */
  --primary: var(--rust);
  --primary-dark: var(--rust-dark);
  --accent: var(--pine);
  --text-dark: var(--ink);
  --text-light: #8A7A66;
  --bg-off: var(--cream-dark);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--cream);
  color: var(--ink);
  line-height: 1.6;
}

html, body, #root {
  width: 100%;
  height: 100%;
}

h1, h2, h3, .font-display {
  font-family: 'Fraunces', serif;
}

img {
  max-width: 100%;
  height: auto;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  border: none;
  font-family: inherit;
}

.grid-1 { display: grid; grid-template-columns: 1fr; gap: 24px; }
.grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
.grid-5 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; }

@media (max-width: 768px) {
  .grid-2, .grid-4, .grid-5 { grid-template-columns: 1fr; }
}

.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }

.text-center { text-align: center; }
.text-sm { font-size: 14px; }
.text-lg { font-size: 18px; }
.text-xl { font-size: 20px; }
.text-2xl { font-size: 24px; }
.text-3xl { font-size: 28px; }
.text-4xl { font-size: 36px; }
.text-5xl { font-size: 48px; }
.text-6xl { font-size: 56px; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }

.text-dark { color: var(--ink); }
.text-light { color: var(--text-light); }
.text-primary { color: var(--rust); }

.bg-white { background: white; }
.bg-off { background: var(--cream-dark); }
.bg-primary { background: var(--rust); color: white; }

.border-bottom { border-bottom: 1px solid var(--border-light); }
.border-top { border-top: 1px solid var(--border-light); }

.px-4 { padding-left: 16px; padding-right: 16px; }
.px-6 { padding-left: 24px; padding-right: 24px; }
.px-8 { padding-left: 32px; padding-right: 32px; }
.py-4 { padding-top: 16px; padding-bottom: 16px; }
.py-6 { padding-top: 24px; padding-bottom: 24px; }
.py-12 { padding-top: 48px; padding-bottom: 48px; }
.py-16 { padding-top: 64px; padding-bottom: 64px; }
.py-20 { padding-top: 80px; padding-bottom: 80px; }

.mt-2 { margin-top: 8px; }
.mt-3 { margin-top: 12px; }
.mt-4 { margin-top: 16px; }
.mt-8 { margin-top: 32px; }
.mt-12 { margin-top: 48px; }
.mt-16 { margin-top: 64px; }
.mb-2 { margin-bottom: 8px; }
.mb-3 { margin-bottom: 12px; }
.mb-4 { margin-bottom: 16px; }
.mb-8 { margin-bottom: 32px; }
.mb-12 { margin-bottom: 48px; }

/* ===== Buttons ===== */
.btn {
  padding: 13px 32px;
  border-radius: 100px;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.06em;
  transition: all 0.25s ease;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  display: inline-block;
}

.btn-primary { background: var(--rust); color: white; box-shadow: 0 4px 14px rgba(196,89,46,0.28); }
.btn-primary:hover { background: var(--rust-dark); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(196,89,46,0.35); }

.btn-secondary { background: transparent; color: var(--pine); border: 2px solid var(--pine); }
.btn-secondary:hover { background: var(--pine); color: white; }

.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
}

.card {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(43,33,24,0.06);
  transition: all 0.3s ease;
}
.card:hover { box-shadow: 0 8px 24px rgba(43,33,24,0.10); }

/* ===== Header ===== */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--cream);
  border-bottom: 2px solid var(--ink);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 84px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

.logo { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 600; color: var(--ink); }
.logo-accent { color: var(--rust); font-style: italic; }

.nav { display: flex; gap: 32px; }
.nav a { font-weight: 700; font-size: 14px; color: var(--ink); transition: color 0.3s ease; position: relative; }
.nav a:hover { color: var(--rust); }

@media (max-width: 768px) {
  .nav { display: none; }
  .header-inner { height: 64px; }
}

.icon-btn {
  background: transparent;
  font-size: 22px;
  cursor: pointer;
  padding: 8px;
  transition: transform 0.2s ease;
  color: var(--ink);
}
.icon-btn:hover { transform: scale(1.1); color: var(--rust); }

.cart-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: var(--rust);
  color: white;
  font-size: 11px;
  font-weight: 700;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--cream);
}

/* ===== Footer ===== */
.footer {
  background: var(--ink);
  color: var(--cream);
  margin-top: 64px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  padding: 56px 16px;
}

@media (max-width: 768px) {
  .footer-grid { grid-template-columns: 1fr; }
}

/* ===== Hero ===== */
.hero {
  background: linear-gradient(180deg, var(--cream-dark), var(--cream));
  padding: 88px 16px 64px;
  text-align: center;
}
.hero h1 { font-family: 'Fraunces', serif; font-size: 52px; font-weight: 600; margin-bottom: 16px; color: var(--ink); }

@media (max-width: 768px) {
  .hero h1 { font-size: 34px; }
}

.section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 64px 16px;
}
.section h2 {
  font-family: 'Fraunces', serif;
  font-size: 38px;
  font-weight: 600;
  margin-bottom: 48px;
  text-align: center;
  color: var(--ink);
}

/* ===== Product Card ===== */
.product-card {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(43,33,24,0.06);
}
.product-card:hover { box-shadow: 0 10px 28px rgba(43,33,24,0.12); transform: translateY(-3px); }

.product-image {
  width: 100%;
  aspect-ratio: 1;
  background: var(--cream-dark);
  overflow: hidden;
  position: relative;
}
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.product-card:hover .product-image img { transform: scale(1.06); }

.product-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--rust);
  color: white;
  padding: 6px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  font-family: 'IBM Plex Mono', monospace;
}

.product-wishlist {
  position: absolute;
  top: 12px;
  left: 12px;
  background: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.product-wishlist:hover { background: var(--blush); }

.product-info { padding: 18px; }

.product-title {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 8px;
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.product-rating .stars { color: var(--mustard); margin-right: 8px; }
.product-rating .count { font-size: 12px; color: var(--text-light); font-family: 'IBM Plex Mono', monospace; }

.product-price { margin-bottom: 12px; }
.product-price .current { font-size: 18px; font-weight: 700; color: var(--rust); font-family: 'IBM Plex Mono', monospace; }
.product-price .original { font-size: 13px; color: var(--text-light); text-decoration: line-through; margin-left: 8px; font-family: 'IBM Plex Mono', monospace; }

.product-status { font-size: 11px; font-weight: 700; margin-bottom: 12px; display: block; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'IBM Plex Mono', monospace; }
.product-status.in-stock { color: var(--pine); }
.product-status.made-to-order { color: var(--mustard); }

.product-card button {
  width: 100%;
  padding: 12px;
  background: var(--ink);
  color: white;
  font-weight: 700;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.product-card button:hover { background: var(--rust); }

.trust-section { background: var(--pine); padding: 56px 16px; }

.trust-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
}
.trust-item { font-size: 32px; margin-bottom: 16px; }
.trust-title { font-family: 'Fraunces', serif; font-weight: 600; color: white; margin-bottom: 8px; font-size: 20px; }
.trust-desc { font-size: 14px; color: rgba(255,255,255,0.75); }

/* Yarn tag — small category label styled like a real yarn skein tag */
.yarn-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--pine);
  background: rgba(58,90,64,0.08);
  border: 1px dashed var(--pine);
  border-radius: 6px;
  padding: 4px 10px;
}

/* Mobile menu / quick-view / responsive rules carried over */
@media (max-width: 768px) {
  .mobile-only { display: flex !important; }
  .container { padding-left: 16px; padding-right: 16px; }
  .section { padding: 40px 16px; }
  .section h2 { font-size: 28px; margin-bottom: 28px; }
  .hero { padding: 56px 16px; }
  .header-inner { padding: 0 12px; }
  .icon-btn { font-size: 20px; padding: 6px; }
}

@media (max-width: 900px) {
  .shop-layout { grid-template-columns: 1fr !important; }
}

.product-card:hover .quick-view-btn { opacity: 1 !important; }
```

### src/styles/globals.css (full, current)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  background: #FBF3E7;
  color: #2B2118;
  font-family: 'Manrope', sans-serif;
  -webkit-font-smoothing: antialiased;
  width: 100%;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #F3E8D7;
}

::-webkit-scrollbar-thumb {
  background: #C4592E;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #A8471F;
}

button, a, input {
  transition: all 0.3s ease;
}

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 14px 22px;
  border-radius: 10px;
  z-index: 9999;
  animation: slideIn 0.3s ease;
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast.success {
  background: #3A5A40;
  color: white;
}

.toast.error {
  background: #C4592E;
  color: white;
}

body {
  line-height: 1.6;
}

img {
  max-width: 100%;
  height: auto;
}
```

---

## // src/ DATA & UTILS

### src/data/products.js
```js
export const PRODUCTS = [
  {
    id: 1,
    name: 'Cozy Cream Blanket',
    price: 89.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1693387369575-df25ef8424e7?w=400&h=400&fit=crop',
    category: 'blankets',
    rating: 4.8,
    reviews: 24,
    stock: 'in-stock',
    description: 'Soft and cozy handmade crochet blanket, perfect for gifting or keeping warm.',
  },
  {
    id: 2,
    name: 'Pink Amigurumi Bunny',
    price: 45.99,
    originalPrice: 55.99,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&h=400&fit=crop',
    category: 'amigurumi',
    rating: 5,
    reviews: 18,
    stock: 'in-stock',
    description: 'Adorable handmade pink bunny, perfect for children or collectors.',
  },
  {
    id: 3,
    name: 'Sage Green Pillow Cover',
    price: 35.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1584210566956-e409b84b3f4a?w=400&h=400&fit=crop',
    category: 'home-decor',
    rating: 4.9,
    reviews: 31,
    stock: 'in-stock',
    description: 'Beautiful handwoven crochet pillow cover in calming sage green.',
  },
  {
    id: 4,
    name: 'Warm Winter Beanie',
    price: 28.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1576618124519-894a7b17587b?w=400&h=400&fit=crop',
    category: 'hats',
    rating: 4.7,
    reviews: 15,
    stock: 'in-stock',
    description: 'Chunky knit winter beanie, soft and warm for cold days.',
  },
  {
    id: 5,
    name: 'Boho Rainbow Scarf',
    price: 39.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1693387347071-d3bf494cbe0e?w=400&h=400&fit=crop',
    category: 'scarves',
    rating: 4.6,
    reviews: 22,
    stock: 'made-to-order',
    description: 'Colorful handmade crochet scarf with rainbow colors.',
  },
  {
    id: 6,
    name: 'Cream Tote Bag',
    price: 52.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
    category: 'bags',
    rating: 4.9,
    reviews: 19,
    stock: 'in-stock',
    description: 'Spacious handmade crochet tote bag, perfect for everyday use.',
  },
  {
    id: 7,
    name: 'Baby Blue Booties',
    price: 22.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop',
    category: 'baby-items',
    rating: 5,
    reviews: 12,
    stock: 'in-stock',
    description: 'Adorable handmade baby booties in soft baby blue.',
  },
  {
    id: 8,
    name: 'Lace Shawl',
    price: 65.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1693387359607-f48d0a824b1e?w=400&h=400&fit=crop',
    category: 'shawls',
    rating: 4.8,
    reviews: 14,
    stock: 'made-to-order',
    description: 'Elegant lace crochet shawl, perfect for special occasions.',
  },
  {
    id: 9,
    name: 'Multicolor Throw Blanket',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop',
    category: 'blankets',
    rating: 4.7,
    reviews: 28,
    stock: 'in-stock',
    description: 'Beautiful multicolor crochet throw blanket for any room.',
  },
  {
    id: 10,
    name: 'Gray Amigurumi Cat',
    price: 38.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=400&h=400&fit=crop',
    category: 'amigurumi',
    rating: 4.9,
    reviews: 21,
    stock: 'in-stock',
    description: 'Cute handmade gray amigurumi cat, perfect for cat lovers.',
  },
  {
    id: 11,
    name: 'Taupe Cushion Set',
    price: 95.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop',
    category: 'home-decor',
    rating: 4.8,
    reviews: 16,
    stock: 'in-stock',
    description: 'Set of 2 handmade crochet cushion covers in soft taupe.',
  },
  {
    id: 12,
    name: 'Baby Blanket Set',
    price: 58.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1564103677022-c9d39d4c6ba1?w=400&h=400&fit=crop',
    category: 'baby-items',
    rating: 5,
    reviews: 19,
    stock: 'in-stock',
    description: 'Soft and safe handmade baby blanket set.',
  },
];

export const CATEGORIES = [
  { id: 1, name: 'Blankets & Throws', slug: 'blankets', image: 'https://images.unsplash.com/photo-1693387369575-df25ef8424e7?w=300&h=300&fit=crop' },
  { id: 2, name: 'Amigurumi & Toys', slug: 'amigurumi', image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=300&h=300&fit=crop' },
  { id: 3, name: 'Home Decor', slug: 'home-decor', image: 'https://images.unsplash.com/photo-1584210566956-e409b84b3f4a?w=300&h=300&fit=crop' },
  { id: 4, name: 'Hats & Beanies', slug: 'hats', image: 'https://images.unsplash.com/photo-1576618124519-894a7b17587b?w=300&h=300&fit=crop' },
  { id: 5, name: 'Scarves & Wraps', slug: 'scarves', image: 'https://images.unsplash.com/photo-1693387347071-d3bf494cbe0e?w=300&h=300&fit=crop' },
];
```
> **NOTE (accuracy):** The catalog actually has **12 PRODUCTS** (ids 1–12), shown in full above. Products reference categories `blankets`, `amigurumi`, `home-decor`, `hats`, `scarves`, **`bags`**, **`baby-items`**, **`shawls`** — but `CATEGORIES` only lists the first five. `bags`, `baby-items`, `shawls` are used by product data but are NOT in the `CATEGORIES` array (potential gap to address during beautification).

### src/utils/validation.js
```js
import { z } from 'zod'

export const checkoutSchema = z.object({
  // Shipping Info
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 digits'),
  country: z.string().min(2, 'Country is required'),

  // Shipping Method
  shippingMethod: z.enum(['standard', 'express', 'overnight']),

  // Billing Address
  sameAsShipping: z.boolean(),
  billingFirstName: z.string().optional(),
  billingLastName: z.string().optional(),
  billingAddress: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingZipCode: z.string().optional(),
  billingCountry: z.string().optional(),

  // Payment Info
  cardName: z.string().min(3, 'Name on card is required'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiryMonth: z.string().min(1, 'Expiry month is required'),
  expiryYear: z.string().min(4, 'Expiry year is required'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3-4 digits'),
}).refine((data) => {
  if (!data.sameAsShipping) {
    return data.billingAddress && data.billingCity && data.billingState && data.billingZipCode
  }
  return true
}, {
  message: 'Billing address is required',
  path: ['billingAddress'],
})
```

---

## // src/ CONTEXTS

### src/context/CartContext.jsx
```jsx
import { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id)
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
    showToastMessage('✓ Added to cart!', 'success')
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
    showToastMessage('Item removed from cart', 'success')
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      )
    }
  }

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalPrice,
      getTotalItems,
      showToast,
      toastMessage,
      toastType,
      showToastMessage,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
```

### src/context/OrderContext.jsx
```jsx
import { createContext, useState, useContext } from 'react'

const OrderContext = createContext()

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders')
    return saved ? JSON.parse(saved) : []
  })

  const [currentOrder, setCurrentOrder] = useState(null)

  const createOrder = (orderData) => {
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      ...orderData,
    }
    setOrders(prev => {
      const updated = [...prev, order]
      localStorage.setItem('orders', JSON.stringify(updated))
      return updated
    })
    setCurrentOrder(order)
    return order
  }

  return (
    <OrderContext.Provider value={{ orders, currentOrder, createOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  return useContext(OrderContext)
}
```

### src/context/SearchContext.jsx
```jsx
import { createContext, useState, useContext } from 'react'
import { PRODUCTS } from '../data/products'

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const performSearch = (query) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const query_lower = query.toLowerCase()
    const results = PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(query_lower) ||
      product.description.toLowerCase().includes(query_lower) ||
      product.category.toLowerCase().includes(query_lower)
    )
    setSearchResults(results)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
  }

  return (
    <SearchContext.Provider value={{ searchQuery, searchResults, performSearch, clearSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}
```

### src/context/FilterContext.jsx (DEAD — not wired into App, not used)
```jsx
import { createContext, useState, useContext } from 'react'

const FilterContext = createContext()

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    categories: [],
    priceRanges: [],
    stock: [],
    sortBy: 'newest',
  })

  const updateFilters = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  return useContext(FilterContext)
}
```

### src/context/WishlistContext.jsx
```jsx
import { createContext, useState, useContext, useEffect } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.filter(item => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId)
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId))
  }

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}
```

### src/context/ReviewContext.jsx
```jsx
import { createContext, useState, useContext, useEffect } from 'react'

const ReviewContext = createContext()

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('reviews')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  }, [reviews])

  const addReview = (productId, review) => {
    setReviews(prev => {
      const productReviews = prev[productId] || []
      return {
        ...prev,
        [productId]: [
          {
            id: `REV-${Date.now()}`,
            date: new Date().toISOString(),
            ...review,
          },
          ...productReviews,
        ],
      }
    })
  }

  const getReviews = (productId) => {
    return reviews[productId] || []
  }

  return (
    <ReviewContext.Provider value={{ addReview, getReviews }}>
      {children}
    </ReviewContext.Provider>
  )
}

export function useReviews() {
  return useContext(ReviewContext)
}
```


---

### src/components/common/Breadcrumbs.jsx
~~~jsx
import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: '#999999',
        marginBottom: '32px',
      }}
      aria-label="Breadcrumb"
    >
      {items.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {item.href ? (
            <Link
              to={item.href}
              style={{
                color: '#B8C5B5',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: '#2D2D2D' }}>{item.label}</span>
          )}
          {idx < items.length - 1 && <span>/</span>}
        </div>
      ))}
    </nav>
  )
}
~~~


---

### src/components/common/ChainDivider.jsx
~~~jsx
export default function ChainDivider({ color = '#C4592E', background = '#FBF3E7' }) {
  return (
    <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, background }}>
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '28px', display: 'block' }}
      >
        <path
          d="M0,20 Q15,0 30,20 T60,20 T90,20 T120,20 T150,20 T180,20 T210,20 T240,20 T270,20 T300,20 T330,20 T360,20 T390,20 T420,20 T450,20 T480,20 T510,20 T540,20 T570,20 T600,20 T630,20 T660,20 T690,20 T720,20 T750,20 T780,20 T810,20 T840,20 T870,20 T900,20 T930,20 T960,20 T990,20 T1020,20 T1050,20 T1080,20 T1110,20 T1140,20 T1170,20 T1200,20"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
~~~


---

### src/components/common/ErrorBoundary.jsx
~~~jsx
import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
              Something went wrong
            </h1>
            <p style={{ fontSize: '16px', color: '#999999', marginBottom: '24px' }}>
              We're sorry, an unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 32px',
                backgroundColor: '#B8C5B5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
~~~


---

### src/components/common/Footer.jsx
~~~jsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>CrochetShop</h3>
          <p style={{ fontSize: '14px', color: '#999999', marginBottom: '16px' }}>Handcrafted crochet gifts made with love</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: '#2D2D2D', textDecoration: 'none' }}>f</a>
            <a href="#" style={{ color: '#2D2D2D', textDecoration: 'none' }}>ig</a>
            <a href="#" style={{ color: '#2D2D2D', textDecoration: 'none' }}>p</a>
          </div>
        </div>

        <div>
          <h4 style={{ fontWeight: 600, color: '#2D2D2D', marginBottom: '16px' }}>Shop</h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '8px' }}><Link to="/shop" style={{ color: '#999999', textDecoration: 'none' }}>All Products</Link></li>
            <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>New Arrivals</a></li>
            <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Sale</a></li>
            <li><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Best Sellers</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontWeight: 600, color: '#2D2D2D', marginBottom: '16px' }}>Help</h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Contact Us</a></li>
            <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>FAQ</a></li>
            <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Shipping Info</a></li>
            <li><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Returns</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontWeight: 600, color: '#2D2D2D', marginBottom: '16px' }}>Newsletter</h4>
          <p style={{ fontSize: '14px', color: '#999999', marginBottom: '12px' }}>Get 10% off your first order</p>
          <div style={{ display: 'flex' }}>
            <input 
              type="email" 
              placeholder="Email"
              style={{ flex: 1, padding: '8px 12px', fontSize: '14px', background: 'white', border: '1px solid var(--border-light)', borderRadius: '4px 0 0 4px', outline: 'none' }}
            />
            <button style={{ padding: '8px 16px', background: 'var(--primary)', color: 'white', fontSize: '14px', fontWeight: 600, borderRadius: '0 4px 4px 0', border: 'none', cursor: 'pointer' }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '32px', padding: '32px 16px', textAlign: 'center', fontSize: '14px', color: '#999999' }}>
        <p>&copy; 2025 CrochetShop. All rights reserved.</p>
      </div>
    </footer>
  )
}
~~~


---

### src/components/common/Header.jsx
~~~jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import CartSidebar from '../cart/CartSidebar'
import MobileMenu from './MobileMenu'
import SearchAutocomplete from './SearchAutocomplete'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { getTotalItems } = useCart()
  const { wishlistItems } = useWishlist()

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <button
            className="icon-btn mobile-only"
            onClick={() => setMobileMenuOpen(true)}
            style={{ display: 'none' }}
            title="Menu"
          >
            ☰
          </button>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="logo">
              Crochet<span className="logo-accent">Shop</span>
            </div>
          </Link>

          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button 
              className="icon-btn" 
              onClick={() => setSearchOpen(!searchOpen)}
              title="Search"
            >
              🔍
            </button>
            <Link to="/account" style={{ textDecoration: 'none' }}>
              <button className="icon-btn" title="Account">👤</button>
            </Link>
            <Link to="/wishlist" style={{ position: 'relative', textDecoration: 'none' }}>
              <button className="icon-btn" title="Wishlist">♡</button>
              {wishlistItems.length > 0 && (
                <span className="cart-badge">{wishlistItems.length}</span>
              )}
            </Link>
            <button 
              className="icon-btn" 
              onClick={() => setCartSidebarOpen(true)}
              style={{ position: 'relative' }}
              title="Cart"
            >
              🛒
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div style={{ padding: '16px', borderTop: '1px solid #D9D9D9', backgroundColor: 'white' }}>
            <SearchAutocomplete onClose={() => setSearchOpen(false)} />
          </div>
        )}
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <CartSidebar isOpen={cartSidebarOpen} onClose={() => setCartSidebarOpen(false)} />
    </>
  )
}
~~~


---

### src/components/common/MobileMenu.jsx
~~~jsx
import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'

export default function MobileMenu({ isOpen, onClose }) {
  const { wishlistItems } = useWishlist()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/wishlist', label: `Wishlist${wishlistItems.length > 0 ? ` (${wishlistItems.length})` : ''}` },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 99,
          }}
        />
      )}

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '280px',
          height: '100vh',
          backgroundColor: 'white',
          zIndex: 100,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          boxShadow: isOpen ? '4px 0 16px rgba(0,0,0,0.1)' : 'none',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid #D9D9D9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#2D2D2D' }}>
            Crochet<span style={{ color: '#B8C5B5' }}>Shop</span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#2D2D2D',
            }}
          >
            ✕
          </button>
        </div>

        <nav style={{ padding: '16px', flex: 1 }}>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              style={{
                display: 'block',
                padding: '16px 12px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '16px',
                color: '#2D2D2D',
                borderBottom: '1px solid #F0F0F0',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
~~~


---

### src/components/common/Pagination.jsx
~~~jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = []
  const maxVisible = 5

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push('...')
      pageNumbers.push(totalPages)
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1)
      pageNumbers.push('...')
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)
      pageNumbers.push('...')
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push('...')
      pageNumbers.push(totalPages)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '48px',
      }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '8px 16px',
          backgroundColor: currentPage === 1 ? '#D9D9D9' : '#F8F8F7',
          border: '1px solid #D9D9D9',
          borderRadius: '6px',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          color: currentPage === 1 ? '#999999' : '#2D2D2D',
        }}
      >
        ← Previous
      </button>

      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {pageNumbers.map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            style={{
              padding: '8px 12px',
              backgroundColor:
                page === currentPage
                  ? '#B8C5B5'
                  : page === '...'
                  ? 'transparent'
                  : '#F8F8F7',
              border: page === currentPage ? 'none' : '1px solid #D9D9D9',
              borderRadius: '6px',
              cursor: page === '...' ? 'default' : 'pointer',
              fontWeight: page === currentPage ? 700 : 600,
              color: page === currentPage ? 'white' : '#2D2D2D',
              minWidth: '40px',
            }}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '8px 16px',
          backgroundColor: currentPage === totalPages ? '#D9D9D9' : '#F8F8F7',
          border: '1px solid #D9D9D9',
          borderRadius: '6px',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          color: currentPage === totalPages ? '#999999' : '#2D2D2D',
        }}
      >
        Next →
      </button>
    </div>
  )
}
~~~


---

### src/components/common/QuantitySelector.jsx
~~~jsx
export default function QuantitySelector({ quantity, onChange, min = 1, max = 999 }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#F8F8F7',
        borderRadius: '6px',
        padding: '8px',
        width: 'fit-content',
      }}
    >
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 8px',
          color: '#2D2D2D',
          fontSize: '18px',
        }}
      >
        −
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          const val = Math.max(min, Math.min(max, parseInt(e.target.value) || min))
          onChange(val)
        }}
        style={{
          width: '50px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 600,
          border: 'none',
          backgroundColor: 'transparent',
          color: '#2D2D2D',
        }}
      />
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 8px',
          color: '#2D2D2D',
          fontSize: '18px',
        }}
      >
        +
      </button>
    </div>
  )
}
~~~


---

### src/components/common/SearchAutocomplete.jsx
~~~jsx
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../../data/products'
import { useSearch } from '../../context/SearchContext'

export default function SearchAutocomplete({ onClose }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const { performSearch } = useSearch()
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (query.trim().length > 0) {
      const query_lower = query.toLowerCase()
      const matches = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query_lower) ||
        p.category.toLowerCase().includes(query_lower)
      ).slice(0, 5)
      setSuggestions(matches)
      setShowDropdown(true)
    } else {
      setSuggestions([])
      setShowDropdown(false)
    }
  }, [query])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      performSearch(query)
      navigate('/search')
      setQuery('')
      setShowDropdown(false)
      onClose()
    }
  }

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`)
    setQuery('')
    setShowDropdown(false)
    onClose()
  }

  return (
    <div style={{ position: 'relative' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '1px solid #D9D9D9',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#B8C5B5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontSize: '14px',
          }}
        >
          Search
        </button>
      </form>

      {showDropdown && suggestions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #D9D9D9',
            borderRadius: '6px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            zIndex: 100,
            overflow: 'hidden',
          }}
        >
          {suggestions.map(product => (
            <div
              key={product.id}
              onClick={() => handleSuggestionClick(product)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                cursor: 'pointer',
                borderBottom: '1px solid #F0F0F0',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8F8F7'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '48px',
                  height: '48px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>
                  {product.name}
                </p>
                <p style={{ fontSize: '12px', color: '#999999' }}>
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
~~~


---

### src/components/common/Toast.jsx
~~~jsx
import { useCart } from '../../context/CartContext'

export default function Toast() {
  const { showToast, toastMessage, toastType } = useCart()

  if (!showToast) return null

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '14px 24px',
      borderRadius: '10px',
      zIndex: 9999,
      backgroundColor: toastType === 'success' ? '#3A5A40' : '#C4592E',
      color: 'white',
      fontWeight: 700,
      fontSize: '14px',
      boxShadow: '0 6px 20px rgba(43,33,24,0.2)',
      animation: 'slideIn 0.3s ease',
      fontFamily: 'Manrope, sans-serif',
    }}>
      {toastMessage}
    </div>
  )
}
~~~


---

### src/components/cart/CartSidebar.jsx
~~~jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 99,
          }}
        />
      )}

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          backgroundColor: 'white',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          boxShadow: isOpen ? '0 8px 24px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid #D9D9D9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#2D2D2D' }}>
            Your Cart
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#2D2D2D',
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
          }}
        >
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '48px' }}>
              <p style={{ color: '#999999', fontSize: '14px', marginBottom: '16px' }}>
                Your cart is empty
              </p>
              <Link
                to="/shop"
                onClick={onClose}
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#B8C5B5',
                  color: 'white',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                }}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #D9D9D9',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#2D2D2D',
                        marginBottom: '4px',
                      }}
                    >
                      {item.name}
                    </h4>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#2D2D2D',
                        marginBottom: '8px',
                      }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#F8F8F7',
                        borderRadius: '4px',
                        width: 'fit-content',
                        padding: '4px',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px 8px',
                          color: '#2D2D2D',
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px 8px',
                          color: '#2D2D2D',
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#E74C3C',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: 0,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid #D9D9D9',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <span style={{ color: '#999999', fontSize: '14px' }}>Subtotal:</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#2D2D2D' }}>
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#999999', marginBottom: '12px' }}>
              Shipping calculated at checkout
            </p>
            <Link
              to="/cart"
              onClick={onClose}
              style={{
                display: 'block',
                padding: '14px 24px',
                backgroundColor: '#B8C5B5',
                color: 'white',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginBottom: '8px',
              }}
            >
              View Cart
            </Link>
            <Link
              to="/checkout"
              onClick={onClose}
              style={{
                display: 'block',
                padding: '14px 24px',
                backgroundColor: '#2D2D2D',
                color: 'white',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
~~~


---

### src/components/products/ImageGallery.jsx
~~~jsx
import { useState } from 'react'

export default function ImageGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0])
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <img
          src={mainImage}
          alt="Product"
          onClick={() => setLightboxOpen(true)}
          style={{
            width: '100%',
            aspectRatio: '1',
            objectFit: 'cover',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx}`}
            onClick={() => setMainImage(img)}
            style={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover',
              borderRadius: '6px',
              cursor: 'pointer',
              border: mainImage === img ? '2px solid #B8C5B5' : '2px solid transparent',
              transition: 'border 0.2s ease',
            }}
          />
        ))}
      </div>

      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
            }}
          >
            <img
              src={mainImage}
              alt="Lightbox"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '32px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
~~~


---

### src/components/products/ProductCard.jsx
~~~jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import QuickViewModal from './QuickViewModal'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [quickViewOpen, setQuickViewOpen] = useState(false)

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const inWishlist = isInWishlist(product.id)

  return (
    <>
      <div className="product-card">
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <div className="product-image" style={{ position: 'relative' }}>
            <img src={product.image} alt={product.name} />
            {discount && (
              <div className="product-badge">-{discount}%</div>
            )}
            
            <button 
              className="product-wishlist"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleWishlist(product)
              }}
              style={{
                color: inWishlist ? '#E74C3C' : '#2D2D2D',
              }}
            >
              {inWishlist ? '♥' : '♡'}
            </button>

            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setQuickViewOpen(true)
              }}
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                color: '#2D2D2D',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 20px',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                cursor: 'pointer',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
              className="quick-view-btn"
            >
              Quick View
            </button>
          </div>
        </Link>

        <div className="product-info">
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3 className="product-title">{product.name}</h3>
          </Link>

          <div className="product-rating">
            <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
            <span className="count">({product.reviews})</span>
          </div>

          <div className="product-price">
            <span className="current">${product.price}</span>
            {product.originalPrice && (
              <span className="original">${product.originalPrice}</span>
            )}
          </div>

          <span className={`product-status ${product.stock === 'in-stock' ? 'in-stock' : 'made-to-order'}`}>
            {product.stock === 'in-stock' ? 'In Stock' : 'Made to Order'}
          </span>

          <button 
            onClick={(e) => {
              e.preventDefault()
              addToCart(product)
            }}
            style={{ width: '100%' }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  )
}
~~~


---

### src/components/products/ProductFilters.jsx
~~~jsx
import { useState } from 'react'

export default function ProductFilters({ onFilterChange, activeFilters }) {
  const [expanded, setExpanded] = useState({
    category: true,
    price: true,
    stock: true,
  })

  const categories = [
    { id: 'blankets', name: 'Blankets & Throws' },
    { id: 'amigurumi', name: 'Amigurumi & Toys' },
    { id: 'home-decor', name: 'Home Decor' },
    { id: 'hats', name: 'Hats & Beanies' },
    { id: 'scarves', name: 'Scarves & Wraps' },
  ]

  const priceRanges = [
    { id: '0-25', label: 'Under $25', min: 0, max: 25 },
    { id: '25-50', label: '$25 - $50', min: 25, max: 50 },
    { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
    { id: '100+', label: '$100+', min: 100, max: 999999 },
  ]

  const stockOptions = [
    { id: 'in-stock', name: 'In Stock' },
    { id: 'made-to-order', name: 'Made to Order' },
  ]

  const toggleCategory = (catId) => {
    const newCats = activeFilters.categories.includes(catId)
      ? activeFilters.categories.filter(c => c !== catId)
      : [...activeFilters.categories, catId]
    onFilterChange({ ...activeFilters, categories: newCats })
  }

  const togglePrice = (priceId, range) => {
    const newPrices = activeFilters.priceRanges.find(p => p.id === priceId)
      ? activeFilters.priceRanges.filter(p => p.id !== priceId)
      : [...activeFilters.priceRanges, { id: priceId, ...range }]
    onFilterChange({ ...activeFilters, priceRanges: newPrices })
  }

  const toggleStock = (stockId) => {
    const newStock = activeFilters.stock.includes(stockId)
      ? activeFilters.stock.filter(s => s !== stockId)
      : [...activeFilters.stock, stockId]
    onFilterChange({ ...activeFilters, stock: newStock })
  }

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      priceRanges: [],
      stock: [],
    })
  }

  const hasActiveFilters = activeFilters.categories.length > 0 || activeFilters.priceRanges.length > 0 || activeFilters.stock.length > 0

  return (
    <div style={{ width: '280px' }}>
      <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #D9D9D9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#2D2D2D' }}>Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                background: 'none',
                border: 'none',
                color: '#B8C5B5',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'underline',
              }}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => setExpanded({ ...expanded, category: !expanded.category })}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            padding: '12px 0',
            cursor: 'pointer',
            fontWeight: 700,
            color: '#2D2D2D',
            fontSize: '14px',
          }}
        >
          Category
          <span style={{ fontSize: '12px' }}>{expanded.category ? '−' : '+'}</span>
        </button>

        {expanded.category && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '12px' }}>
            {categories.map(cat => (
              <label key={cat.id} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={activeFilters.categories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                />
                <span style={{ color: '#999999' }}>{cat.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #D9D9D9' }}>
        <button
          onClick={() => setExpanded({ ...expanded, price: !expanded.price })}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            padding: '12px 0',
            cursor: 'pointer',
            fontWeight: 700,
            color: '#2D2D2D',
            fontSize: '14px',
          }}
        >
          Price
          <span style={{ fontSize: '12px' }}>{expanded.price ? '−' : '+'}</span>
        </button>

        {expanded.price && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '12px' }}>
            {priceRanges.map(range => (
              <label key={range.id} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={activeFilters.priceRanges.some(p => p.id === range.id)}
                  onChange={() => togglePrice(range.id, { min: range.min, max: range.max })}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                />
                <span style={{ color: '#999999' }}>{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Stock Filter */}
      <div>
        <button
          onClick={() => setExpanded({ ...expanded, stock: !expanded.stock })}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            padding: '12px 0',
            cursor: 'pointer',
            fontWeight: 700,
            color: '#2D2D2D',
            fontSize: '14px',
          }}
        >
          Availability
          <span style={{ fontSize: '12px' }}>{expanded.stock ? '−' : '+'}</span>
        </button>

        {expanded.stock && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '12px' }}>
            {stockOptions.map(option => (
              <label key={option.id} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={activeFilters.stock.includes(option.id)}
                  onChange={() => toggleStock(option.id)}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                />
                <span style={{ color: '#999999' }}>{option.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
~~~


---

### src/components/products/QuickViewModal.jsx
~~~jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import QuantitySelector from '../common/QuantitySelector'

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    onClose()
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'white',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#2D2D2D',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          ✕
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '32px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />

          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#2D2D2D', marginBottom: '12px' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '16px', color: '#FFD700' }}>
                {'★'.repeat(Math.floor(product.rating))}
              </span>
              <span style={{ fontSize: '14px', color: '#999999' }}>
                ({product.reviews} reviews)
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#2D2D2D' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '16px', color: '#999999', textDecoration: 'line-through', marginLeft: '12px' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.7', marginBottom: '24px' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#2D2D2D' }}>
                Quantity
              </label>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  padding: '14px 24px',
                  backgroundColor: '#B8C5B5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                style={{
                  padding: '14px 24px',
                  backgroundColor: 'transparent',
                  color: '#B8C5B5',
                  border: '2px solid #B8C5B5',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
~~~


---

### src/components/products/ReviewSection.jsx
~~~jsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useReviews } from '../../context/ReviewContext'

const reviewSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters'),
})

export default function ReviewSection({ productId, baseRating, baseReviewCount }) {
  const { addReview, getReviews } = useReviews()
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const productReviews = getReviews(productId)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(reviewSchema),
  })

  const onSubmit = (data) => {
    addReview(productId, data)
    reset()
    setSelectedRating(0)
    setShowForm(false)
  }

  const handleStarClick = (rating) => {
    setSelectedRating(rating)
    setValue('rating', rating)
  }

  // Calculate rating breakdown
  const allRatings = [...productReviews.map(r => r.rating)]
  const totalReviews = baseReviewCount + productReviews.length
  const avgRating = allRatings.length > 0
    ? ((baseRating * baseReviewCount + allRatings.reduce((a, b) => a + b, 0)) / totalReviews).toFixed(1)
    : baseRating

  const ratingBreakdown = [5, 4, 3, 2, 1].map(star => {
    const count = allRatings.filter(r => r === star).length
    const percentage = allRatings.length > 0 ? (count / allRatings.length) * 100 : 0
    return { star, count, percentage }
  })

  return (
    <div style={{ marginTop: '64px', borderTop: '1px solid #D9D9D9', paddingTop: '48px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', color: '#2D2D2D' }}>
        Customer Reviews
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px', marginBottom: '48px' }}>
        {/* Rating Summary */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '48px', fontWeight: 700, color: '#2D2D2D' }}>
              {avgRating}
            </div>
            <div style={{ fontSize: '20px', color: '#FFD700', marginBottom: '8px' }}>
              {'★'.repeat(Math.round(avgRating))}
            </div>
            <p style={{ fontSize: '14px', color: '#999999' }}>
              Based on {totalReviews} reviews
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ratingBreakdown.map(({ star, count, percentage }) => (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                <span style={{ color: '#999999', minWidth: '40px' }}>{star} star</span>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#F0F0F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${percentage}%`,
                      height: '100%',
                      backgroundColor: '#FFD700',
                    }}
                  />
                </div>
                <span style={{ color: '#999999', minWidth: '20px' }}>{count}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              width: '100%',
              marginTop: '24px',
              padding: '12px 24px',
              backgroundColor: '#B8C5B5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '14px',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Write a Review
          </button>
        </div>

        {/* Review List / Form */}
        <div>
          {showForm && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                backgroundColor: '#F8F8F7',
                padding: '24px',
                borderRadius: '8px',
                marginBottom: '32px',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
                Write Your Review
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                  Your Rating
                </label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '28px',
                        cursor: 'pointer',
                        color: (hoverRating || selectedRating) >= star ? '#FFD700' : '#D9D9D9',
                        padding: 0,
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {errors.rating && (
                  <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                    Please select a rating
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.name ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
                {errors.name && (
                  <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                  Your Review
                </label>
                <textarea
                  {...register('comment')}
                  rows="4"
                  placeholder="Share your experience with this product..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.comment ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
                {errors.comment && (
                  <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                    {errors.comment.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#2D2D2D',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Submit Review
              </button>
            </form>
          )}

          {productReviews.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#999999' }}>
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {productReviews.map(review => (
                <div key={review.id} style={{ borderBottom: '1px solid #D9D9D9', paddingBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, color: '#2D2D2D', fontSize: '14px' }}>
                      {review.name}
                    </span>
                    <span style={{ fontSize: '12px', color: '#999999' }}>
                      {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div style={{ color: '#FFD700', marginBottom: '8px', fontSize: '14px' }}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
~~~


---

### src/pages/About.jsx
~~~jsx
export default function About() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D', textAlign: 'center' }}>
            About CrochetShop
          </h1>

          <p style={{ fontSize: '18px', color: '#999999', textAlign: 'center', marginBottom: '64px' }}>
            Handmade crochet gifts crafted with love and care
          </p>

          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
              Our Story
            </h2>
            <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8', marginBottom: '16px' }}>
              CrochetShop was founded with a simple mission: to bring handmade, artisan crochet products to people who appreciate quality, craftsmanship, and unique gifts.
            </p>
            <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8' }}>
              Each item is carefully crafted by skilled artisans using premium materials. We believe in supporting sustainable practices and creating pieces that last a lifetime.
            </p>
          </section>

          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
              Our Values
            </h2>
            <div style={{ display: 'grid', gap: '32px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#2D2D2D' }}>
                  ✓ Quality Craftsmanship
                </h3>
                <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8' }}>
                  Every piece is handmade with attention to detail and quality materials.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#2D2D2D' }}>
                  ✓ Sustainability
                </h3>
                <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8' }}>
                  We use eco-friendly materials and support sustainable practices.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#2D2D2D' }}>
                  ✓ Artisan Support
                </h3>
                <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8' }}>
                  We support independent artisans and fair-trade practices.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#2D2D2D' }}>
                  ✓ Customer Satisfaction
                </h3>
                <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8' }}>
                  Your happiness is our priority. We stand behind every product.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
              Production Process
            </h2>
            <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8', marginBottom: '24px' }}>
              Each product goes through multiple stages of quality control:
            </p>
            <div style={{ display: 'grid', gap: '16px' }}>
              {['Design & Planning', 'Material Selection', 'Handcrafting', 'Quality Check', 'Packaging', 'Delivery'].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#B8C5B5',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#2D2D2D' }}>{step}</span>
                </div>
              ))}
            </div>
          </section>

          <section style={{ backgroundColor: '#F8F8F7', padding: '48px', borderRadius: '8px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
              Have Questions?
            </h2>
            <p style={{ fontSize: '16px', color: '#999999', marginBottom: '24px' }}>
              Reach out to us anytime. We love hearing from our customers.
            </p>
            <a
              href="/contact"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                backgroundColor: '#B8C5B5',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
~~~


---

### src/pages/Account.jsx
~~~jsx
import { Link } from 'react-router-dom'
import { useOrder } from '../context/OrderContext'
import { useWishlist } from '../context/WishlistContext'

export default function Account() {
  const { orders } = useOrder()
  const { wishlistItems } = useWishlist()

  const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px', backgroundColor: '#F8F8F7' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
          My Account
        </h1>
        <p style={{ fontSize: '16px', color: '#999999', marginBottom: '48px' }}>
          View your order history and saved items
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '48px' }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 700, color: '#B8C5B5', marginBottom: '8px' }}>
              {orders.length}
            </p>
            <p style={{ fontSize: '14px', color: '#999999', textTransform: 'uppercase', fontWeight: 600 }}>
              Total Orders
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 700, color: '#B8C5B5', marginBottom: '8px' }}>
              {wishlistItems.length}
            </p>
            <p style={{ fontSize: '14px', color: '#999999', textTransform: 'uppercase', fontWeight: 600 }}>
              Wishlist Items
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: '#2D2D2D' }}>
            Order History
          </h2>

          {sortedOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ fontSize: '16px', color: '#999999', marginBottom: '24px' }}>
                You haven't placed any orders yet.
              </p>
              <Link
                to="/shop"
                style={{
                  display: 'inline-block',
                  padding: '12px 32px',
                  backgroundColor: '#B8C5B5',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '14px',
                }}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sortedOrders.map(order => (
                <div
                  key={order.id}
                  style={{
                    border: '1px solid #D9D9D9',
                    borderRadius: '8px',
                    padding: '24px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                        Order Number
                      </p>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D2D', fontFamily: 'monospace' }}>
                        {order.id}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                        Date
                      </p>
                      <p style={{ fontSize: '14px', color: '#2D2D2D' }}>
                        {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                        Total
                      </p>
                      <p style={{ fontSize: '18px', fontWeight: 700, color: '#2D2D2D' }}>
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <Link
                      to={`/order-confirmation/${order.id}`}
                      style={{
                        padding: '8px 20px',
                        backgroundColor: 'transparent',
                        color: '#B8C5B5',
                        border: '2px solid #B8C5B5',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        alignSelf: 'center',
                      }}
                    >
                      View Details
                    </Link>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {order.items.slice(0, 4).map(item => (
                      <img
                        key={item.id}
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '48px',
                          height: '48px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                      />
                    ))}
                    {order.items.length > 4 && (
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '4px',
                          backgroundColor: '#F8F8F7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#999999',
                        }}
                      >
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
~~~


---

### src/pages/Cart.jsx
~~~jsx
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import QuantitySelector from '../components/common/QuantitySelector'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '48px', paddingBottom: '48px' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '48px', color: '#2D2D2D' }}>
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
            <p style={{ fontSize: '18px', color: '#999999', marginBottom: '24px' }}>
              Your cart is empty
            </p>
            <Link
              to="/shop"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                backgroundColor: '#B8C5B5',
                color: 'white',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
              }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px' }}>
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr 120px 100px 40px',
                  gap: '24px',
                  alignItems: 'center',
                  paddingBottom: '24px',
                  borderBottom: '2px solid #D9D9D9',
                  marginBottom: '32px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#999999',
                  textTransform: 'uppercase',
                }}
              >
                <span>Image</span>
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span></span>
              </div>

              {cartItems.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr 120px 100px 40px',
                    gap: '24px',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderBottom: '1px solid #D9D9D9',
                    marginBottom: '24px',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />

                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#2D2D2D', marginBottom: '4px' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#999999' }}>
                      {item.description?.substring(0, 60)}...
                    </p>
                  </div>

                  <div>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: '#2D2D2D' }}>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={(qty) => updateQuantity(item.id, qty)}
                  />

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#E74C3C',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: '8px',
                    }}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            <div>
              <div
                style={{
                  backgroundColor: '#F8F8F7',
                  padding: '24px',
                  borderRadius: '8px',
                  position: 'sticky',
                  top: '100px',
                }}
              >
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: '#2D2D2D' }}>
                  Order Summary
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#999999' }}>Subtotal</span>
                    <span style={{ color: '#2D2D2D', fontWeight: 600 }}>
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#999999' }}>Shipping</span>
                    <span style={{ color: '#2D2D2D', fontWeight: 600 }}>At checkout</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#999999' }}>Tax</span>
                    <span style={{ color: '#2D2D2D', fontWeight: 600 }}>At checkout</span>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: '1px solid #D9D9D9',
                    paddingTop: '12px',
                    marginBottom: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D2D' }}>Total</span>
                  <span style={{ fontSize: '24px', fontWeight: 700, color: '#2D2D2D' }}>
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  style={{
                    display: 'block',
                    padding: '14px 24px',
                    backgroundColor: '#B8C5B5',
                    color: 'white',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    marginBottom: '12px',
                  }}
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/shop"
                  style={{
                    display: 'block',
                    padding: '14px 24px',
                    backgroundColor: 'transparent',
                    color: '#B8C5B5',
                    border: '2px solid #B8C5B5',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
~~~


---

### src/pages/Checkout.jsx
~~~jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '../context/CartContext'
import { useOrder } from '../context/OrderContext'
import { checkoutSchema } from '../utils/validation'

export default function Checkout() {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const { cartItems, getTotalPrice } = useCart()
  const { createOrder } = useOrder()
  const [sameAddress, setSameAddress] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  })

  const shippingCost = watch('shippingMethod') === 'express' ? 15 : watch('shippingMethod') === 'overnight' ? 30 : 0

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#2D2D2D' }}>Your cart is empty</h1>
          <button
            onClick={() => navigate('/shop')}
            style={{
              padding: '12px 32px',
              backgroundColor: '#B8C5B5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  const onSubmit = (data) => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      const order = createOrder({
        items: cartItems,
        subtotal: getTotalPrice(),
        shipping: shippingCost,
        tax: parseFloat((getTotalPrice() * 0.1).toFixed(2)),
        total: getTotalPrice() + shippingCost + parseFloat((getTotalPrice() * 0.1).toFixed(2)),
        shippingInfo: data,
      })
      navigate(`/order-confirmation/${order.id}`)
    }
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px', backgroundColor: '#F8F8F7' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '48px', color: '#2D2D2D' }}>Checkout</h1>

        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '48px', justifyContent: 'center' }}>
          {[1, 2, 3].map(s => (
            <div
              key={s}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: s <= step ? '#B8C5B5' : '#D9D9D9',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                {s}
              </div>
              <span style={{ color: s <= step ? '#2D2D2D' : '#999999', fontWeight: 600 }}>
                {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
              </span>
              {s < 3 && <span style={{ color: '#D9D9D9', marginLeft: '8px' }}>→</span>}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px' }}>
            {/* Form Section */}
            <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px' }}>
              {/* STEP 1: SHIPPING */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px', color: '#2D2D2D' }}>
                    Shipping Information
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        First Name
                      </label>
                      <input
                        type="text"
                        {...register('firstName')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.firstName ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {errors.firstName && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...register('lastName')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.lastName ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {errors.lastName && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: errors.email ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                    {errors.email && (
                      <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: errors.phone ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                    {errors.phone && (
                      <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                      Address
                    </label>
                    <input
                      type="text"
                      {...register('address')}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: errors.address ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                    {errors.address && (
                      <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        City
                      </label>
                      <input
                        type="text"
                        {...register('city')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.city ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {errors.city && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        State
                      </label>
                      <input
                        type="text"
                        {...register('state')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.state ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {errors.state && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        Zip Code
                      </label>
                      <input
                        type="text"
                        {...register('zipCode')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.zipCode ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {errors.zipCode && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.zipCode.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        Country
                      </label>
                      <input
                        type="text"
                        {...register('country')}
                        defaultValue="Pakistan"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.country ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {errors.country && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
                    Shipping Method
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                    {[
                      { value: 'standard', label: 'Standard Shipping', price: '$0 (3-5 business days)' },
                      { value: 'express', label: 'Express Shipping', price: '$15 (1-2 business days)' },
                      { value: 'overnight', label: 'Overnight Shipping', price: '$30 (Next day)' },
                    ].map(method => (
                      <label
                        key={method.value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px',
                          border: '1px solid #D9D9D9',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          {...register('shippingMethod')}
                          value={method.value}
                          defaultChecked={method.value === 'standard'}
                          style={{ marginRight: '12px', cursor: 'pointer' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, color: '#2D2D2D' }}>{method.label}</div>
                          <div style={{ fontSize: '12px', color: '#999999' }}>{method.price}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: PAYMENT */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px', color: '#2D2D2D' }}>
                    Payment Information
                  </h2>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                      Name on Card
                    </label>
                    <input
                      type="text"
                      {...register('cardName')}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: errors.cardName ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                        borderRadius: '6px',
                        fontSize: '14px',
                      }}
                    />
                    {errors.cardName && (
                      <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                        {errors.cardName.message}
                      </p>
                    )}
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                      Card Number (16 digits)
                    </label>
                    <input
                      type="text"
                      {...register('cardNumber')}
                      placeholder="4111111111111111"
                      maxLength="16"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: errors.cardNumber ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontFamily: 'monospace',
                        letterSpacing: '2px',
                      }}
                    />
                    {errors.cardNumber && (
                      <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        Month
                      </label>
                      <select
                        {...register('expiryMonth')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.expiryMonth ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      >
                        <option value="">Select</option>
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      {errors.expiryMonth && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          Required
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        Year
                      </label>
                      <select
                        {...register('expiryYear')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.expiryYear ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      >
                        <option value="">Select</option>
                        {[...Array(10)].map((_, i) => {
                          const year = new Date().getFullYear() + i
                          return (
                            <option key={year} value={String(year)}>
                              {year}
                            </option>
                          )
                        })}
                      </select>
                      {errors.expiryYear && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          Required
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        {...register('cvv')}
                        placeholder="123"
                        maxLength="4"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: errors.cvv ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontFamily: 'monospace',
                          letterSpacing: '2px',
                        }}
                      />
                      {errors.cvv && (
                        <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                          {errors.cvv.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px', padding: '16px', backgroundColor: '#F8F8F7', borderRadius: '6px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={sameAddress}
                        onChange={(e) => {
                          setSameAddress(e.target.checked)
                        }}
                        style={{ marginRight: '12px', cursor: 'pointer' }}
                      />
                      <span style={{ fontWeight: 600, color: '#2D2D2D' }}>
                        Billing address same as shipping
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 3: REVIEW */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px', color: '#2D2D2D' }}>
                    Order Review
                  </h2>

                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
                      Shipping Address
                    </h3>
                    <div style={{ fontSize: '14px', color: '#999999', lineHeight: '1.8' }}>
                      <p>{getValues('firstName')} {getValues('lastName')}</p>
                      <p>{getValues('address')}</p>
                      <p>{getValues('city')}, {getValues('state')} {getValues('zipCode')}</p>
                      <p>{getValues('country')}</p>
                      <p style={{ marginTop: '8px' }}>{getValues('email')}</p>
                      <p>{getValues('phone')}</p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px', borderTop: '1px solid #D9D9D9', paddingTop: '32px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
                      Items
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {cartItems.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                          <span style={{ color: '#2D2D2D' }}>
                            {item.name} × {item.quantity}
                          </span>
                          <span style={{ fontWeight: 600, color: '#2D2D2D' }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '24px',
                  borderRadius: '8px',
                  position: 'sticky',
                  top: '100px',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px', color: '#2D2D2D' }}>
                  Order Summary
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#999999' }}>Subtotal</span>
                    <span style={{ color: '#2D2D2D', fontWeight: 600 }}>
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#999999' }}>Shipping</span>
                    <span style={{ color: '#2D2D2D', fontWeight: 600 }}>
                      ${shippingCost.toFixed(2)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#999999' }}>Tax (10%)</span>
                    <span style={{ color: '#2D2D2D', fontWeight: 600 }}>
                      ${(getTotalPrice() * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: '1px solid #D9D9D9',
                    paddingTop: '12px',
                    marginBottom: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D2D' }}>Total</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: '#2D2D2D' }}>
                    ${(getTotalPrice() + shippingCost + getTotalPrice() * 0.1).toFixed(2)}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      style={{
                        flex: 1,
                        padding: '12px 24px',
                        backgroundColor: 'transparent',
                        color: '#B8C5B5',
                        border: '2px solid #B8C5B5',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '12px 24px',
                      backgroundColor: '#B8C5B5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    {step === 3 ? 'Place Order' : 'Continue'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
~~~


---

### src/pages/Contact.jsx
~~~jsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCart } from '../context/CartContext'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { showToastMessage } = useCart()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    console.log('Contact form submitted:', data)
    setSubmitted(true)
    reset()
    showToastMessage('Message sent! We will get back to you soon.', 'success')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D', textAlign: 'center' }}>
            Get in Touch
          </h1>

          <p style={{ fontSize: '18px', color: '#999999', textAlign: 'center', marginBottom: '64px' }}>
            Have questions or special requests? We'd love to hear from you.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '64px' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#2D2D2D' }}>
                Contact Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D', textTransform: 'uppercase' }}>
                    Email
                  </h3>
                  <a href="mailto:hello@crochetshop.com" style={{ fontSize: '16px', color: '#B8C5B5', textDecoration: 'none' }}>
                    hello@crochetshop.com
                  </a>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D', textTransform: 'uppercase' }}>
                    Phone
                  </h3>
                  <a href="tel:+923001234567" style={{ fontSize: '16px', color: '#B8C5B5', textDecoration: 'none' }}>
                    +92 300 123 4567
                  </a>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D', textTransform: 'uppercase' }}>
                    Address
                  </h3>
                  <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.6' }}>
                    123 Craft Street<br />
                    Karachi, Sindh<br />
                    Pakistan
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D', textTransform: 'uppercase' }}>
                    Hours
                  </h3>
                  <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.6' }}>
                    Monday - Friday: 9 AM - 6 PM<br />
                    Saturday: 10 AM - 4 PM<br />
                    Sunday: Closed
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D', textTransform: 'uppercase' }}>
                    Follow Us
                  </h3>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <a href="#" style={{ fontSize: '18px', color: '#B8C5B5', textDecoration: 'none' }}>f</a>
                    <a href="#" style={{ fontSize: '18px', color: '#B8C5B5', textDecoration: 'none' }}>ig</a>
                    <a href="#" style={{ fontSize: '18px', color: '#B8C5B5', textDecoration: 'none' }}>π</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: errors.name ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                  {errors.name && (
                    <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: errors.email ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                  {errors.email && (
                    <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    {...register('subject')}
                    placeholder="How can we help?"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: errors.subject ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                  {errors.subject && (
                    <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    placeholder="Tell us more..."
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: errors.message ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                  {errors.message && (
                    <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    backgroundColor: '#B8C5B5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Send Message
                </button>

                {submitted && (
                  <p style={{ marginTop: '16px', fontSize: '14px', color: '#27AE60', textAlign: 'center' }}>
                    ✓ Message sent successfully!
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{ backgroundColor: '#F8F8F7', padding: '48px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', color: '#2D2D2D' }}>
              Frequently Asked Questions
            </h2>

            <div style={{ display: 'grid', gap: '24px' }}>
              {[
                {
                  q: 'How long does it take to receive my order?',
                  a: 'In-stock items ship within 1-2 business days. Made-to-order items take 7-14 days. International shipping may take 2-3 weeks.',
                },
                {
                  q: 'Do you offer customizations?',
                  a: 'Yes! We offer custom orders for most items. Contact us with your specific requirements and we\'ll provide a quote.',
                },
                {
                  q: 'What is your return policy?',
                  a: 'We accept returns within 30 days of purchase if items are unused and in original condition. Custom items are non-refundable.',
                },
                {
                  q: 'Are your products eco-friendly?',
                  a: 'Yes! We use sustainable materials and eco-conscious packaging practices whenever possible.',
                },
              ].map((faq, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #D9D9D9', paddingBottom: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#2D2D2D' }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
~~~


---

### src/pages/Home.jsx
~~~jsx
import { Link } from 'react-router-dom'
import { CATEGORIES, PRODUCTS } from '../data/products'
import ProductCard from '../components/products/ProductCard'

export default function Home() {
  const newArrivals = PRODUCTS.slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Handcrafted Crochet, Made with Love</h1>
          <p style={{ fontSize: '18px', color: '#999999', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Unique, cozy pieces crafted with care for your loved ones
          </p>
          <Link to="/shop" className="btn btn-primary">Shop Now</Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section">
        <h2>Shop by Category</h2>
        <div className="grid-5">
          {CATEGORIES.map(category => (
            <Link key={category.id} to={`/shop?category=${category.slug}`}>
              <div style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '8px' }}>
                <img 
                  src={category.image} 
                  alt={category.name}
                  style={{ width: '100%', height: '192px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{ marginTop: '12px', textAlign: 'center' }}>
                  <p style={{ fontWeight: 600, color: '#2D2D2D' }}>
                    {category.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section">
        <h2>New Arrivals</h2>
        <div className="grid-4">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/shop" className="btn btn-secondary">View All Products</Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-grid">
          <div>
            <p className="trust-item">🎁</p>
            <h3 className="trust-title">Handmade Gifts</h3>
            <p className="trust-desc">Unique pieces, one at a time</p>
          </div>
          <div>
            <p className="trust-item">🌿</p>
            <h3 className="trust-title">Eco-Friendly</h3>
            <p className="trust-desc">Sustainable materials</p>
          </div>
          <div>
            <p className="trust-item">✓</p>
            <h3 className="trust-title">Quality Guaranteed</h3>
            <p className="trust-desc">Made with expertise</p>
          </div>
        </div>
      </section>
    </div>
  )
}
~~~


---

### src/pages/NotFound.jsx
~~~jsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div>
        <h1 style={{ fontSize: '96px', fontWeight: 700, color: '#B8C5B5', marginBottom: '16px', lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
          Page Not Found
        </h2>
        <p style={{ fontSize: '16px', color: '#999999', marginBottom: '32px', maxWidth: '400px' }}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link
            to="/"
            style={{
              padding: '12px 32px',
              backgroundColor: '#B8C5B5',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '14px',
            }}
          >
            Back to Home
          </Link>
          <Link
            to="/shop"
            style={{
              padding: '12px 32px',
              backgroundColor: 'transparent',
              color: '#B8C5B5',
              border: '2px solid #B8C5B5',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '14px',
            }}
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  )
}
~~~


---

### src/pages/OrderConfirmation.jsx
~~~jsx
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useOrder } from '../context/OrderContext'
import { useCart } from '../context/CartContext'

export default function OrderConfirmation() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { orders } = useOrder()
  const { cartItems } = useCart()

  const order = orders.find(o => o.id === orderId)

  useEffect(() => {
    if (order) {
      localStorage.removeItem('cart')
      window.location.reload()
    }
  }, [order])

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#2D2D2D' }}>Order not found</h1>
          <Link
            to="/shop"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              backgroundColor: '#B8C5B5',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px', backgroundColor: '#F8F8F7' }}>
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: 'white',
              padding: '48px',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>✓</div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#27AE60' }}>
              Order Confirmed!
            </h1>
            <p style={{ fontSize: '16px', color: '#999999', marginBottom: '32px' }}>
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>

            <div style={{ backgroundColor: '#F8F8F7', padding: '24px', borderRadius: '6px', marginBottom: '32px' }}>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase', fontWeight: 600 }}>
                  Order Number
                </p>
                <p style={{ fontSize: '20px', fontWeight: 700, color: '#2D2D2D', fontFamily: 'monospace' }}>
                  {order.id}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase', fontWeight: 600 }}>
                  Order Date
                </p>
                <p style={{ fontSize: '16px', color: '#2D2D2D' }}>
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: '#2D2D2D' }}>
              Order Details
            </h2>

            <div style={{ marginBottom: '32px', borderBottom: '1px solid #D9D9D9', paddingBottom: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
                Items
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {order.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#2D2D2D', marginBottom: '4px' }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: '14px', color: '#999999' }}>
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D2D' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '32px', borderBottom: '1px solid #D9D9D9', paddingBottom: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
                Shipping Address
              </h3>
              <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.8' }}>
                {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                <br />
                {order.shippingInfo.address}
                <br />
                {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
                <br />
                {order.shippingInfo.country}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#999999' }}>Subtotal</span>
                <span style={{ color: '#2D2D2D', fontWeight: 600 }}>${order.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#999999' }}>Shipping</span>
                <span style={{ color: '#2D2D2D', fontWeight: 600 }}>${order.shipping.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' }}>
                <span style={{ color: '#999999' }}>Tax</span>
                <span style={{ color: '#2D2D2D', fontWeight: 600 }}>${order.tax.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #D9D9D9',
                  paddingTop: '16px',
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D2D' }}>Total</span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#2D2D2D' }}>
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link
              to="/shop"
              style={{
                flex: 1,
                padding: '14px 24px',
                backgroundColor: 'transparent',
                color: '#B8C5B5',
                border: '2px solid #B8C5B5',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              style={{
                flex: 1,
                padding: '14px 24px',
                backgroundColor: '#B8C5B5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
~~~


---

### src/pages/ProductDetail.jsx
~~~jsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../data/products'
import ImageGallery from '../components/products/ImageGallery'
import Breadcrumbs from '../components/common/Breadcrumbs'
import QuantitySelector from '../components/common/QuantitySelector'
import ProductCard from '../components/products/ProductCard'
import ReviewSection from '../components/products/ReviewSection'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = PRODUCTS.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#2D2D2D' }}>Product not found</h1>
          <button
            onClick={() => navigate('/shop')}
            style={{
              padding: '12px 32px',
              backgroundColor: '#B8C5B5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const images = [product.image, product.image, product.image, product.image]
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setQuantity(1)
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: product.name },
          ]}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '32px' }}>
          <ImageGallery images={images} />

          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#2D2D2D', marginBottom: '16px' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', color: '#FFD700' }}>
                  {'★'.repeat(Math.floor(product.rating))}
                </span>
                <span style={{ fontSize: '14px', color: '#999999' }}>
                  ({product.reviews} reviews)
                </span>
              </div>
              <span
                style={{
                  backgroundColor: product.stock === 'in-stock' ? '#27AE60' : '#F39C12',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                {product.stock === 'in-stock' ? 'In Stock' : 'Made to Order'}
              </span>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '32px', fontWeight: 700, color: '#2D2D2D' }}>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '18px', color: '#999999', textDecoration: 'line-through' }}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8', marginBottom: '32px' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#2D2D2D' }}>
                Quantity
              </label>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: '16px 32px',
                  backgroundColor: '#B8C5B5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Add to Cart
              </button>
              <button
                style={{
                  padding: '16px 24px',
                  backgroundColor: 'white',
                  color: '#B8C5B5',
                  border: '2px solid #B8C5B5',
                  borderRadius: '6px',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                ♡
              </button>
            </div>

            <div style={{ borderTop: '1px solid #D9D9D9', paddingTop: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: '#2D2D2D' }}>
                Product Details
              </h3>
              <div style={{ display: 'grid', gap: '12px', fontSize: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr' }}>
                  <span style={{ fontWeight: 600, color: '#2D2D2D' }}>Category:</span>
                  <span style={{ color: '#999999', textTransform: 'capitalize' }}>{product.category}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr' }}>
                  <span style={{ fontWeight: 600, color: '#2D2D2D' }}>Stock:</span>
                  <span style={{ color: '#999999' }}>
                    {product.stock === 'in-stock' ? 'In Stock (Ships in 1-2 days)' : 'Made to Order (7-14 days)'}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr' }}>
                  <span style={{ fontWeight: 600, color: '#2D2D2D' }}>Materials:</span>
                  <span style={{ color: '#999999' }}>Premium yarn, handmade</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReviewSection productId={product.id} baseRating={product.rating} baseReviewCount={product.reviews} />

        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '64px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px', color: '#2D2D2D' }}>
              Related Products
            </h2>
            <div className="grid-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
~~~


---

### src/pages/SearchResults.jsx
~~~jsx
import { useSearch } from '../context/SearchContext'
import { useState } from 'react'
import ProductCard from '../components/products/ProductCard'
import Pagination from '../components/common/Pagination'
import { useNavigate } from 'react-router-dom'

export default function SearchResults() {
  const { searchQuery, searchResults } = useSearch()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  if (!searchQuery) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
            No search query
          </h1>
          <p style={{ fontSize: '16px', color: '#999999', marginBottom: '24px' }}>
            Enter a search term to find products
          </p>
          <button
            onClick={() => navigate('/shop')}
            style={{
              padding: '12px 32px',
              backgroundColor: '#B8C5B5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Browse All Products
          </button>
        </div>
      </div>
    )
  }

  const totalPages = Math.ceil(searchResults.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedResults = searchResults.slice(startIdx, startIdx + itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="container">
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
            Search Results
          </h1>
          <p style={{ fontSize: '16px', color: '#999999' }}>
            {searchResults.length === 0
              ? `No results found for "${searchQuery}"`
              : `Found ${searchResults.length} product${searchResults.length !== 1 ? 's' : ''} matching "${searchQuery}"`}
          </p>
        </div>

        {searchResults.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '64px', paddingBottom: '64px' }}>
            <p style={{ fontSize: '18px', color: '#999999', marginBottom: '24px' }}>
              Try a different search term or browse by category
            </p>
            <button
              onClick={() => navigate('/shop')}
              style={{
                padding: '12px 32px',
                backgroundColor: '#B8C5B5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid-4">
              {paginatedResults.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
~~~


---

### src/pages/Shop.jsx
~~~jsx
import { useState, useMemo } from 'react'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import ProductFilters from '../components/products/ProductFilters'
import Pagination from '../components/common/Pagination'

export default function Shop() {
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    categories: [],
    priceRanges: [],
    stock: [],
  })

  const itemsPerPage = 12

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }
      if (filters.priceRanges.length > 0) {
        const inPriceRange = filters.priceRanges.some(
          range => product.price >= range.min && product.price <= range.max
        )
        if (!inPriceRange) return false
      }
      if (filters.stock.length > 0 && !filters.stock.includes(product.stock)) {
        return false
      }
      return true
    })
  }, [filters])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })
    return sorted
  }, [filteredProducts, sortBy])

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIdx, startIdx + itemsPerPage)

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#2D2D2D' }}>
            All Products
          </h1>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            style={{
              display: 'none',
              padding: '10px 20px',
              backgroundColor: '#F8F8F7',
              border: '1px solid #D9D9D9',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
            }}
            className="mobile-filter-toggle"
          >
            {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="shop-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px' }}>
          <div style={{ display: window.innerWidth <= 900 && !mobileFiltersOpen ? 'none' : 'block' }}>
            <ProductFilters onFilterChange={handleFilterChange} activeFilters={filters} />
          </div>

          <div>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <p style={{ color: '#999999', fontSize: '14px' }}>
                Showing {paginatedProducts.length === 0 ? 0 : startIdx + 1}–{Math.min(startIdx + itemsPerPage, sortedProducts.length)} of {sortedProducts.length} results
              </p>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setCurrentPage(1)
                }}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #D9D9D9',
                  borderRadius: '6px',
                  outline: 'none',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {paginatedProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <p style={{ fontSize: '16px', color: '#999999', marginBottom: '24px' }}>
                  No products found matching your filters.
                </p>
                <button
                  onClick={() => handleFilterChange({ categories: [], priceRanges: [], stock: [] })}
                  style={{
                    padding: '12px 32px',
                    backgroundColor: '#B8C5B5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid-4">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
~~~


---

### src/pages/Wishlist.jsx
~~~jsx
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/products/ProductCard'

export default function Wishlist() {
  const { wishlistItems } = useWishlist()

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '48px', color: '#2D2D2D' }}>
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '64px', paddingBottom: '64px' }}>
            <p style={{ fontSize: '18px', color: '#999999', marginBottom: '24px' }}>
              Your wishlist is empty
            </p>
            <Link
              to="/shop"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                backgroundColor: '#B8C5B5',
                color: 'white',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
              }}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid-4">
            {wishlistItems.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
~~~

