import React, { useEffect, useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err))
  }, [])

  const handleClick = (id) => {
    navigate(`/subcategories?category=${id}`)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(c => (
          <div
            key={c._id}
            className="p-4 bg-white rounded shadow cursor-pointer hover:bg-blue-50"
            onClick={() => handleClick(c._id)}
          >
            <h3 className="font-bold">{c.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
