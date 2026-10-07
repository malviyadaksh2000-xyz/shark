# SmartSaver Architecture & Design System

## 🏗️ High-Level System Architecture

SmartSaver utilizes a modular, decoupled architecture where comparison logic is strictly separated from provider-specific data acquisition.

```
+-------------------------------------------------------------+
|                      Next.js 14 UI Layer                    |
|  (Landing Page, Groceries App, Food App, Cabs, Admin Hub)   |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                    Universal Search Layer                   |
|           (SearchService + Gemini Query Normalizer)         |
+-------------------------------------------------------------+
                              |
      +-----------------------+-----------------------+
      |                       |                       |
      v                       v                       v
+---------------+     +---------------+     +---------------+
|  Comparison   |     |   Food Engine |     |   Cab Fare    |
|    Engine     |     | (Swiggy/Zom)  |     |    Engine     |
+---------------+     +---------------+     +---------------+
      |                       |                       |
      v                       v                       v
+-------------------------------------------------------------+
|                     Provider Adapter Layer                  |
|  [Blinkit] [Zepto] [Instamart] [BigBasket] [DMart] [JioMart]|
|  [Uber] [Ola] [Rapido] [Namma Yatri] [Bharat Taxi] [Zomato] |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|               Data Repositories & Fallbacks                 |
|            (Firestore Cloud DB <---> Demo Mock DB)          |
+-------------------------------------------------------------+
```

---

## 🧮 1. Unit Normalization Formula

To compare products across different pack sizes (e.g. 500g vs 1kg vs 180g), the comparison engine converts all prices to a base metric:

$$\text{Normalized Price} = \left( \frac{\text{Item Price}}{\text{Unit Quantity}} \right) \times \text{Standard Base}$$

Where $\text{Standard Base}$ is:
- **100g** for solid weight (grams, kg)
- **100ml** for liquid volume (ml, liters)
- **1 pc** for countable units

---

## 🏆 2. SmartSaver Composite Scoring Algorithm

The provider score ($S$) is calculated using a weighted multi-factor formula:

$$S = (w_{\text{price}} \times N_{\text{price}}) + (w_{\text{time}} \times N_{\text{time}}) + (w_{\text{fee}} \times N_{\text{fee}}) + (w_{\text{rating}} \times N_{\text{rating}})$$

### Default Weights:
- $w_{\text{price}} = 0.50$ (50% weight on total payable price)
- $w_{\text{time}} = 0.25$ (25% weight on delivery ETA)
- $w_{\text{fee}} = 0.15$ (15% weight on lowest hidden fees)
- $w_{\text{rating}} = 0.10$ (10% weight on provider reliability)

---

## 🛒 3. Multi-Store Cart Optimization

When a cart contains items $I_1, I_2, \dots, I_n$, the optimizer evaluates two strategies:
1. **Single-Store Strategy:** Evaluate $\min_{p \in P} \left[ \sum_{i} \text{Price}(i, p) + \text{DeliveryFee}(p) + \text{PlatformFee}(p) \right]$
2. **Split-Store Strategy:** Find optimal provider allocation $p(i)$ such that:
$$\sum_{p \in \text{Used}} (\text{DeliveryFee}(p) + \text{PlatformFee}(p)) + \sum_{i} \text{Price}(i, p(i)) < \text{SingleStoreCost}$$
