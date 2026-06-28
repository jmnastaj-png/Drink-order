import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'
import { publish } from '../../lib/broadcaster'
import stripe from '../../lib/stripe'

// POST /api/orders
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST'){
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { table, items = [], payNow = false } = req.body
  if(!table || !Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'table and items required' })

  const total = items.reduce((s:any,i:any)=>s + (i.price||0), 0)

  const order = await prisma.order.create({
    data: {
      tableCode: table,
      total,
      status: 'received',
      items: { create: items.map((it:any)=>({ name: it.name, price: it.price })) }
    },
    include: { items: true }
  })

  // notify subscribers (kitchen/admin)
  publish({ type: 'order:created', order })

  if(payNow){
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map((it:any)=>({ price_data: { currency: 'usd', product_data: { name: it.name }, unit_amount: it.price }, quantity: 1 })),
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/order/success?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/order/cancel?orderId=${order.id}`,
      metadata: { orderId: order.id }
    })

    return res.status(201).json({ id: order.id, checkoutUrl: session.url })
  }

  res.status(201).json({ id: order.id, status: order.status })
}
