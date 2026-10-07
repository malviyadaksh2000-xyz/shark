# SmartSaver Setup & Developer Guide

This guide will walk you through setting up, running, and configuring **SmartSaver** on your local machine.

---

## 📋 Prerequisites
- **Node.js**: v18.17.0 or newer (v20+ recommended). Check with `node -v`.
- **Package Manager**: `npm` (or `pnpm` / `yarn`).

---

## ⚙️ Step 1: Clone & Install Dependencies

```bash
# 1. Clone repository
git clone https://github.com/your-repo/smartsaver.git
cd smartsaver

# 2. Install dependencies
npm install
```

---

## 🎮 Step 2: Running in Demo Mode (Zero Setup Required)

SmartSaver includes a built-in **Demo Mode** enabled by default. In Demo Mode:
- No Firebase credentials are required.
- All 14 provider adapters use verified mock pricing matrices.
- Authentication provides instant pre-authenticated demo accounts.
- AI Search uses high-performance deterministic synonym dictionaries.

To run immediately:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## ☁️ Step 3: Connecting Live Firebase (Optional)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com).
2. Enable **Authentication** (Email/Password and Google sign-in).
3. Enable **Cloud Firestore** and **Cloud Storage**.
4. Copy your Web App config credentials into `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:...

# Set Demo Mode to false
NEXT_PUBLIC_DEMO_MODE=false
```

5. Deploy security rules:
```bash
firebase deploy --only firestore:rules,storage:rules
```

---

## 🧪 Step 4: Verification & Scripts

- **Typecheck:** `npm run typecheck` (Runs `tsc --noEmit`)
- **Build:** `npm run build` (Produces optimized production Next.js build)
- **Seed Database:** `npm run seed`
