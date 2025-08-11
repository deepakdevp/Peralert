# PerAlert Setup Guide

This guide walks you through setting up all the required services and API keys for PerAlert to function properly.

## 🗂️ Quick Setup Checklist

| Service | Required For | Status |
|---------|--------------|--------|
| **PostgreSQL Database** | Data storage | ⭕ Required |
| **Google OAuth** | Authentication + Gmail | ⭕ Required |
| **GitHub OAuth** | Authentication | ⭕ Required |
| **Twilio** | WhatsApp messaging | ⭕ Required |
| **Inngest** | Background jobs | ⭕ Required |
| **Supabase** | Database hosting (optional) | 🔵 Optional |
| **Vercel** | Deployment (optional) | 🔵 Optional |

---

## 1. 🗄️ Database Setup

### Option A: Local PostgreSQL
```bash
# Install PostgreSQL locally
brew install postgresql  # macOS
# or follow instructions for your OS

# Start PostgreSQL
brew services start postgresql

# Create database
createdb peralert
```

### Option B: Supabase (Recommended for production)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Wait for setup to complete
4. Go to Settings → Database
5. Copy connection string
6. Replace `[YOUR-PASSWORD]` with your actual password

**Environment Variable:**
```bash
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

---

## 2. 🔐 Google OAuth Setup (Gmail + Authentication)

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable the following APIs:
   - Gmail API
   - Google+ API (for profile info)

### Step 2: Create OAuth Credentials
1. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
2. Choose **Web application**
3. Add authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
4. Add authorized JavaScript origins:
   ```
   http://localhost:3000
   https://yourdomain.com
   ```

### Step 3: Configure Scopes
Add these scopes in OAuth consent screen:
- `openid`
- `email`
- `profile`
- `https://www.googleapis.com/auth/gmail.readonly`

**Environment Variables:**
```bash
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

---

## 3. 🐙 GitHub OAuth Setup

### Step 1: Create OAuth App
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click **New OAuth App**
3. Fill in:
   - **Application name:** PerAlert
   - **Homepage URL:** `http://localhost:3000` (or your domain)
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`

### Step 2: Get Credentials
1. Note the **Client ID**
2. Generate a **Client Secret**

**Environment Variables:**
```bash
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

---

## 4. 📱 Twilio WhatsApp Setup

### Step 1: Create Twilio Account
1. Sign up at [twilio.com](https://www.twilio.com)
2. Verify your account (may require phone verification)

### Step 2: WhatsApp Business API
1. Go to Console → Messaging → Try it out → Send a WhatsApp message
2. **Important:** WhatsApp Business API requires approval for production
3. For development, you can use Twilio's sandbox number

### Step 3: Get Credentials
1. Find your **Account SID** and **Auth Token** in Console Dashboard
2. For sandbox: Use `whatsapp:+14155238886`
3. For production: Use your approved WhatsApp Business number

### Step 4: Configure Webhook (Optional)
```
https://yourdomain.com/api/webhooks/twilio
```

**Environment Variables:**
```bash
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your-auth-token"
TWILIO_WHATSAPP_FROM="whatsapp:+14155238886"  # Sandbox number
```

### Testing WhatsApp
Before going live, test with Twilio's sandbox:
1. Send "join [sandbox-name]" to +1 415 523 8886 from your WhatsApp
2. You should receive a confirmation message

---

## 5. ⚡ Inngest Setup

### Step 1: Create Account
1. Go to [inngest.com](https://www.inngest.com)
2. Sign up for free account
3. Create a new app

### Step 2: Get Keys
1. Go to your app dashboard
2. Find **Event Key** (for sending events)
3. Find **Signing Key** (for webhook verification)

### Step 3: Configure Webhook
Add webhook URL in Inngest dashboard:
```
https://yourdomain.com/api/inngest
```

**Environment Variables:**
```bash
INNGEST_EVENT_KEY="evt_xxxxxxxxxxxxxxxxxxxx"
INNGEST_SIGNING_KEY="signkey_xxxxxxxxxxxxxxxxxxxx"
```

---

## 6. 🔑 NextAuth Configuration

### Generate Secret
```bash
# Generate a secure random string
openssl rand -base64 32
```

**Environment Variables:**
```bash
NEXTAUTH_URL="http://localhost:3000"  # Your domain in production
NEXTAUTH_SECRET="your-generated-secret-key"
```

---

## 7. 🚀 Deployment Setup (Vercel)

### Step 1: Connect Repository
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository

### Step 2: Environment Variables
Add all environment variables in Vercel dashboard:
- Go to Settings → Environment Variables
- Add each variable from your `.env.local`

### Step 3: Database
- If using Supabase: Already configured
- If using Vercel Postgres: Enable in dashboard

---

## 8. 📋 Complete Environment Variables

Create `.env.local` file in your project root:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/peralert"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-key"

# Google OAuth (Gmail + Auth)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Twilio WhatsApp
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your-auth-token"
TWILIO_WHATSAPP_FROM="whatsapp:+14155238886"

# Inngest
INNGEST_EVENT_KEY="evt_xxxxxxxxxxxxxxxxxxxx"
INNGEST_SIGNING_KEY="signkey_xxxxxxxxxxxxxxxxxxxx"
```

---

## 9. ✅ Testing Your Setup

### Database
```bash
npm run db:push
npm run db:generate
```

### Authentication
1. Start dev server: `npm run dev`
2. Go to `http://localhost:3000/auth/signin`
3. Try signing in with Google and GitHub

### WhatsApp (Sandbox)
1. Join Twilio sandbox from your WhatsApp
2. Create a test alert in the dashboard
3. Check if message is received

### Gmail Integration
1. Sign in with Google
2. Go to Dashboard → Integrations
3. Connect Gmail
4. Send yourself an important email to test

---

## 🔧 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check if PostgreSQL is running
brew services list | grep postgres

# Reset database
npm run db:push --force-reset
```

**OAuth Redirect Mismatch**
- Ensure redirect URIs in OAuth apps match exactly
- Check for trailing slashes
- Verify HTTP vs HTTPS

**WhatsApp Not Receiving Messages**
- Confirm you've joined the Twilio sandbox
- Check Twilio logs in console
- Verify phone number format (+1234567890)

**Gmail Permission Denied**
- Ensure Gmail API is enabled in Google Cloud
- Check OAuth scopes are correctly configured
- Re-authorize if needed

---

## 📞 Getting Help

If you encounter issues:

1. **Check the console logs** for error messages
2. **Verify environment variables** are correctly set
3. **Test each service individually** using their dashboards
4. **Check API status pages** for service outages

**Support Resources:**
- GitHub Issues: Create an issue with detailed error info
- Email: support@peralert.com
- Docs: Each service has comprehensive documentation

---

## 🎯 Production Checklist

Before going live:

- [ ] Replace all localhost URLs with your domain
- [ ] Use production database (not local)
- [ ] Get WhatsApp Business API approval from Twilio
- [ ] Set up proper error monitoring
- [ ] Configure backups for your database
- [ ] Set up monitoring for Inngest jobs
- [ ] Add proper CORS headers if needed
- [ ] Enable rate limiting for APIs
- [ ] Set up analytics (optional)

---

**🎉 You're all set! Your PerAlert application should now be fully functional.**