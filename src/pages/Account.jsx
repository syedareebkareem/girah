import { Link } from 'react-router-dom'
import { useOrder } from '../context/OrderContext'
import { useWishlist } from '../context/WishlistContext'

export default function Account() {
  const { orders } = useOrder()
  const { wishlistItems } = useWishlist()

  const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px', backgroundColor: '#F8F8F7' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
          My Account
        </h1>
        <p style={{ fontSize: '16px', color: '#999999', marginBottom: '48px' }}>
          View your order history and saved items
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '48px' }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 700, color: '#B8C5B5', marginBottom: '8px' }}>
              {orders.length}
            </p>
            <p style={{ fontSize: '14px', color: '#999999', textTransform: 'uppercase', fontWeight: 600 }}>
              Total Orders
            </p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 700, color: '#B8C5B5', marginBottom: '8px' }}>
              {wishlistItems.length}
            </p>
            <p style={{ fontSize: '14px', color: '#999999', textTransform: 'uppercase', fontWeight: 600 }}>
              Wishlist Items
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: '#2D2D2D' }}>
            Order History
          </h2>

          {sortedOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ fontSize: '16px', color: '#999999', marginBottom: '24px' }}>
                You haven't placed any orders yet.
              </p>
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
                  fontSize: '14px',
                }}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sortedOrders.map(order => (
                <div
                  key={order.id}
                  style={{
                    border: '1px solid #D9D9D9',
                    borderRadius: '8px',
                    padding: '24px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                        Order Number
                      </p>
                      <p style={{ fontSize: '16px', fontWeight: 700, color: '#2D2D2D', fontFamily: 'monospace' }}>
                        {order.id}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                        Date
                      </p>
                      <p style={{ fontSize: '14px', color: '#2D2D2D' }}>
                        {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                        Total
                      </p>
                      <p style={{ fontSize: '18px', fontWeight: 700, color: '#2D2D2D' }}>
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <Link
                      to={`/order-confirmation/${order.id}`}
                      style={{
                        padding: '8px 20px',
                        backgroundColor: 'transparent',
                        color: '#B8C5B5',
                        border: '2px solid #B8C5B5',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        alignSelf: 'center',
                      }}
                    >
                      View Details
                    </Link>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {order.items.slice(0, 4).map(item => (
                      <img
                        key={item.id}
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '48px',
                          height: '48px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                      />
                    ))}
                    {order.items.length > 4 && (
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '4px',
                          backgroundColor: '#F8F8F7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#999999',
                        }}
                      >
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
