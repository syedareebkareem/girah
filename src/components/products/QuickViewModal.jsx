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
          borderRadius: '8px',
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
            color: '#2D2D2D',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
              borderRadius: '8px',
            }}
          />

          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#2D2D2D', marginBottom: '12px' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '16px', color: '#FFD700' }}>
                {'★'.repeat(Math.floor(product.rating))}
              </span>
              <span style={{ fontSize: '14px', color: '#999999' }}>
                ({product.reviews} reviews)
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#2D2D2D' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '16px', color: '#999999', textDecoration: 'line-through', marginLeft: '12px' }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.7', marginBottom: '24px' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#2D2D2D' }}>
                Quantity
              </label>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  padding: '14px 24px',
                  backgroundColor: '#B8C5B5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                style={{
                  padding: '14px 24px',
                  backgroundColor: 'transparent',
                  color: '#B8C5B5',
                  border: '2px solid #B8C5B5',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
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
