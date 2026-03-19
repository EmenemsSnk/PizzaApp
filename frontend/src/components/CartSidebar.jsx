import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartSidebar({ open, onClose }) {
  const { items, removeItem, updateQuantity, total } = useCart()
  const navigate = useNavigate()

  function handleCheckout() {
    onClose()
    navigate('/checkout')
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center mt-16">Your cart is empty</p>
          ) : (
            items.map(({ pizza, quantity }) => (
              <div key={pizza.id} className="flex items-center gap-3 py-3 border-b">
                <img src={pizza.imageUrl} alt={pizza.name} className="w-14 h-14 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{pizza.name}</p>
                  <p className="text-red-600 text-sm">${(pizza.price * quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQuantity(pizza.id, quantity - 1)}
                    className="w-7 h-7 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >−</button>
                  <span className="w-6 text-center text-sm">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(pizza.id, quantity + 1)}
                    className="w-7 h-7 rounded-full border flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >+</button>
                </div>
                <button onClick={() => removeItem(pizza.id)} className="text-gray-400 hover:text-red-500 ml-1 text-sm">✕</button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-4 py-4 border-t">
            <div className="flex justify-between font-semibold mb-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
