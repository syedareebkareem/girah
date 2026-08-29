import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/products/ProductCard'

export default function Wishlist() {
  const { wishlistItems } = useWishlist()

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '48px', color: '#2D2D2D' }}>
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '64px', paddingBottom: '64px' }}>
            <p style={{ fontSize: '18px', color: '#999999', marginBottom: '24px' }}>
              Your wishlist is empty
            </p>
            <Link
              to="/shop"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                backgroundColor: '#B8C5B5',
                color: 'white',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
              }}
            >
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
    </div>
  )
}
