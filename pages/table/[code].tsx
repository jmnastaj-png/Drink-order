import { useState } from 'react'
import { useRouter } from 'next/router'

const SAMPLE_MENU = [
  { id: 'm1', name: 'Iced Coffee', price: 350 },
  { id: 'm2', name: 'Lemon Soda', price: 300 },
  { id: 'm3', name: 'Mango Smoothie', price: 450 }
]

export default function TablePage({}){
  const router = useRouter()
  const { code } = router.query
  const [cart, setCart] = useState([])
  const add = (item) => setCart(prev => [...prev, item])
  const remove = (idx) => setCart(prev => prev.filter((_,i)=>i!==idx))
  const total = cart.reduce((s,i)=>s+i.price,0)

  const placeOrder = async () =>{
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: code || 'unknown', items: cart })
    })
    const data = await res.json()
    alert('Order placed: ' + data.id)
    setCart([])
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold">Menu — Table {code}</h2>
        <div className="mt-3 space-y-3">
          {SAMPLE_MENU.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">${(item.price/100).toFixed(2)}</div>
              </div>
              <button onClick={()=>add(item)} className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4">
          <h3 className="font-medium">Cart</h3>
          {cart.length===0 && <div className="text-sm text-gray-500">No items yet</div>}
          <ul className="divide-y mt-2">
            {cart.map((it,idx)=> (
              <li key={idx} className="py-2 flex justify-between items-center">
                <div className="text-sm">{it.name}</div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-600">${(it.price/100).toFixed(2)}</div>
                  <button onClick={()=>remove(idx)} className="text-red-500 text-sm">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <div className="font-medium">Total: ${(total/100).toFixed(2)}</div>
            <button onClick={placeOrder} disabled={cart.length===0} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">Place Order</button>
          </div>
        </div>
      </div>
    </main>
  )
}
