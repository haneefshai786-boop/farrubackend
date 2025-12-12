import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    vendors: 0,
    categories: 0,
    subcategories: 0,
    products: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchStats() {
    setLoading(true)
    try {
      const [vendors, categories, subcategories, products] = await Promise.all([
        api.get('/vendors'),
        api.get('/categories'),
        api.get('/subcategories'),
        api.get('/products')
      ])

      setStats({
        vendors: Array.isArray(vendors.data) ? vendors.data.length : 0,
        categories: Array.isArray(categories.data) ? categories.data.length : 0,
        subcategories: Array.isArray(subcategories.data) ? subcategories.data.length : 0,
        products: Array.isArray(products.data) ? products.data.length : 0
      })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStats() }, [])

  if (loading) return <div>Loading dashboard...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Dashboard</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <div className="text-slate-500">Vendors</div>
          <div className="text-2xl font-bold">{stats.vendors}</div>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <div className="text-slate-500">Categories</div>
          <div className="text-2xl font-bold">{stats.categories}</div>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <div className="text-slate-500">Subcategories</div>
          <div className="text-2xl font-bold">{stats.subcategories}</div>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <div className="text-slate-500">Products</div>
          <div className="text-2xl font-bold">{stats.products}</div>
        </div>
      </div>
    </div>
  )
}
