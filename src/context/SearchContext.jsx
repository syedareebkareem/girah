import { createContext, useState, useContext } from 'react'
import { PRODUCTS } from '../data/products'

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const performSearch = (query) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const query_lower = query.toLowerCase()
    const results = PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(query_lower) ||
      product.description.toLowerCase().includes(query_lower) ||
      product.category.toLowerCase().includes(query_lower)
    )
    setSearchResults(results)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
  }

  return (
    <SearchContext.Provider value={{ searchQuery, searchResults, performSearch, clearSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}
