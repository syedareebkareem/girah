import { useState } from 'react'
import { useReviews } from '../../context/ReviewContext'

export default function ReviewSection({ productId, baseRating, baseReviewCount }) {
  const { addReview, getReviews } = useReviews()
  const [showForm, setShowForm] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const productReviews = getReviews(productId)
  const totalReviews = baseReviewCount + productReviews.length
  const avgRating = productReviews.length > 0
    ? ((baseRating * baseReviewCount + productReviews.reduce((sum, r) => sum + r.rating, 0)) / totalReviews).toFixed(1)
    : baseRating

  const handleSubmit = () => {
    if (selectedRating === 0) return setError('Please select a rating')
    if (name.trim().length < 2) return setError('Please enter your name')
    if (comment.trim().length < 10) return setError('Review must be at least 10 characters')

    addReview(productId, { name: name.trim(), rating: selectedRating, comment: comment.trim() })
    setSelectedRating(0)
    setName('')
    setComment('')
    setError('')
    setShowForm(false)
  }

  return (
    <div className="review-section">
      <h2>Customer Reviews</h2>

      <div className="review-summary">
        <div className="review-average">
          <div className="review-average-number">{avgRating}</div>
          <div className="stars">{'★'.repeat(Math.round(avgRating))}</div>
          <p>Based on {totalReviews} reviews</p>
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

          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%', padding: '11px 14px', border: '1px solid var(--border-light)',
              borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', outline: 'none', marginBottom: '12px'
            }}
          />

          <textarea
            placeholder="Share your experience..."
            rows="4"
            className="review-textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {error && <p className="field-error-msg" style={{ marginTop: '8px' }}>{error}</p>}

          <button className="btn btn-primary" style={{ marginTop: '12px' }} onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      )}

      {productReviews.length > 0 && (
        <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {productReviews.map(review => (
            <div key={review.id} style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '14px' }}>{review.name}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                  {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div style={{ color: 'var(--mustard)', marginBottom: '6px', fontSize: '14px' }}>
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.6' }}>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
