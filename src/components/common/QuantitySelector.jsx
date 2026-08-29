export default function QuantitySelector({ quantity, onChange, min = 1, max = 999 }) {
  return (
    <div className="qty-selector">
      <button onClick={() => onChange(Math.max(min, quantity - 1))}>−</button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          const val = Math.max(min, Math.min(max, parseInt(e.target.value) || min))
          onChange(val)
        }}
      />
      <button onClick={() => onChange(Math.min(max, quantity + 1))}>+</button>
    </div>
  )
}
