import React from 'react';
import { X, Trash2, ShoppingCart, Layers, Check, Star } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ComparisonModalProps {
  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ onShowToast }) => {
  const { comparisonList, removeFromComparison, clearComparison, isComparisonOpen, setIsComparisonOpen } = useComparison();
  const { addToCart, formatPrice } = useCart();

  if (!isComparisonOpen) return null;

  // Gather all unique specification keys across comparing products
  const allSpecKeys = Array.from(
    new Set(comparisonList.flatMap((p) => Object.keys(p.specs)))
  );

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    onShowToast(`„${product.name}“ byl přidán do košíku!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">Porovnání parametrů produktů</h3>
              <p className="text-xs text-slate-500">{comparisonList.length} vybrané modely (max. 4)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparisonList.length > 0 && (
              <button
                onClick={clearComparison}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition"
              >
                Vymazat porovnání
              </button>
            )}
            <button
              onClick={() => setIsComparisonOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
          {comparisonList.length > 0 ? (
            <div className="min-w-[600px]">
              
              {/* Product Cards Row */}
              <div className="grid grid-cols-4 gap-4 pb-6 border-b border-slate-200">
                <div className="font-bold text-xs text-slate-400 uppercase self-end pb-2">
                  Základní informace
                </div>
                {comparisonList.map((product) => (
                  <div key={product.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between text-center relative group">
                    <button
                      onClick={() => removeFromComparison(product.id)}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-600 rounded-full hover:bg-white transition"
                      title="Odebrat z porovnání"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="w-full h-28 flex items-center justify-center mb-3">
                      <img src={product.image} alt="" className="max-h-full max-w-full object-contain" />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                        {product.brand}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 mt-1 mb-1 line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="text-base font-black text-slate-900 mb-3">
                        {formatPrice(product.price)}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full py-2 px-3 bg-[#1056b8] hover:bg-[#0d4899] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Koupit</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Spec Comparison Matrix */}
              <div className="divide-y divide-slate-100 text-xs">
                {/* Rating row */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-bold text-slate-500">Hodnocení</span>
                  {comparisonList.map((p) => (
                    <div key={p.id} className="font-bold text-slate-800 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{p.rating} / 5 ({p.reviewCount})</span>
                    </div>
                  ))}
                </div>

                {/* Stock row */}
                <div className="grid grid-cols-4 gap-4 py-3 items-center">
                  <span className="font-bold text-slate-500">Dostupnost</span>
                  {comparisonList.map((p) => (
                    <div key={p.id} className="text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Skladem ({p.stock} ks)</span>
                    </div>
                  ))}
                </div>

                {/* Dynamic Specs */}
                {allSpecKeys.map((specKey) => (
                  <div key={specKey} className="grid grid-cols-4 gap-4 py-3 items-center">
                    <span className="font-bold text-slate-500">{specKey}</span>
                    {comparisonList.map((p) => (
                      <div key={p.id} className="text-slate-800 font-medium">
                        {p.specs[specKey] || <span className="text-slate-300">—</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <Layers className="w-16 h-16 mx-auto stroke-1 text-slate-300" />
              <p className="font-bold text-slate-600 text-base">Zatím jste nevybrali produkty k porovnání</p>
              <p className="text-xs max-w-xs mx-auto text-slate-400">
                U jednotlivých produktů klikněte na ikonku vrstev pro přidání do srovnávače.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
