# Full MVP scaffold notes

This branch adds the following features on top of the initial scaffold:

- Postgres-ready Prisma schema and seed script (prisma/seed.js)
- Stripe Checkout integration for pay-now flow and webhook handler
- Orders are persisted in Postgres via Prisma
- Simple in-memory broadcaster + SSE endpoint (.pages/api/events.ts) for realtime order events to the kitchen/dashboard
- Kitchen/staff dashboard at /admin that listens for events and shows incoming orders
- NextAuth magic-link (email) auth scaffolding (requires SMTP credentials)

Environment variables (see .env.example)
- DATABASE_URL - Postgres connection string
- NEXT_PUBLIC_BASE_URL - public base URL
- NEXTAUTH_URL, NEXTAUTH_SECRET - NextAuth config
- SMTP_SERVER, SMTP_FROM - SMTP for sending magic links
- STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET - Stripe keys

Local seed
1. Set DATABASE_URL to a local Postgres instance
2. npx prisma migrate dev --name init
3. node prisma/seed.js

Stripe
- Set STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
- Expose a public URL for Stripe webhooks (use stripe CLI in dev: stripe listen --forward-to localhost:3000/api/webhooks/stripe)

Realtime
- For production use, replace lib/broadcaster with Pusher / Supabase Realtime or Redis pub/sub. The in-memory broadcaster is for demo/dev only.

Auth
- NextAuth email provider requires SMTP. See .env.example for variables.
