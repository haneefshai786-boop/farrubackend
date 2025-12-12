import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Vendors(){
  const [vendors, setVendors] = useState([])

  useEffect(() => {
    api.get('/vendors')
      .then(res => setVendors(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Vendors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map(v => (
          <div key={v._id} className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">{v.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
