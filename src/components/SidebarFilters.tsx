import React from 'react';
import { Filter, RotateCcw, Star, Check } from 'lucide-react';
import { FilterState, CategoryId } from '../types';
import { BRANDS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';

interface SidebarFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
}) => {
  const { formatPrice } = useCart();

  const handleBrandToggle = (brand: string) => {
    const isSelected = filters.selectedBrands.includes(brand);
    const newBrands = isSelected
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];
    onFilterChange({ selectedBrands: newBrands });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxVal = Number(e.target.value);
    onFilterChange({ priceRange: [filters.priceRange[0], maxVal] });
  };

  const isFiltered =
    filters.selectedBrands.length > 0 ||
    filters.priceRange[1] < 45000 ||
    filters.minRating > 0 ||
    filters.onlyInStock ||
    filters.category !== 'all';

  return (
    <aside className="w-full bg-white rounded-2xl border border-slate-200 p-5 shadow-xs divide-y divide-slate-100 space-y-6">
      
      {/* Filters Title & Reset */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2 font-black text-base text-slate-900">
          <Filter className="w-4 h-4 text-[#1056b8]" />
          <span>Filtrování</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#1056b8]">
            {totalResultsCount}
          </span>
        </div>
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Category selector */}
      <div className="pt-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3">
          Kategorie
        </h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ category: cat.id as CategoryId })}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                filters.category === cat.id
                  ? 'bg-blue-50 text-[#1056b8] font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[11px] text-slate-400">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* CENA slider matching screenshot */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
            CENA
          </h3>
          <span className="text-xs font-bold text-[#1056b8]">
            0 – {formatPrice(filters.priceRange[1])}
          </span>
        </div>
        
        <input
          type="range"
          min="1000"
          max="45000"
          step="500"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1056b8]"
        />
        
        <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
          <span>0 Kč</span>
          <span>20 000 Kč</span>
          <span>45 000 Kč</span>
        </div>
      </div>

      {/* ZNAČKA checkboxes matching screenshot */}
      <div className="pt-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3">
          ZNAČKA
        </h3>
        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
          {BRANDS.map((brand) => {
            const checked = filters.selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                onClick={() => handleBrandToggle(brand)}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none group"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                    checked
                      ? 'bg-[#1056b8] border-[#1056b8] text-white'
                      : 'border-slate-300 group-hover:border-slate-400 bg-white'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className={`font-medium ${checked ? 'text-slate-900 font-bold' : ''}`}>
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* HODNOCENÍ matching screenshot */}
      <div className="pt-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3">
          HODNOCENÍ
        </h3>
        <div className="space-y-1.5">
          {[
            { stars: 4.5, label: '4.5★ a více' },
            { stars: 4.0, label: '4★ a více' },
            { stars: 3.0, label: '3★ a více' },
            { stars: 0, label: 'Všechna hodnocení' },
          ].map((item) => (
            <button
              key={item.stars}
              onClick={() => onFilterChange({ minRating: item.stars })}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer ${
                filters.minRating === item.stars
                  ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dostupnost */}
      <div className="pt-4">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs font-bold text-slate-800 group-hover:text-[#1056b8] transition">
            Pouze skladem (&gt; 0 ks)
          </span>
          <input
            type="checkbox"
            checked={filters.onlyInStock}
            onChange={(e) => onFilterChange({ onlyInStock: e.target.checked })}
            className="w-4 h-4 rounded text-[#1056b8] focus:ring-[#1056b8] accent-[#1056b8] cursor-pointer"
          />
        </label>
      </div>

    </aside>
  );
};
