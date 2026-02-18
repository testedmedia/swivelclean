# SwivelClean LA — Project Brain

**Project Name:** SwivelClean LA (formerly SpotlessLA)
**Version:** v1.0
**Live URL:** https://swivelclean.la (pending domain setup)
**Repo:** ~/spotlessla/

## Project Goals

**Current Milestone:** MVP Launch — Get to **$10,000 in Month 1 revenue** via direct Airbnb host bookings

**Success Metrics:**
- 50+ bookings in Month 1 (40 turnovers + 10 deep cleans)
- $9,700+ revenue
- 4.8+ star rating (50+ reviews)
- 2 dedicated cleaners running

## Business Model

| Service | Price | Time | Target/Month |
|---------|-------|------|--------------|
| Standard Turnover | $180 | 3-4h | 30-35 |
| Premium Turnover (3+BR) | $220 | 4-5h | 5-8 |
| Deep Clean | $350 | 5-6h | 10-15 |

**Margins:**
- Standard: $110/job (61% margin) - Cleaner pays ~$70
- Premium: $132/job (60% margin)
- Deep Clean: $200/job (57% margin)

## Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS + glassmorphism
- **Database:** Supabase (Postgres + Prisma)
- **ORM:** Prisma
- **Payment:** Stripe ($180, $220, $350 products)
- **Email:** Resend (transactional + marketing)
- **Hosting:** Vercel
- **Auth:** Simple password (admin-only, no user auth)

## Architecture

```
swivelclean-la/
  app/
    layout.tsx              # Root layout (nav + footer)
    page.tsx                # Home (hero, social proof, CTA)
    services/page.tsx       # Services + pricing + FAQ
    book/page.tsx           # Multi-step booking form
    about/page.tsx          # Story + trust signals
    reviews/page.tsx        # Reviews + gallery
    contact/page.tsx        # Lead capture form
    faq/page.tsx            # FAQ deep-dive
    thank-you/page.tsx      # Post-booking confirmation
    business-plan/page.tsx  # Full business plan showcase (7 tabs)
    admin/
      page.tsx              # Dashboard (bookings, revenue, stats)
    api/
      bookings/route.ts     # POST: Create booking, send email
      health/route.ts       # GET: Health check
  components/
    (UI components as needed)
  lib/
    email.ts                # Email service (Resend)
    prisma.ts               # DB client (optional)
  prisma/
    schema.prisma           # Database schema
  public/
    (images, assets)
  CLAUDE.md                 # This file
  CHANGELOG.md              # Version history
  .env.example              # Environment template
  package.json              # Scripts + deps
```

## Database Schema

**Models:**
- `Client` — Host info (email, phone, name, address, notes)
- `Booking` — Cleaning job (clientId, service, address, date/time, status, price, stripeSessionId)
- `Invoice` — Billing (bookingId, amount, status)
- `Review` — Feedback (clientId, rating, text, source)

**Key Tables:**
| Table | Key Columns | Purpose |
|-------|-------------|---------|
| clients | id, email, phone, name, address | Host directory |
| bookings | id, clientId, service, scheduledDate, scheduledTime, status, price | Job log |
| invoices | id, bookingId, amount, stripeSessionId, status | Billing + revenue |
| reviews | id, clientId, rating, text, source | Feedback (Google/Airbnb) |

## Email Automation (Resend)

**Transactional (auto-triggered):**
1. `sendBookingConfirmation()` — After Stripe payment succeeds
2. `send24hReminder()` — 24h before scheduled cleaning
3. `sendCleanerAssignment()` — When admin assigns cleaner (optional, can use SMS)
4. `sendCompletionEmail()` — After job marked complete, with photos
5. `sendReviewRequest()` — 2h after completion (Google + Airbnb links)

**Marketing (manual trigger):**
- Welcome sequence (first booking)
- Re-booking nudge (28 days after last job)
- Property manager pitch (custom)
- Monthly newsletter (tips + promo)

All emails configured in `/lib/email.ts`. Resend webhook will auto-send.

## API Routes

| Route | Method | Purpose | Auth |
|-------|--------|---------|------|
| `/api/bookings` | POST | Create new booking, send confirmation | None (public) |
| `/api/bookings` | GET | List all bookings | Admin token |
| `/api/health` | GET | Health check (used by Vercel) | None |

**Stripe Webhook (Not yet implemented):**
- Listen on `charge.succeeded` → Update booking status to "confirmed"
- Listen on `charge.failed` → Email host about payment issue

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `DATABASE_URL` | Supabase Postgres connection string | Yes |
| `RESEND_API_KEY` | Email service API key | Yes |
| `STRIPE_PUBLIC_KEY` | Stripe publishable key (pk_test_...) | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_test_...) | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes (for webhooks) |
| `NEXT_PUBLIC_APP_URL` | Public app URL (localhost or domain) | Yes |
| `PRODUCTION_URL` | Production URL (for redirects) | Yes |
| `ADMIN_PASSWORD` | Simple password for /admin access (temp) | No |

## Key Features (MVP)

✅ **Home page** — Hero, trust signals (200+ hosts, 4.9★), CTA buttons
✅ **Services page** — Cards, pricing, FAQ, insurance badge
✅ **Booking page** — 3-step form (property, date/time, contact), Stripe checkout
✅ **Business Plan page** — 7 interactive tabs (overview, market, services, ops, timeline, legal, marketing)
✅ **Admin dashboard** — Bookings list, stats (total, pending, completed, revenue)
✅ **Email automation** — Confirmation, reminders, completion, review requests
✅ **Database** — Supabase + Prisma (clients, bookings, invoices, reviews)

## Test Commands

```bash
# Local dev
npm run dev                 # Start dev server (port 3000)

# Type checking
npm run test:types         # tsc --noEmit

# Database
npm run prisma:generate    # Generate Prisma client
npm run db:push            # Push schema to Supabase
npm run prisma:studio      # Open Prisma Studio

# Build & deploy
npm run build              # Build for production
npm run start              # Start production server
bash scripts/deploy.sh 1.0 MAJOR "Initial MVP" "Full booking + email + admin"
```

## Deploy Command

```bash
bash scripts/deploy.sh <version> <tag> "<title>" "<changes>"

# Example:
bash scripts/deploy.sh 1.0 MAJOR "SwivelClean LA MVP Launch" "Full-stack booking app with email automation and admin dashboard"
```

## Production URLs

- **App:** https://swivelclean.la
- **API:** https://swivelclean.la/api
- **Admin:** https://swivelclean.la/admin
- **Health:** https://swivelclean.la/api/health

## Known Issues / Tech Debt

- **Stripe payment integration** — Currently form only, no actual payment processing (TODO: wire Stripe.js in checkout)
- **Admin auth** — Using simple password in env var (should upgrade to JWT/session in future)
- **Cleaner assignment** — Manual (TODO: add cleaner roster + scheduler UI)
- **Photo uploads** — Not yet implemented (TODO: add S3 or Supabase storage)
- **SMS notifications** — Not yet implemented (TODO: integrate Twilio for cleaner texts)
- **Calendar UI** — Not yet implemented (TODO: add ical integration)
- **Mobile app** — Not planned (web-first, mobile responsive)

## Launch Checklist

Before deploying v1.0:

- [ ] Domain registered (swivelclean.la)
- [ ] Supabase project created + DATABASE_URL in .env
- [ ] Resend account setup + RESEND_API_KEY in .env
- [ ] Stripe test account setup + keys in .env
- [ ] All pages mobile-responsive ✓
- [ ] Booking form end-to-end tested
- [ ] Email templates tested (check spam folder)
- [ ] Admin dashboard loads with test data
- [ ] npm run build passes (no errors)
- [ ] npm run test:types passes (TypeScript clean)
- [ ] Deployed to Vercel + health check passes
- [ ] All links work (nav, CTAs, footer)
- [ ] Google Business Profile created
- [ ] First 2-3 free cleanings booked for reviews

## Documentation

- [Business Plan](./app/business-plan/page.tsx) — Full 7-tab business plan (market, operations, timeline, legal, marketing)
- [CHANGELOG.md](./CHANGELOG.md) — Version history
- [Prisma Schema](./prisma/schema.prisma) — Database model definitions
- [Email Templates](./lib/email.ts) — All transactional + marketing sequences

## Next Steps After v1.0

1. **Cleaner Management** — Add roster UI, availability scheduling, pay tracking
2. **Stripe Webhook** — Real-time payment confirmation + status updates
3. **Photo Upload** — Post-cleaning photos stored in Supabase Storage
4. **SMS Alerts** — Twilio integration for 24h reminders + job updates
5. **Calendar Sync** — iCal/Google Calendar export for hosts
6. **Reviews** — Auto-fetch Google reviews + embed on site
7. **Property Manager** — Bulk booking, dedicated account, volume pricing
8. **Mobile App** — React Native + Expo for cleaner + host apps

---

**Last Updated:** 2026-02-18
**Maintained By:** Jarvis (Claude Code)
