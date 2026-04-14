# Deployment & Migration Guide for Muzhuo Inspection

This project is built with Next.js and Tailwind CSS, optimized for SEO and ready for deployment on **Vercel**.

## 1. Deployment (Vercel)

1. **Push to GitHub**: Upload the project files to a private or public GitHub repository.
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in.
   - Click **Add New** > **Project**.
   - Import your repository.
3. **Environment Variables**:
   In the Vercel project settings, add the following environment variables:
   - `STRIPE_SECRET_KEY`: Your Stripe secret key (starts with `sk_`).
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key (starts with `pk_`).
   - `DOMAIN`: Set this to `https://muzhuoinspection.com` (once purchased) or the Vercel-provided URL for testing.

## 2. PayPal Setup (Payment)

1. Log in to your [PayPal Developer Dashboard](https://developer.paypal.com).
2. Create an **App** to get your **Client ID**.
3. In Vercel, add `NEXT_PUBLIC_PAYPAL_CLIENT_ID` to your environment variables.
4. PayPal automatically supports Credit Cards and Apple Pay (via Advanced Checkout or standard smart buttons depending on your region).

## 3. Stripe (Legacy)
Note: The project was migrated to PayPal as per user preference. Stripe code is preserved in `api/checkout` but unused by the current `order` page.

## 3. Domain Migration (muzhuoinspection.com)

1. Buy the domain `muzhuoinspection.com` from a registrar (e.g., Namecheap, GoDaddy).
2. In Vercel, go to **Settings** > **Domains**.
3. Add `muzhuoinspection.com`.
4. Update your DNS settings at your registrar as instructed by Vercel (usually an `A` record and a `CNAME` record).

## 4. SEO Checklist

- **Sitemap**: Available at `/sitemap.xml`.
- **Robots**: Available at `/robots.txt`.
- **JSON-LD**: Embedded in the root layout for local business discovery.
- **Alt Tags**: Ensure any images you add have descriptive `alt` tags.
- **Content**: Regularly add blog posts or case studies to increase search rankings.

---
Built by Muzhuo Inspection Support.
