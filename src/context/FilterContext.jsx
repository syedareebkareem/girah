import { createContext, useState, useContext } from 'react'

const FilterContext = createContext()

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    categories: [],
    priceRanges: [],
    stock: [],
    sortBy: 'newest',
  })

  const updateFilters = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  return useContext(FilterContext)
}
