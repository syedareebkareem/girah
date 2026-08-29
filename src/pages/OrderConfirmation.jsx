import { useParams, Link } from 'react-router-dom'
import { useOrder } from '../context/OrderContext'
import { useCart } from '../context/CartContext'
import { useEffect, useRef } from 'react'

export default function OrderConfirmation() {
  const { orderId } = useParams()
  const { orders } = useOrder()
  const { cartItems, removeFromCart } = useCart()
  const cleared = useRef(false)

  const order = orders.find(o => o.id === orderId)

  useEffect(() => {
    if (order && !cleared.current) {
      cleared.current = true
      cartItems.forEach(item => removeFromCart(item.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  if (!order) {
    return (
      <div className="not-found-block">
        <h1 style={{ fontFamily: "'Fraunces', serif", color: 'var(--ink)' }}>Order not found</h1>
        <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="section" style={{ paddingTop: '40px', maxWidth: '640px' }}>
      <div className="confirmation-card">
        <div className="confirmation-check">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase. It'll be shipped soon.</p>

        <div className="confirmation-order-id">
          <p className="label">Order Number</p>
          <p className="value">{order.id}</p>
        </div>
      </div>

      <div className="confirmation-details-card">
        <h3>Order Details</h3>
        {order.items.map(item => (
          <div key={item.id} className="review-item-row">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="cart-total-row">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to="/shop" className="btn btn-secondary" style={{ flex: 1, textAlign: 'center' }}>Continue Shopping</Link>
        <Link to="/" className="btn btn-primary" style={{ flex: 1, textAlign: 'center' }}>Back to Home</Link>
      </div>
    </div>
  )
}
