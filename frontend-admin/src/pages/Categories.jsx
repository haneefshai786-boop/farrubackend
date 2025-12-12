import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Categories() {
  const [cats, setCats] = useState([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchCats() {
    setLoading(true)
    try {
      const { data } = await api.get('/categories')
      // ensure data is an array
      if (Array.isArray(data)) setCats(data)
      else setCats([])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCats() }, [])

  async function add(e) {
    e.preventDefault()
    if (!name) return
    try {
      await api.post('/categories', { name })
      setName('')
      fetchCats()
    } catch (e) {
      console.error(e)
    }
  }

  async function remove(id) {
    try {
      await api.delete('/categories/' + id)
      fetchCats()
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <div>
      <h3 className="text-xl mb-4">Categories</h3>

      <form onSubmit={add} className="mb-4 flex gap-2">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Category name" className="flex-1 p-2 border rounded" />
        <button className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
      </form>

      <div className="space-y-2">
        {cats.length === 0 ? (
          <div>No categories found</div>
        ) : (
          cats.map(c => (
            <div key={c._id} className="p-3 bg-white rounded flex justify-between items-center">
              <div>{c.name || 'Unnamed'}</div>
              <button onClick={() => remove(c._id)} className="px-2 py-1 bg-rose-500 text-white rounded">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
