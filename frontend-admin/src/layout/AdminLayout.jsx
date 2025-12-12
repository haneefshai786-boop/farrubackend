import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Vendors from '../pages/Vendors'
import Categories from '../pages/Categories'
import Subcategories from '../pages/Subcategories'
import Products from '../pages/Products'

function Icon({ children }) {
  return <span className="w-5 h-5 inline-block mr-3">{children}</span>
}

export default function AdminLayout(){
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r p-4">
        <h1 className="text-xl font-bold mb-6">Admin</h1>

        <nav className="space-y-1">
          <Link to="/" className="flex items-center p-2 rounded hover:bg-slate-100">
            <Icon><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v18H3z"/></svg></Icon>
            Dashboard
          </Link>

          <Link to="/vendors" className="flex items-center p-2 rounded hover:bg-slate-100">
            <Icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 7h18v4H3z"/><path d="M6 11v10h12V11"/></svg></Icon>
            Vendors
          </Link>

          <Link to="/categories" className="flex items-center p-2 rounded hover:bg-slate-100">
            <Icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"/></svg></Icon>
            Categories
          </Link>

          <Link to="/subcategories" className="flex items-center p-2 rounded hover:bg-slate-100">
            <Icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 6h16v12H4z"/></svg></Icon>
            Subcategories
          </Link>

          <Link to="/products" className="flex items-center p-2 rounded hover:bg-slate-100">
            <Icon><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 6h16v12H4z"/></svg></Icon>
            Products
          </Link>
        </nav>
      </aside>

      <div className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <p className="text-sm text-slate-500">Multivendor admin</p>
          </div>
          <div>
            <button onClick={() => { localStorage.removeItem('admin_token'); location.href = '/login' }} className="px-3 py-2 bg-rose-500 text-white rounded">Logout</button>
          </div>
        </header>

        <main>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/subcategories" element={<Subcategories />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
