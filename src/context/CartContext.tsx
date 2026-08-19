import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ShippingOption, PaymentOption, Order, CustomerDetails } from '../types';
import { SHIPPING_OPTIONS, PAYMENT_OPTIONS, PROMO_CODES } from '../data/products';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  promoCode: string | null;
  promoDiscount: number;
  promoMessage: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  shippingOption: ShippingOption;
  setShippingOption: (option: ShippingOption) => void;
  paymentOption: PaymentOption;
  setPaymentOption: (option: PaymentOption) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  subtotal: number;
  discountAmount: number;
  shippingPrice: number;
  paymentPrice: number;
  total: number;
  totalItems: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
  currency: 'CZK' | 'EUR';
  setCurrency: (currency: 'CZK' | 'EUR') => void;
  formatPrice: (priceCZK: number) => string;
  createOrder: (customer: CustomerDetails) => Order;
  lastOrder: Order | null;
  setLastOrder: (order: Order | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 2000; // 2 000 Kč pro dopravu zdarma
const EUR_EXCHANGE_RATE = 25.2;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('elektro_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  
  const [shippingOption, setShippingOption] = useState<ShippingOption>(SHIPPING_OPTIONS[0]);
  const [paymentOption, setPaymentOption] = useState<PaymentOption>(PAYMENT_OPTIONS[0]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currency, setCurrency] = useState<'CZK' | 'EUR'>('CZK');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('elektro_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
    setPromoDiscount(0);
    setPromoMessage(null);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (PROMO_CODES[cleanCode] !== undefined) {
      const val = PROMO_CODES[cleanCode];
      setPromoCode(cleanCode);
      setPromoDiscount(val);
      const msg = val < 1 
        ? `Sleva ${val * 100} % byla úspěšně uplatněna!` 
        : `Sleva ${val} Kč byla úspěšně uplatněna!`;
      setPromoMessage(msg);
      return { success: true, message: msg };
    }
    return { success: false, message: 'Neplatný slevový kód. Vyzkoušejte např. ELEKTRO10 nebo VIP20.' };
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setPromoDiscount(0);
    setPromoMessage(null);
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = promoDiscount > 0 
    ? (promoDiscount < 1 ? Math.round(subtotal * promoDiscount) : Math.min(subtotal, promoDiscount))
    : 0;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingPrice = isFreeShipping ? 0 : shippingOption.price;
  const paymentPrice = paymentOption.price;

  const total = Math.max(0, subtotal - discountAmount + shippingPrice + paymentPrice);

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const formatPrice = (priceCZK: number): string => {
    if (currency === 'EUR') {
      const eur = Math.round(priceCZK / EUR_EXCHANGE_RATE);
      return `${eur.toLocaleString('cs-CZ')} €`;
    }
    return `${priceCZK.toLocaleString('cs-CZ')} Kč`;
  };

  const createOrder = (customer: CustomerDetails): Order => {
    const orderNumber = 'EM-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: orderNumber,
      date: new Date().toLocaleDateString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...items],
      shipping: shippingOption,
      payment: paymentOption,
      customer,
      subtotal,
      discount: discountAmount,
      shippingPrice,
      paymentPrice,
      total,
      currency
    };

    setLastOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        promoCode,
        promoDiscount,
        promoMessage,
        applyPromoCode,
        removePromoCode,
        shippingOption,
        setShippingOption,
        paymentOption,
        setPaymentOption,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        subtotal,
        discountAmount,
        shippingPrice,
        paymentPrice,
        total,
        totalItems,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        freeShippingProgress,
        currency,
        setCurrency,
        formatPrice,
        createOrder,
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
