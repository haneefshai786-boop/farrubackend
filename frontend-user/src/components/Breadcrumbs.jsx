import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import api from '../api'

export default function Breadcrumbs() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [vendorName, setVendorName] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [subcategoryName, setSubcategoryName] = useState('')

  const vendorId = searchParams.get('vendor')
  const categoryId = searchParams.get('category')
  const subcategoryId = searchParams.get('subcategory')

  useEffect(() => {
    if (vendorId) api.get(`/vendors/${vendorId}`).then(res => setVendorName(res.data.name)).catch(() => setVendorName('Vendor'))
    if (categoryId) api.get(`/categories/${categoryId}`).then(res => setCategoryName(res.data.name)).catch(() => setCategoryName('Category'))
    if (subcategoryId) api.get(`/subcategories/${subcategoryId}`).then(res => setSubcategoryName(res.data.name)).catch(() => setSubcategoryName('Subcategory'))
  }, [vendorId, categoryId, subcategoryId])

  const pathnames = location.pathname.split('/').filter(x => x)

  return (
    <nav className="text-gray-600 text-sm mb-4">
      <Link to="/" className="hover:underline">Home</Link>
      {pathnames.map((name, index) => {
        let link = '/' + pathnames.slice(0, index + 1).join('/')
        let display = name.charAt(0).toUpperCase() + name.slice(1)

        if (name === 'products' && vendorId) display = vendorName || 'Vendor'
        if (name === 'subcategories' && categoryId) display = categoryName || 'Category'
        if (name === 'products' && subcategoryId) display = subcategoryName || 'Subcategory'

        return (
          <span key={index}>
            {' / '}
            {index === pathnames.length - 1 ? (
              <span>{display}</span>
            ) : (
              <Link to={link} className="hover:underline">{display}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
