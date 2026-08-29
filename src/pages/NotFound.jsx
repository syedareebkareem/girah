import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div>
        <h1 style={{ fontSize: '96px', fontWeight: 700, color: '#B8C5B5', marginBottom: '16px', lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
          Page Not Found
        </h2>
        <p style={{ fontSize: '16px', color: '#999999', marginBottom: '32px', maxWidth: '400px' }}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link
            to="/"
            style={{
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
            Back to Home
          </Link>
          <Link
            to="/shop"
            style={{
              padding: '12px 32px',
              backgroundColor: 'transparent',
              color: '#B8C5B5',
              border: '2px solid #B8C5B5',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              textTransform: 'uppercase',
              fontSize: '14px',
            }}
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  )
}
