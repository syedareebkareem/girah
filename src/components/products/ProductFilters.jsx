import { CATEGORIES } from '../../data/products'

export default function ProductFilters({ filters, onChange }) {
  const stockOptions = [
    { id: 'in-stock', label: 'In Stock' },
    { id: 'made-to-order', label: 'Made to Order' },
  ]

  const priceRanges = [
    { id: '0-1500', label: 'Under Rs. 1,500', min: 0, max: 1500 },
    { id: '1500-3000', label: 'Rs. 1,500 – Rs. 3,000', min: 1500, max: 3000 },
    { id: '3000-5000', label: 'Rs. 3,000 – Rs. 5,000', min: 3000, max: 5000 },
    { id: '5000-plus', label: 'Rs. 5,000+', min: 5000, max: Infinity },
  ]

  const toggleCategory = (slug) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter(c => c !== slug)
      : [...filters.categories, slug]
    onChange({ ...filters, categories: next })
  }

  const togglePrice = (id) => {
    const next = filters.priceRanges.includes(id)
      ? filters.priceRanges.filter(p => p !== id)
      : [...filters.priceRanges, id]
    onChange({ ...filters, priceRanges: next })
  }

  const toggleStock = (id) => {
    const next = filters.stock.includes(id)
      ? filters.stock.filter(s => s !== id)
      : [...filters.stock, id]
    onChange({ ...filters, stock: next })
  }

  const clearAll = () => onChange({ categories: [], priceRanges: [], stock: [] })

  const hasActive = filters.categories.length || filters.priceRanges.length || filters.stock.length

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        {hasActive > 0 && (
          <button onClick={clearAll} className="filter-clear">Clear All</button>
        )}
      </div>

      <div className="filter-group">
        <p className="filter-group-title">Category</p>
        {CATEGORIES.map(cat => (
          <label key={cat.id} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.categories.includes(cat.slug)}
              onChange={() => toggleCategory(cat.slug)}
            />
            <span>{cat.name}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <p className="filter-group-title">Price</p>
        {priceRanges.map(range => (
          <label key={range.id} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.priceRanges.includes(range.id)}
              onChange={() => togglePrice(range.id)}
            />
            <span>{range.label}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <p className="filter-group-title">Availability</p>
        {stockOptions.map(opt => (
          <label key={opt.id} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.stock.includes(opt.id)}
              onChange={() => toggleStock(opt.id)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
