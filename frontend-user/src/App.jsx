import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserNavbar from './components/UserNavbar'
import Breadcrumbs from './components/Breadcrumbs'

import Home from './pages/Home'
import Vendors from './pages/Vendors'
import Categories from './pages/Categories'
import Subcategories from './pages/Subcategories'
import Products from './pages/Products'

export default function App() {
  return (
    <BrowserRouter>
      <UserNavbar />
      <div className="p-4 mt-4">
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/subcategories" element={<Subcategories />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
