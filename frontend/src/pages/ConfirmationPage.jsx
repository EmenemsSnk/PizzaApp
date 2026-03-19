import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function ConfirmationPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Order not found')
        return r.json()
      })
      .then(data => { setOrder(data); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [id])

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
    </div>
  )

  if (error) return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center text-red-500">{error}</div>
  )

  return (
    <main className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="text-6xl mb-3">🎉</div>
        <h1 className="text-3xl font-bold text-green-600 mb-1">Order Confirmed!</h1>
        <p className="text-gray-500">Order #{order.id}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        <div>
          <h2 className="font-bold text-sm text-gray-400 uppercase tracking-wide mb-2">Items</h2>
          {order.items?.map((item, i) => (
            <div key={i} className="flex justify-between text-sm py-1">
              <span>{item.pizzaName} × {item.quantity}</span>
              <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold border-t mt-2 pt-2">
            <span>Total</span>
            <span className="text-red-600">${Number(order.total).toFixed(2)}</span>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-sm text-gray-400 uppercase tracking-wide mb-2">Delivery To</h2>
          <p className="text-sm">{order.customerName}</p>
          <p className="text-sm text-gray-600">{order.street}</p>
          <p className="text-sm text-gray-600">{order.city}, {order.zip}</p>
        </div>

        {order.cardLast4 && (
          <div>
            <h2 className="font-bold text-sm text-gray-400 uppercase tracking-wide mb-2">Payment</h2>
            <p className="text-sm">Card ending in ••••{order.cardLast4}</p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            {order.status}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        className="w-full mt-6 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
      >
        Back to Menu
      </button>
    </main>
  )
}
