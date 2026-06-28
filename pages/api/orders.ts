// Simple orders API (demo). In a real app this would create DB records, call Stripe, and emit realtime events.
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'POST'){
    const body = req.body
    console.log('New order', body)
    // Return a mock order id and status
    return res.status(201).json({ id: 'ord_' + Date.now(), status: 'received' })
  }
  res.setHeader('Allow', 'POST')
  res.status(405).end('Method Not Allowed')
}
