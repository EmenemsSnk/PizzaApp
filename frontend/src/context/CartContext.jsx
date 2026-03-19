import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  function addItem(pizza) {
    setItems(prev => {
      const existing = prev.find(i => i.pizza.id === pizza.id)
      if (existing) {
        return prev.map(i => i.pizza.id === pizza.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { pizza, quantity: 1 }]
    })
  }

  function removeItem(pizzaId) {
    setItems(prev => prev.filter(i => i.pizza.id !== pizzaId))
  }

  function updateQuantity(pizzaId, quantity) {
    if (quantity <= 0) {
      removeItem(pizzaId)
      return
    }
    setItems(prev => prev.map(i => i.pizza.id === pizzaId ? { ...i, quantity } : i))
  }

  function clearCart() {
    setItems([])
  }

  const total = items.reduce((sum, i) => sum + i.pizza.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
