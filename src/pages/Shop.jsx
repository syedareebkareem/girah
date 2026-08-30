import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import ProductFilters from '../components/products/ProductFilters'

const PRICE_RANGES = {
  '0-25': { min: 0, max: 25 },
  '25-50': { min: 25, max: 50 },
  '50-100': { min: 50, max: 100 },
  '100-plus': { min: 100, max: Infinity },
}

export default function Shop() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [sortBy, setSortBy] = useState('newest')
  const [filters, setFilters] = useState({
    categories: categoryParam ? [categoryParam] : [],
    priceRanges: [],
    stock: [],
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Keep filters in sync if the ?category= param changes (e.g. clicking a different category card)
  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({ ...prev, categories: [categoryParam] }))
    }
  }, [categoryParam])

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false
      if (filters.stock.length && !filters.stock.includes(p.stock)) return false
      if (filters.priceRanges.length) {
        const inRange = filters.priceRanges.some(id => {
          const r = PRICE_RANGES[id]
          return p.price >= r.min && p.price <= r.max
        })
        if (!inRange) return false
      }
      return true
    })
  }, [filters])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
      case 'price-low': return sorted.sort((a, b) => a.price - b.price)
      case 'price-high': return sorted.sort((a, b) => b.price - a.price)
      case 'rating': return sorted.sort((a, b) => b.rating - a.rating)
      default: return sorted
    }
  }, [filteredProducts, sortBy])

  return (
    <div className="section" style={{ paddingTop: '40px' }}>
      <div style={{ marginBottom: '8px' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 600, color: 'var(--ink)' }}>All Products</h1>
      </div>
      <p style={{ color: 'var(--text-light)', marginBottom: '32px' }}>
        Showing {sortedProducts.length} of {PRODUCTS.length} results
      </p>

      <button
        className="mobile-filter-toggle"
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
      >
        {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className="shop-layout">
        <div style={{ display: mobileFiltersOpen ? 'block' : undefined }} className="filter-sidebar-wrap">
          <ProductFilters filters={filters} onChange={setFilters} />
        </div>

        <div>
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {sortedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
                No products match your filters.
              </p>
              <button onClick={() => setFilters({ categories: [], priceRanges: [], stock: [] })} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid-4">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
