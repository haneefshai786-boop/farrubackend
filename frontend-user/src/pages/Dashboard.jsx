import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Dashboard() {
  const [vendorsCount, setVendorsCount] = useState(0)
  const [categoriesCount, setCategoriesCount] = useState(0)
  const [subcategoriesCount, setSubcategoriesCount] = useState(0)
  const [productsCount, setProductsCount] = useState(0)

  useEffect(() => {
    api.get('/vendors').then(res => setVendorsCount(res.data.length))
    api.get('/categories').then(res => setCategoriesCount(res.data.length))
    api.get('/subcategories').then(res => setSubcategoriesCount(res.data.length))
    api.get('/products').then(res => setProductsCount(res.data.length))
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-blue-500 text-white rounded shadow">
          <h2 className="text-xl font-semibold">Vendors</h2>
          <p className="text-3xl">{vendorsCount}</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded shadow">
          <h2 className="text-xl font-semibold">Categories</h2>
          <p className="text-3xl">{categoriesCount}</p>
        </div>
        <div className="p-4 bg-yellow-500 text-white rounded shadow">
          <h2 className="text-xl font-semibold">Subcategories</h2>
          <p className="text-3xl">{subcategoriesCount}</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded shadow">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-3xl">{productsCount}</p>
        </div>
      </div>
    </div>
  )
}
