import React, { useState } from 'react';
import { ShoppingCart, Heart, Layers, Star, Check, Eye, Users, Truck } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useComparison } from '../context/ComparisonContext';
import { useVisitor } from '../context/VisitorContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onShowToast,
}) => {
  const { addToCart, formatPrice } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInComparison, toggleComparison } = useComparison();
  const { getProductViewers } = useVisitor();

  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const inComparison = isInComparison(product.id);
  const viewersCount = getProductViewers(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    onShowToast(`„${product.name}“ byl přidán do košíku!`, 'success');
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
    onShowToast(
      inWishlist ? `Odebráno z oblíbených` : `Přidáno do oblíbených: ${product.name}`,
      'info'
    );
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleComparison(product);
    onShowToast(
      inComparison ? `Odebráno ze srovnávače` : `Přidáno do srovnávače: ${product.name}`,
      'info'
    );
  };

  // Badge color helper
  const getBadgeClass = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'akce':
      case 'super cena':
        return 'bg-rose-500 text-white';
      case 'novinka':
        return 'bg-blue-600 text-white';
      case 'bestseller':
      case 'top volba':
      case 'top produkt':
        return 'bg-amber-500 text-white';
      case 'doporučujeme':
        return 'bg-emerald-600 text-white';
      default:
        return 'bg-indigo-600 text-white';
    }
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-blue-200 relative cursor-pointer"
    >
      {/* Top action icons & badges */}
      <div className="flex items-start justify-between gap-2 mb-2 z-10">
        {/* Badge */}
        <div className="flex flex-col gap-1">
          {product.badge && (
            <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-md shadow-2xs tracking-wider ${getBadgeClass(product.badge)}`}>
              {product.badge}
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[10px] font-black bg-rose-50 text-rose-600 border border-rose-200 px-1.5 py-0.5 rounded">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} %
            </span>
          )}
        </div>

        {/* Wishlist & Compare Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleCompareClick}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              inComparison
                ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-300'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title="Porovnat parametry"
          >
            <Layers className="w-4 h-4" />
          </button>

          <button
            onClick={handleWishlistClick}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              inWishlist
                ? 'bg-rose-50 text-rose-500 ring-1 ring-rose-300'
                : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
            }`}
            title="Uložit do oblíbených"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="w-full h-44 sm:h-48 flex items-center justify-center p-2 mb-2 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick View overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center animate-in fade-in duration-150">
            <span className="bg-white/95 text-slate-800 text-xs font-black px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#1056b8]" />
              Rychlý náhled
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="space-y-1.5 pt-1">
        
        {/* Brand & Live viewers indicator */}
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-extrabold uppercase text-[#1056b8] tracking-wider text-[10px]">
            {product.brand}
          </span>
          <span className="flex items-center gap-1 text-slate-400 font-medium">
            <Users className="w-3 h-3 text-emerald-500" />
            <span className="text-slate-600 font-semibold">{viewersCount}</span> sleduje
          </span>
        </div>

        {/* Title matching screenshot */}
        <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-[#1056b8] transition">
          {product.name}
        </h3>

        {/* Subtitle / Specs preview */}
        <p className="text-xs text-slate-500 truncate font-medium">
          {product.subtitle}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 pt-0.5">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="text-xs font-extrabold text-slate-800 ml-1">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            ({product.reviewCount} recenzí)
          </span>
          <span className="ml-auto text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <Truck className="w-3 h-3" /> Zítra
          </span>
        </div>

        {/* Price & Add to Cart row matching screenshot */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          
          {/* Price */}
          <div>
            <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price ? (
              <div className="text-[11px] text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            ) : (
              <div className="text-[10px] text-slate-400">
                včetně DPH
              </div>
            )}
          </div>

          {/* Do košíku button matching reference image */}
          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#1056b8] hover:bg-[#0d4899] text-white hover:scale-105'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Vloženo</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="tracking-wide">Do košíku</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
