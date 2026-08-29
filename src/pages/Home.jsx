import { Link } from 'react-router-dom'
import { CATEGORIES, PRODUCTS } from '../data/products'
import ProductCard from '../components/products/ProductCard'

export default function Home() {
  const newArrivals = PRODUCTS.slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Handcrafted Crochet, Made with Love</h1>
          <p style={{ fontSize: '18px', color: '#999999', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Unique, cozy pieces crafted with care for your loved ones
          </p>
          <Link to="/shop" className="btn btn-primary">Shop Now</Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section">
        <h2>Shop by Category</h2>
        <div className="grid-5">
          {CATEGORIES.map(category => (
            <Link key={category.id} to={`/shop?category=${category.slug}`}>
              <div style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '8px' }}>
                <img 
                  src={category.image} 
                  alt={category.name}
                  style={{ width: '100%', height: '192px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{ marginTop: '12px', textAlign: 'center' }}>
                  <p style={{ fontWeight: 600, color: '#2D2D2D' }}>
                    {category.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section">
        <h2>New Arrivals</h2>
        <div className="grid-4">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/shop" className="btn btn-secondary">View All Products</Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-grid">
          <div>
            <p className="trust-item">🎁</p>
            <h3 className="trust-title">Handmade Gifts</h3>
            <p className="trust-desc">Unique pieces, one at a time</p>
          </div>
          <div>
            <p className="trust-item">🌿</p>
            <h3 className="trust-title">Eco-Friendly</h3>
            <p className="trust-desc">Sustainable materials</p>
          </div>
          <div>
            <p className="trust-item">✓</p>
            <h3 className="trust-title">Quality Guaranteed</h3>
            <p className="trust-desc">Made with expertise</p>
          </div>
        </div>
      </section>
    </div>
  )
}
