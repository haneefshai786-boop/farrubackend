import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="bg-blue-600 text-white p-4 flex space-x-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/vendors" className="hover:underline">Vendors</Link>
      <Link to="/categories" className="hover:underline">Categories</Link>
      <Link to="/subcategories" className="hover:underline">Subcategories</Link>
      <Link to="/products" className="hover:underline">Products</Link>
    </nav>
  )
}
