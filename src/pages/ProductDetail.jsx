import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { PRODUCTS } from '../data/products'
import ImageGallery from '../components/products/ImageGallery'
import Breadcrumbs from '../components/common/Breadcrumbs'
import QuantitySelector from '../components/common/QuantitySelector'
import ProductCard from '../components/products/ProductCard'
import ReviewSection from '../components/products/ReviewSection'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)

  const product = PRODUCTS.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="not-found-block">
        <h1>Product not found</h1>
        <button onClick={() => navigate('/shop')} className="btn btn-primary">Back to Shop</button>
      </div>
    )
  }

  const wishlisted = isInWishlist(product.id)
  const images = product.images ?? [product.image, product.image, product.image, product.image]
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product)
    setQuantity(1)
  }

  return (
    <div className="section" style={{ paddingTop: '32px' }}>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/shop' },
        { label: product.name },
      ]} />

      <div className="product-detail-grid">
        <ImageGallery images={images} />

        <div>
          <h1 className="product-detail-title">{product.name}</h1>

          <div className="product-detail-meta">
            <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
            <span className="count">({product.reviews} reviews)</span>
            <span className={`stock-pill ${product.stock === 'in-stock' ? 'in-stock' : 'made-to-order'}`}>
              {product.stock === 'in-stock' ? 'In Stock' : 'Made to Order'}
            </span>
          </div>

          <div className="product-detail-price">
            <span className="current">Rs. {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="original">Rs. {product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <p className="product-detail-desc">{product.description}</p>

          <div style={{ marginBottom: '28px' }}>
            <label className="qty-label">Quantity</label>
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
          </div>

          <div className="product-detail-actions">
            <button className="btn btn-primary add-to-cart-lg" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className={`wishlist-lg ${wishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
            >
              {wishlisted ? '♥' : '♡'}
            </button>
          </div>

          <div className="product-detail-specs">
            <h3>Product Details</h3>
            <div className="spec-row"><span>Category</span><span>{product.category}</span></div>
            <div className="spec-row"><span>Stock</span><span>{product.stock === 'in-stock' ? 'In Stock (Ships in 1-2 days)' : 'Made to Order (7-14 days)'}</span></div>
            <div className="spec-row"><span>Materials</span><span>Premium yarn, handmade</span></div>
          </div>
        </div>
      </div>

      <ReviewSection productId={product.id} baseRating={product.rating} baseReviewCount={product.reviews} />

      {relatedProducts.length > 0 && (
        <div style={{ marginTop: '64px' }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '28px', fontWeight: 600, marginBottom: '32px', color: 'var(--ink)' }}>
            You Might Also Like
          </h2>
          <div className="grid-4">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
