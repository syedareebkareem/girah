import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import QuantitySelector from '../components/common/QuantitySelector'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '48px', paddingBottom: '48px' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '48px', color: '#2D2D2D' }}>
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
            <p style={{ fontSize: '18px', color: '#999999', marginBottom: '24px' }}>
              Your cart is empty
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
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '48px' }}>
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr 120px 100px 40px',
                  gap: '24px',
                  alignItems: 'center',
                  paddingBottom: '24px',
                  borderBottom: '2px solid #D9D9D9',
                  marginBottom: '32px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#999999',
                  textTransform: 'uppercase',
                }}
              >
                <span>Image</span>
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span></span>
              </div>

              {cartItems.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr 120px 100px 40px',
                    gap: '24px',
                    alignItems: 'center',
                    paddingBottom: '24px',
                    borderBottom: '1px solid #D9D9D9',
                    marginBottom: '24px',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />

                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#2D2D2D', marginBottom: '4px' }}>
                      {item.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#999999' }}>
                      {item.description?.substring(0, 60)}...
                    </p>
                  </div>

                  <div>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: '#2D2D2D' }}>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={(qty) => updateQuantity(item.id, qty)}
                  />

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#E74C3C',
                      cursor: 'pointer',
                      fontSize: '18px',
                      padding: '8px',
                    }}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            <div>
              <div
                style={{
                  backgroundColor: '#F8F8F7',
                  padding: '24px',
                  borderRadius: '8px',
                  position: 'sticky',
                  top: '100px',
                }}
              >
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px', color: '#2D2D2D' }}>
                  Order Summary
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#999999' }}>Subtotal</span>
                    <span style={{ color: '#2D2D2D', fontWeight: 600 }}>
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#999999' }}>Shipping</span>
                    <span style={{ color: '#2D2D2D', fontWeight: 600 }}>At checkout</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#999999' }}>Tax</span>
                    <span style={{ color: '#2D2D2D', fontWeight: 600 }}>At checkout</span>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: '1px solid #D9D9D9',
                    paddingTop: '12px',
                    marginBottom: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D2D' }}>Total</span>
                  <span style={{ fontSize: '24px', fontWeight: 700, color: '#2D2D2D' }}>
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>

                <Link
                  to="/checkout"
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
                    marginBottom: '12px',
                  }}
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/shop"
                  style={{
                    display: 'block',
                    padding: '14px 24px',
                    backgroundColor: 'transparent',
                    color: '#B8C5B5',
                    border: '2px solid #B8C5B5',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
