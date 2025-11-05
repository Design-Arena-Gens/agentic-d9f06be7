'use client'

import { useState, useEffect } from 'react'

interface ShopItem {
  id: string
  name: string
  category: string
  price: number
  quantity: number
  date: string
  notes: string
}

export default function Home() {
  const [items, setItems] = useState<ShopItem[]>([])
  const [formData, setFormData] = useState({
    name: '',
    category: 'Groceries',
    price: '',
    quantity: '1',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  useEffect(() => {
    const saved = localStorage.getItem('shopItems')
    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('shopItems', JSON.stringify(items))
  }, [items])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newItem: ShopItem = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      date: formData.date,
      notes: formData.notes
    }

    setItems([newItem, ...items])

    setFormData({
      name: '',
      category: 'Groceries',
      price: '',
      quantity: '1',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    })
  }

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const totalSpent = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="container">
      <h1>🛒 Shop Date Save</h1>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-value">{items.length}</div>
          <div className="stat-label">Shopping Trips</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalItems}</div>
          <div className="stat-label">Total Items</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${totalSpent.toFixed(2)}</div>
          <div className="stat-label">Total Spent</div>
        </div>
      </div>

      <div className="form-section">
        <h2 style={{ marginBottom: '20px', color: '#667eea' }}>Add Shopping Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g., Organic Apples"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Groceries">Groceries</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Purchase Date *</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional notes..."
            />
          </div>

          <button type="submit">💾 Save Item</button>
        </form>
      </div>

      <div className="items-list">
        <h2 style={{ marginBottom: '20px', color: '#667eea' }}>Shopping History</h2>

        {items.length === 0 ? (
          <div className="empty-state">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p>No shopping items saved yet. Add your first item above!</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-header">
                <div className="item-name">{item.name}</div>
                <div className="item-date">{new Date(item.date).toLocaleDateString()}</div>
              </div>

              <div className="item-details">
                <div className="detail-item">
                  <span className="detail-label">Category:</span> {item.category}
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price:</span> ${item.price.toFixed(2)}
                </div>
                <div className="detail-item">
                  <span className="detail-label">Quantity:</span> {item.quantity}
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total:</span> ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>

              {item.notes && (
                <div className="item-notes">
                  📝 {item.notes}
                </div>
              )}

              <button
                className="delete-btn"
                onClick={() => deleteItem(item.id)}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
