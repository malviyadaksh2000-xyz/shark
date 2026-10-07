# SmartSaver Production Deployment Guide

Deploying SmartSaver to production using **Vercel** and **Firebase**.

---

## 🚀 1. Deploying Frontend & API on Vercel

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `smartsaver` repository.
4. Set Environment Variables in Vercel Project Settings:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_DEMO_MODE` = `false` (or `true` for demo showcase)
   - `GEMINI_API_KEY`
5. Click **Deploy**. Vercel will automatically build the Next.js 14 App Router application.

---

## 🔥 2. Deploying Firebase Rules & Indexes

Install Firebase CLI:
```bash
npm install -g firebase-tools
firebase login
firebase use --add
```

Deploy Security Rules & Indexes:
```bash
firebase deploy --only firestore:rules,storage:rules,firestore:indexes
```

---

## 🌐 3. Custom Domain & SSL
1. In Vercel, go to **Settings > Domains**.
2. Add your domain (e.g. `smartsaver.app`).
3. Add the generated CNAME / A records to your DNS provider.
