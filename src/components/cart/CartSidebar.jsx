import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart()
  const navigate = useNavigate()

  const goToCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <h2>Your Cart</h2>
          <button onClick={onClose} className="cart-close-btn">✕</button>
        </div>

        <div className="cart-sidebar-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>🧶</p>
              <p>Your cart is empty</p>
              <Link to="/shop" onClick={onClose} className="btn btn-primary">Continue Shopping</Link>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item-row">
                <img src={item.image} alt={item.name} onError={(e) => e.target.style.display = 'none'} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="qty-selector qty-selector-sm">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="cart-subtotal-row">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <p className="cart-shipping-note">Shipping calculated at checkout</p>
            <Link to="/cart" onClick={onClose} className="btn btn-secondary" style={{ display: 'block', textAlign: 'center', marginBottom: '10px' }}>
              View Cart
            </Link>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={goToCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
