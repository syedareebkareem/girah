# CROCHET SHOP — FULL PROJECT CONTEXT

**Project Name:** CrochetShop — Artisan Crochet Ecommerce Frontend
**Tech Stack:** React 19 + Vite 8 + Tailwind CSS 4 + React Router 7 + React Hook Form + Zod
**Status:** Frontend MVP — all pages built with static data. No backend/API yet.
**⚠ SCOPE: THIS IS A PURELY FRONTEND PROJECT.** There is no server, no API, no database, no authentication. All product data is hardcoded in `src/data/products.js`; all persistent state (cart, orders) lives in `localStorage`. Any feature that would need a backend (real payments, email, order tracking, auth, inventory) is intentionally not implemented yet — see the "Known Gaps / Next Steps" sections below.
**Manual Test Guide:** see `TESTING.md` in the project root.
**Root Directory:** `/run/media/syed-areeb-kareem/WorkData/Girah/crochet-shop`
**Design Ref:** `/home/syed-areeb-kareem/Downloads/CROCHET_ECOMMERCE_FRONTEND.md`

---

## WHAT WE ARE MAKING

A clean, minimalist ecommerce platform for selling handmade crochet products (finished items) to gift buyers and home decor enthusiasts. The site prioritizes product showcase, ease of navigation, and a seamless cart → checkout → order-confirmation flow. Everything currently runs on static in-memory/localStorage data — there is no backend integration yet.

### Core Philosophy
- **Minimalism First:** Clean white/neutral space lets products shine
- **Product-Centric:** High-quality imagery is the hero
- **Trust & Artistry:** Communicate handmade quality through design
- **Fast & Intuitive:** Reduce friction in the shopping journey
- **Mobile-First:** Responsive design that works on all devices

---

## HOW TO RUN

```bash
npm install        # install dependencies
npm run dev        # start Vite dev server
npm run build      # production build
npm run preview    # preview production build
npm run lint       # run oxlint
```

`node_modules/` is present and all dependencies are installed. If a fresh clone is made, run `npm install` first.

---

## FOLDER STRUCTURE

```
crochet-shop/
├── .gitignore
├── .oxlintrc.json
├── context.md                     <- this file
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.js
├── node_modules/                  <- installed dependencies (git-ignored)
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── App.css                    <- leftover Vite template CSS (unused/legacy)
    ├── App.jsx                    <- router + providers
    ├── index.css                  <- global CSS (custom utilities, buttons, grids)
    ├── main.jsx                   <- React entry point
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── components/
    │   ├── cart/
    │   │   └── CartSidebar.jsx    <- slide-out cart drawer
    │   ├── common/
    │   │   ├── Breadcrumbs.jsx    <- breadcrumb nav
    │   │   ├── Footer.jsx         <- site footer
    │   │   ├── Header.jsx         <- sticky header + search + cart trigger
    │   │   ├── Pagination.jsx     <- numbered pagination w/ ellipsis
    │   │   ├── QuantitySelector.jsx <- +/- quantity stepper
    │   │   └── Toast.jsx          <- toast notification display
    │   └── products/
    │       ├── ImageGallery.jsx   <- product image + thumbnails + lightbox
    │       ├── ProductCard.jsx    <- grid product tile
    │       └── ProductFilters.jsx <- sidebar filter checkboxes
    ├── context/
    │   ├── CartContext.jsx        <- cart state + toast (localStorage)
    │   ├── FilterContext.jsx      <- FILTER state (built but NOT wired)
    │   ├── OrderContext.jsx       <- orders (localStorage)
    │   └── SearchContext.jsx      <- search state (localStorage-free)
    ├── data/
    │   └── products.js            <- 12 static products + 5 categories
    ├── pages/
    │   ├── About.jsx
    │   ├── Cart.jsx
    │   ├── Checkout.jsx           <- 3-step form (react-hook-form + zod)
    │   ├── Contact.jsx            <- contact form (react-hook-form + zod)
    │   ├── Home.jsx               <- hero + categories + new arrivals
    │   ├── OrderConfirmation.jsx  <- post-checkout order summary
    │   ├── ProductDetail.jsx      <- single product view
    │   ├── SearchResults.jsx      <- search results w/ pagination
    │   └── Shop.jsx               <- catalog w/ filters + sort + pagination
    ├── styles/
    │   └── globals.css            <- Tailwind directives + base styles + toast
    └── utils/
        └── validation.js          <- checkoutSchema (Zod)
```

---

## DEPENDENCIES (package.json)

### dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| React | ^19.2.8 | UI library |
| react-dom | ^19.2.8 | React DOM renderer |
| react-router-dom | ^7.18.3 | Routing |
| react-hook-form | ^7.86.0 | Form state + validation |
| @hookform/resolvers | ^5.9.1 | Bridge RHF ↔ Zod |
| zod | ^3.25.76 | Schema validation |
| axios | ^1.20.0 | HTTP client (INSTALLED BUT UNUSED — no API layer yet) |
| @tailwindcss/postcss | ^4.3.3 | Tailwind via PostCSS |

### devDependencies
| Package | Version |
|---------|---------|
| vite | ^8.2.2 |
| @vitejs/plugin-react | ^6.1.0 |
| tailwindcss | ^4.3.3 |
| @tailwindcss/postcss | — |
| autoprefixer | ^10.5.4 |
| postcss | ^8.5.26 |
| oxlint | ^1.79.0 |
| @types/react | ^19.2.18 |
| @types/react-dom | ^19.2.4 |

Note: `axios` is installed but unused. It was added in anticipation of a backend integration that has not been built. No `services/` or API layer exists.

---

## WHAT EACH FILE DOES

### Config & Entry Files

**index.html** — Vite HTML entry. Loads `/favicon.svg` icon and `/src/main.jsx` as the module script root. Title is "crochet-shop".

**vite.config.js** — Minimal Vite config; only the React plugin.

**postcss.config.js** — Enables `@tailwindcss/postcss`.

**tailwind.config.js** — Defines the color palette and font family:
- `primary: #B8C5B5`, `primary-dark: #A4B5A0`, `accent: #A59989`, `text-dark: #2D2D2D`, `text-light: #999999`, `bg-off: #F8F8F7`, `border-light: #D9D9D9`
- Font: Poppins

**src/main.jsx** — Renders `<App />` into `#root` inside `<React.StrictMode>`. Imports `./styles/globals.css` and `./index.css`.

**src/App.jsx** — Wraps the app in `CartProvider` → `OrderProvider` → `SearchProvider` → `Router`. Renders `Header`, `<main>` with all `Routes`, `Footer`, and `Toast`. Routes:
- `/` → Home, `/shop` → Shop, `/product/:id` → ProductDetail, `/cart` → Cart, `/search` → SearchResults, `/about` → About, `/contact` → Contact, `/checkout` → Checkout, `/order-confirmation/:orderId` → OrderConfirmation.
- **GAP:** `FilterProvider` is exported from `FilterContext.jsx` but is NOT wrapped in App.jsx — FilterContext is completely unused.

**src/index.css** — Global stylesheet. CSS custom properties mirroring tailwind colors. Contains: reset, typography, grid utilities (`.grid-1/2/4/5`), flex utilities, text/color/spacing/margin utilities, button styles (`.btn`, `.btn-primary`, `.btn-secondary`), container and card styles, header/nav styles, `.cart-badge`, footer styles, hero styles, section styles, product-card styles, trust-section styles. **Note:** `@media (max-width: 768px)` hides `.nav` and makes grids single-column.

**src/App.css** — Leftover Vite template CSS (hero/animation demo). Not used by any current page.

**src/styles/globals.css** — Tailwind directives (`@tailwind base/components/utilities`), Poppins import from Google Fonts, base resets, scrollbar styling, toast styles (`.toast`, `.toast.success`, `.toast.error`), and the `slideIn` keyframe animation.

### Data & Utils

**src/data/products.js** — Exports `PRODUCTS` (array of 12 product objects) and `CATEGORIES` (array of 5 category objects).
- Each product: `id, name, price, originalPrice (nullable), image (Unsplash URL), category, rating, reviews, stock ('in-stock' | 'made-to-order'), description`.
- Categories use slugs: `blankets`, `amigurumi`, `home-decor`, `hats`, `scarves`, and `baby-items` (used by some products) — note **`baby-items` has no category tile** in CATEGORIES.
- Static data — no API calls.

**src/utils/validation.js** — Exports `checkoutSchema` (Zod object) used by Checkout: shipping fields, `shippingMethod` enum, billing fields (optional), and payment fields (cardNumber 16 digits, cvv 3-4 digits). Includes a `.refine` requiring billing address when `sameAsShipping` is false.

### Context (State Management)

**src/context/CartContext.jsx** — Cart state persisted to `localStorage` (key `cart`). Provides: `cartItems`, `addToCart` (increments qty if exists), `removeFromCart`, `updateQuantity` (removes at <= 0), `getTotalPrice`, `getTotalItems`, plus toast state (`showToast`, `toastMessage`, `toastType`, `showToastMessage`). The toast provider value is fully exposed so any component can trigger a toast.

**src/context/OrderContext.jsx** — Orders persisted to `localStorage` (key `orders`). `createOrder(orderData)` builds an order with id `ORD-<timestamp>`, `date`, and the passed data; stores it and sets `currentOrder`. Provides `orders`, `currentOrder`, `createOrder`.

**src/context/SearchContext.jsx** — Non-persisted in-memory search. `performSearch(query)` filters `PRODUCTS` by name/description/category (case-insensitive). Provides `searchQuery`, `searchResults`, `performSearch`, `clearSearch`.

**src/context/FilterContext.jsx** — **UNUSED.** Would hold `filters` (categories/priceRanges/stock/sortBy) and `updateFilters`. Built but not wired into App.jsx — the Shop page currently manages filters locally with `useState`.

### Common Components

**src/components/common/Header.jsx** — Sticky header with: logo link, desktop nav (Home/Shop/About/Contact), search toggle button, wishlist button (**no-op**), cart button with badge opening `CartSidebar`, and a mobile menu button. **GAP:** the mobile hamburger button has `style={{ display: 'none' }}` so the mobile menu is effectively hidden. Header performs search (`performSearch` then `navigate('/search')`).

**src/components/common/Footer.jsx** — 4-column footer: brand/social, Shop links, Help links, and a Newsletter subscribe input. Social links and most link targets are `#` placeholders.

**src/components/common/Toast.jsx** — Reads toast state from `useCart()`; renders a fixed-position toast (green success / red error) when visible. Returns `null` otherwise.

**src/components/common/Breadcrumbs.jsx** — Renders a nav from an `items` array `[{ label, href? }]`. Current item (no href) is dark; links are primary color, separated by `/`.

**src/components/common/QuantitySelector.jsx** — Stepper with +/− buttons and a number input. Props: `quantity`, `onChange`, `min` (default 1), `max` (default 999). Clamps the value.

**src/components/common/Pagination.jsx** — Numbered pagination with smart ellipsis (max 5 visible windows). Props: `currentPage`, `totalPages`, `onPageChange`. Prev/Next buttons + numeric buttons.

### Cart Component

**src/components/cart/CartSidebar.jsx** — Slide-out drawer (right side, max 420px) with dark overlay. Locks body scroll while open. Lists cart items (image, name, line total, qty stepper, remove button), empty state ("Continue Shopping"), and a footer with subtotal + "View Cart" + "Checkout" links.

### Product Components

**src/components/products/ProductCard.jsx** — Grid tile: image linking to product detail, discount badge (`-%d`), wishlist heart (preventDefault **no-op**), name, star rating + review count, price (+ original struck-through), stock status label, and "Add to Cart" button.

**src/components/products/ImageGallery.jsx** — Main image (click → lightbox) + 4-thumbnail grid. Selecting a thumbnail sets active main image (highlighted border). Lightbox overlay with close button.

**src/components/products/ProductFilters.jsx** — Sidebar filter panel with expandable sections: Category, Price, Availability. Checkbox toggles update via `onFilterChange({ ...activeFilters, ... })`. Has "Clear All" button and local `expanded` state. Fully functional UI.

### Pages

**src/pages/Home.jsx** — Hero section ("Shop Now" → `/shop`), "Shop by Category" grid (links to `/shop?category=<slug>`), "New Arrivals" (first 4 products via ProductCard), and a trust section.
- **GAP:** Category links pass a `?category=` query param but Shop.jsx does NOT read `useSearchParams()` — so clicking a category does not actually filter the shop.

**src/pages/Shop.jsx** — Catalog. Local `useState` for `sortBy`, `currentPage`, and `filters` (categories/priceRanges/stock). Filters + sorts + paginates `PRODUCTS` via `useMemo`. Renders `ProductFilters` sidebar (280px) + results grid + `Pagination` + empty state with "Clear Filters". 12 items per page.

**src/pages/ProductDetail.jsx** — Single product. Reads `:id` param, finds product, renders Breadcrumbs, `ImageGallery` (repeats same image 4×), price, rating, stock badge, description, `QuantitySelector`, "Add to Cart" (calls `addToCart` `quantity` times) + wishlist heart (no-op), product-details table, and related products (same category). Handles unknown product with "Product not found" + back link.

**src/pages/Cart.jsx** — Full cart page. Empty state → "Continue Shopping". Otherwise: item table (image, name+desc, unit price, `QuantitySelector`, remove), plus sticky "Order Summary" sidebar (subtotal, "At checkout" shipping/tax, total) with Checkout + Continue Shopping links.

**src/pages/Checkout.jsx** — 3-step checkout (Shipping → Payment → Review). Uses `react-hook-form` + `zodResolver(checkoutSchema)` with `mode: 'onChange'`. Step indicator circles. Step 1: shipping fields + shipping-method radios; Step 2: payment fields (name, card number, expiry month/year, CVV) + "same as billing" checkbox (currently just UI state `sameAddress`, **billing fields are never collected/registered**); Step 3: order review (shipping address from `getValues`, items list). Sidebar shows live order summary (subtotal, shipping from `shippingMethod`, 10% tax, total). Submitting step 3 calls `createOrder` and navigates to `/order-confirmation/<id>`. Empty-cart guard. **Tax = 10% hardcoded.**
- **GAP:** The `sameAsShipping` checkbox (`sameAddress` state) does not actually register a field or conditionally show billing inputs. Billing address validation in the Zod schema is therefore effectively never triggered.

**src/pages/OrderConfirmation.jsx** — Post-checkout confirmation. Reads `:orderId`, finds order in `OrderContext`. Shows success header, order number/date, items, shipping address, and totals.
- **POTENTIAL BUG:** `useEffect` calls `localStorage.removeItem('cart')` **then `window.location.reload()`**. The reload re-mounts the page; on remount `CartContext` re-initializes `cartItems` from localStorage (now empty) so the cart clears. This is a heavy-handed way to clear the cart; the full-page reload is jarring and could be replaced by clearing cart state via context instead.

**src/pages/SearchResults.jsx** — Reads `searchQuery`/`searchResults` from `SearchContext`. Empty-query state; no-results state; otherwise shows result count, grid of results, and `Pagination` (12 per page).

**src/pages/About.jsx** — Static marketing page: Our Story, Our Values, Production Process (6 numbered steps), and a "Have Questions?" CTA linking to `/contact`.

**src/pages/Contact.jsx** — Contact page: contact info block (email/phone/address/hours/social) + a contact form using `react-hook-form` + local `contactSchema` (Zod: name, email, subject, message) + FAQ section (4 items). On submit: logs to console (`console.log`), shows success toast via `showToastMessage`, resets form, and shows inline success message for 3s. **No backend — message is not actually sent anywhere.**

---

## WHAT HAS BEEN ACCOMPLISHED

- Full Vite + React 19 + Tailwind 4 scaffold configured and working.
- Design system (colors, fonts, utility CSS) implemented in `index.css`, `globals.css`, and `tailwind.config.js`.
- 9 pages built and routed: Home, Shop, ProductDetail, Cart, SearchResults, About, Contact, Checkout, OrderConfirmation.
- 12 static products + 5 categories in `src/data/products.js`.
- Reusable components: Header, Footer, Toast, Breadcrumbs, QuantitySelector, Pagination, CartSidebar, ProductCard, ImageGallery, ProductFilters.
- Cart with localStorage persistence, slide-out sidebar, quantity management, and toast notifications.
- 3-step checkout with Zod validation via react-hook-form.
- Order placement + order-confirmation flow, with orders persisted to localStorage.
- Search across products (name/description/category) with dedicated results page.
- Shop filtering (category/price/stock) + sorting (price/rating) + pagination (all locally in Shop.jsx).

---

## WHAT'S LEFT / KNOWN GAPS

1. **No API / backend:** `axios` installed but unused; all data is static in `src/data/products.js`. No services layer, no fetch calls, no auth.
2. **FilterContext is dead code:** exported and built but never wrapped in App.jsx and never used; Shop.jsx manages filters locally. Decide whether to wire it in or delete it.
3. **Category links on Home are broken:** Home links to `/shop?category=slug` but Shop.jsx doesn't read `useSearchParams`, so no filtering occurs.
4. **Search doesn't use URL params:** search state lives only in `SearchContext` (in-memory); navigating directly to `/search` shows "No search query". No URL persistence.
5. **Mobile hamburger menu hidden:** the hamburger toggle button has `style={{ display: 'none' }}` in Header.jsx — effectively no mobile nav (desktop `.nav` is also hidden under 768px via CSS, so mobile users have no nav links at all). Needs fixing.
6. **Wishlist is a no-op:** the ♡ button in ProductCard, ProductDetail, and Header does nothing (just `preventDefault`/no handler).
7. **Billing address never collected:** Checkout's "same as billing" checkbox (`sameAddress`) is UI-only; no billing fields are rendered, so the `sameAsShipping=false` branch of the Zod schema can't be exercised.
8. **OrderConfirmation reload bug:** `useEffect` does `localStorage.removeItem('cart')` + `window.location.reload()` on every order render. This is risky (could loop/infinite-reload in some navigations) and jarring. Better: clear cart via a CartContext method (e.g. `clearCart`) on submit.
9. **No 404 page:** unknown routes fall through to nothing (React Router renders empty main) for unmatched paths.
10. **No lazy loading / code splitting:** all routes eagerly imported in App.jsx; could use `React.lazy` + `Suspense`.
11. **`baby-items` category mismatch:** category slug `baby-items` is used by products but has no entry in `CATEGORIES` (no tile on Home, not in ProductFilters list).
12. **Newsletter & footer/social links are placeholders** (`#`), and the newsletter subscribe has no handler.
13. **Contact form logs to console only** — no backend to actually send messages.
14. **Duplicate/legacy CSS:** `src/App.css` is leftover Vite template CSS not used by any page; could be deleted.
15. **Product images:** only one image URL per product; `ImageGallery` repeats the same image 4× in ProductDetail.
16. **No payment provider, no shipping provider, no cart persistence beyond localStorage or stock management.**

---

## RECOMMENDED NEXT STEPS (prioritized)

1. Fix mobile navigation (remove `display: 'none'` and make `.nav` show a proper responsive menu).
2. Wire category query params on /shop (`useSearchParams`) so Home category tiles actually filter.
3. Fix OrderConfirmation cart-clear (`replace window.location.reload` with a `clearCart` context method called on checkout submit).
4. Decide on FilterContext: wire it into App.jsx and Shop, or remove it.
5. Implement a real API layer (axios + services), or add `GET /products` to connect static data to a backend.
6. Add a 404 route, URL-persist search, implement wishlist, and collect billing address.
7. Add lazy loading with `React.lazy`/`Suspense` for route pages.

---

## FULL SOURCE CODE (every file, current)

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
        primary: '#B8C5B5',
        'primary-dark': '#A4B5A0',
        accent: '#A59989',
        'text-dark': '#2D2D2D',
        'text-light': '#999999',
        'bg-off': '#F8F8F7',
        'border-light': '#D9D9D9',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
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
    <title>crochet-shop</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### .oxlintrc.json
```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

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
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import { SearchProvider } from './context/SearchContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Toast from './components/common/Toast'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import SearchResults from './pages/SearchResults'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <SearchProvider>
          <Router>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
              <Header />
              <main style={{ flexGrow: 1 }}>
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
                </Routes>
              </main>
              <Footer />
              <Toast />
            </div>
          </Router>
        </SearchProvider>
      </OrderProvider>
    </CartProvider>
  )
}

export default App
```

### src/index.css
```css
:root {
  --primary: #B8C5B5;
  --primary-dark: #A4B5A0;
  --accent: #A59989;
  --text-dark: #2D2D2D;
  --text-light: #999999;
  --bg-off: #F8F8F7;
  --border-light: #D9D9D9;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: white;
  color: var(--text-dark);
  line-height: 1.6;
}

html, body, #root {
  width: 100%;
  height: 100%;
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

/* Grid utilities */
.grid-1 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.grid-5 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .grid-2, .grid-4, .grid-5 {
    grid-template-columns: 1fr;
  }
}

/* Flex utilities */
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

/* Text utilities */
.text-center {
  text-align: center;
}

.text-sm {
  font-size: 14px;
}

.text-lg {
  font-size: 18px;
}

.text-xl {
  font-size: 20px;
}

.text-2xl {
  font-size: 24px;
}

.text-3xl {
  font-size: 28px;
}

.text-4xl {
  font-size: 36px;
}

.text-5xl {
  font-size: 48px;
}

.text-6xl {
  font-size: 56px;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

/* Colors */
.text-dark {
  color: var(--text-dark);
}

.text-light {
  color: var(--text-light);
}

.text-primary {
  color: var(--primary);
}

.bg-white {
  background: white;
}

.bg-off {
  background: var(--bg-off);
}

.bg-primary {
  background: var(--primary);
  color: white;
}

.border-bottom {
  border-bottom: 1px solid var(--border-light);
}

.border-top {
  border-top: 1px solid var(--border-light);
}

/* Spacing */
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

/* Buttons */
.btn {
  padding: 12px 32px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary);
  color: white;
}

/* Containers */
.container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
}

.card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: white;
  border-bottom: 1px solid var(--border-light);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-dark);
}

.logo-accent {
  color: var(--primary);
}

.nav {
  display: flex;
  gap: 32px;
}

.nav a {
  font-weight: 600;
  color: var(--text-dark);
  transition: color 0.3s ease;
}

.nav a:hover {
  color: var(--accent);
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .header-inner {
    height: 60px;
  }
}

/* Icons */
.icon-btn {
  background: transparent;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s ease;
}

.icon-btn:hover {
  color: var(--accent);
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--primary);
  color: white;
  font-size: 12px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Footer */
.footer {
  background: var(--bg-off);
  border-top: 1px solid var(--border-light);
  margin-top: 64px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  padding: 48px 16px;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}

/* Hero */
.hero {
  background: linear-gradient(to right, var(--bg-off), white);
  padding: 80px 16px;
  text-align: center;
}

.hero h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 32px;
  }
}

/* Section */
.section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 64px 16px;
}

.section h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 48px;
  text-align: center;
}

/* Product Card */
.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.product-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
  background: var(--bg-off);
  overflow: hidden;
  position: relative;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #E74C3C;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
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
  font-size: 20px;
  transition: all 0.3s ease;
}

.product-wishlist:hover {
  background: var(--primary);
}

.product-info {
  padding: 16px;
}

.product-title {
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 8px;
  font-size: 14px;
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

.product-rating .stars {
  color: #FFD700;
  margin-right: 8px;
}

.product-rating .count {
  font-size: 12px;
  color: var(--text-light);
}

.product-price {
  margin-bottom: 12px;
}

.product-price .current {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-dark);
}

.product-price .original {
  font-size: 14px;
  color: var(--text-light);
  text-decoration: line-through;
  margin-left: 8px;
}

.product-status {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
  display: block;
}

.product-status.in-stock {
  color: #27AE60;
}

.product-status.made-to-order {
  color: #F39C12;
}

.product-card button {
  width: 100%;
  padding: 12px;
  background: var(--primary);
  color: white;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
  text-transform: uppercase;
}

.product-card button:hover {
  background: var(--primary-dark);
}

/* Trust Section */
.trust-section {
  background: var(--bg-off);
  padding: 48px 16px;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
}

.trust-item {
  font-size: 32px;
  margin-bottom: 16px;
}

.trust-title {
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.trust-desc {
  font-size: 14px;
  color: var(--text-light);
}
```

### src/styles/globals.css
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  background: #FFFFFF;
  color: #2D2D2D;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  width: 100%;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #F8F8F7;
}

::-webkit-scrollbar-thumb {
  background: #B8C5B5;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #A4B5A0;
}

button, a, input {
  transition: all 0.3s ease;
}

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 6px;
  z-index: 9999;
  animation: slideIn 0.3s ease;
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
  background: #27AE60;
  color: white;
}

.toast.error {
  background: #E74C3C;
  color: white;
}

/* Ensure text is visible */
body {
  line-height: 1.6;
}

img {
  max-width: 100%;
  height: auto;
}
```

### src/data/products.js
```js
export const PRODUCTS = [
  {
    id: 1,
    name: 'Cozy Cream Blanket',
    price: 89.99,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1577720643272-265ae65d1e24?w=400&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1590080876-0cd6deb56e18?w=400&h=400&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop',
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
  { id: 1, name: 'Blankets & Throws', slug: 'blankets', image: 'https://images.unsplash.com/photo-1577720643272-265ae65d1e24?w=300&h=300&fit=crop' },
  { id: 2, name: 'Amigurumi & Toys', slug: 'amigurumi', image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=300&h=300&fit=crop' },
  { id: 3, name: 'Home Décor', slug: 'home-decor', image: 'https://images.unsplash.com/photo-1584210566956-e409b84b3f4a?w=300&h=300&fit=crop' },
  { id: 4, name: 'Hats & Beanies', slug: 'hats', image: 'https://images.unsplash.com/photo-1576618124519-894a7b17587b?w=300&h=300&fit=crop' },
  { id: 5, name: 'Scarves & Wraps', slug: 'scarves', image: 'https://images.unsplash.com/photo-1590080876-0cd6deb56e18?w=300&h=300&fit=crop' },
];
```

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

### src/context/FilterContext.jsx
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

### src/components/common/Header.jsx
```jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useSearch } from '../../context/SearchContext'
import CartSidebar from '../cart/CartSidebar'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState('')
  const { getTotalItems } = useCart()
  const { performSearch } = useSearch()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInputValue.trim()) {
      performSearch(searchInputValue)
      navigate('/search')
      setSearchInputValue('')
      setSearchOpen(false)
    }
  }

  return (
    <>
      <header className="header">
        <div className="header-inner">
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
            <button className="icon-btn" title="Wishlist">♡</button>
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
            <button 
              className="icon-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none' }}
              title="Menu"
            >
              ☰
            </button>
          </div>
        </div>

        {searchOpen && (
          <div style={{ padding: '16px', borderTop: '1px solid #D9D9D9', backgroundColor: 'white' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                autoFocus
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
          </div>
        )}

        {mobileMenuOpen && (
          <div style={{ padding: '16px', borderTop: '1px solid #D9D9D9', backgroundColor: 'white' }}>
            <Link to="/" style={{ display: 'block', padding: '12px 0', textDecoration: 'none', fontWeight: 600, color: '#2D2D2D' }}>Home</Link>
            <Link to="/shop" style={{ display: 'block', padding: '12px 0', textDecoration: 'none', fontWeight: 600, color: '#2D2D2D' }}>Shop</Link>
            <Link to="/about" style={{ display: 'block', padding: '12px 0', textDecoration: 'none', fontWeight: 600, color: '#2D2D2D' }}>About</Link>
            <Link to="/contact" style={{ display: 'block', padding: '12px 0', textDecoration: 'none', fontWeight: 600, color: '#2D2D2D' }}>Contact</Link>
          </div>
        )}
      </header>

      <CartSidebar isOpen={cartSidebarOpen} onClose={() => setCartSidebarOpen(false)} />
    </>
  )
}
```

### src/components/common/Footer.jsx
```jsx
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
```

### src/components/common/Toast.jsx
```jsx
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
      borderRadius: '6px',
      zIndex: 9999,
      backgroundColor: toastType === 'success' ? '#27AE60' : '#E74C3C',
      color: 'white',
      fontWeight: 600,
      fontSize: '14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      animation: 'slideIn 0.3s ease',
    }}>
      {toastMessage}
    </div>
  )
}
```

### src/components/common/Breadcrumbs.jsx
```jsx
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
```

### src/components/common/QuantitySelector.jsx
```jsx
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
```

### src/components/common/Pagination.jsx
```jsx
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
```

### src/components/cart/CartSidebar.jsx
```jsx
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
```

### src/components/products/ProductCard.jsx
```jsx
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {discount && (
            <div className="product-badge">-{discount}%</div>
          )}
          
          <button 
            className="product-wishlist"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            ♡
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
  )
}
```

### src/components/products/ImageGallery.jsx
```jsx
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
```

### src/components/products/ProductFilters.jsx
```jsx
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
```

### src/pages/Home.jsx
```jsx
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
```

### src/pages/Shop.jsx
```jsx
import { useState, useMemo } from 'react'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import ProductFilters from '../components/products/ProductFilters'
import Pagination from '../components/common/Pagination'

export default function Shop() {
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    categories: [],
    priceRanges: [],
    stock: [],
  })

  const itemsPerPage = 12

  // Apply filters
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Price filter
      if (filters.priceRanges.length > 0) {
        const inPriceRange = filters.priceRanges.some(
          range => product.price >= range.min && product.price <= range.max
        )
        if (!inPriceRange) return false
      }

      // Stock filter
      if (filters.stock.length > 0 && !filters.stock.includes(product.stock)) {
        return false
      }

      return true
    })
  }, [filters])

  // Apply sorting
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

  // Pagination
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
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '48px', color: '#2D2D2D' }}>
          All Products
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px' }}>
          {/* Sidebar */}
          <ProductFilters onFilterChange={handleFilterChange} activeFilters={filters} />

          {/* Main Content */}
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
```

### src/pages/ProductDetail.jsx
```jsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { PRODUCTS } from '../data/products'
import ImageGallery from '../components/products/ImageGallery'
import Breadcrumbs from '../components/common/Breadcrumbs'
import QuantitySelector from '../components/common/QuantitySelector'
import ProductCard from '../components/products/ProductCard'

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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '80px' }}>
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

        {relatedProducts.length > 0 && (
          <div>
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
```

### src/pages/Cart.jsx
```jsx
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
```

### src/pages/Checkout.jsx
```jsx
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
```

### src/pages/OrderConfirmation.jsx
```jsx
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
```

### src/pages/SearchResults.jsx
```jsx
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
```

### src/pages/About.jsx
```jsx
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
```

### src/pages/Contact.jsx
```jsx
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
```

### src/App.css (leftover Vite template CSS — NOT used by any current page)
```css
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
