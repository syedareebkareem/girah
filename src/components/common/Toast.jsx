import { useCart } from '../../context/CartContext'

export default function Toast() {
  const { showToast, toastMessage, toastType } = useCart()

  if (!showToast) return null

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '14px 24px',
      borderRadius: '6px',
      zIndex: 9999,
      backgroundColor: toastType === 'success' ? '#27AE60' : '#E74C3C',
      color: 'white',
      fontWeight: 600,
      fontSize: '14px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      animation: 'slideIn 0.3s ease',
    }}>
      {toastMessage}
    </div>
  )
}
