import { useCart } from '../../context/CartContext'

export default function Toast() {
  const { showToast, toastMessage, toastType } = useCart()

  if (!showToast) return null

  return (
    <div className={`toast-notif ${toastType}`}>
      {toastMessage}
    </div>
  )
}
