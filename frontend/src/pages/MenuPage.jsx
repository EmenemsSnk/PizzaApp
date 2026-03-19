import React, { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

export default function MenuPage() {
  const [pizzas, setPizzas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addItem } = useCart()

  useEffect(() => {
    fetch('/api/pizzas')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load menu')
        return r.json()
      })
      .then(data => { setPizzas(data); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [])

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
    </div>
  )

  if (error) return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-center text-red-500">{error}</div>
  )

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
      <p className="text-gray-500 mb-8">Freshly made with the finest ingredients</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.map(pizza => (
          <div key={pizza.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
            <img
              src={pizza.imageUrl}
              alt={pizza.name}
              className="w-full h-44 object-cover"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400' }}
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h2 className="font-bold text-lg">{pizza.name}</h2>
                <span className="text-red-600 font-bold">${pizza.price.toFixed(2)}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{pizza.description}</p>
              <button
                onClick={() => addItem(pizza)}
                className="w-full bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
