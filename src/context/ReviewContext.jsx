import { createContext, useState, useContext, useEffect } from 'react'

const ReviewContext = createContext()

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('reviews')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  }, [reviews])

  const addReview = (productId, review) => {
    setReviews(prev => {
      const productReviews = prev[productId] || []
      return {
        ...prev,
        [productId]: [
          {
            id: `REV-${Date.now()}`,
            date: new Date().toISOString(),
            ...review,
          },
          ...productReviews,
        ],
      }
    })
  }

  const getReviews = (productId) => {
    return reviews[productId] || []
  }

  return (
    <ReviewContext.Provider value={{ addReview, getReviews }}>
      {children}
    </ReviewContext.Provider>
  )
}

export function useReviews() {
  return useContext(ReviewContext)
}
