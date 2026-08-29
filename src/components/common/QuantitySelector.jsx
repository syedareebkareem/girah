export default function QuantitySelector({ quantity, onChange, min = 1, max = 999 }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#F8F8F7',
        borderRadius: '6px',
        padding: '8px',
        width: 'fit-content',
      }}
    >
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 8px',
          color: '#2D2D2D',
          fontSize: '18px',
        }}
      >
        −
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          const val = Math.max(min, Math.min(max, parseInt(e.target.value) || min))
          onChange(val)
        }}
        style={{
          width: '50px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 600,
          border: 'none',
          backgroundColor: 'transparent',
          color: '#2D2D2D',
        }}
      />
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 8px',
          color: '#2D2D2D',
          fontSize: '18px',
        }}
      >
        +
      </button>
    </div>
  )
}
