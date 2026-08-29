export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = []
  const maxVisible = 5

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push('...')
      pageNumbers.push(totalPages)
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1)
      pageNumbers.push('...')
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      pageNumbers.push(1)
      pageNumbers.push('...')
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i)
      }
      pageNumbers.push('...')
      pageNumbers.push(totalPages)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '48px',
      }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '8px 16px',
          backgroundColor: currentPage === 1 ? '#D9D9D9' : '#F8F8F7',
          border: '1px solid #D9D9D9',
          borderRadius: '6px',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          color: currentPage === 1 ? '#999999' : '#2D2D2D',
        }}
      >
        ← Previous
      </button>

      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {pageNumbers.map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            style={{
              padding: '8px 12px',
              backgroundColor:
                page === currentPage
                  ? '#B8C5B5'
                  : page === '...'
                  ? 'transparent'
                  : '#F8F8F7',
              border: page === currentPage ? 'none' : '1px solid #D9D9D9',
              borderRadius: '6px',
              cursor: page === '...' ? 'default' : 'pointer',
              fontWeight: page === currentPage ? 700 : 600,
              color: page === currentPage ? 'white' : '#2D2D2D',
              minWidth: '40px',
            }}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '8px 16px',
          backgroundColor: currentPage === totalPages ? '#D9D9D9' : '#F8F8F7',
          border: '1px solid #D9D9D9',
          borderRadius: '6px',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          color: currentPage === totalPages ? '#999999' : '#2D2D2D',
        }}
      >
        Next →
      </button>
    </div>
  )
}
