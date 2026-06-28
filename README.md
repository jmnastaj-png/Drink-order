# Drink-order — Starter scaffold

This repo contains a minimal Next.js + Tailwind + Prisma starter for the Drink Order mobile web app.

What's included:
- Mobile-first customer pages: QR code landing page and /table/[code] menu + cart
- Simple API endpoint to create orders (pages/api/orders.ts)
- Prisma schema (SQLite for local dev)
- Stripe webhook placeholder

Getting started (local):
1. npm install
2. Set NEXT_PUBLIC_BASE_URL in .env.local (optional)
3. npx prisma migrate dev --name init
4. npm run dev

Next steps I can implement for you:
- Wire up Postgres (Supabase/Neon) and migrate schema
- Implement Stripe PaymentIntents checkout flow and webhook handling
- Add realtime updates (Pusher / Supabase Realtime) and a kitchen dashboard UI
- Create printable per-table QR codes and admin pages for menu management

Tell me which of the next steps you'd like me to implement next and I'll continue on a new branch.
