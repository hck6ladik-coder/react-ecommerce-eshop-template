import React from 'react';
import { X, Trash2, ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface WishlistModalProps {
  onQuickView: (product: Product) => void;
  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  onQuickView,
  onShowToast,
}) => {
  const { wishlist, removeFromWishlist, clearWishlist, isWishlistOpen, setIsWishlistOpen } = useWishlist();
  const { addToCart, formatPrice } = useCart();

  if (!isWishlistOpen) return null;

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    onShowToast(`„${product.name}“ byl přidán do košíku!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">Oblíbené produkty</h3>
              <p className="text-xs text-slate-500">{wishlist.length} uložených položek</p>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {wishlist.length > 0 ? (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3.5 p-3 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition shadow-xs"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-contain rounded-xl bg-slate-50 border p-1 flex-shrink-0 cursor-pointer"
                  onClick={() => {
                    setIsWishlistOpen(false);
                    onQuickView(product);
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4 
                    onClick={() => {
                      setIsWishlistOpen(false);
                      onQuickView(product);
                    }}
                    className="text-xs sm:text-sm font-bold text-slate-900 truncate cursor-pointer hover:text-[#1056b8]"
                  >
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate mb-1">
                    {product.subtitle}
                  </p>
                  <div className="text-xs font-black text-slate-900">
                    {formatPrice(product.price)}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 items-end">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-2 bg-[#1056b8] hover:bg-[#0d4899] text-white rounded-lg shadow-xs transition"
                    title="Vložit do košíku"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                    title="Odebrat z oblíbených"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <Heart className="w-16 h-16 mx-auto stroke-1 text-slate-300" />
              <p className="font-bold text-slate-600 text-base">Zatím nemáte žádné oblíbené produkty</p>
              <p className="text-xs max-w-xs mx-auto text-slate-400">
                Kliknutím na ikonku srdíčka u produktů si můžete uložit své favority na později.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
            <button
              onClick={clearWishlist}
              className="text-xs font-bold text-slate-500 hover:text-rose-600 transition"
            >
              Vymazat seznam
            </button>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="px-4 py-2 bg-[#1056b8] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <span>Pokračovat v nákupu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
