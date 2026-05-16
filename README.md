# Waffert — Build Global Wealth Every Month

> Early-access B2C wealth education platform for international savers, diaspora investors, and halal-conscious investors.

**Status:** Early Access MVP (validation phase) — educational simulations only, no live trading, no custody, no client money.

---

## What is Waffert?

Waffert helps international savers explore simple monthly wealth plans through:

- A **free wealth quiz** that recommends an educational basket
- **5 illustrative wealth baskets** matched to different goals and risk profiles
- An **investment simulator** showing how monthly contributions could grow
- An **early-access registration** for when real investing launches
- An **education library** covering global investing concepts

Waffert does NOT provide investment advice, execute trades, hold client money, or offer regulated financial services. Future investment functionality will be delivered through appropriately regulated partner providers.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Charts | Recharts |
| Database | Supabase (PostgreSQL) |
| Email | Resend (TODO: connect) |
| Analytics | PostHog / Plausible (TODO: connect) |
| Deployment | Vercel |

---

## Pages

| Route | Status | Description |
|-------|--------|-------------|
| `/` | Live | Homepage with hero, how it works, basket previews |
| `/how-it-works` | Live | Explainer page |
| `/quiz` | Live | Multi-step wealth quiz |
| `/quiz/result` | Live | Basket recommendation result |
| `/baskets` | Live | All 5 launch baskets |
| `/baskets/[slug]` | Live | Individual basket detail |
| `/simulator` | Live | Investment simulator |
| `/waitlist` | Live | Early access registration |
| `/education` | Live | Education library (content coming) |
| `/consultation` | Live | Book a consultation |
| `/admin` | Live | Admin dashboard (password-gated) |
| `/legal/disclaimer` | Live | Legal disclaimer |
| `/legal/privacy` | Live | Privacy policy |
| `/legal/terms` | Live | Terms of use (placeholder) |

---

## Launch Baskets (5 active)

1. **Global Growth Basket** — diversified global equity exposure
2. **Conservative EUR Basket** — capital preservation in euros
3. **USD Wealth Protection Basket** — USD-denominated wealth building
4. **Halal Global Basket** — Shariah-compliant investing concept
5. **Child Education Basket** — medium-term goal savings

Hidden baskets (in codebase, not public navigation):
- Retirement Builder Basket
- Dividend Income Basket
- Defensive Inflation Protection Basket
- Emerging Market Diaspora Basket

---

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Fill in Supabase, Resend, etc.

# Run development server
npm run dev
```

Open http://localhost:3000

---

## Environment Variables

See `.env.local.example`. Required for full functionality:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_ADMIN_PASSWORD=waffert2026
```

---

## Supabase Setup

1. Create a new Supabase project at supabase.com
2. Run `supabase/schema.sql` in the SQL editor
3. Run `supabase/seed.sql` in the SQL editor
4. Add your URL and anon key to `.env.local`

---

## Deployment (Vercel)

```bash
npm i -g vercel
vercel         # preview
vercel --prod  # production
```

Set environment variables in Vercel dashboard.

---

## Provider Abstraction

The platform is provider-agnostic. See `lib/config.ts`:

- `mockInvestmentProvider` — active now (educational mock data)
- `alpacaPaperProvider` — future placeholder
- `upvestProvider` — future placeholder (EU regulated)
- `drivewealthProvider` — future placeholder (US)

---

## Admin Dashboard

Visit `/admin`. Default password: `waffert2026` (set `NEXT_PUBLIC_ADMIN_PASSWORD`).
Currently shows mock data — connect Supabase to see real leads.

---

## TODOs Before Commercial Launch

- [ ] Connect Supabase for lead persistence
- [ ] Connect Resend for email notifications  
- [ ] Replace admin password gate with proper auth
- [ ] Legal review of all basket descriptions and disclaimers
- [ ] Shariah scholar review of Halal basket content
- [ ] Regulated partner agreement (Upvest / WealthKernel / other)
- [ ] GDPR consent logging to database
- [ ] Add analytics (PostHog or Plausible)
- [ ] Write education library articles
- [ ] Full Terms of Service (replace placeholder)
- [ ] Cookie consent banner
- [ ] Configure domain DNS for waffert.com
