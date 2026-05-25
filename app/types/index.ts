// Brand Colors
export type BrandColor = 
  | 'forest-green' 
  | 'gold' 
  | 'ivory' 
  | 'soft-black';

// Products
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
  occasion: Occasion[];
  recipient: Recipient[];
  isPersonalizable: boolean;
  inStock: boolean;
  delivery: DeliveryOption[];
  addOns?: AddOn[];
}

export type Occasion = 
  | 'birthday' 
  | 'anniversary' 
  | 'wedding' 
  | 'baby-shower' 
  | 'housewarming' 
  | 'festival' 
  | 'corporate' 
  | 'get-well' 
  | 'congratulations';

export type Recipient = 
  | 'wife' 
  | 'husband' 
  | 'girlfriend' 
  | 'boyfriend' 
  | 'mother' 
  | 'father' 
  | 'sister' 
  | 'brother' 
  | 'friend' 
  | 'colleague' 
  | 'boss';

// Cart
export interface CartItem {
  productId: string;
  quantity: number;
  personalization?: Personalization;
  addOns?: string[];
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode?: string;
}

// Personalization
export interface Personalization {
  name?: string;
  message?: string;
  image?: string;
  giftWrap?: GiftWrap;
  greetingCard?: GreetingCard;
}

export type GiftWrap = 'premium' | 'luxury' | 'eco-friendly' | 'none';

export interface GreetingCard {
  template: string;
  customMessage: string;
  senderName: string;
}

// Add-ons
export interface AddOn {
  id: string;
  name: string;
  price: number;
  category: 'flowers' | 'chocolates' | 'balloons' | 'cakes';
}

// Delivery
export type DeliveryType = 'same-day' | 'midnight' | 'scheduled' | 'standard';

export interface DeliveryOption {
  type: DeliveryType;
  estimatedDays: number;
  price: number;
  available: boolean;
}

// User
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  wishlist: string[];
  savedHampers: Hamper[];
  orders: Order[];
  createdAt: Date;
}

export interface Address {
  id: string;
  type: 'home' | 'office' | 'other';
  street: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  isDefault: boolean;
}

// Orders
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'out-for-delivery' 
  | 'delivered' 
  | 'cancelled';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export type PaymentMethod = 'card' | 'upi' | 'wallet' | 'bank-transfer';

// Hamper
export interface Hamper {
  id: string;
  name: string;
  description: string;
  boxDesign: string;
  items: HamperItem[];
  greetingCard?: GreetingCard;
  price: number;
  image: string;
  createdAt: Date;
}

export interface HamperItem {
  productId: string;
  quantity: number;
  product: Product;
}

// Coupon
export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
}

// Corporate
export interface CorporateInquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  quantity: number;
  budget: number;
  occasion: string;
  message: string;
  status: 'pending' | 'contacted' | 'quoted' | 'ordered';
  createdAt: Date;
}

// Analytics
export interface ProductAnalytics {
  productId: string;
  views: number;
  clicks: number;
  addedToCart: number;
  purchased: number;
  revenue: number;
  averageRating: number;
  conversionRate: number;
}
