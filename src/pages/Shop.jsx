import { useState, useMemo } from 'react'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import ProductFilters from '../components/products/ProductFilters'
import Pagination from '../components/common/Pagination'

export default function Shop() {
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    categories: [],
    priceRanges: [],
    stock: [],
  })

  const itemsPerPage = 12

  // Apply filters
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Price filter
      if (filters.priceRanges.length > 0) {
        const inPriceRange = filters.priceRanges.some(
          range => product.price >= range.min && product.price <= range.max
        )
        if (!inPriceRange) return false
      }

      // Stock filter
      if (filters.stock.length > 0 && !filters.stock.includes(product.stock)) {
        return false
      }

      return true
    })
  }, [filters])

  // Apply sorting
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })
    return sorted
  }, [filteredProducts, sortBy])

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIdx, startIdx + itemsPerPage)

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="container">
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '48px', color: '#2D2D2D' }}>
          All Products
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px' }}>
          {/* Sidebar */}
          <ProductFilters onFilterChange={handleFilterChange} activeFilters={filters} />

          {/* Main Content */}
          <div>
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <p style={{ color: '#999999', fontSize: '14px' }}>
                Showing {paginatedProducts.length === 0 ? 0 : startIdx + 1}–{Math.min(startIdx + itemsPerPage, sortedProducts.length)} of {sortedProducts.length} results
              </p>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setCurrentPage(1)
                }}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #D9D9D9',
                  borderRadius: '6px',
                  outline: 'none',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {paginatedProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <p style={{ fontSize: '16px', color: '#999999', marginBottom: '24px' }}>
                  No products found matching your filters.
                </p>
                <button
                  onClick={() => handleFilterChange({ categories: [], priceRanges: [], stock: [] })}
                  style={{
                    padding: '12px 32px',
                    backgroundColor: '#B8C5B5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid-4">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
