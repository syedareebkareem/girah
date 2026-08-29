import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--cream)' }}>
            Crochet<span style={{ color: 'var(--mustard)', fontStyle: 'italic' }}>Shop</span>
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(251,243,231,0.65)', marginBottom: '16px' }}>
            Handcrafted crochet gifts made with love
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: 'var(--cream)', textDecoration: 'none' }}>f</a>
            <a href="#" style={{ color: 'var(--cream)', textDecoration: 'none' }}>ig</a>
            <a href="#" style={{ color: 'var(--cream)', textDecoration: 'none' }}>p</a>
          </div>
        </div>

        <div>
          <h4 style={{ fontWeight: 700, color: 'var(--cream)', marginBottom: '16px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shop</h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '10px' }}><Link to="/shop" style={{ color: 'rgba(251,243,231,0.65)', textDecoration: 'none' }}>All Products</Link></li>
            <li style={{ marginBottom: '10px' }}><Link to="/shop" style={{ color: 'rgba(251,243,231,0.65)', textDecoration: 'none' }}>New Arrivals</Link></li>
            <li style={{ marginBottom: '10px' }}><Link to="/shop" style={{ color: 'rgba(251,243,231,0.65)', textDecoration: 'none' }}>Sale</Link></li>
            <li><Link to="/shop" style={{ color: 'rgba(251,243,231,0.65)', textDecoration: 'none' }}>Best Sellers</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontWeight: 700, color: 'var(--cream)', marginBottom: '16px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Help</h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '10px' }}><Link to="/contact" style={{ color: 'rgba(251,243,231,0.65)', textDecoration: 'none' }}>Contact Us</Link></li>
            <li style={{ marginBottom: '10px' }}><Link to="/contact" style={{ color: 'rgba(251,243,231,0.65)', textDecoration: 'none' }}>FAQ</Link></li>
            <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'rgba(251,243,231,0.65)', textDecoration: 'none' }}>Shipping Info</a></li>
            <li><a href="#" style={{ color: 'rgba(251,243,231,0.65)', textDecoration: 'none' }}>Returns</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontWeight: 700, color: 'var(--cream)', marginBottom: '16px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Newsletter</h4>
          <p style={{ fontSize: '14px', color: 'rgba(251,243,231,0.65)', marginBottom: '12px' }}>Get 10% off your first order</p>
          <div style={{ display: 'flex' }}>
            <input
              type="email"
              placeholder="Email"
              style={{ flex: 1, padding: '10px 12px', fontSize: '14px', background: 'rgba(251,243,231,0.08)', border: '1px solid rgba(251,243,231,0.2)', borderRadius: '100px 0 0 100px', outline: 'none', color: 'var(--cream)' }}
            />
            <button style={{ padding: '10px 18px', background: 'var(--rust)', color: 'white', fontSize: '13px', fontWeight: 700, borderRadius: '0 100px 100px 0', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Join
            </button>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(251,243,231,0.15)', padding: '24px 16px', textAlign: 'center', fontSize: '13px', color: 'rgba(251,243,231,0.5)' }}>
        <p>&copy; 2026 CrochetShop. Handmade with heart.</p>
      </div>
    </footer>
  )
}
