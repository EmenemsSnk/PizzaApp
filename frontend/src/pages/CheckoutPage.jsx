import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    customerName: '',
    street: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function formatCard(e) {
    let v = e.target.value.replace(/\D/g, '').substring(0, 16)
    v = v.replace(/(.{4})/g, '$1 ').trim()
    setForm(prev => ({ ...prev, cardNumber: v }))
  }

  function formatExpiry(e) {
    let v = e.target.value.replace(/\D/g, '').substring(0, 4)
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2)
    setForm(prev => ({ ...prev, expiry: v }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (items.length === 0) return

    setSubmitting(true)
    setError(null)

    const body = {
      customerName: form.customerName,
      street: form.street,
      city: form.city,
      zip: form.zip,
      items: items.map(i => ({ pizzaId: i.pizza.id, quantity: i.quantity })),
      payment: {
        cardNumber: form.cardNumber.replace(/\s/g, ''),
        expiry: form.expiry,
        cvv: form.cvv,
      }
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Order failed. Please try again.')
      const order = await res.json()
      clearCart()
      navigate(`/confirmation/${order.id}`)
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
        <button onClick={() => navigate('/')} className="bg-red-600 text-white px-6 py-2 rounded-xl font-semibold">
          Back to Menu
        </button>
      </div>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Summary */}
        <section className="bg-white rounded-2xl shadow-sm p-4">
          <h2 className="font-bold text-lg mb-3">Order Summary</h2>
          {items.map(({ pizza, quantity }) => (
            <div key={pizza.id} className="flex justify-between text-sm py-1">
              <span>{pizza.name} × {quantity}</span>
              <span>${(pizza.price * quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold border-t mt-2 pt-2">
            <span>Total</span>
            <span className="text-red-600">${total.toFixed(2)}</span>
          </div>
        </section>

        {/* Shipping */}
        <section className="bg-white rounded-2xl shadow-sm p-4">
          <h2 className="font-bold text-lg mb-3">Shipping Address</h2>
          <div className="space-y-3">
            <input
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              name="street"
              value={form.street}
              onChange={handleChange}
              placeholder="Street Address"
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <input
                name="zip"
                value={form.zip}
                onChange={handleChange}
                placeholder="ZIP Code"
                required
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="bg-white rounded-2xl shadow-sm p-4">
          <h2 className="font-bold text-lg mb-1">Payment</h2>
          <p className="text-xs text-gray-400 mb-3">Demo only — no real charges</p>
          <div className="space-y-3">
            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={formatCard}
              placeholder="Card Number"
              required
              inputMode="numeric"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                name="expiry"
                value={form.expiry}
                onChange={formatExpiry}
                placeholder="MM/YY"
                required
                inputMode="numeric"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <input
                name="cvv"
                value={form.cvv}
                onChange={e => setForm(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').substring(0, 4) }))}
                placeholder="CVV"
                required
                inputMode="numeric"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-red-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-700 transition disabled:opacity-60"
        >
          {submitting ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
        </button>
      </form>
    </main>
  )
}
