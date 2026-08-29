import { Link } from 'react-router-dom'
import { useOrder } from '../context/OrderContext'
import { useWishlist } from '../context/WishlistContext'

export default function Account() {
  const { orders } = useOrder()
  const { wishlistItems } = useWishlist()

  const sortedOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="section" style={{ paddingTop: '48px', minHeight: '60vh' }}>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 600, marginBottom: '16px', color: 'var(--ink)' }}>
        My Account
      </h1>
      <p style={{ fontSize: '16px', color: 'var(--text-light)', marginBottom: '48px' }}>
        View your order history and saved items
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 600, color: 'var(--rust)', marginBottom: '8px' }}>
            {orders.length}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
            Total Orders
          </p>
        </div>
        <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 600, color: 'var(--rust)', marginBottom: '8px' }}>
            {wishlistItems.length}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
            Wishlist Items
          </p>
        </div>
      </div>

      <div className="card" style={{ padding: '32px' }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: 'var(--ink)' }}>
          Order History
        </h2>

        {sortedOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <p style={{ fontSize: '16px', color: 'var(--text-light)', marginBottom: '24px' }}>
              You haven't placed any orders yet.
            </p>
            <Link to="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {sortedOrders.map(order => (
              <div
                key={order.id}
                style={{
                  border: '1px solid var(--border-light)',
                  borderRadius: '14px',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '4px' }}>
                      Order Number
                    </p>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', fontFamily: 'IBM Plex Mono, monospace' }}>
                      {order.id}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '4px' }}>
                      Date
                    </p>
                    <p style={{ fontSize: '14px', color: 'var(--ink)' }}>
                      {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-light)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '4px' }}>
                      Total
                    </p>
                    <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '18px', fontWeight: 700, color: 'var(--rust)' }}>
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <Link
                    to={`/order-confirmation/${order.id}`}
                    className="btn btn-secondary"
                    style={{ padding: '8px 20px', alignSelf: 'center', fontSize: '12px' }}
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
                        borderRadius: '8px',
                      }}
                    />
                  ))}
                  {order.items.length > 4 && (
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '8px',
                        backgroundColor: 'var(--cream-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--text-light)',
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
  )
}