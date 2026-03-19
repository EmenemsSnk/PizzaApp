import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar({ onCartClick }) {
  const { count } = useCart()

  return (
    <nav className="bg-red-600 text-white shadow-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">🍕 PizzaApp</Link>
        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2 bg-white text-red-600 font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-red-50 transition"
        >
          Cart
          {count > 0 && (
            <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  )
}
