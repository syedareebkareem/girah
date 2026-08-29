import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: '#999999',
        marginBottom: '32px',
      }}
      aria-label="Breadcrumb"
    >
      {items.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {item.href ? (
            <Link
              to={item.href}
              style={{
                color: '#B8C5B5',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: '#2D2D2D' }}>{item.label}</span>
          )}
          {idx < items.length - 1 && <span>/</span>}
        </div>
      ))}
    </nav>
  )
}
