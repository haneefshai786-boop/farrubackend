import React, { useEffect, useState } from 'react'
import api from '../api'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function Subcategories() {
  const [subcategories, setSubcategories] = useState([])
  const [categories, setCategories] = useState([])
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const selectedCategory = searchParams.get('category')

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data))
    api.get('/subcategories').then(res => setSubcategories(res.data))
  }, [])

  const filtered = selectedCategory
    ? subcategories.filter(s => s.category?._id === selectedCategory)
    : subcategories

  const handleClick = (id) => {
    navigate(`/products?subcategory=${id}`)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Subcategories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(s => (
          <div
            key={s._id}
            className="p-4 bg-white rounded shadow cursor-pointer hover:bg-blue-50"
            onClick={() => handleClick(s._id)}
          >
            <h3 className="font-bold">{s.name}</h3>
            <p className="text-gray-500 text-sm">Category: {s.category?.name || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
