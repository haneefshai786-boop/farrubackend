import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Products() {
  const [products, setProducts] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [vendors, setVendors] = useState([])
  const [selectedSub, setSelectedSub] = useState('')
  const [selectedVendor, setSelectedVendor] = useState('')

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data))
    api.get('/subcategories').then(res => setSubcategories(res.data))
    api.get('/vendors').then(res => setVendors(res.data))
  }, [])

  const filtered = products.filter(p => 
    (!selectedSub || p.subcategory?._id === selectedSub) &&
    (!selectedVendor || p.vendor?._id === selectedVendor)
  )

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>

      <div className="flex gap-2 mb-4">
        <select
          value={selectedSub}
          onChange={e => setSelectedSub(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Subcategories</option>
          {subcategories.map(s => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>

        <select
          value={selectedVendor}
          onChange={e => setSelectedVendor(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Vendors</option>
          {vendors.map(v => (
            <option key={v._id} value={v._id}>{v.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div key={p._id} className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-gray-500 text-sm">Vendor: {p.vendor?.name || 'N/A'}</p>
            <p className="text-gray-500 text-sm">Category: {p.category?.name || 'N/A'}</p>
            <p className="text-gray-500 text-sm">Subcategory: {p.subcategory?.name || 'N/A'}</p>
            <p className="text-gray-900 font-semibold mt-2">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
