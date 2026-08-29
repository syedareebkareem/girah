import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>CrochetShop</h3>
          <p style={{ fontSize: '14px', color: '#999999', marginBottom: '16px' }}>Handcrafted crochet gifts made with love</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: '#2D2D2D', textDecoration: 'none' }}>f</a>
            <a href="#" style={{ color: '#2D2D2D', textDecoration: 'none' }}>ig</a>
            <a href="#" style={{ color: '#2D2D2D', textDecoration: 'none' }}>p</a>
          </div>
        </div>

        <div>
          <h4 style={{ fontWeight: 600, color: '#2D2D2D', marginBottom: '16px' }}>Shop</h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '8px' }}><Link to="/shop" style={{ color: '#999999', textDecoration: 'none' }}>All Products</Link></li>
            <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>New Arrivals</a></li>
            <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Sale</a></li>
            <li><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Best Sellers</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontWeight: 600, color: '#2D2D2D', marginBottom: '16px' }}>Help</h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Contact Us</a></li>
            <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>FAQ</a></li>
            <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Shipping Info</a></li>
            <li><a href="#" style={{ color: '#999999', textDecoration: 'none' }}>Returns</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontWeight: 600, color: '#2D2D2D', marginBottom: '16px' }}>Newsletter</h4>
          <p style={{ fontSize: '14px', color: '#999999', marginBottom: '12px' }}>Get 10% off your first order</p>
          <div style={{ display: 'flex' }}>
            <input 
              type="email" 
              placeholder="Email"
              style={{ flex: 1, padding: '8px 12px', fontSize: '14px', background: 'white', border: '1px solid var(--border-light)', borderRadius: '4px 0 0 4px', outline: 'none' }}
            />
            <button style={{ padding: '8px 16px', background: 'var(--primary)', color: 'white', fontSize: '14px', fontWeight: 600, borderRadius: '0 4px 4px 0', border: 'none', cursor: 'pointer' }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '32px', padding: '32px 16px', textAlign: 'center', fontSize: '14px', color: '#999999' }}>
        <p>&copy; 2025 CrochetShop. All rights reserved.</p>
      </div>
    </footer>
  )
}
