import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartSidebar from '../cart/CartSidebar'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { getTotalItems } = useCart()

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
            <button className="icon-btn" style={{ display: 'none' }}>🔍</button>
            <button className="icon-btn" style={{ display: 'none' }}>🤍</button>
            <button className="icon-btn" style={{ position: 'relative' }} onClick={() => setCartOpen(true)}>
              🛍️
              {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-nav-panel">
            <Link to="/" onClick={closeMobileMenu}>Home</Link>
            <Link to="/shop" onClick={closeMobileMenu}>Shop</Link>
            <Link to="/about" onClick={closeMobileMenu}>About</Link>
            <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
          </div>
        )}
      </header>

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
