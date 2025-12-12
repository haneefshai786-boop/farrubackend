import React from 'react'
import { Link } from 'react-router-dom'

export default function UserNavbar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex space-x-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/vendors" className="hover:underline">Vendors</Link>
      <Link to="/categories" className="hover:underline">Categories</Link>
    </nav>
  )
}
