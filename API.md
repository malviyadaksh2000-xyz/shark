# SmartSaver REST API Reference

All API routes return standardized JSON payloads with `{ success: boolean, ... }`.

---

## 🔍 1. Universal Search
**Endpoint:** `GET /api/search?q={query}&category={category}`

**Response:**
```json
{
  "success": true,
  "query": "milk",
  "results": {
    "products": [
      {
        "id": "prod_amul_milk_500ml",
        "name": "Amul Taaza Homogenised Toned Milk",
        "brand": "Amul",
        "minPrice": 25,
        "maxPrice": 27,
        "unit": "ml"
      }
    ],
    "restaurants": [],
    "rides": []
  }
}
```

---

## 🛒 2. Product Comparison
**Endpoint:** `GET /api/products/:id/compare?lat={lat}&lng={lng}`

**Response:**
```json
{
  "success": true,
  "comparison": {
    "productId": "prod_amul_milk_500ml",
    "productName": "Amul Taaza Milk 500ml",
    "cheapestQuote": {
      "providerName": "Blinkit",
      "price": 27,
      "totalPayable": 31,
      "unitPrice": 5.4
    },
    "fastestQuote": {
      "providerName": "Zepto",
      "deliveryEtaMinutes": 9
    },
    "quotes": [ ... ]
  }
}
```

---

## 🚗 3. Cab Fare Estimates
**Endpoint:** `POST /api/cabs/estimate`

**Request Body:**
```json
{
  "pickup": "Indiranagar, Bengaluru",
  "dropoff": "Kempegowda International Airport",
  "distanceKm": 38.5
}
```

**Response:**
```json
{
  "success": true,
  "estimates": [
    {
      "rideType": "auto",
      "cheapestProvider": "Namma Yatri",
      "cheapestFare": 380,
      "options": [
        { "providerName": "Namma Yatri", "fare": 380, "etaMinutes": 3 },
        { "providerName": "Uber", "fare": 420, "etaMinutes": 4 },
        { "providerName": "Ola", "fare": 445, "etaMinutes": 6 },
        { "providerName": "Rapido", "fare": 395, "etaMinutes": 5 }
      ]
    }
  ]
}
```
