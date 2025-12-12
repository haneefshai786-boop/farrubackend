import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Products(){
  const [products,setProducts]=useState([])
  const [vendors,setV]=useState([])
  const [cats,setC]=useState([])
  const [subs,setS]=useState([])

  const [form, setForm] = useState({ name: '', price: 0, vendor: '', category: '', subcategory: '', description: '' })

  async function fetchAll(){
    try{
      const [{data:pv},{data:pc},{data:ps},{data:pp}] = await Promise.all([api.get('/vendors'), api.get('/categories'), api.get('/subcategories'), api.get('/products')])
      setV(pv); setC(pc); setS(ps); setProducts(pp)
      if(!form.vendor && pv[0]) setForm(f=>({...f, vendor: pv[0]._id}))
      if(!form.category && pc[0]) setForm(f=>({...f, category: pc[0]._id}))
    }catch(e){console.error(e)}
  }

  useEffect(()=>{ fetchAll() },[])

  async function add(e){
    e.preventDefault()
    try{
      await api.post('/products', {
        name: form.name,
        price: Number(form.price),
        vendor: form.vendor,
        category: form.category,
        subcategory: form.subcategory,
        description: form.description
      })
      setForm({ name: '', price: 0, vendor: form.vendor, category: form.category, subcategory: '', description: '' })
      fetchAll()
    }catch(e){console.error(e)}
  }

  async function remove(id){
    try{ await api.delete('/products/'+id); fetchAll() }catch(e){console.error(e)}
  }

  return (
    <div>
      <h3 className="text-xl mb-4">Products</h3>

      <form onSubmit={add} className="grid grid-cols-3 gap-2 mb-6">
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Product title" className="p-2 border rounded col-span-1" />
        <input type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} placeholder="Price" className="p-2 border rounded col-span-1" />
        <select value={form.vendor} onChange={e=>setForm({...form, vendor:e.target.value})} className="p-2 border rounded">
          <option value="">Select vendor</option>
          {vendors.map(v=> <option key={v._id} value={v._id}>{v.name}</option>)}
        </select>

        <select value={form.category} onChange={e=>setForm({...form, category:e.target.value})} className="p-2 border rounded">
          <option value="">Category</option>
          {cats.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>

        <select value={form.subcategory} onChange={e=>setForm({...form, subcategory:e.target.value})} className="p-2 border rounded">
          <option value="">Subcategory</option>
          {subs.map(s=> <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>

        <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" className="p-2 border rounded col-span-3"></textarea>

        <div className="col-span-3">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded">Add Product</button>
        </div>
      </form>

      <div className="space-y-3">
        {products.map(p=>(
          <div key={p._id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-slate-500">{p.description}</div>
              <div className="text-sm">Price: ₹{p.price}</div>
            </div>
            <div>
              <button onClick={()=>remove(p._id)} className="px-2 py-1 bg-rose-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
