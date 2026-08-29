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
