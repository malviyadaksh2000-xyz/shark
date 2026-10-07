# Provider Integration Guide

SmartSaver makes it easy to integrate new Quick Commerce, Food Delivery, or Ride Hailing services using the **Provider Adapter Pattern**.

---

## 🔌 1. Creating a New Adapter

All adapters must implement the `IProviderAdapter` interface found in `src/providers/index.ts`.

### Example: Adding "Dunzo Daily" Adapter

```typescript
import { BaseProviderAdapter } from './BaseProviderAdapter';
import { ProviderQuote, Location, ProviderCategory } from '@/types';

export class DunzoDailyAdapter extends BaseProviderAdapter {
  id = 'dunzo';
  name = 'Dunzo Daily';
  category: ProviderCategory = 'grocery';
  themeColor = '#00D290';
  logo = '/providers/dunzo.svg';

  async isServiceable(location: Location): Promise<boolean> {
    // Check if pincode/lat-lng is serviceable
    return true;
  }

  async getQuote(productId: string, location: Location): Promise<ProviderQuote | null> {
    // 1. Fetch raw provider product data from API or Firestore
    const data = await this.fetchProviderData(productId, location);
    if (!data) return null;

    // 2. Return canonical ProviderQuote
    return {
      providerId: this.id,
      providerName: this.name,
      price: data.price,
      mrp: data.mrp,
      deliveryFee: 25,
      platformFee: 4,
      deliveryEtaMinutes: 12,
      inStock: true,
      url: `https://www.dunzo.com/item/${productId}`,
    };
  }
}
```

---

## 📋 2. Registering the Adapter

Register your new adapter in `src/providers/index.ts`:

```typescript
ProviderRegistry.register(new DunzoDailyAdapter());
```

Once registered, the new provider will automatically appear in:
- Universal Search comparison cards
- Grocery and Food comparison engines
- Cart Optimization algorithms
- Admin Provider Health hub
