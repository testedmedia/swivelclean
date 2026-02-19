# Changelog

## v2.0 — MAJOR — 2026-02-19
**Full Design System + Backend Rebuild**
- Design system: HSL CSS variables, depth shadows, shadcn/ui semantic tokens
- 14 reusable components: Button, Card, Badge, Section, ServiceCard, ReviewCard, StatCard, TrustBadge, ShimmerButton, NumberTicker, BorderBeam, StepIndicator, Navbar, Footer
- Framer Motion animations: scroll reveals, stagger entrances, spring physics, AnimatePresence transitions
- MagicUI components: ShimmerButton hero CTA, NumberTicker stats, BorderBeam popular card
- All 9 public pages rebuilt with component library
- Admin dashboard upgraded: lucide-react icons (replaced 15+ inline SVGs), semantic tokens, Framer Motion
- Stripe Checkout end-to-end: checkout session creation, webhook handler, booking auto-creation
- Contact form API with admin notification + auto-reply emails
- Twilio SMS: booking confirmation, cleaner assignment, 24h reminders
- Photo upload endpoint (Supabase Storage)
- 24h reminder cron job (Vercel cron, daily 5PM UTC)
- New env vars: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, CRON_SECRET

## v1.0 — MAJOR — 2026-02-18
**Ready Rental Cleaning MVP Launch**
- Full-stack booking app with 9 pages + admin dashboard
- Stripe payment integration (form ready, webhook pending)
- Email automation (5 transactional sequences via Resend)
- Database schema (clients, bookings, invoices, reviews)
- Business plan showcase page (7 interactive tabs)
- CRO-optimized design (mobile responsive, glassmorphism, trust signals)
- Deployed to Vercel with health checks
- Month 1 target: 50 bookings ($9,700 revenue)

