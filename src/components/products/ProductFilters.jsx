import { useState } from 'react'

export default function ProductFilters({ onFilterChange, activeFilters }) {
  const [expanded, setExpanded] = useState({
    category: true,
    price: true,
    stock: true,
  })

  const categories = [
    { id: 'blankets', name: 'Blankets & Throws' },
    { id: 'amigurumi', name: 'Amigurumi & Toys' },
    { id: 'home-decor', name: 'Home Decor' },
    { id: 'hats', name: 'Hats & Beanies' },
    { id: 'scarves', name: 'Scarves & Wraps' },
  ]

  const priceRanges = [
    { id: '0-25', label: 'Under $25', min: 0, max: 25 },
    { id: '25-50', label: '$25 - $50', min: 25, max: 50 },
    { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
    { id: '100+', label: '$100+', min: 100, max: 999999 },
  ]

  const stockOptions = [
    { id: 'in-stock', name: 'In Stock' },
    { id: 'made-to-order', name: 'Made to Order' },
  ]

  const toggleCategory = (catId) => {
    const newCats = activeFilters.categories.includes(catId)
      ? activeFilters.categories.filter(c => c !== catId)
      : [...activeFilters.categories, catId]
    onFilterChange({ ...activeFilters, categories: newCats })
  }

  const togglePrice = (priceId, range) => {
    const newPrices = activeFilters.priceRanges.find(p => p.id === priceId)
      ? activeFilters.priceRanges.filter(p => p.id !== priceId)
      : [...activeFilters.priceRanges, { id: priceId, ...range }]
    onFilterChange({ ...activeFilters, priceRanges: newPrices })
  }

  const toggleStock = (stockId) => {
    const newStock = activeFilters.stock.includes(stockId)
      ? activeFilters.stock.filter(s => s !== stockId)
      : [...activeFilters.stock, stockId]
    onFilterChange({ ...activeFilters, stock: newStock })
  }

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      priceRanges: [],
      stock: [],
    })
  }

  const hasActiveFilters = activeFilters.categories.length > 0 || activeFilters.priceRanges.length > 0 || activeFilters.stock.length > 0

  return (
    <div style={{ width: '280px' }}>
      <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #D9D9D9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#2D2D2D' }}>Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                background: 'none',
                border: 'none',
                color: '#B8C5B5',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'underline',
              }}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => setExpanded({ ...expanded, category: !expanded.category })}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            padding: '12px 0',
            cursor: 'pointer',
            fontWeight: 700,
            color: '#2D2D2D',
            fontSize: '14px',
          }}
        >
          Category
          <span style={{ fontSize: '12px' }}>{expanded.category ? '−' : '+'}</span>
        </button>

        {expanded.category && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '12px' }}>
            {categories.map(cat => (
              <label key={cat.id} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={activeFilters.categories.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                />
                <span style={{ color: '#999999' }}>{cat.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #D9D9D9' }}>
        <button
          onClick={() => setExpanded({ ...expanded, price: !expanded.price })}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            padding: '12px 0',
            cursor: 'pointer',
            fontWeight: 700,
            color: '#2D2D2D',
            fontSize: '14px',
          }}
        >
          Price
          <span style={{ fontSize: '12px' }}>{expanded.price ? '−' : '+'}</span>
        </button>

        {expanded.price && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '12px' }}>
            {priceRanges.map(range => (
              <label key={range.id} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={activeFilters.priceRanges.some(p => p.id === range.id)}
                  onChange={() => togglePrice(range.id, { min: range.min, max: range.max })}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                />
                <span style={{ color: '#999999' }}>{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Stock Filter */}
      <div>
        <button
          onClick={() => setExpanded({ ...expanded, stock: !expanded.stock })}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            padding: '12px 0',
            cursor: 'pointer',
            fontWeight: 700,
            color: '#2D2D2D',
            fontSize: '14px',
          }}
        >
          Availability
          <span style={{ fontSize: '12px' }}>{expanded.stock ? '−' : '+'}</span>
        </button>

        {expanded.stock && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '12px' }}>
            {stockOptions.map(option => (
              <label key={option.id} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  checked={activeFilters.stock.includes(option.id)}
                  onChange={() => toggleStock(option.id)}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                />
                <span style={{ color: '#999999' }}>{option.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
