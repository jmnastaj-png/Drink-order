import { useEffect, useState } from 'react'

export default function AdminPage(){
  const [events, setEvents] = useState<any[]>([])

  useEffect(()=>{
    const es = new EventSource('/api/events')
    es.onmessage = (e) => {
      try{
        const data = JSON.parse(e.data)
        setEvents(prev => [data, ...prev])
      }catch(err){ console.error(err) }
    }
    es.onerror = (err)=> console.error('EventSource error', err)
    return ()=> es.close()
  }, [])

  return (
    <main className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-4">
        <h1 className="text-xl font-semibold mb-4">Kitchen / Staff Dashboard (Demo)</h1>
        <div className="space-y-4">
          {events.length===0 && <div className="text-sm text-gray-500">No events yet</div>}
          {events.map((ev,idx)=> (
            <div key={idx} className="p-3 border rounded">
              <div className="text-xs text-gray-400">{ev.type}</div>
              <pre className="text-sm">{JSON.stringify(ev.order || ev, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
