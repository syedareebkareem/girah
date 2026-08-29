import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 99,
          }}
        />
      )}

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          backgroundColor: 'white',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          boxShadow: isOpen ? '0 8px 24px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid #D9D9D9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#2D2D2D' }}>
            Your Cart
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#2D2D2D',
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
          }}
        >
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '48px' }}>
              <p style={{ color: '#999999', fontSize: '14px', marginBottom: '16px' }}>
                Your cart is empty
              </p>
              <Link
                to="/shop"
                onClick={onClose}
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#B8C5B5',
                  color: 'white',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                }}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cartItems.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #D9D9D9',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#2D2D2D',
                        marginBottom: '4px',
                      }}
                    >
                      {item.name}
                    </h4>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#2D2D2D',
                        marginBottom: '8px',
                      }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#F8F8F7',
                        borderRadius: '4px',
                        width: 'fit-content',
                        padding: '4px',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px 8px',
                          color: '#2D2D2D',
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px 8px',
                          color: '#2D2D2D',
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#E74C3C',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: 0,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid #D9D9D9',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              <span style={{ color: '#999999', fontSize: '14px' }}>Subtotal:</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#2D2D2D' }}>
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#999999', marginBottom: '12px' }}>
              Shipping calculated at checkout
            </p>
            <Link
              to="/cart"
              onClick={onClose}
              style={{
                display: 'block',
                padding: '14px 24px',
                backgroundColor: '#B8C5B5',
                color: 'white',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginBottom: '8px',
              }}
            >
              View Cart
            </Link>
            <Link
              to="/checkout"
              onClick={onClose}
              style={{
                display: 'block',
                padding: '14px 24px',
                backgroundColor: '#2D2D2D',
                color: 'white',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
