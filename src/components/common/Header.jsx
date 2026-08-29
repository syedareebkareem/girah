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
