import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Vendors(){
  const [list,setList]=useState([])
  const [name,setName]=useState('')

  async function fetchV(){ try{ const {data}=await api.get('/vendors'); setList(data) }catch(e){console.error(e)} }
  useEffect(()=>{ fetchV() },[])

  async function add(e){
    e.preventDefault()
    try{ await api.post('/vendors', { name }); setName(''); fetchV() }catch(e){console.error(e)}
  }

  async function remove(id){
    try{ await api.delete('/vendors/'+id); fetchV() }catch(e){console.error(e)}
  }

  return (
    <div>
      <h3 className="text-xl mb-4">Vendors</h3>

      <form onSubmit={add} className="mb-4 flex gap-2">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Vendor name" className="flex-1 p-2 border rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>

      <div className="space-y-2">
        {list.map(v=>(
          <div key={v._id} className="p-3 bg-white rounded flex justify-between items-center">
            <div>{v.name}</div>
            <div>
              <button onClick={()=>remove(v._id)} className="px-2 py-1 bg-rose-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
