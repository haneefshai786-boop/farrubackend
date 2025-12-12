import React, { useState } from 'react'
import api from '../api'

export default function Login(){
  const [email,setEmail]=useState('admin@example.com')
  const [password,setPassword]=useState('admin123')
  const [err,setErr]=useState(null)

  async function submit(e){
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', { email, password })
      // backend returns token sometimes; if not, just set a fake token
      const token = data.token || 'local-token'
      localStorage.setItem('admin_token', token)
      location.href = '/'
    } catch (e) {
      setErr(e?.response?.data?.message || e.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h3 className="text-xl mb-4">Admin Login</h3>
        {err && <div className="mb-3 text-sm text-rose-600">{err}</div>}
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded" placeholder="Password" />
        <button className="w-full bg-emerald-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}
