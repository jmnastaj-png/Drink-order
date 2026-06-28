import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
  console.log('Seeding...')
  const restaurant = await prisma.restaurant.upsert({
    where: { name: 'Demo Cafe' },
    update: {},
    create: { name: 'Demo Cafe' }
  })

  const table = await prisma.table.upsert({
    where: { code: 'T1' },
    update: {},
    create: { code: 'T1', name: 'Table 1', restaurantId: restaurant.id }
  })

  await prisma.menuItem.deleteMany({ where: { restaurantId: restaurant.id } })

  await prisma.menuItem.createMany({ data: [
    { name: 'Iced Coffee', price: 350, restaurantId: restaurant.id },
    { name: 'Lemon Soda', price: 300, restaurantId: restaurant.id },
    { name: 'Mango Smoothie', price: 450, restaurantId: restaurant.id }
  ]})

  console.log('Seeding finished')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
