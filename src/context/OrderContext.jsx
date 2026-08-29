import { createContext, useState, useContext } from 'react'

const OrderContext = createContext()

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders')
    return saved ? JSON.parse(saved) : []
  })

  const createOrder = (orderData) => {
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      ...orderData,
    }
    setOrders(prev => {
      const updated = [...prev, order]
      localStorage.setItem('orders', JSON.stringify(updated))
      return updated
    })
    return order
  }

  return (
    <OrderContext.Provider value={{ orders, createOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  return useContext(OrderContext)
}
