import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/products/ProductCard'

export default function Wishlist() {
  const { wishlistItems } = useWishlist()

  return (
    <div className="section" style={{ paddingTop: '48px', minHeight: '60vh' }}>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 600, color: 'var(--ink)', textAlign: 'center', marginBottom: '48px' }}>
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <div style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '64px' }}>
          <p style={{ fontSize: '40px', marginBottom: '16px' }}>♡</p>
          <p style={{ fontSize: '18px', color: 'var(--text-light)', marginBottom: '24px' }}>
            Your wishlist is empty — save items you love.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid-4">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}