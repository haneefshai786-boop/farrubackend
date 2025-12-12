import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Subcategories(){
  const [subs,setSubs]=useState([])
  const [cats,setCats]=useState([])
  const [name,setName]=useState('')
  const [cat,setCat]=useState('')

  async function fetchAll(){
    try{
      const [{data:c},{data:s}] = await Promise.all([api.get('/categories'), api.get('/subcategories')])
      setCats(c); setSubs(s)
      if(c[0] && !cat) setCat(c[0]._id)
    }catch(e){console.error(e)}
  }

  useEffect(()=>{ fetchAll() },[])

  async function add(e){
    e.preventDefault()
    try{ await api.post('/subcategories', { name, category: cat }); setName(''); fetchAll() }catch(e){console.error(e)}
  }

  async function remove(id){
    try{ await api.delete('/subcategories/'+id); fetchAll() }catch(e){console.error(e)}
  }

  return (
    <div>
      <h3 className="text-xl mb-4">Subcategories</h3>

      <form onSubmit={add} className="mb-4 flex gap-2">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Subcategory name" className="p-2 border rounded" />
        <select value={cat} onChange={e=>setCat(e.target.value)} className="p-2 border rounded">
          {cats.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Add</button>
      </form>

      <div className="space-y-2">
        {subs.map(s=>(
          <div key={s._id} className="p-3 bg-white rounded flex justify-between">
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-slate-500">{s.category?.name}</div>
            </div>
            <div>
              <button onClick={()=>remove(s._id)} className="px-2 py-1 bg-rose-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
