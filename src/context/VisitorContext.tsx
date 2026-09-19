import React, { createContext, useContext, useState, useEffect } from 'react';

interface VisitorContextType {
  onlineUsers: number;
  totalViews: number;
  todayOrders: number;
  recentPurchase: { customer: string; city: string; product: string; timeAgo: string } | null;
  getProductViewers: (productId: string) => number;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export type { VisitorContextType };

export { VisitorContext };

export const VisitorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Base numbers
  const [onlineUsers, setOnlineUsers] = useState(38);
  const [totalViews, setTotalViews] = useState(148320);
  const [todayOrders, setTodayOrders] = useState(47);
  const [recentPurchase, setRecentPurchase] = useState<{
    customer: string;
    city: string;
    product: string;
    timeAgo: string;
  } | null>(null);

  // Fluctuating online user counter simulating live traffic
  useEffect(() => {
    const userInterval = setInterval(() => {
      setOnlineUsers((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + delta;
        return next < 25 ? 25 : next > 65 ? 65 : next;
      });
      setTotalViews((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);

    return () => clearInterval(userInterval);
  }, []);

  // Periodic simulated live purchase notifications for realistic social proof
  useEffect(() => {
    const purchases = [
      { customer: 'Petr K.', city: 'Praha', product: 'Smartphone Nova X10', timeAgo: 'před 2 minutami' },
      { customer: 'Jana M.', city: 'Brno', product: 'Apple AirPods Pro 2', timeAgo: 'před 4 minutami' },
      { customer: 'Tomáš D.', city: 'Ostrava', product: 'Notebook ProBook 14', timeAgo: 'před 6 minutami' },
      { customer: 'Lukáš N.', city: 'Plzeň', product: 'Logitech MX Master 3S', timeAgo: 'před 9 minutami' },
      { customer: 'Michaela S.', city: 'Liberec', product: 'Smart TV UltraHD 55"', timeAgo: 'před 12 minutami' },
      { customer: 'Martin V.', city: 'Hradec Králové', product: 'Bluetooth Sluchátka SoundFlow', timeAgo: 'před 15 minutami' },
      { customer: 'David H.', city: 'Olomouc', product: 'Apple MacBook Air 13" M3', timeAgo: 'před 18 minutami' },
    ];

    let index = 0;
    const purchaseInterval = setInterval(() => {
      setRecentPurchase(purchases[index % purchases.length]);
      index++;
      setTodayOrders((prev) => prev + 1);

      // Hide after 6 seconds
      setTimeout(() => {
        setRecentPurchase(null);
      }, 6000);
    }, 28000);

    // Initial delay for first notification
    const initTimeout = setTimeout(() => {
      setRecentPurchase(purchases[0]);
      setTimeout(() => setRecentPurchase(null), 6000);
    }, 5000);

    return () => {
      clearInterval(purchaseInterval);
      clearTimeout(initTimeout);
    };
  }, []);

  // Generate a consistent pseudo-random number of viewers per product
  const getProductViewers = (productId: string) => {
    let hash = 0;
    for (let i = 0; i < productId.length; i++) {
      hash = (hash << 5) - hash + productId.charCodeAt(i);
      hash |= 0;
    }
    const base = Math.abs(hash % 12) + 3; // 3 to 14 viewers
    // Add small variation based on online users
    return base + (onlineUsers % 3);
  };

  return (
    <VisitorContext.Provider
      value={{
        onlineUsers,
        totalViews,
        todayOrders,
        recentPurchase,
        getProductViewers,
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
};

export const useVisitor = () => {
  const context = useContext(VisitorContext);
  if (!context) {
    throw new Error('useVisitor must be used within a VisitorProvider');
  }
  return context;
};
