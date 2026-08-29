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
