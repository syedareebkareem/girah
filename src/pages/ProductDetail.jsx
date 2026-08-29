import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
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
  const [quantity, setQuantity] = useState(1)

  const product = PRODUCTS.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#2D2D2D' }}>Product not found</h1>
          <button
            onClick={() => navigate('/shop')}
            style={{
              padding: '12px 32px',
              backgroundColor: '#B8C5B5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const images = [product.image, product.image, product.image, product.image]
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setQuantity(1)
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: product.name },
          ]}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '32px' }}>
          <ImageGallery images={images} />

          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#2D2D2D', marginBottom: '16px' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', color: '#FFD700' }}>
                  {'★'.repeat(Math.floor(product.rating))}
                </span>
                <span style={{ fontSize: '14px', color: '#999999' }}>
                  ({product.reviews} reviews)
                </span>
              </div>
              <span
                style={{
                  backgroundColor: product.stock === 'in-stock' ? '#27AE60' : '#F39C12',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
              >
                {product.stock === 'in-stock' ? 'In Stock' : 'Made to Order'}
              </span>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '32px', fontWeight: 700, color: '#2D2D2D' }}>
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '18px', color: '#999999', textDecoration: 'line-through' }}>
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <p style={{ fontSize: '16px', color: '#999999', lineHeight: '1.8', marginBottom: '32px' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#2D2D2D' }}>
                Quantity
              </label>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: '16px 32px',
                  backgroundColor: '#B8C5B5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Add to Cart
              </button>
              <button
                style={{
                  padding: '16px 24px',
                  backgroundColor: 'white',
                  color: '#B8C5B5',
                  border: '2px solid #B8C5B5',
                  borderRadius: '6px',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                ♡
              </button>
            </div>

            <div style={{ borderTop: '1px solid #D9D9D9', paddingTop: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '16px', color: '#2D2D2D' }}>
                Product Details
              </h3>
              <div style={{ display: 'grid', gap: '12px', fontSize: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr' }}>
                  <span style={{ fontWeight: 600, color: '#2D2D2D' }}>Category:</span>
                  <span style={{ color: '#999999', textTransform: 'capitalize' }}>{product.category}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr' }}>
                  <span style={{ fontWeight: 600, color: '#2D2D2D' }}>Stock:</span>
                  <span style={{ color: '#999999' }}>
                    {product.stock === 'in-stock' ? 'In Stock (Ships in 1-2 days)' : 'Made to Order (7-14 days)'}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr' }}>
                  <span style={{ fontWeight: 600, color: '#2D2D2D' }}>Materials:</span>
                  <span style={{ color: '#999999' }}>Premium yarn, handmade</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReviewSection productId={product.id} baseRating={product.rating} baseReviewCount={product.reviews} />

        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '64px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px', color: '#2D2D2D' }}>
              Related Products
            </h2>
            <div className="grid-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
