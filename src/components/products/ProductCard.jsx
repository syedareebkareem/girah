import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [imgError, setImgError] = useState(false)
  const wishlisted = isInWishlist(product.id)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <div className="product-image">
          {imgError ? (
            <div style={{
              width: '100%', height: '100%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '40px', background: 'var(--cream-dark)'
            }}>
              🧶
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          )}
          {discount && <div className="product-badge">-{discount}%</div>}
        </div>
      </Link>

      <button
        className="product-wishlist"
        onClick={(e) => { e.preventDefault(); toggleWishlist(product) }}
        style={{ position: 'absolute', marginTop: '-232px', marginLeft: '12px', color: wishlisted ? 'var(--rust)' : 'var(--ink)' }}
      >
        {wishlisted ? '♥' : '♡'}
      </button>

      <div className="product-info">
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-title">{product.name}</h3>
        </Link>

        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="count">({product.reviews})</span>
        </div>

        <div className="product-price">
          <span className="current">Rs. {product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="original">Rs. {product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <span className={`product-status ${product.stock === 'in-stock' ? 'in-stock' : 'made-to-order'}`}>
          {product.stock === 'in-stock' ? '● In Stock' : '● Made to Order'}
        </span>

        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  )
}
