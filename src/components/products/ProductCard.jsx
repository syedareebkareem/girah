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
