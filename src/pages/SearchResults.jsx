import { useSearch } from '../context/SearchContext'
import { useState, useEffect } from 'react'
import ProductCard from '../components/products/ProductCard'
import Pagination from '../components/common/Pagination'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SearchResults() {
  const { searchQuery, searchResults, performSearch } = useSearch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const urlQuery = searchParams.get('q') || ''

  // Re-run the search from the URL param on direct load or refresh,
  // since SearchContext itself is in-memory only.
  useEffect(() => {
    if (urlQuery && urlQuery !== searchQuery) {
      performSearch(urlQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlQuery])

  const effectiveQuery = searchQuery || urlQuery

  if (!effectiveQuery) {
    return (
      <div className="not-found-block">
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '32px', fontWeight: 600, marginBottom: '16px', color: 'var(--ink)' }}>
            No search query
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-light)', marginBottom: '24px' }}>
            Enter a search term to find products
          </p>
          <button onClick={() => navigate('/shop')} className="btn btn-primary">
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
    <div className="section" style={{ paddingTop: '48px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '36px', fontWeight: 600, marginBottom: '16px', color: 'var(--ink)' }}>
          Search Results
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-light)' }}>
          {searchResults.length === 0
            ? `No results found for "${effectiveQuery}"`
            : `Found ${searchResults.length} product${searchResults.length !== 1 ? 's' : ''} matching "${effectiveQuery}"`}
        </p>
      </div>

      {searchResults.length === 0 ? (
        <div style={{ textAlign: 'center', paddingTop: '32px', paddingBottom: '64px' }}>
          <p style={{ fontSize: '18px', color: 'var(--text-light)', marginBottom: '24px' }}>
            Try a different search term or browse by category
          </p>
          <button onClick={() => navigate('/shop')} className="btn btn-primary">
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
  )
}
