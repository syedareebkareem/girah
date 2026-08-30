import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import QuantitySelector from '../components/common/QuantitySelector'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="not-found-block">
        <p style={{ fontSize: '48px' }}>🧶</p>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '28px', color: 'var(--ink)' }}>Your cart is empty</h1>
        <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="section" style={{ paddingTop: '40px' }}>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 600, color: 'var(--ink)', marginBottom: '40px' }}>
        Shopping Cart
      </h1>

      <div className="cart-page-grid">
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-page-row">
              <img src={item.image} alt={item.name} onError={(e) => e.target.style.display = 'none'} />
              <div className="cart-page-info">
                <h3>{item.name}</h3>
                <p className="current">Rs. {item.price.toLocaleString()}</p>
              </div>
              <QuantitySelector quantity={item.quantity} onChange={(qty) => updateQuantity(item.id, qty)} />
              <p className="cart-page-line-total">Rs. {(item.price * item.quantity).toLocaleString()}</p>
              <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary-card">
          <h3>Order Summary</h3>
          <div className="cart-subtotal-row">
            <span>Subtotal</span>
            <span>Rs. {getTotalPrice().toLocaleString()}</span>
          </div>
          <div className="cart-subtotal-row">
            <span>Shipping</span>
            <span>At checkout</span>
          </div>
          <div className="cart-total-row">
            <span>Total</span>
            <span>Rs. {getTotalPrice().toLocaleString()}</span>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', marginBottom: '10px' }} onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
          <Link to="/shop" className="btn btn-secondary" style={{ display: 'block', textAlign: 'center' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
