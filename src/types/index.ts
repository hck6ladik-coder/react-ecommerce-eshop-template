export type CategoryId = 'all' | 'mobily' | 'notebooky' | 'tv-audio' | 'prislusenstvi' | 'tablety' | 'gaming';

export interface ProductSpecification {
  [key: string]: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  brand: string;
  subtitle: string; // e.g. "128GB, Black", "i5/16GB", "ANC", "SmartOS"
  description: string;
  price: number; // in CZK
  originalPrice?: number; // for discount badges
  rating: number; // e.g. 4.8
  reviewCount: number;
  image: string;
  gallery?: string[];
  stock: number; // number in stock
  isFeatured?: boolean; // shown in Doporučené produkty
  isNew?: boolean;
  isSale?: boolean;
  specs: ProductSpecification;
  badge?: string;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedVariant?: string;
}

export type ShippingMethod = 'zasilkovna' | 'ppl' | 'balikovna' | 'osobni';
export type PaymentMethod = 'karta' | 'applepay' | 'dobirka' | 'prevod';

export interface ShippingOption {
  id: ShippingMethod;
  name: string;
  description: string;
  price: number;
  icon: string;
  deliveryEstimate: string;
}

export interface PaymentOption {
  id: PaymentMethod;
  name: string;
  description: string;
  price: number;
  icon: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  note?: string;
  isCompany: boolean;
  companyName?: string;
  ico?: string;
  dic?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  shipping: ShippingOption;
  payment: PaymentOption;
  customer: CustomerDetails;
  subtotal: number;
  discount: number;
  shippingPrice: number;
  paymentPrice: number;
  total: number;
  currency: 'CZK' | 'EUR';
}

export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';

export interface FilterState {
  category: CategoryId;
  searchQuery: string;
  priceRange: [number, number];
  selectedBrands: string[];
  minRating: number;
  onlyInStock: boolean;
  sortBy: SortOption;
}
