import { useState } from 'react'

export default function ReviewSection({ baseRating, baseReviewCount }) {
  const [showForm, setShowForm] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="review-section">
      <h2>Customer Reviews</h2>

      <div className="review-summary">
        <div className="review-average">
          <div className="review-average-number">{baseRating}</div>
          <div className="stars">{'★'.repeat(Math.round(baseRating))}</div>
          <p>Based on {baseReviewCount} reviews</p>
        </div>

        <button className="btn btn-secondary" onClick={() => setShowForm(!showForm)}>
          Write a Review
        </button>
      </div>

      {showForm && (
        <div className="review-form">
          <p className="filter-group-title" style={{ marginBottom: '10px' }}>Your Rating</p>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  background: 'none', fontSize: '26px', cursor: 'pointer',
                  color: (hoverRating || selectedRating) >= star ? 'var(--mustard)' : 'var(--border-light)'
                }}
              >★</button>
            ))}
          </div>
          <textarea placeholder="Share your experience..." rows="4" className="review-textarea" />
          <button className="btn btn-primary" style={{ marginTop: '12px' }} onClick={() => setShowForm(false)}>
            Submit Review
          </button>
        </div>
      )}
    </div>
  )
}
