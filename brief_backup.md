## What you’re building (crisp MVP)

- A small SaaS where users:
  1. Land on a marketing site (LP + pricing)
  2. Sign up via Google/GitHub
  3. Create manual alerts (e.g., “Ping me on WhatsApp every weekday at 9:30”)
  4. Connect Gmail and get important-email alerts
  5. Receive alerts via Twilio integration

## Recommended tech (pragmatic & fast)

- **Frontend/App**: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui
- **Auth**: Auth.js (NextAuth) with Google & GitHub OAuth
- **DB**: Postgres (Supabase) + Prisma ORM
- **Jobs & Scheduling**: Inngest (dev-friendly, reliable) for:
  - Cron-like schedules (manual alerts)
  - Gmail polling per-user
  - Retries & observability
- **Queue/Cache**: Upstash Redis (optional, for rate limits/locks)
- **Payments (later)**: Lemon Squeezy or Stripe Billing (free trial + per-seat/usage)
- **Messaging**: Twilio WhatsApp Business API
- **Gmail**: Google Gmail API with offline access; start with polling (simple, stable). You can graduate to Gmail Push + Pub/Sub later.
- **Infra**: Vercel (web + API routes) + Inngest cloud + Supabase + Twilio

## High-level architecture

- Next.js (routes & UI) → reads/writes via Prisma → Supabase Postgres
- Auth.js → users & OAuth accounts (Google/GitHub)
- Inngest:
  - `alerts.send` job → sends WhatsApp via Twilio
  - `alerts.scheduler` cron → enqueues per-user alert jobs
  - `gmail.poll` job → fetches new messages for connected users
- Twilio → WhatsApp message delivery + status webhook back to Next.js

## Data model (Prisma outline)

You can paste this into `schema.prisma` and refine:

```prisma
model User {
  id            String    @id @default(cuid())
  email         String?   @unique
  name          String?
  image         String?
  timezone      String    @default("Asia/Singapore")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  subscriptions Subscription[]
  alerts        Alert[]
  integrations  Integration[]
  deliveries    Delivery[]
}

model Account { // Auth.js provider accounts
  id                String  @id @default(cuid())
  userId            String
  provider          String
  providerAccountId String
  access_token      String?
  refresh_token     String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  // Gmail will live here (google), GitHub for login only
  user              User    @relation(fields: [userId], references: [id])
  @@unique([provider, providerAccountId])
}

model Subscription {
  id               String   @id @default(cuid())
  userId           String
  plan             String   // free, pro, etc.
  status           String   // active, trialing, canceled
  currentPeriodEnd DateTime
  user             User     @relation(fields: [userId], references: [id])
}

model Alert {
  id           String   @id @default(cuid())
  userId       String
  name         String
  channel      String   // "whatsapp"
  to           String   // full WhatsApp number in E.164
  scheduleCron String?  // e.g., "CRON_TZ=Asia/Singapore 30 9 * * 1-5"
  nextRunAt    DateTime?
  template     Json     // message template (see below)
  enabled      Boolean  @default(true)
  user         User     @relation(fields: [userId], references: [id])
}

model Delivery {
  id        String   @id @default(cuid())
  alertId   String?
  userId    String
  channel   String   // whatsapp, email (future)
  payload   Json
  status    String   // queued, sent, delivered, failed
  error     String?
  createdAt DateTime @default(now())
  alert     Alert?   @relation(fields: [alertId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
}

model Integration {
  id            String   @id @default(cuid())
  userId        String
  type          String   // "gmail"
  labelFilter   String?  // "INBOX" or a Gmail label id
  importance    String?  // "important-only" | "all"
  lastHistoryId String?  // for incremental sync later
  enabled       Boolean  @default(true)
  user          User     @relation(fields: [userId], references: [id])
}
```

## Manual alert message template (flexible)

Use JSON so the UI can render a live preview and the job can fill variables:

```json
{
  "title": "Daily Standup Ping",
  "body": "Hey {{name}}, it’s {{now.tz}}. Don’t forget your standup: {{link}}",
  "variables": {
    "name": "Deepak",
    "link": "https://app.yoursaas.com/standup"
  },
  "throttle": { "windowMinutes": 60, "maxSends": 1 },
  "failover": { "emailAfterMinutes": 5, "enabled": false }
}
```

- `{{now.tz}}` is resolved with the user’s timezone.
- Throttle prevents spam if multiple triggers collide.
- Later, you can add conditionals (e.g., send only Mon–Fri).

## Key flows

1) **Sign-in**
- Auth.js with `GoogleProvider` and `GitHubProvider`
- Store Google tokens with offline access (for Gmail polling)

2) **Create manual WhatsApp alert**
- Form: name, destination number, schedule (cron helper), template preview
- Save → Inngest cron registers (or your global cron reads DB and enqueues jobs at minute-level)
- Inngest job → call Twilio WhatsApp send → store `Delivery`

3) **Connect Gmail, get “important email” alerts**
- User clicks “Connect Gmail”
- OAuth consent → store refresh token in `Account`
- `gmail.poll` (every 3–5 min per active user or staggered) → list new messages (query: `is:important newer_than:5m` + optional label)
- For each match → format WhatsApp alert (From, Subject, short preview + link) → send via Twilio

Start with polling. It’s simpler than Gmail push (Pub/Sub) and good enough for MVP.

## Pricing (MVP suggestion)

- **Free**: 100 WhatsApp alerts/month, Gmail polling every 10 min, 1 Gmail account
- **Pro $9/mo**: 1,000 alerts/month, polling every 2–3 min, priority queueing, multiple alert templates
- **Team $29/mo**: Shared inbox rules, multiple members, higher limits

## UI basics

- **Pages**: `/` (LP), `/pricing`, `/dashboard`, `/alerts/new`, `/integrations`
- Drop in shadcn components, add a friendly onboarding checklist card

## “Important email” alert format (WhatsApp)

```text
✉️ New important email

From: {{from}}
Subject: {{subject}}
Preview: {{snippet}}
Open: {{gmail_link}}
```

Where `gmail_link` is `https://mail.google.com/mail/u/0/#inbox/{{threadId}}`.
