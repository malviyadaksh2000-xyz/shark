# SmartSaver ⚡
### Real-Time Multi-Provider Comparison & Savings Platform

SmartSaver is a full-stack web application designed to help consumers instantly find the cheapest, fastest, and highest-value options across **Quick Commerce Groceries**, **Food Delivery**, and **Cab / Ride Services**.

Inspired by multi-provider aggregators like Comparify, SmartSaver eliminates provider fragmentation by aggregating real-time prices, normalized unit economics (per 100g/ml), delivery & platform fees, coupon discounts, and live surge pricing into a unified, transparent view.

---

## 🌟 Key Features

### 1. 🛒 Quick Commerce / Grocery Comparison (7 Providers)
- **Supported Providers:** Blinkit, Zepto, Swiggy Instamart, BigBasket Now, JioMart, DMart Ready, Flipkart Minutes.
- **Unit Price Normalization:** Automatically standardizes disparate packaging sizes (e.g. ₹68 for 500ml vs ₹125 for 1L) to ₹/100g, ₹/100ml, or ₹/unit.
- **Comprehensive Total Calculation:** Item Price + Platform Fee + Delivery Fee + Handling Charges - Applicable Coupons.
- **Smart Scoring Badges:** Automatic calculation and assignment of `Cheapest`, `Fastest ETA`, and `Best Value`.
- **Multi-Store Cart Optimizer:** Computes whether it is cheaper to order everything from a single store or split the cart across 2+ stores (factoring in multiple delivery charges).

### 2. 🍔 Food Delivery Comparison (Swiggy vs Zomato)
- **Side-by-Side Dish & Restaurant Breakdown:** Transparent comparison of base dish price, packaging charges, restaurant GST, platform fee, and delivery surge.
- **Verified Savings Calculator:** Shows exact rupee savings per dish and for entire restaurant orders.

### 3. 🚗 Ride Hailing & Cab Price Discovery (5 Providers)
- **Supported Providers:** Uber, Ola, Rapido, Namma Yatri, Bharat Taxi.
- **Multi-Vehicle Coverage:** Bike Taxi, Auto Rickshaw, Mini/Economy Cab, Sedan / Prime, and XL / SUV.
- **Haversine Distance & Surge Engine:** Real-time distance calculation, peak hour surge multiplier, and estimated trip ETA.

### 4. 🤖 AI-Powered Search Normalization (Gemini AI)
- **Intelligent Query Matching:** Handles spelling errors, transliteration (Hindi/Hinglish synonyms like "doodh" -> "milk", "aata" -> "flour", "cheeni" -> "sugar"), and brand extraction.
- **Deterministic Rule Fallback:** Ensures 100% offline uptime and instantaneous sub-5ms response when AI keys are not configured.

### 5. 🛡️ Enterprise Architecture & Demo Mode
- **Dual-Mode Backend:** Seamlessly switches between **Live Cloud Firestore** and **Zero-Dependency Demo Mode** without requiring external credentials.
- **Full Admin Control Panel:** Manage 14 provider statuses, catalog items, food menus, alert triggers, and system latency health.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router, Server Actions, API Route Handlers)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS 3.4, Lucide React, Shadcn/UI primitives, Framer Motion
- **Database & Auth:** Google Firebase v10 (Firestore, Firebase Auth, Firebase Storage)
- **AI Engine:** Google Gemini AI SDK (`@google/generative-ai`)
- **State Management:** React Context API + Custom Hooks

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
smartsaver/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (app)/              # Consumer User Application Routes
│   │   ├── (admin)/            # Admin Portal & Control Center
│   │   ├── api/                # REST API endpoints
│   │   └── page.tsx            # High-conversion Landing Page
│   ├── components/             # Reusable UI & Feature components
│   ├── context/                # Auth, Cart, and Location state
│   ├── data/                   # Comprehensive mock datasets & seed data
│   ├── firebase/               # Firebase client & auth helper layer
│   ├── providers/              # 14 Provider Adapters & Registry
│   ├── repositories/           # Abstracted data access repositories
│   ├── services/               # Comparison, Cab Fare, Food & AI engines
│   └── types/                  # Canonical domain TypeScript models
├── firestore.rules             # Production Firestore security rules
├── storage.rules               # Firebase Storage security rules
└── package.json
```

---

## 📄 License
MIT License. Built with ❤️ for smart consumer savings.
