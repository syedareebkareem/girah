import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import CartSidebar from '../cart/CartSidebar'
import SearchAutocomplete from './SearchAutocomplete'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { getTotalItems } = useCart()
  const { wishlistItems } = useWishlist()

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <button
            className="icon-btn mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <Link to="/" style={{ textDecoration: 'none' }} onClick={closeMobileMenu}>
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
            <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} title="Search">
              🔍
            </button>
            <Link to="/account" style={{ textDecoration: 'none' }}>
              <button className="icon-btn" title="Account">👤</button>
            </Link>
            <Link to="/wishlist" style={{ position: 'relative', textDecoration: 'none' }}>
              <button className="icon-btn" title="Wishlist">
                {wishlistItems.length > 0 ? '♥' : '♡'}
              </button>
              {wishlistItems.length > 0 && <span className="cart-badge">{wishlistItems.length}</span>}
            </Link>
            <button className="icon-btn" style={{ position: 'relative' }} onClick={() => setCartOpen(true)} title="Cart">
              🛍️
              {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div style={{ padding: '16px', borderTop: '1px solid var(--border-light)', backgroundColor: 'white' }}>
            <div className="container">
              <SearchAutocomplete onClose={() => setSearchOpen(false)} />
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="mobile-nav-panel">
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
            <Link to="/shop" onClick={closeMobileMenu}>Shop</Link>
            <Link to="/wishlist" onClick={closeMobileMenu}>
              Wishlist{wishlistItems.length > 0 ? ` (${wishlistItems.length})` : ''}
            </Link>
            <Link to="/account" onClick={closeMobileMenu}>My Account</Link>
            <Link to="/about" onClick={closeMobileMenu}>About</Link>
            <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
          </div>
        )}
      </header>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}