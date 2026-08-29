import { useSearch } from '../context/SearchContext'
import { useState } from 'react'
import ProductCard from '../components/products/ProductCard'
import Pagination from '../components/common/Pagination'
import { useNavigate } from 'react-router-dom'

export default function SearchResults() {
  const { searchQuery, searchResults } = useSearch()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  if (!searchQuery) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
            No search query
          </h1>
          <p style={{ fontSize: '16px', color: '#999999', marginBottom: '24px' }}>
            Enter a search term to find products
          </p>
          <button
            onClick={() => navigate('/shop')}
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
            Browse All Products
          </button>
        </div>
      </div>
    )
  }

  const totalPages = Math.ceil(searchResults.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedResults = searchResults.slice(startIdx, startIdx + itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '48px', paddingBottom: '64px' }}>
      <div className="container">
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
            Search Results
          </h1>
          <p style={{ fontSize: '16px', color: '#999999' }}>
            {searchResults.length === 0
              ? `No results found for "${searchQuery}"`
              : `Found ${searchResults.length} product${searchResults.length !== 1 ? 's' : ''} matching "${searchQuery}"`}
          </p>
        </div>

        {searchResults.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '64px', paddingBottom: '64px' }}>
            <p style={{ fontSize: '18px', color: '#999999', marginBottom: '24px' }}>
              Try a different search term or browse by category
            </p>
            <button
              onClick={() => navigate('/shop')}
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
              Browse All Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid-4">
              {paginatedResults.map(product => (
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
  )
}
