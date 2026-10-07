# Firebase Firestore Schema Documentation

SmartSaver uses a normalized NoSQL collection hierarchy designed for sub-10ms query read latencies.

---

## 🗄️ Collections

### 1. `products` (Canonical Catalog)
```json
{
  "id": "prod_amul_milk_500ml",
  "name": "Amul Taaza Homogenised Toned Milk",
  "brand": "Amul",
  "category": "dairy",
  "packSize": "500 ml",
  "unit": "ml",
  "unitQuantity": 500,
  "standardUnit": "100ml",
  "mrp": 27,
  "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150",
  "tags": ["milk", "dairy", "amul", "doodh"],
  "minPrice": 25,
  "maxPrice": 27
}
```

### 2. `providerProducts` (Real-Time Pricing Matrices)
```json
{
  "id": "pp_blinkit_milk_500",
  "productId": "prod_amul_milk_500ml",
  "providerId": "blinkit",
  "providerName": "Blinkit",
  "price": 27,
  "mrp": 27,
  "inStock": true,
  "stockQuantity": 45,
  "deliveryEtaMinutes": 10,
  "updatedAt": "2026-10-07T18:00:00Z"
}
```

### 3. `providers` (Provider Configuration & Fee Rules)
```json
{
  "id": "blinkit",
  "name": "Blinkit",
  "category": "grocery",
  "isActive": true,
  "feeStructure": {
    "platformFee": 4,
    "baseDeliveryFee": 15,
    "freeDeliveryThreshold": 199,
    "surgeMultiplier": 1.0
  }
}
```

### 4. `restaurants` & `menuItems` (Food Delivery)
```json
{
  "id": "rest_punjabi_rasoi",
  "name": "Punjabi Rasoi",
  "cuisines": ["North Indian", "Punjabi", "Tandoor"],
  "rating": 4.4,
  "area": "Indiranagar",
  "city": "Bengaluru"
}
```

### 5. `priceAlerts` (User Price Tracking)
```json
{
  "id": "alert_123",
  "userId": "user_456",
  "productId": "prod_amul_milk_500ml",
  "productName": "Amul Taaza Milk 500ml",
  "targetPrice": 24,
  "currentPrice": 27,
  "isActive": true,
  "createdAt": "2026-10-07T18:00:00Z"
}
```
