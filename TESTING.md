# CROCHET SHOP — MANUAL TEST GUIDE

This project is **purely frontend** — all data is static (`src/data/products.js`) and state persists in `localStorage`. There is no backend, API, or authentication. Everything below can be tested in the browser with `npm run dev`.

> Tip: Use an incognito/private window or clear `localStorage` & `Session Storage` before starting so test 1 isn't affected by old data.

---

## SETUP

```bash
npm install
npm run dev
```

Open the printed URL (usually `http://localhost:5173`). Check the DevTools → Console for errors as you go (Expected: none; there is one `console.log` in Contact.jsx on submit).

Pass / Fail for every step. Stop and report failures.

---

## 1. HEADER & NAVIGATION

| # | Action | Expected |
|---|--------|----------|
| 1.1 | Load `/` | Sticky header with logo "CrochetShop", nav links Home/Shop/About/Contact, and search 🔍, wishlist ♡, cart 🛒 icons. |
| 1.2 | Click **Shop** | Goes to `/shop`, page title "All Products". |
| 1.3 | Click **About** | Goes to `/about`. |
| 1.4 | Click **Contact** | Goes to `/contact`. |
| 1.5 | Click logo | Returns to `/`. |
| 1.6 | Resize to mobile width (<768px) | **KNOWN GAP:** nav links disappear and the hamburger ☰ is hidden (`display:none`) — no mobile nav. Note it; don't fix during this pass. |

## 2. SEARCH

| # | Action | Expected |
|---|--------|----------|
| 2.1 | Click 🔍 | Search bar expands below header. |
| 2.2 | Type `blanket` + Enter | Navigates to `/search`, shows "Found 3 products matching 'blanket'" (Cozy Cream, Multicolor Throw, Baby Blanket) with grid. |
| 2.3 | Search `zebra` | "No results found for 'zebra'" + "Browse All Products" button. |
| 2.4 | Click 🔍 then close (press Escape/click again? — there's no Escape handler; toggle 🔍 to close) | Search bar hides. |
| 2.5 | Navigate directly to `/search` in URL bar | "No search query" empty state (search is in-memory, not URL-driven). Note this as known behavior. |

## 3. HOME PAGE

| # | Action | Expected |
|---|--------|----------|
| 3.1 | Load `/` | Hero ("Handcrafted Crochet, Made with Love"), "Shop by Category" (5 tiles), "New Arrivals" (4 ProductCards), trust section. |
| 3.2 | Click **Shop Now** | Goes to `/shop`. |
| 3.3 | Click a category tile (e.g. Blankets) | URL becomes `/shop?category=blankets` but **shop shows ALL products — category is NOT applied.** KNOWN GAP (Shop doesn't read query params). Note it. |
| 3.4 | Hover a category image | Image scales up (hover effect). |
| 3.5 | Hover an "Add to Cart" on a New Arrival card | Button darkens. |

## 4. FOOTER

| # | Action | Expected |
|---|--------|----------|
| 4.1 | Scroll to bottom | 4 columns: brand/social, Shop, Help, Newsletter. **Note:** most links are `#` placeholders (do nothing) except "All Products" → `/shop`. |
| 4.2 | Click **All Products** | Goes to `/shop`. |
| 4.3 | Type email in Newsletter + Subscribe | **Nothing happens** (no handler). KNOWN GAP. |

## 5. SHOP PAGE (FILTERS / SORT / PAGINATION)

| # | Action | Expected |
|---|--------|----------|
| 5.1 | Go to `/shop` | "All Products" header, left sidebar "Filters", shows "Showing 1–12 of 12 results". |
| 5.2 | Toggle **Category → Blankets & Throws** | Grid filters to 2 items (Cozy Cream, Multicolor Throw), results count updates. **Note:** Filter list has no "Baby Items" category even though 2 products use it (known mismatch). |
| 5.3 | Toggle another category | Both categories combined (union). |
| 5.4 | Taggle **Price → Under $25** | Only cheap items remain. |
| 5.5 | Toggle **Availability → Made to Order** | Only made-to-order items remain. |
| 5.6 | Click **Clear All** | All filters cleared, all 12 shown. |
| 5.7 | Set filters producing 0 results (e.g. Under $25 + Made to Order?) | "No products found matching your filters." + "Clear Filters" button works. |
| 5.8 | Sort = **Price: Low to High** | Prices ascending. |
| 5.9 | Sort = **Price: High to Low** | Descending. |
| 5.10 | Sort = **Highest Rated** | Sorted by rating desc. |
| 5.11 | Pagination | With only 12 products and 12/page, no pagination appears (totalPages 1). To test pagination, use SearchResults or note Pagination component only shows when >12 results. |
| 5.12 | Click **Add to Cart** on a product card | Toast "✓ Added to cart!" appears top-right for 3s; cart badge increments: 🛒1. |

## 6. PRODUCT DETAIL

| # | Action | Expected |
|---|--------|----------|
| 6.1 | From shop, click a product image/title | Goes to `/product/<id>`. Breadcrumbs: Home / Shop / <Name>. |
| 6.2 | Image gallery | Same image repeated 4× (only 1 image per product). Click a thumbnail → becomes the main image (border highlight). |
| 6.3 | Click main image | Lightbox opens (dark overlay, large image). Click ✕ or overlay | closes. |
| 6.4 | Quantity `+` / `−` | Increments/decrements (min 1). Type a value in the box | clamps to 1–999. |
| 6.5 | Click **Add to Cart** | Adds `quantity` × the product; toast appears; cart badge increments by that many. |
| 6.6 | Click **♡** | **Nothing happens** (no-op). KNOWN GAP. |
| 6.7 | Related Products section | Shows up to 4 items in same category (e.g. on a Blanket → both other blankets). |
| 6.8 | Visit `/product/999` | "Product not found" + "Back to Shop" button works. |

## 7. CART & CART SIDEBAR

| # | Action | Expected |
|---|--------|----------|
| 7.1 | Add 2+ items (mix quantities using Product Detail) | Header 🛒 badge shows total unit count (sum of quantities). |
| 7.2 | Click 🛒 | Cart sidebar slides in from right; overlay dims page; background scroll locks. |
| 7.3 | In sidebar: use `+`/`−` | Quantity and line total update; subtotal updates. |
| 7.4 | Set quantity to 1 then `−` | Item is REMOVED (quantity 0 removes). |
| 7.5 | Click `×` on an item | Item removed + toast "Item removed from cart". |
| 7.6 | Click overlay (dark area) | Sidebar closes. |
| 7.7 | Click **View Cart** | Goes to `/cart`, sidebar closes. |
| 7.8 | Click **Checkout** (sidebar) | Goes to `/checkout`, sidebar closes. |
| 7.9 | Empty the cart, reopen sidebar | "Your cart is empty" + "Continue Shopping" button → `/shop`. |
| 7.10 | **Persistence:** add items, hard refresh (F5) | Cart kept (localStorage). **Clearing** localStorage clears cart. |

## 8. CART PAGE

| # | Action | Expected |
|---|--------|----------|
| 8.1 | Add items, go to `/cart` | Table: Image / Product / Price / Quantity / remove (🗑). |
| 8.2 | Change quantity via stepper | Line total + Order Summary Subtotal/Total update live. |
| 8.3 | Click 🗑 | Item removed. |
| 8.4 | Empty cart | "Your cart is empty" + "Continue Shopping" → `/shop`. |
| 8.5 | Right column: **Proceed to Checkout** | → `/checkout`. |
| 8.6 | Right column shows Subtotal + "At checkout" for Shipping/Tax, Total = subtotal. |

## 9. CHECKOUT (3-STEP FORM)

### Step 1 — Shipping
| # | Action | Expected |
|---|--------|----------|
| 9.1 | Submit empty form | Red borders + messages under fields (Zod validation, on-change). First name/phone/zip min lengths; email must be valid. |
| 9.2 | First name `A` | Error "First name must be at least 2 characters". |
| 9.3 | Enter valid shipping data, select shipping method | Standard ($0), Express ($15), Overnight ($30); Express/Overnight must show a shipping cost in the summary (default 0 = Standard). |
| 9.4 | Click **Continue** | Moves to step 2 (indicator shows circle 2 filled, → 3). |

### Step 2 — Payment
| # | Action | Expected |
|---|--------|----------|
| 9.5 | Submit empty | Card name/card number/expiry/cvv errors shown. |
| 9.6 | Card number `1234` | "Card number must be 16 digits". |
| 9.7 | CVV `12` | "CVV must be 3-4 digits". |
| 9.8 | Enter: name on card, `4111111111111111`, month, future year, CVV `123` | No errors. **Billing checkbox** toggles but does nothing (same-address fields never appear). KNOWN GAP. |
| 9.9 | Click **Continue** | Step 3 — Order Review: shows shipping address (from step 1) + items list. |

### Step 3 — Review
| # | Action | Expected |
|---|--------|----------|
| 9.10 | Verify summary sidebar: Subtotal + Shipping + Tax (10%) + Total (subtotal + shipping + 10%) | Calculations consistent. |
| 9.11 | Click **Back** | Returns to step 2 (keeps entered data — form state preserved). |
| 9.12 | Click **Place Order** | Navigates to `/order-confirmation/<ORD-...>`. |

## 10. ORDER CONFIRMATION

| # | Action | Expected |
|---|--------|----------|
| 10.1 | After placing order | Green "Order Confirmed!" ✓, Order Number (ORD-<timestamp>), Order Date. |
| 10.2 | Order Details | Items (with image, qty, line totals), shipping address, subtotal/shipping/tax/total. |
| 10.3 | **Cart cleared check:** click 🛒 or go `/cart` | Cart should now be EMPTY (it was cleared on confirmation). |
| 10.4 | **KNOWN BUG CHECK:** When this page loads it calls `localStorage.removeItem('cart')` then `window.location.reload()`. Observe a full reload flash on the confirmation page. Report if it causes double-reload or anything odd. |
| 10.5 | **Continue Shopping** → `/shop`, **Back to Home** → `/`. |
| 10.6 | Refresh the confirmation URL | Order still found (persisted in localStorage 'orders'). Clear localStorage → "Order not found". |

## 11. ABOUT & CONTACT

| # | Action | Expected |
|---|--------|----------|
| 11.1 | `/about` | Story, Values (4), Production Process (6 numbered steps), "Have Questions?" → Contact Us. |
| 11.2 | `/contact` | Left: contact info (email/phone/address/hours/social). Right: form. Below: 4 FAQs (accordions? No — static blocks, all expanded). |
| 11.3 | Contact form empty submit | Validation errors (name ≥2, email valid, subject ≥5, message ≥10). |
| 11.4 | Valid submit | Toast "Message sent!...", form resets, inline green "✓ Message sent successfully!" for 3s, and the data is `console.log`ged (check DevTools). **Message is not actually sent anywhere** — KNOWN GAP (frontend only). |

## 12. ROUTING / EDGE CASES

| # | Action | Expected |
|---|--------|----------|
| 12.1 | Visit `/nonexistent` | **KNOWN GAP:** no 404 page — blank main area (header/footer render). Report. |
| 12.2 | Visit `/checkout` with empty cart | "Your cart is empty" + Continue Shopping. |
| 12.3 | Refresh on a sub-page (`/shop`, `/product/1`, `/cart`) | Page reloads correctly (SPA route; via Vite dev fine). |
| 12.4 | Add to cart ×3, hard refresh | Badge persists (localStorage). |

## 13. RESPONSIVE / MOBILE

| # | Action | Expected |
|---|--------|----------|
| 13.1 | Width ~375px | Hero text shrinks, grids become single column. |
| 13.2 | Nav | **GONE** (no hamburger visible) — KNOWN GAP. |
| 13.3 | Cart sidebar | Full-width up to 420px, works on mobile. |
| 13.4 | Shop filters | Sidebar is a fixed 280px column — on mobile this may be cramped/overflow. **Check & report layout.** |

## 14. KNOWN GAPS (verify they exist, then we fix together)

1. **No backend/API** — axios installed but unused; all data static. (By design — frontend only.)
2. **Category tiles on Home** link to `/shop?category=...` but Shop ignores the param (no filtering).
3. **Mobile nav hidden** — hamburger has `display:none`; no nav under 768px.
4. **Wishlist ♡** (header, card, detail) — no-op.
5. **Billing address** checkbox in Checkout does nothing; billing fields never rendered.
6. **OrderConfirmation** uses `window.location.reload()` to clear cart (jarring; potential double-reload).
7. **No 404 page.**
8. **No lazy loading / code splitting.**
9. **`baby-items`** category used by products but missing from CATEGORIES/ProductFilters.
10. **Newsletter & social/footer links** are placeholders.
11. **Contact form** only `console.log`s (no backend).
12. **Search** is in-memory only (no URL persistence; direct `/search` shows empty state).
13. **`src/App.css`** is leftover unused Vite template CSS.

---

## TEST SUMMARY

- **Tests passed:** ___/___ of the functional ones
- **Failures:** list them here
- **Confirmed gaps:** list which of the 13 you reproduced
- **Browser/OS:** ______
- **Notes:** anything unexpected
