import { Link } from 'react-router-dom'
import { CATEGORIES, PRODUCTS } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import ChainDivider from '../components/common/ChainDivider'

export default function Home() {
  const newArrivals = PRODUCTS.slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <span className="eyebrow-tag">🧶 Handmade, Not Mass-Made</span>
          <h1>Handcrafted Crochet, Made with Love</h1>
          <p style={{ fontSize: '18px', color: 'var(--text-light)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Unique, cozy pieces crafted with care — perfect for gifting or keeping for yourself.
          </p>
          <Link to="/shop" className="btn btn-primary">Shop Now</Link>
        </div>
      </section>

      <ChainDivider color="#C4592E" background="#FBF3E7" />

      {/* Featured Categories */}
      <section className="section">
        <h2>Shop by Category</h2>
        <p className="section-subtitle">Five little collections, each one made by hand</p>
        <div className="grid-5">
          {CATEGORIES.map(category => (
            <Link key={category.id} to={`/shop?category=${category.slug}`}>
              <div className="category-card">
                <img src={category.image} alt={category.name} />
                <div className="category-card-label">
                  <span>{category.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section" style={{ background: 'var(--cream-dark)' }}>
        <h2>New Arrivals</h2>
        <p className="section-subtitle">Fresh off the hook this month</p>
        <div className="grid-4">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/shop" className="btn btn-secondary">View All Products</Link>
        </div>
      </section>

      <ChainDivider color="#3A5A40" background="#FBF3E7" />

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
