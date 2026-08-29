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
      borderRadius: '10px',
      zIndex: 9999,
      backgroundColor: toastType === 'success' ? '#3A5A40' : '#C4592E',
      color: 'white',
      fontWeight: 700,
      fontSize: '14px',
      boxShadow: '0 6px 20px rgba(43,33,24,0.2)',
      animation: 'slideIn 0.3s ease',
      fontFamily: 'Manrope, sans-serif',
    }}>
      {toastMessage}
    </div>
  )
}
