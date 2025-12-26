# FitCity Inschrijven Feature - Implementation Progress

## Current Status: Simplified No-Payment Flow (Live)

The signup form is currently running **without online payments**. Users fill out the form (including IBAN), and must visit FitCity in person to:
- Pay €17 registration fee (pin/cash)
- Show ID
- Pick up membership card

### What's Working Now
- [x] 3-step signup form (membership → start date → personal info + IBAN)
- [x] IBAN collection with validation (Dutch format)
- [x] IBAN encrypted in database (AES-256-GCM)
- [x] Signup stored in D1 database with status `pending_pickup`
- [x] Thank you page with next steps
- [x] Pre-selected plan via URL (`/inschrijven?plan=smart-deal`)

### What's Disabled (for future)
- [ ] Mollie iDEAL payment integration
- [ ] Confirmation emails via Resend
- [ ] SEPA subscription auto-creation

---

## Future: Re-Enable Online Payments

The payment integration code is preserved and can be re-enabled. Here's what to do:

### Option 1: Simple Toggle (Recommended)

1. Change the frontend to call `/api/start-signup-payment` instead of `/api/submit-signup`
2. The existing Mollie integration will handle payments
3. Webhook will process payment confirmations
4. Emails will be sent automatically

**Files to modify:**
- `src/pages/Inschrijven.jsx` - Change API endpoint back to `/api/start-signup-payment`
- `src/pages/Bedankt.jsx` - Restore payment status polling

### Option 2: Environment Variable Toggle

Add `ENABLE_ONLINE_PAYMENT=true` to Cloudflare environment and modify frontend to check this flag.

---

# FUTURE PAYMENT IMPLEMENTATION (Reference)

## Overview
Build a checkout-style `/inschrijven` page with Mollie iDEAL payment integration for €17 registration fee, Cloudflare Pages Functions backend, D1 database, and Resend email confirmation.

**Form style:** Multi-step wizard (Step 1: membership → Step 2: start date → Step 3: personal info)

---

## Payment Flow Status (When Re-Enabled)

| Milestone | Status |
|-----------|--------|
| Phase 1: External setup | Done |
| Phase 2: Code implementation | Done |
| Phase 3: Preview testing | Needs re-testing |
| Phase 4: Production deployment | Not started |

### What Was Working (needs re-testing)
- [x] Signup form with 3-step wizard
- [x] Form validation
- [x] Mollie iDEAL payment (test mode)
- [x] Webhook receives payment confirmation
- [x] Signup stored in D1 database
- [x] Confirmation email sent via Resend
- [x] Redirect to /bedankt page

### To Test When Re-Enabling
- [ ] All 10 membership plans work correctly
- [ ] Edge cases (invalid data, payment cancelled, payment failed)
- [ ] Mobile responsiveness
- [ ] Email looks good in different email clients
- [ ] Pre-selected plan via URL (`/inschrijven?plan=smart-deal`)

---

## Testing Checklist

### Basic Flow Testing
- [ ] Complete signup with each membership type
- [ ] Verify correct price shown in Mollie checkout
- [ ] Verify email contains correct membership details
- [ ] Verify database record has correct data

### Payment Scenarios (use Mollie test mode)
- [ ] **Paid** - Complete payment successfully
- [ ] **Cancelled** - Cancel at Mollie checkout, verify status updates
- [ ] **Failed** - Select "Failed" in test bank
- [ ] **Expired** - Let payment expire (or simulate)

### Validation Testing
- [ ] Submit without selecting membership
- [ ] Submit with past date
- [ ] Submit with invalid email
- [ ] Submit with invalid phone number
- [ ] Submit with invalid postal code
- [ ] Submit without agreeing to terms
- [ ] Test minimum age validation (must be 13+)

### Mobile Testing
- [ ] Form layout on mobile
- [ ] Date picker works on mobile
- [ ] Membership cards scroll/wrap properly

---

## Environment Setup (Current - Development)

### Accounts Used (Developer's accounts)
| Service | Account | Purpose |
|---------|---------|---------|
| Mollie | Developer's test account | Payment processing |
| Resend | Developer's account | Email sending via `notifications.summitlab.dev` |
| Cloudflare | Developer's account | Hosting, D1 database, Pages |

### Environment Variables (Preview)
Set in Cloudflare Dashboard → Pages → fitcity → Settings:

| Variable | Current Value | Notes |
|----------|---------------|-------|
| `MOLLIE_API_KEY` | `test_xxx...` | Test mode key |
| `MOLLIE_WEBHOOK_TOKEN` | (secret) | Random string for webhook auth |
| `RESEND_API_KEY` | `re_xxx...` | Developer's Resend key |
| `EMAIL_FROM` | `FitCity Culemborg <noreply@notifications.summitlab.dev>` | From developer's domain |
| `APP_BASE_URL` | `https://feature-inschrijven.fitcity-cbr.pages.dev` | Preview URL |
| `ENABLE_SEPA` | `false` | Disabled for now |

### D1 Database Binding
Set in Cloudflare Dashboard → Pages → fitcity → Settings → Functions → D1 database bindings:
- Variable name: `DB`
- Database: `fitcity-signups`

---

## SEPA Automatic Subscriptions (Future)

### Current Status
`ENABLE_SEPA` is `false`. The current flow only handles the one-time €17 registration fee.

### What SEPA Would Do
When enabled, after successful €17 payment:
1. Create a Mollie Customer
2. Create a SEPA Direct Debit subscription
3. Automatically charge the monthly fee starting from the chosen start date

### Code Changes Needed for SEPA
The current implementation has a bug: the customer is created AFTER the first payment, so the mandate (bank authorization) isn't linked.

**To fix:**
1. Modify `start-signup-payment.js` to create Mollie Customer FIRST
2. Include `customerId` in the payment creation
3. This links the mandate to the customer
4. Then subscriptions will work

**Files to modify:**
- `functions/api/start-signup-payment.js` - Create customer before payment
- `functions/api/mollie-webhook.js` - Already has subscription logic

### Testing SEPA
1. Set `ENABLE_SEPA=true` in environment variables
2. Complete a signup with test iDEAL payment
3. Check Mollie dashboard for:
   - Customer created
   - Subscription created with correct amount/interval
   - First charge scheduled for start date

---

## Production Deployment Guide

### Option A: Gym Owner Has Their Own Accounts

If FitCity wants to use their own Mollie/Resend accounts:

#### 1. Mollie Setup (Gym Owner)
- [ ] Create Mollie account at https://mollie.com
- [ ] Complete business verification (KYC)
- [ ] Enable iDEAL payment method
- [ ] Get **live** API key from Mollie Dashboard → Developers → API keys
- [ ] (Optional) Enable SEPA Direct Debit for subscriptions

#### 2. Resend Setup (Gym Owner)
- [ ] Create Resend account at https://resend.com
- [ ] Add domain (e.g., `fitcityculemborg.nl` or subdomain like `mail.fitcityculemborg.nl`)
- [ ] Add DNS records to domain registrar:
  - SPF record (TXT)
  - DKIM records (3x CNAME or TXT)
  - Domain verification (TXT)
- [ ] Create API key

#### 3. Cloudflare Setup (Gym Owner or Developer)
If gym owner manages their own Cloudflare:
- [ ] Create Cloudflare account
- [ ] Add website to Cloudflare Pages
- [ ] Create D1 database: `wrangler d1 create fitcity-signups`
- [ ] Run migration: `wrangler d1 execute fitcity-signups --remote --file=migrations/0001_create_signups_table.sql`
- [ ] Set up D1 binding in Pages settings
- [ ] Set all environment variables

#### 4. Environment Variables (Production)
| Variable | Value |
|----------|-------|
| `MOLLIE_API_KEY` | `live_xxx...` (LIVE key, not test!) |
| `MOLLIE_WEBHOOK_TOKEN` | New random string |
| `RESEND_API_KEY` | Gym's Resend API key |
| `EMAIL_FROM` | `FitCity Culemborg <noreply@fitcityculemborg.nl>` |
| `APP_BASE_URL` | `https://fitcityculemborg.nl` |
| `ENABLE_SEPA` | `false` (or `true` if ready) |

### Option B: Developer Maintains Everything

If you (developer) maintain the accounts:

#### What You Manage
- Mollie account (receive payouts to gym's bank account)
- Resend account (email sending)
- Cloudflare account (hosting, database)

#### What Gym Owner Needs to Provide
- Bank account details for Mollie payouts
- Business details for Mollie KYC verification
- Logo/branding for emails (optional)

#### Ongoing Maintenance
- Monitor Mollie for failed payments
- Monitor Resend for bounced emails
- Handle support requests about signups
- Update membership prices when needed
- Database backups (D1 has automatic backups)

---

## Local Development Notes

### Running Locally
Local development with full Functions support requires `wrangler pages dev`, but this can be tricky.

**Recommended approach:** Use Cloudflare Preview deployments for testing. Each push to the branch creates a new preview URL with full functionality.

### Why ngrok Is NOT Needed
Originally planned for webhook testing, but **not needed** because:
- Cloudflare Preview deployments have public URLs
- Mollie webhooks work directly with preview URLs
- No need for local tunnel

### If You Must Run Locally
```bash
# Terminal 1: Run Vite
npm run dev

# Terminal 2: Run Wrangler (proxies to Vite + handles Functions)
wrangler pages dev --proxy 5174

# Visit http://localhost:8788
```

For webhooks locally, you WOULD need ngrok:
```bash
ngrok http 8788
# Update APP_BASE_URL in .dev.vars to ngrok URL
```

---

## File Reference

### Backend Functions
| File | Purpose |
|------|---------|
| `functions/api/start-signup-payment.js` | Create Mollie payment, store signup, return checkout URL |
| `functions/api/mollie-webhook.js` | Handle payment status, send email, (future: create subscription) |
| `functions/_lib/db.js` | D1 database operations |
| `functions/_lib/email.js` | Resend email with HTML template |
| `functions/_lib/mollie.js` | Mollie API wrapper |
| `functions/_lib/validation.js` | Input validation |
| `functions/_lib/memberships.js` | Membership data for backend |

### Frontend
| File | Purpose |
|------|---------|
| `src/pages/Inschrijven.jsx` | Multi-step signup form |
| `src/pages/Bedankt.jsx` | Thank you page |
| `src/components/signup/*` | Form step components |
| `src/components/ui/Input.jsx` | Styled input |
| `src/components/ui/Checkbox.jsx` | Styled checkbox |

### Config
| File | Purpose |
|------|---------|
| `wrangler.toml` | Cloudflare Pages + D1 config |
| `migrations/0001_create_signups_table.sql` | Database schema |

---

## Database Schema

```sql
CREATE TABLE signups (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, paid, cancelled, failed, expired
  membership_id TEXT NOT NULL,
  membership_name TEXT NOT NULL,
  membership_price TEXT NOT NULL,
  membership_term TEXT NOT NULL,
  start_date TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth TEXT NOT NULL,
  street TEXT NOT NULL,
  house_number TEXT NOT NULL,
  house_number_addition TEXT,
  postal_code TEXT NOT NULL,
  city TEXT NOT NULL,
  mollie_payment_id TEXT,
  mollie_customer_id TEXT,       -- For SEPA subscriptions
  mollie_subscription_id TEXT,   -- For SEPA subscriptions
  email_sent_at TEXT
);
```

### Viewing Database Records
```bash
# Query all signups
wrangler d1 execute fitcity-signups --remote --command="SELECT * FROM signups"

# Query by status
wrangler d1 execute fitcity-signups --remote --command="SELECT * FROM signups WHERE status='paid'"
```
---

Update 2025-12-25 20:43:09:
- Added polling on /bedankt to refresh signup status (paid/failed/canceled/expired vs pending) with manual refresh and timestamp.
- Local signup form persists in localStorage for 24h to ease retries and preselect membership/category.
Update 2025-12-25 20:54:49:
- Added timeout handling on /bedankt with contact+retry CTA and prefilled contact link using stored signup info and signup ID.
- Contact form now accepts prefilled name/email/phone/message via query params (used by thank-you fallback).
Update 2025-12-25 21:03:36:
- Adjusted /bedankt polling cadence: every 1s for first 10s, then every 7s until timeout/terminal status.
Update 2025-12-25 21:07:47:
- Timeout on /bedankt now redirects to contact after 3s with prefilled signup info and alert banner on contact page.
Update 2025-12-25 21:23:14:
- Removed auto-redirect on payment timeout; user now stays on status page with retry/contact options.
Update 2025-12-25 22:04:02:
- Adjusted contact page scrolling (hash/prefill only) and added scroll margin on contact form anchor.
- Prevented date/time overflow and normalized heights on contact form inputs.
- Restyled confirmation email with FitCity colors, softer 'Let op', removed blocked logo image, and kept next steps/CTA.
- Tweaked Summit Labs footer credit position and bold text.
Update 2025-12-25 22:31:13:
- Email template restyled with dark background tables and FitCity accents, but some clients still render a light background; needs further validation.
Update 2025-12-25 23:15:00:
- Fixed iOS Mail dark background: replaced all rgba() colors with solid hex (iOS Mail doesn't support rgba).
- Added bgcolor attribute to every table cell for maximum client compatibility.
- Added border-radius to inner td elements so rounded corners clip properly on iOS Mail.
