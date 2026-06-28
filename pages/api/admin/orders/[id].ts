import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { publish } from '../../../lib/broadcaster'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { id } = req.query
  if(req.method === 'PATCH'){
    const { status } = req.body
    if(!status) return res.status(400).json({ error: 'status required' })
    const order = await prisma.order.update({ where: { id: String(id) }, data: { status } })
    publish({ type: 'order:updated', order })
    return res.status(200).json(order)
  }
  if(req.method === 'GET'){
    const order = await prisma.order.findUnique({ where: { id: String(id) }, include: { items: true } })
    if(!order) return res.status(404).json({ error: 'not found' })
    return res.status(200).json(order)
  }
  res.setHeader('Allow', 'GET, PATCH')
  res.status(405).end('Method Not Allowed')
}
