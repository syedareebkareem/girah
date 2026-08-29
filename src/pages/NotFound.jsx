import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found-block">
      <p style={{ fontFamily: "'Fraunces', serif", fontSize: '80px', fontWeight: 600, color: 'var(--rust)', lineHeight: 1 }}>404</p>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '26px', color: 'var(--ink)' }}>Page Not Found</h1>
      <p style={{ color: 'var(--text-light)', maxWidth: '360px', textAlign: 'center' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
        <Link to="/shop" className="btn btn-secondary">Browse Shop</Link>
      </div>
    </div>
  )
}
