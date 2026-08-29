import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useOrder } from '../context/OrderContext'
import { useCart } from '../context/CartContext'

export default function OrderConfirmation() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { orders } = useOrder()
  const { cartItems } = useCart()

  const order = orders.find(o => o.id === orderId)

  useEffect(() => {
    if (order) {
      localStorage.removeItem('cart')
      window.location.reload()
    }
  }, [order])

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', color: '#2D2D2D' }}>Order not found</h1>
          <Link
            to="/shop"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              backgroundColor: '#B8C5B5',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px', backgroundColor: '#F8F8F7' }}>
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div
            style={{
              backgroundColor: 'white',
              padding: '48px',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>✓</div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#27AE60' }}>
              Order Confirmed!
            </h1>
            <p style={{ fontSize: '16px', color: '#999999', marginBottom: '32px' }}>
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>

            <div style={{ backgroundColor: '#F8F8F7', padding: '24px', borderRadius: '6px', marginBottom: '32px' }}>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase', fontWeight: 600 }}>
                  Order Number
                </p>
                <p style={{ fontSize: '20px', fontWeight: 700, color: '#2D2D2D', fontFamily: 'monospace' }}>
                  {order.id}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase', fontWeight: 600 }}>
                  Order Date
                </p>
                <p style={{ fontSize: '16px', color: '#2D2D2D' }}>
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: '#2D2D2D' }}>
              Order Details
            </h2>

            <div style={{ marginBottom: '32px', borderBottom: '1px solid #D9D9D9', paddingBottom: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
                Items
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {order.items.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#2D2D2D', marginBottom: '4px' }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: '14px', color: '#999999' }}>
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#2D2D2D' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '32px', borderBottom: '1px solid #D9D9D9', paddingBottom: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
                Shipping Address
              </h3>
              <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.8' }}>
                {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                <br />
                {order.shippingInfo.address}
                <br />
                {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
                <br />
                {order.shippingInfo.country}
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#999999' }}>Subtotal</span>
                <span style={{ color: '#2D2D2D', fontWeight: 600 }}>${order.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#999999' }}>Shipping</span>
                <span style={{ color: '#2D2D2D', fontWeight: 600 }}>${order.shipping.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px' }}>
                <span style={{ color: '#999999' }}>Tax</span>
                <span style={{ color: '#2D2D2D', fontWeight: 600 }}>${order.tax.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #D9D9D9',
                  paddingTop: '16px',
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D2D' }}>Total</span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#2D2D2D' }}>
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link
              to="/shop"
              style={{
                flex: 1,
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
            <Link
              to="/"
              style={{
                flex: 1,
                padding: '14px 24px',
                backgroundColor: '#B8C5B5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
