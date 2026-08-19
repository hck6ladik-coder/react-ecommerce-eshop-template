import React, { useState, useMemo, useRef } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { VisitorProvider } from './context/VisitorContext';
import { PRODUCTS, CATEGORIES } from './data/products';
import type { Product, CategoryId, FilterState, SortOption } from './types';

// Components
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { SidebarFilters } from './components/SidebarFilters';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { ComparisonModal } from './components/ComparisonModal';
import { ContactModal } from './components/ContactModal';
import { DemoBar } from './components/DemoBar';
import { LiveSalesNotification } from './components/LiveSalesNotification';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';
import { X } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  category: 'all',
  searchQuery: '',
  priceRange: [0, 45000],
  selectedBrands: [],
  minRating: 0,
  onlyInStock: false,
  sortBy: 'recommended',
};

const ShopContent: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const productsSectionRef = useRef<HTMLDivElement>(null);

  const addToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    addToast('Filtry byly obnoveny do výchozího stavu', 'info');
  };

  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered and sorted products calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        const matchCategory = product.categoryName.toLowerCase().includes(query);
        const matchSubtitle = product.subtitle.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchCategory && !matchSubtitle) {
          return false;
        }
      }

      // Price range filter
      if (product.price > filters.priceRange[1]) {
        return false;
      }

      // Brand filter
      if (
        filters.selectedBrands.length > 0 &&
        !filters.selectedBrands.includes(product.brand)
      ) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // Stock filter
      if (filters.onlyInStock && product.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'name-asc':
          return a.name.localeCompare(b.name, 'cs');
        case 'recommended':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [filters]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === filters.category);
  const sectionTitle = filters.category === 'all'
    ? 'Doporučené produkty'
    : activeCategoryObj?.name || 'Produkty';

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
      {/* Header */}
      <Header
        activeCategory={filters.category}
        onSelectCategory={(cat: CategoryId) => handleFilterChange({ category: cat })}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        onProductClick={(p) => setSelectedProduct(p)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Hero Banner (matches screenshot) */}
        {filters.category === 'all' && !filters.searchQuery && (
          <HeroBanner onShopNow={scrollToProducts} />
        )}

        {/* Quick Category Chips / Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange({ category: cat.id as CategoryId })}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                filters.category === cat.id
                  ? 'bg-[#1056b8] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filters.category === cat.id ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Products & Sidebar Catalog Layout matching screenshot */}
        <div ref={productsSectionRef} className="pt-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Products Grid (Main 8/9 cols) */}
            <div className="order-2 lg:order-1 lg:col-span-8 xl:col-span-9">
              <ProductGrid
                products={filteredProducts}
                title={sectionTitle}
                sortBy={filters.sortBy}
                onSortChange={(sort: SortOption) => handleFilterChange({ sortBy: sort })}
                onQuickView={(p) => setSelectedProduct(p)}
                onShowToast={addToast}
                onResetFilters={handleResetFilters}
                onToggleMobileFilters={() => setIsMobileFiltersOpen(true)}
              />
            </div>

            {/* Sidebar Filters (Right 4/3 cols matching screenshot position) */}
            <div className="order-1 lg:order-2 lg:col-span-4 xl:col-span-3 hidden lg:block sticky top-24">
              <SidebarFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalResultsCount={filteredProducts.length}
              />
            </div>

          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-full max-w-xs bg-white h-full shadow-2xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-black text-slate-900 text-sm">Filtry produktů</h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResultsCount={filteredProducts.length}
            />
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full mt-6 py-3 bg-[#1056b8] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Zobrazit výsledky ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onShowToast={addToast}
      />

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onShowToast={addToast}
      />

      <CartDrawer />

      <CheckoutModal />

      <WishlistModal
        onQuickView={(p) => setSelectedProduct(p)}
        onShowToast={addToast}
      />

      <ComparisonModal onShowToast={addToast} />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onShowToast={addToast}
      />

      {/* Interactive Demo Tools Bar for client presentation */}
      <DemoBar onShowToast={addToast} />

      {/* Social Proof Live Purchase Notification */}
      <LiveSalesNotification />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <VisitorProvider>
      <CartProvider>
        <WishlistProvider>
          <ComparisonProvider>
            <ShopContent />
          </ComparisonProvider>
        </WishlistProvider>
      </CartProvider>
    </VisitorProvider>
  );
};

export default App;
