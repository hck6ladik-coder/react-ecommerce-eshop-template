import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  Sparkles,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    subtotal,
    discountAmount,
    promoCode,
    applyPromoCode,
    removePromoCode,
    freeShippingRemaining,
    freeShippingProgress,
    formatPrice,
    totalItems,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const res = applyPromoCode(inputCode);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError(null);
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
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
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1056b8] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">Nákupní košík</h3>
              <p className="text-xs text-slate-500">{totalItems} {totalItems === 1 ? 'položka' : totalItems < 5 ? 'položky' : 'položek'}</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
            aria-label="Zavřít košík"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-4 bg-blue-50/70 border-b border-blue-100">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="flex items-center gap-1.5 text-slate-800">
              <Truck className="w-4 h-4 text-[#1056b8]" />
              {freeShippingRemaining > 0 ? (
                <>Nakupte ještě za <strong className="text-[#1056b8]">{formatPrice(freeShippingRemaining)}</strong> pro dopravu ZDARMA</>
              ) : (
                <span className="text-emerald-700 flex items-center gap-1 font-black">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Gratulujeme! Máte dopravu ZDARMA!
                </span>
              )}
            </span>
            <span className="text-slate-500">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-blue-200/60 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                freeShippingRemaining === 0 ? 'bg-emerald-500' : 'bg-[#1056b8]'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-3.5 p-3 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition shadow-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-contain rounded-xl bg-slate-50 border border-slate-100 p-1 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate mb-2">
                    {item.product.subtitle}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-slate-500 hover:text-slate-800 transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-slate-500 hover:text-slate-800 transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-black text-slate-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 transition ml-1"
                  title="Odebrat z košíku"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <ShoppingBag className="w-16 h-16 mx-auto stroke-1 text-slate-300" />
              <p className="font-bold text-slate-600 text-base">Váš košík je prázdný</p>
              <p className="text-xs max-w-xs mx-auto text-slate-400">
                Prozkoumejte naši nabídku elektroniky a vyberte si skvělé produkty za akční ceny.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-5 py-2.5 bg-[#1056b8] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Prohlédnout produkty
              </button>
            </div>
          )}
        </div>

        {/* Footer & Checkout button */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
            {/* Promo Code Box */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Kód <strong>{promoCode}</strong> aktivní</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-emerald-700 hover:text-rose-600 text-[11px] font-semibold underline"
                  >
                    Odebrat
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Slevový kód (např. ELEKTRO10)"
                        value={inputCode}
                        onChange={(e) => {
                          setInputCode(e.target.value);
                          setPromoError(null);
                        }}
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2.5 uppercase font-medium focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                      />
                      <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition"
                    >
                      Použít
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
                  )}
                  {/* Quick promo chip */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1">
                    <span>Tip na slevu:</span>
                    <button
                      type="button"
                      onClick={() => setInputCode('ELEKTRO10')}
                      className="text-[#1056b8] font-bold hover:underline"
                    >
                      ELEKTRO10 (-10%)
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200/60 pt-3">
              <div className="flex justify-between">
                <span>Mezisoučet produktů:</span>
                <span className="font-bold text-slate-800">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Sleva s kupónem:</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Doprava:</span>
                <span className="font-bold text-slate-800">
                  {freeShippingRemaining === 0 ? (
                    <span className="text-emerald-600">ZDARMA</span>
                  ) : (
                    'od 69 Kč (v dalším kroku)'
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Celkem k úhradě:</span>
                <span className="text-[#1056b8]">
                  {formatPrice(Math.max(0, subtotal - discountAmount))}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-6 bg-[#1056b8] hover:bg-[#0d4899] text-white font-black text-sm rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition"
            >
              <span>Pokračovat k objednávce</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
