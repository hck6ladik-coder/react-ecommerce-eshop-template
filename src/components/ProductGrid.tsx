import React from 'react';
import { Product, SortOption } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowUpDown, SlidersHorizontal, PackageSearch } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  title: string;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onQuickView: (product: Product) => void;
  onShowToast: (message: string, type?: 'success' | 'info') => void;
  onResetFilters: () => void;
  onToggleMobileFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  sortBy,
  onSortChange,
  onQuickView,
  onShowToast,
  onResetFilters,
  onToggleMobileFilters,
}) => {
  return (
    <div className="flex-1">
      {/* Grid Top Bar with Title & Sorting matching screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Zobrazeno {products.length} {products.length === 1 ? 'produkt' : products.length < 5 ? 'produkty' : 'produktů'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Mobile Filter Button */}
          {onToggleMobileFilters && (
            <button
              onClick={onToggleMobileFilters}
              className="lg:hidden px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1056b8]" />
              Filtry
            </button>
          )}

          {/* Sort Dropdown */}
          <div className="relative flex items-center bg-white border border-slate-300 rounded-lg px-3 py-2 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-2" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer pr-2"
            >
              <option value="recommended">Doporučené</option>
              <option value="price-asc">Od nejlevnějšího</option>
              <option value="price-desc">Od nejdražšího</option>
              <option value="rating-desc">Nejlépe hodnocené</option>
              <option value="name-asc">Podle názvu (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onShowToast={onShowToast}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-blue-50 text-[#1056b8] rounded-full flex items-center justify-center mx-auto mb-4">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-2">
            Nebyly nalezeny žádné produkty
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Zadaným kritériím neodpovídá žádný produkt. Zkuste upravit nebo resetovat nastavené filtry.
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-[#1056b8] hover:bg-[#0d4899] text-white text-xs font-bold rounded-xl transition shadow-sm"
          >
            Resetovat všechny filtry
          </button>
        </div>
      )}
    </div>
  );
};
