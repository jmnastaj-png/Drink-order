// Server-Sent Events endpoint to stream order events to admin/kitchen dashboard
import type { NextApiRequest, NextApiResponse } from 'next'
import { subscribe } from '../../lib/broadcaster'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Connection', 'keep-alive')

  const send = (data:any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  const unsubscribe = subscribe(send)

  // send a ping every 15 seconds to keep connection alive
  const interval = setInterval(()=> res.write(': keep-alive\n\n'), 15000)

  req.on('close', ()=>{
    clearInterval(interval)
    unsubscribe()
    res.end()
  })
}
