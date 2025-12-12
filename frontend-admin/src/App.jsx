import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './pages/Dashboard'
import Vendors from './pages/Vendors'
import Categories from './pages/Categories'
import Subcategories from './pages/Subcategories'
import Products from './pages/Products'
import Login from './pages/Login'

export default function App(){
  // naive auth check (replace with real auth later)
  const token = localStorage.getItem('admin_token');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={token ? <AdminLayout /> : <Navigate to="/login" replace />} />
    </Routes>
  )
}
