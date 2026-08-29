import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../../data/products'
import { useSearch } from '../../context/SearchContext'

export default function SearchAutocomplete({ onClose }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const { performSearch } = useSearch()
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (query.trim().length > 0) {
      const query_lower = query.toLowerCase()
      const matches = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query_lower) ||
        p.category.toLowerCase().includes(query_lower)
      ).slice(0, 5)
      setSuggestions(matches)
      setShowDropdown(true)
    } else {
      setSuggestions([])
      setShowDropdown(false)
    }
  }, [query])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      performSearch(query)
      navigate('/search')
      setQuery('')
      setShowDropdown(false)
      onClose()
    }
  }

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`)
    setQuery('')
    setShowDropdown(false)
    onClose()
  }

  return (
    <div style={{ position: 'relative' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '1px solid var(--border-light)',
            borderRadius: '100px',
            fontSize: '14px',
            outline: 'none',
            fontFamily: 'inherit',
            color: 'var(--ink)',
            background: 'var(--cream-dark)',
          }}
        />
        <button
          type="submit"
          className="btn btn-primary"
          style={{ padding: '0 28px' }}
        >
          Search
        </button>
      </form>

      {showDropdown && suggestions.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid var(--border-light)',
            borderRadius: '14px',
            boxShadow: '0 10px 28px rgba(43,33,24,0.12)',
            zIndex: 100,
            overflow: 'hidden',
          }}
        >
          {suggestions.map(product => (
            <div
              key={product.id}
              onClick={() => handleSuggestionClick(product)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                cursor: 'pointer',
                borderBottom: '1px solid var(--border-light)',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--cream-dark)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '48px',
                  height: '48px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
                  {product.name}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-light)', fontFamily: 'IBM Plex Mono, monospace' }}>
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}