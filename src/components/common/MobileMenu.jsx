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
