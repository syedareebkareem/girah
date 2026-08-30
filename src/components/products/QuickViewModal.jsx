import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import QuantitySelector from '../common/QuantitySelector'

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    onClose()
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '14px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'white',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: 'var(--ink)',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(43,33,24,0.1)',
          }}
        >
          ✕
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '32px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />

          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: 600, color: 'var(--ink)', marginBottom: '12px' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '16px', color: 'var(--mustard)' }}>
                {'★'.repeat(Math.floor(product.rating))}
              </span>
              <span style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                ({product.reviews} reviews)
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '28px', fontWeight: 700, color: 'var(--rust)' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '16px', color: 'var(--text-light)', textDecoration: 'line-through', marginLeft: '12px' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.7', marginBottom: '24px' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', color: 'var(--ink)' }}>
                Quantity
              </label>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={handleAddToCart} className="btn btn-primary" style={{ width: '100%' }}>
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="btn btn-secondary"
                style={{ textAlign: 'center' }}
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
