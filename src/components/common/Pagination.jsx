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
          backgroundColor: currentPage === 1 ? 'var(--border-light)' : 'var(--cream-dark)',
          border: '1px solid var(--border-light)',
          borderRadius: '100px',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          color: currentPage === 1 ? 'var(--text-light)' : 'var(--ink)',
          fontFamily: 'inherit',
          transition: 'all 0.2s ease',
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
                  ? 'var(--rust)'
                  : page === '...'
                  ? 'transparent'
                  : 'var(--cream-dark)',
              border: page === currentPage ? 'none' : '1px solid var(--border-light)',
              borderRadius: '100px',
              cursor: page === '...' ? 'default' : 'pointer',
              fontWeight: page === currentPage ? 700 : 600,
              color: page === currentPage ? 'white' : 'var(--ink)',
              minWidth: '40px',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
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
          backgroundColor: currentPage === totalPages ? 'var(--border-light)' : 'var(--cream-dark)',
          border: '1px solid var(--border-light)',
          borderRadius: '100px',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          color: currentPage === totalPages ? 'var(--text-light)' : 'var(--ink)',
          fontFamily: 'inherit',
          transition: 'all 0.2s ease',
        }}
      >
        Next →
      </button>
    </div>
  )
}
