// Stripe webhook handler
import type { NextApiRequest, NextApiResponse } from 'next'
import stripe from '../../lib/stripe'
import prisma from '../../lib/prisma'
import { publish } from '../../lib/broadcaster'

export const config = { api: { bodyParser: false } }

import { buffer } from 'micro'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end('Method Not Allowed')
  const sig = req.headers['stripe-signature'] as string | undefined
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
  const buf = await buffer(req)
  let event: any
  try{
    event = stripe.webhooks.constructEvent(buf.toString(), sig || '', webhookSecret)
  }catch(err:any){
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if(event.type === 'checkout.session.completed'){
    const session = event.data.object
    const orderId = session.metadata?.orderId
    if(orderId){
      const order = await prisma.order.update({ where: { id: orderId }, data: { paid: true, status: 'paid' }, include: { items: true } })
      publish({ type: 'order:paid', order })
    }
  }

  res.json({ received: true })
}
