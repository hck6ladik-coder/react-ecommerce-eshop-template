import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Heart, 
  Layers, 
  Check, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Plus, 
  Minus,
  MessageSquare,
  Users,
  Clock
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useComparison } from '../context/ComparisonContext';
import { useVisitor } from '../context/VisitorContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onShowToast,
}) => {
  const { addToCart, formatPrice } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInComparison, toggleComparison } = useComparison();
  const { getProductViewers } = useVisitor();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'delivery'>('specs');

  if (!product) return null;

  const currentImage = selectedImage || product.image;
  const inWishlist = isInWishlist(product.id);
  const inComparison = isInComparison(product.id);
  const viewersCount = getProductViewers(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onShowToast(`Přidáno do košíku: ${quantity}× ${product.name}`, 'success');
  };

  const handleWishlistClick = () => {
    toggleWishlist(product);
    onShowToast(
      inWishlist ? 'Odebráno z oblíbených' : `Přidáno do oblíbených: ${product.name}`,
      'info'
    );
  };

  const handleCompareClick = () => {
    toggleComparison(product);
    onShowToast(
      inComparison ? 'Odebráno ze srovnávače' : `Přidáno do srovnávače: ${product.name}`,
      'info'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>{product.categoryName}</span>
            <span>/</span>
            <span className="text-[#1056b8]">{product.brand}</span>
            <span>/</span>
            <span className="text-slate-800 truncate max-w-xs">{product.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
            aria-label="Zavřít okno"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Product Images & Gallery */}
            <div className="space-y-4">
              <div className="w-full h-72 sm:h-80 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-4 relative">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`w-16 h-16 rounded-xl border p-1 bg-slate-50 flex items-center justify-center flex-shrink-0 transition cursor-pointer ${
                        currentImage === imgUrl
                          ? 'border-[#1056b8] ring-2 ring-blue-200 bg-white'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="max-h-full max-w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Live viewers & Trust badges */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Právě si tento produkt prohlíží <strong>{viewersCount} zákazníků</strong></span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 text-[11px] pt-1 border-t border-blue-200/50">
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> 2 roky záruka</span>
                  <span className="flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5 text-blue-600" /> 14 dní na vrácení</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-600" /> Odeslání dnes</span>
                </div>
              </div>

            </div>

            {/* Right: Info, Price, Actions */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1056b8]">
                  {product.brand}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {product.subtitle}
                </p>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating.toFixed(1)} / 5</span>
                </div>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 underline cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {product.reviewCount} zákaznických recenzí
                </button>
              </div>

              {/* Stock Status */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-emerald-700 font-bold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Skladem na centrálním skladu ({product.stock} ks)
                </span>
                <span className="text-slate-500 font-medium">
                  Doručení zítra
                </span>
              </div>

              {/* Price Row */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-baseline justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    {formatPrice(product.price)}
                  </div>
                  {product.originalPrice && (
                    <div className="text-xs text-slate-400 line-through">
                      Běžná cena: {formatPrice(product.originalPrice)}
                    </div>
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Cena včetně DPH 21 %
                </span>
              </div>

              {/* Add to Cart with Quantity */}
              <div className="flex items-center gap-3 pt-2">
                {/* Quantity */}
                <div className="flex items-center border border-slate-300 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-slate-500 hover:text-slate-800 transition cursor-pointer"
                    aria-label="Snížit množství"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-2 text-slate-500 hover:text-slate-800 transition cursor-pointer"
                    aria-label="Zvýšit množství"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Main CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-[#1056b8] hover:bg-[#0d4899] text-white font-black text-sm rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Vložit do košíku</span>
                </button>
              </div>

              {/* Secondary actions: Wishlist & Compare */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleWishlistClick}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    inWishlist
                      ? 'border-rose-300 bg-rose-50 text-rose-600'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-rose-500' : ''}`} />
                  <span>{inWishlist ? 'V oblíbených' : 'Do oblíbených'}</span>
                </button>

                <button
                  onClick={handleCompareClick}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    inComparison
                      ? 'border-amber-300 bg-amber-50 text-amber-700'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{inComparison ? 'V porovnání' : 'Porovnat'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Tabs: Description & Specs & Reviews */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            {/* Tab navigation */}
            <div className="flex border-b border-slate-200 gap-4 mb-5">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 text-xs sm:text-sm font-black transition cursor-pointer ${
                  activeTab === 'specs'
                    ? 'border-b-2 border-[#1056b8] text-[#1056b8]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Popis a Parametry
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-xs sm:text-sm font-black transition cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-[#1056b8] text-[#1056b8]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Hodnocení ({product.reviewCount})
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`pb-3 text-xs sm:text-sm font-black transition cursor-pointer ${
                  activeTab === 'delivery'
                    ? 'border-b-2 border-[#1056b8] text-[#1056b8]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Doprava & Platba
              </button>
            </div>

            {/* Tab: Specs */}
            {activeTab === 'specs' && (
              <div className="space-y-5 animate-in fade-in">
                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-2">Popis produktu</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-3">Technické specifikace</h4>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs">
                    {Object.entries(product.specs).map(([key, val], idx) => (
                      <div
                        key={key}
                        className={`flex p-3 ${idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}`}
                      >
                        <span className="w-1/3 font-bold text-slate-600">{key}</span>
                        <span className="w-2/3 text-slate-900 font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-4 animate-in fade-in">
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-3">
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{rev.author}</span>
                            {rev.verified && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-semibold">
                                Ověřený nákup
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-slate-600">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    Tento produkt zatím nemá žádné recenze. Buďte první, kdo jej ohodnotí!
                  </p>
                )}
              </div>
            )}

            {/* Tab: Delivery */}
            {activeTab === 'delivery' && (
              <div className="space-y-3 text-xs animate-in fade-in">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-[#1056b8]" />
                    <div>
                      <span className="font-bold text-slate-900 block">Zásilkovna / Z-BOX</span>
                      <span className="text-slate-500 text-[11px]">Doručení na více než 9 000 míst po celé ČR</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">od 69 Kč (při nákupu nad 2 000 Kč ZDARMA)</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-[#1056b8]" />
                    <div>
                      <span className="font-bold text-slate-900 block">PPL kurýr na adresu</span>
                      <span className="text-slate-500 text-[11px]">Doručení přímo domů s SMS avízem</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">99 Kč</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
