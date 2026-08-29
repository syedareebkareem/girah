import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {discount && (
            <div className="product-badge">-{discount}%</div>
          )}
          
          <button 
            className="product-wishlist"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            ♡
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
  )
}
