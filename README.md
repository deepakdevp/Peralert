# PerAlert - Smart Personal Alerts

A Next.js SaaS application that sends WhatsApp alerts for important emails and custom schedules.

## Features

- 📧 **Smart Email Filtering**: Connect Gmail and get WhatsApp alerts for important emails
- ⏰ **Custom Reminders**: Set up recurring WhatsApp reminders with cron scheduling
- 💬 **WhatsApp Delivery**: Receive alerts directly on WhatsApp via Twilio
- 🔐 **OAuth Authentication**: Sign in with Google or GitHub
- 📊 **Dashboard**: Manage alerts, view delivery history, and track usage
- 🎯 **Real-time Processing**: Powered by Inngest for reliable job processing

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google/GitHub OAuth
- **Styling**: Tailwind CSS + shadcn/ui components  
- **Job Processing**: Inngest for scheduling and background jobs
- **Messaging**: Twilio WhatsApp Business API
- **Email**: Gmail API integration
- **Deployment**: Vercel-ready

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google OAuth app (for Gmail + auth)
- GitHub OAuth app (for auth)
- Twilio account with WhatsApp Business API
- Inngest account (free tier available)

### 1. Clone and Install

```bash
git clone <your-repo>
cd peralert
npm install
```

### 2. Environment Setup

Copy `.env.local` and configure:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/peralert?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Twilio
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_WHATSAPP_FROM="whatsapp:+14155238886"

# Inngest
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio to view data
npm run db:studio
```

### 4. OAuth Setup

#### Google OAuth (for Gmail + Auth)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Gmail API and Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Add scopes: `openid`, `email`, `profile`, `https://www.googleapis.com/auth/gmail.readonly`

#### GitHub OAuth (for Auth)
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### 5. Twilio WhatsApp Setup

1. Sign up for [Twilio](https://www.twilio.com)
2. Get WhatsApp Business API access (may require approval)
3. Get your Account SID, Auth Token, and WhatsApp number
4. Configure webhook URL: `https://your-domain.com/api/webhooks/twilio`

### 6. Inngest Setup

1. Sign up at [Inngest](https://www.inngest.com)
2. Create a new app
3. Get your Event Key and Signing Key
4. Configure webhook URL: `https://your-domain.com/api/inngest`

### 7. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

## Usage

### Creating Manual Alerts

1. Sign in with Google or GitHub
2. Go to Dashboard > Alerts > Create Alert
3. Fill in:
   - Alert name
   - WhatsApp number (E.164 format: +1234567890)
   - Cron schedule (e.g., "30 9 * * 1-5" for weekdays at 9:30 AM)
   - Message title and body
4. Save and your alert will be scheduled

### Connecting Gmail

1. Go to Dashboard > Integrations
2. Click "Connect Gmail Account"
3. Authorize Gmail access
4. Configure importance filtering
5. Receive WhatsApp alerts for important emails

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Database

Use Vercel Postgres, Supabase, or any PostgreSQL provider.

### Background Jobs

Inngest handles job processing in the cloud. Configure webhook URL in Inngest dashboard.

## API Endpoints

- `GET /api/alerts` - List user alerts
- `POST /api/alerts` - Create new alert
- `PUT /api/alerts/[id]` - Update alert (enable/disable)
- `DELETE /api/alerts/[id]` - Delete alert
- `POST /api/inngest` - Inngest webhook for job processing

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utilities
├── inngest/            # Background job functions
└── types/              # TypeScript definitions

prisma/
└── schema.prisma       # Database schema
```

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check the GitHub issues
2. Review the documentation
3. Create a new issue with detailed information

---

Built with ❤️ using Next.js, Prisma, Inngest, and Twilio.