const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function writeFile(relPath, content) {
  const fullPath = path.join(process.cwd(), relPath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log('Created:', relPath);
}

// ==========================================
// 1. src/types/index.ts
// ==========================================
writeFile('src/types/index.ts', `
export type UserRole = 'user' | 'admin' | 'superadmin';
export type ProviderCategory = 'grocery' | 'food' | 'cab';
export type ProviderStatus = 'enabled' | 'disabled' | 'maintenance' | 'demo' | 'live';
export type IntegrationMode = 'demo' | 'live' | 'affiliate' | 'partner';
export type AvailabilityStatus = 'in_stock' | 'out_of_stock' | 'unavailable' | 'limited';
export type DiscountType = 'percentage' | 'flat' | 'free_delivery' | 'bogo';
export type EntityType = 'product' | 'restaurant' | 'menuItem' | 'cab';
export type RideType = 'auto' | 'bike' | 'mini' | 'sedan' | 'suv' | 'electric' | 'share';
export type ComparisonType = 'grocery' | 'food' | 'cab';
export type AlertStatus = 'active' | 'triggered' | 'expired' | 'disabled';
export type MatchConfidence = number;

export interface Address {
  id: string;
  label: 'home' | 'work' | 'other';
  address: string;
  latitude: number;
  longitude: number;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

export interface UserPreferences {
  language: 'en' | 'hi';
  currency: 'INR';
  theme: 'light' | 'dark' | 'system';
  defaultProvidersGrocery: string[];
  defaultProvidersFood: string[];
  defaultProvidersCab: string[];
  notifications: {
    priceDrops: boolean;
    priceAlerts: boolean;
    savedItemUpdates: boolean;
    deals: boolean;
    systemNotifications: boolean;
  };
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  defaultAddressId?: string;
  addresses: Address[];
  preferences: UserPreferences;
  role: UserRole;
  totalSavings: number;
  totalComparisons: number;
}

export interface ProviderCapabilities {
  canSearch: boolean;
  canGetPrice: boolean;
  canGetDeliveryEta: boolean;
  canGetAvailability: boolean;
  canTransferCart: boolean;
  canGetOffers: boolean;
  canDeepLink: boolean;
  supportsScheduledDelivery: boolean;
}

export interface Provider {
  id: string;
  name: string;
  slug: string;
  category: ProviderCategory;
  logoUrl: string;
  websiteUrl: string;
  appDeepLinkBase?: string;
  color: string;
  enabled: boolean;
  integrationMode: IntegrationMode;
  status: ProviderStatus;
  capabilities: ProviderCapabilities;
  createdAt: string;
  updatedAt: string;
  lastSync?: string;
  lastError?: string;
  averageLatencyMs?: number;
  successRate?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  imageUrl: string;
  keywords: string[];
  displayOrder: number;
  active: boolean;
}

export interface Product {
  id: string;
  canonicalName: string;
  brand: string;
  categoryId: string;
  category?: Category;
  description: string;
  imageUrl: string;
  gallery: string[];
  thumbnailUrl: string;
  barcode?: string;
  unit: string;
  quantity: number;
  searchKeywords: string[];
  aliases: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  lowestPrice?: number;
  highestPrice?: number;
  providerCount?: number;
  rating?: number;
}

export interface ProviderProduct {
  id: string;
  providerId: string;
  provider?: Provider;
  canonicalProductId: string;
  providerProductName: string;
  providerSKU?: string;
  providerUrl: string;
  appDeepLink?: string;
  imageUrl?: string;
  price: number;
  mrp?: number;
  currency: string;
  quantity: number;
  unit: string;
  availability: AvailabilityStatus;
  rating?: number;
  isDemo: boolean;
  matchConfidence: MatchConfidence;
  lastUpdated: string;
}

export interface PriceQuote {
  providerId: string;
  provider?: Provider;
  itemPrice: number;
  mrp?: number;
  discount: number;
  discountPercent: number;
  deliveryFee: number;
  platformFee: number;
  handlingFee: number;
  surgeFee: number;
  tax: number;
  couponDiscount: number;
  finalPrice: number;
  effectivePrice: number;
  currency: string;
  deliveryEtaMin: number;
  deliveryEtaMax: number;
  availability: AvailabilityStatus;
  minimumOrderValue?: number;
  freeDeliveryAbove?: number;
  couponCode?: string;
  offers: string[];
  providerUrl: string;
  appDeepLink?: string;
  isDemo: boolean;
  lastUpdated: string;
  unitPrice: number;
  unitLabel: string;
}

export type BadgeType = 'best_price' | 'best_value' | 'fastest' | 'best_rated' | 'recommended' | 'lowest_final_price' | 'free_delivery';

export interface ComparisonBadge {
  type: BadgeType;
  label: string;
  description: string;
  color: string;
}

export interface ComparisonRank {
  rank: number;
  badges: ComparisonBadge[];
  score: number;
  reasons: string[];
}

export interface ProviderComparisonResult {
  providerId: string;
  provider: Provider;
  quote: PriceQuote;
  rank: ComparisonRank;
  available: boolean;
  error?: string;
}

export interface ComparisonResult {
  id: string;
  type: ComparisonType;
  entityId: string;
  entityName: string;
  query: string;
  results: ProviderComparisonResult[];
  unavailableProviders: { providerId: string; reason: string }[];
  bestPriceProviderId: string;
  bestFinalPriceProviderId: string;
  fastestProviderId: string;
  bestValueProviderId: string;
  recommendedProviderId: string;
  savingsVsHighest: number;
  savingsPercent: number;
  createdAt: string;
  shareId?: string;
}

export interface PriceSnapshot {
  id: string;
  entityType: EntityType;
  entityId: string;
  providerId: string;
  price: number;
  deliveryFee: number;
  platformFee: number;
  handlingFee: number;
  discount: number;
  tax: number;
  finalPrice: number;
  currency: string;
  timestamp: string;
}

export interface CartItem {
  productId: string;
  product?: Product;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  id: string;
  userId?: string;
  type: ComparisonType;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartProviderQuote {
  providerId: string;
  provider?: Provider;
  itemsTotal: number;
  deliveryFee: number;
  platformFee: number;
  handlingFee: number;
  discount: number;
  couponDiscount: number;
  finalTotal: number;
  deliveryEtaMin: number;
  deliveryEtaMax: number;
  itemAvailability: { productId: string; available: boolean; price: number }[];
  allItemsAvailable: boolean;
  missingItems: string[];
  isDemo: boolean;
}

export interface SplitRecommendation {
  providerAssignments: { productId: string; providerId: string; price: number; productName: string; providerName: string }[];
  totalCost: number;
  deliveryFees: number;
  savings: number;
  worthSplitting: boolean;
  reason: string;
}

export interface CartComparisonResult {
  cartId: string;
  quotes: CartProviderQuote[];
  bestSingleProvider: CartProviderQuote;
  splitRecommendation?: SplitRecommendation;
  cheapestSingleTotal: number;
  cheapestSplitTotal?: number;
}

export interface SavedItem {
  id: string;
  userId: string;
  entityType: EntityType;
  entityId: string;
  createdAt: string;
  itemData?: any;
}

export interface PriceAlert {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  targetPrice: number;
  currentLowestPrice: number;
  providerId?: string;
  provider?: Provider;
  enabled: boolean;
  status: AlertStatus;
  lastTriggeredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchSuggestion {
  id: string;
  type: 'product' | 'restaurant' | 'dish' | 'category' | 'brand' | 'cab' | 'query';
  name: string;
  subtitle?: string;
  imageUrl?: string;
  lowestPrice?: number;
  providerCount?: number;
  categoryName?: string;
  brand?: string;
  quantity?: string;
  url?: string;
}

export interface NormalizedSearchQuery {
  originalQuery: string;
  normalizedQuery: string;
  brand?: string;
  product?: string;
  quantity?: number;
  unit?: string;
  category?: string;
  maxPrice?: number;
  minPrice?: number;
  servings?: number;
  optimization?: 'lowest_price' | 'fastest' | 'best_rated';
  intent: 'grocery' | 'food' | 'cab' | 'unknown';
  confidence: number;
}

export interface SearchHistory {
  id: string;
  userId: string;
  query: string;
  category: ComparisonType;
  createdAt: string;
}

export interface Offer {
  id: string;
  providerId: string;
  provider?: Provider;
  title: string;
  description: string;
  couponCode?: string;
  discountType: DiscountType;
  discountValue: number;
  minimumOrder?: number;
  maxDiscount?: number;
  expiry?: string;
  active: boolean;
  applicableOn: 'all' | 'grocery' | 'food' | 'first_order';
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  images: string[];
  thumbnailUrl: string;
  cuisine: string[];
  rating: number;
  totalRatings: number;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  priceForTwo?: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  lowestDeliveryEta?: number;
  providerCount?: number;
  lowestDeliveryFee?: number;
}

export interface ProviderRestaurant {
  id: string;
  providerId: string;
  provider?: Provider;
  restaurantId: string;
  providerRestaurantId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  deliveryEtaMin: number;
  deliveryEtaMax: number;
  deliveryFee: number;
  minimumOrder: number;
  isOpen: boolean;
  availability: AvailabilityStatus;
  providerUrl: string;
  appDeepLink?: string;
  offers: string[];
  isDemo: boolean;
  lastUpdated: string;
}

export interface MenuItemVariant {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  restaurant?: Restaurant;
  canonicalName: string;
  description: string;
  images: string[];
  thumbnailUrl: string;
  category: string;
  variants: MenuItemVariant[];
  isVeg: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'extra_hot';
  active: boolean;
  lowestPrice?: number;
  providerCount?: number;
}

export interface ProviderMenuItem {
  id: string;
  providerId: string;
  provider?: Provider;
  menuItemId: string;
  providerMenuItemId: string;
  name: string;
  price: number;
  mrp?: number;
  discount: number;
  imageUrl?: string;
  availability: AvailabilityStatus;
  variantData?: Record<string, unknown>;
  customizationOptions?: {
    name: string;
    required: boolean;
    choices: { id: string; name: string; priceAdd: number }[];
  }[];
  isDemo: boolean;
  lastUpdated: string;
}

export interface FoodCartItem {
  menuItemId: string;
  menuItem?: MenuItem;
  quantity: number;
  customization?: Record<string, string>;
  addedAt: string;
}

export interface FoodCartProviderQuote {
  providerId: string;
  provider?: Provider;
  restaurantProviderId: string;
  isRestaurantAvailable: boolean;
  itemsTotal: number;
  deliveryFee: number;
  platformFee: number;
  packagingFee: number;
  taxes: number;
  discount: number;
  couponDiscount: number;
  finalTotal: number;
  deliveryEtaMin: number;
  deliveryEtaMax: number;
  minimumOrder: number;
  meetsMinimumOrder: boolean;
  itemAvailability: { menuItemId: string; available: boolean; price: number }[];
  offers: string[];
  providerUrl: string;
  appDeepLink?: string;
  isDemo: boolean;
}

export interface Location {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  placeId?: string;
}

export interface CabFareBreakdown {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  surgeFare: number;
  taxes: number;
  discount: number;
  couponDiscount: number;
  totalFare: number;
  fareRange?: { min: number; max: number };
  currency: string;
}

export interface CabEstimate {
  id: string;
  providerId: string;
  provider?: Provider;
  rideType: RideType;
  rideTypeName: string;
  seats: number;
  imageUrl?: string;
  fareBreakdown: CabFareBreakdown;
  etaMin: number;
  etaMax: number;
  distanceKm: number;
  durationMin: number;
  cancellationPolicy?: string;
  rating?: number;
  isSurge: boolean;
  surgeMultiplier?: number;
  providerUrl: string;
  appDeepLink?: string;
  isDemo: boolean;
  score?: number;
  rankBadge?: string;
  recommendationReason?: string;
}

export interface CabComparisonResult {
  pickup: Location;
  destination: Location;
  distanceKm: number;
  durationMin: number;
  estimates: CabEstimate[];
  cheapestEstimate: CabEstimate;
  fastestEstimate: CabEstimate;
  bestValueEstimate: CabEstimate;
  unavailableProviders: { providerId: string; reason: string }[];
  createdAt: string;
}

export interface ProviderIntegration {
  providerId: string;
  mode: IntegrationMode;
  baseUrl?: string;
  credentialsReference?: string;
  enabled: boolean;
  lastSync?: string;
  lastError?: string;
  syncIntervalMinutes: number;
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalRestaurants: number;
  totalComparisons: number;
  activeAlerts: number;
  providersOnline: number;
  apiErrors24h: number;
  newUsersToday: number;
}

export interface ProviderHealthStatus {
  providerId: string;
  provider: Provider;
  status: ProviderStatus;
  lastSuccessfulRequest?: string;
  lastError?: string;
  averageLatencyMs: number;
  successRate: number;
  dataFreshnessMinutes: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  isDemo?: boolean;
}
`);

// ==========================================
// 2. src/lib/utils.ts
// ==========================================
writeFile('src/lib/utils.ts', `
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  if (isNaN(amount) || amount === undefined || amount === null) return '?0';
  return '?' + Math.round(amount).toLocaleString('en-IN');
}

export function formatCurrency(amount: number): string {
  return formatPrice(amount);
}

export function calculateSavings(lowest: number, highest: number): number {
  return Math.max(0, highest - lowest);
}

export function calculateSavingsPercent(lowest: number, highest: number): number {
  if (!highest || highest <= 0 || lowest >= highest) return 0;
  return Math.round(((highest - lowest) / highest) * 100);
}

export function formatEta(min: number, max?: number): string {
  if (!max || min === max) return \`\${min} min\`;
  return \`\${min}-\${max} min\`;
}

export function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return \`\${diffMin} min ago\`;
    if (diffHours < 24) return \`\${diffHours} hr ago\`;
    if (diffDays < 7) return \`\${diffDays} day\${diffDays > 1 ? 's' : ''} ago\`;
    return date.toLocaleDateString('en-IN');
  } catch {
    return 'recently';
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s]/g, '')
    .replace(/\\s+/g, ' ');
}

export function calculateUnitPrice(
  price: number,
  quantity: number,
  unit: string
): { unitPrice: number; unitLabel: string } {
  const normUnit = (unit || 'g').toLowerCase();

  if (['g', 'gram', 'grams', 'gm'].includes(normUnit)) {
    const per100g = (price / (quantity || 100)) * 100;
    return { unitPrice: per100g, unitLabel: '?' + Math.round(per100g) + '/100g' };
  }
  if (['kg', 'kilogram', 'kilograms'].includes(normUnit)) {
    const per100g = (price / ((quantity || 1) * 1000)) * 100;
    return { unitPrice: per100g, unitLabel: '?' + Math.round(per100g) + '/100g' };
  }
  if (['ml', 'milliliter', 'millilitre'].includes(normUnit)) {
    const per100ml = (price / (quantity || 100)) * 100;
    return { unitPrice: per100ml, unitLabel: '?' + Math.round(per100ml) + '/100ml' };
  }
  if (['l', 'litre', 'liter', 'liters', 'litres'].includes(normUnit)) {
    const per100ml = (price / ((quantity || 1) * 1000)) * 100;
    return { unitPrice: per100ml, unitLabel: '?' + Math.round(per100ml) + '/100ml' };
  }
  if (['pcs', 'piece', 'pieces', 'count', 'pack'].includes(normUnit)) {
    const perPiece = price / (quantity || 1);
    return { unitPrice: perPiece, unitLabel: '?' + Math.round(perPiece) + '/pc' };
  }

  return { unitPrice: price, unitLabel: '?' + Math.round(price) + '/unit' };
}

export function getBadgeColor(type: string): string {
  const map: Record<string, string> = {
    best_price: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300',
    best_value: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300',
    fastest: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300',
    best_rated: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300',
    recommended: 'bg-emerald-600 text-white border-emerald-600',
    lowest_final_price: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300',
    free_delivery: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300',
  };
  return map[type] || 'bg-gray-100 text-gray-800 border-gray-200';
}
`);

// ==========================================
// 3. src/lib/rateLimit.ts
// ==========================================
writeFile('src/lib/rateLimit.ts', `
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function rateLimit(
  key: string,
  options = { maxRequests: 60, windowMs: 60000 }
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + options.windowMs });
    return { allowed: true, remaining: options.maxRequests - 1, resetAt: now + options.windowMs };
  }

  if (record.count >= options.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: options.maxRequests - record.count,
    resetAt: record.resetAt,
  };
}
`);

console.log('Part 1 generated successfully!');
