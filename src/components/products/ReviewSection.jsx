import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useReviews } from '../../context/ReviewContext'

const reviewSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  rating: z.number().min(1, 'Please select a rating').max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters'),
})

export default function ReviewSection({ productId, baseRating, baseReviewCount }) {
  const { addReview, getReviews } = useReviews()
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const productReviews = getReviews(productId)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(reviewSchema),
  })

  const onSubmit = (data) => {
    addReview(productId, data)
    reset()
    setSelectedRating(0)
    setShowForm(false)
  }

  const handleStarClick = (rating) => {
    setSelectedRating(rating)
    setValue('rating', rating)
  }

  // Calculate rating breakdown
  const allRatings = [...productReviews.map(r => r.rating)]
  const totalReviews = baseReviewCount + productReviews.length
  const avgRating = allRatings.length > 0
    ? ((baseRating * baseReviewCount + allRatings.reduce((a, b) => a + b, 0)) / totalReviews).toFixed(1)
    : baseRating

  const ratingBreakdown = [5, 4, 3, 2, 1].map(star => {
    const count = allRatings.filter(r => r === star).length
    const percentage = allRatings.length > 0 ? (count / allRatings.length) * 100 : 0
    return { star, count, percentage }
  })

  return (
    <div style={{ marginTop: '64px', borderTop: '1px solid #D9D9D9', paddingTop: '48px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', color: '#2D2D2D' }}>
        Customer Reviews
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px', marginBottom: '48px' }}>
        {/* Rating Summary */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '48px', fontWeight: 700, color: '#2D2D2D' }}>
              {avgRating}
            </div>
            <div style={{ fontSize: '20px', color: '#FFD700', marginBottom: '8px' }}>
              {'★'.repeat(Math.round(avgRating))}
            </div>
            <p style={{ fontSize: '14px', color: '#999999' }}>
              Based on {totalReviews} reviews
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ratingBreakdown.map(({ star, count, percentage }) => (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                <span style={{ color: '#999999', minWidth: '40px' }}>{star} star</span>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#F0F0F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${percentage}%`,
                      height: '100%',
                      backgroundColor: '#FFD700',
                    }}
                  />
                </div>
                <span style={{ color: '#999999', minWidth: '20px' }}>{count}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              width: '100%',
              marginTop: '24px',
              padding: '12px 24px',
              backgroundColor: '#B8C5B5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '14px',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Write a Review
          </button>
        </div>

        {/* Review List / Form */}
        <div>
          {showForm && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                backgroundColor: '#F8F8F7',
                padding: '24px',
                borderRadius: '8px',
                marginBottom: '32px',
              }}
            >
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#2D2D2D' }}>
                Write Your Review
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                  Your Rating
                </label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '28px',
                        cursor: 'pointer',
                        color: (hoverRating || selectedRating) >= star ? '#FFD700' : '#D9D9D9',
                        padding: 0,
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {errors.rating && (
                  <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                    Please select a rating
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.name ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
                {errors.name && (
                  <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#2D2D2D' }}>
                  Your Review
                </label>
                <textarea
                  {...register('comment')}
                  rows="4"
                  placeholder="Share your experience with this product..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.comment ? '2px solid #E74C3C' : '1px solid #D9D9D9',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
                {errors.comment && (
                  <p style={{ fontSize: '12px', color: '#E74C3C', marginTop: '4px' }}>
                    {errors.comment.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#2D2D2D',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Submit Review
              </button>
            </form>
          )}

          {productReviews.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#999999' }}>
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {productReviews.map(review => (
                <div key={review.id} style={{ borderBottom: '1px solid #D9D9D9', paddingBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, color: '#2D2D2D', fontSize: '14px' }}>
                      {review.name}
                    </span>
                    <span style={{ fontSize: '12px', color: '#999999' }}>
                      {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div style={{ color: '#FFD700', marginBottom: '8px', fontSize: '14px' }}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p style={{ fontSize: '14px', color: '#999999', lineHeight: '1.6' }}>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
