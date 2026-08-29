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
