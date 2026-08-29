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
            border: '1px solid #D9D9D9',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#B8C5B5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            textTransform: 'uppercase',
            fontSize: '14px',
          }}
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
            border: '1px solid #D9D9D9',
            borderRadius: '6px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
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
                borderBottom: '1px solid #F0F0F0',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8F8F7'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '48px',
                  height: '48px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#2D2D2D' }}>
                  {product.name}
                </p>
                <p style={{ fontSize: '12px', color: '#999999' }}>
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
