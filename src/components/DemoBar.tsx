import React, { useState } from 'react';
import { Sparkles, ShoppingCart, ChevronDown, ChevronUp, Users, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useVisitor } from '../context/VisitorContext';
import { PRODUCTS } from '../data/products';

interface DemoBarProps {
  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

export const DemoBar: React.FC<DemoBarProps> = ({ onShowToast }) => {
  const { 
    currency, 
    setCurrency, 
    addToCart, 
    clearCart, 
    applyPromoCode,
    setIsCartOpen 
  } = useCart();
  const { onlineUsers, totalViews } = useVisitor();

  const [isOpen, setIsOpen] = useState(false);

  const handleFillDemoCart = () => {
    clearCart();
    // Add sample items matching the screenshot
    const novaX10 = PRODUCTS.find((p) => p.id === 'smartphone-nova-x10');
    const probook = PRODUCTS.find((p) => p.id === 'notebook-probook-14');
    
    if (novaX10) addToCart(novaX10, 1);
    if (probook) addToCart(probook, 1);
    
    onShowToast('Košík byl naplněn ukázkovými produkty z návrhu!', 'success');
    setIsCartOpen(true);
  };

  const handleApplyCoupon = (code: string) => {
    const res = applyPromoCode(code);
    onShowToast(res.message, res.success ? 'success' : 'info');
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {isOpen ? (
        <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl border border-slate-700 w-80 space-y-3 animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <div className="flex items-center gap-2 text-xs font-black text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span>Klientská Demo Šablona</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-xl space-y-1 text-xs border border-slate-700">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                Aktuálně online:
              </span>
              <span className="font-bold text-emerald-400">{onlineUsers} návštěvníků</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                Celkem zobrazeno:
              </span>
              <span className="font-bold text-white font-mono">{totalViews.toLocaleString('cs-CZ')}×</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-300">
            Rychlé ovládací prvky pro prezentaci funkcí e-shopu klientům:
          </p>

          <div className="space-y-2 text-xs">
            {/* Quick Fill Cart */}
            <button
              onClick={handleFillDemoCart}
              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Naplnit košík dle předlohy</span>
            </button>

            {/* Currency switcher */}
            <div className="flex items-center justify-between bg-slate-800 p-2 rounded-xl">
              <span className="text-[11px] text-slate-400">Měna zobrazení:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrency('CZK')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    currency === 'CZK' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Kč (CZK)
                </button>
                <button
                  onClick={() => setCurrency('EUR')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    currency === 'EUR' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  € (EUR)
                </button>
              </div>
            </div>

            {/* Test Coupons */}
            <div className="bg-slate-800 p-2 rounded-xl space-y-1.5">
              <span className="text-[11px] text-slate-400 block">Testovací slevové kódy:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => handleApplyCoupon('ELEKTRO10')}
                  className="flex-1 py-1 px-2 bg-slate-700 hover:bg-slate-600 text-blue-300 rounded text-[11px] font-mono font-bold cursor-pointer"
                >
                  ELEKTRO10 (-10%)
                </button>
                <button
                  onClick={() => handleApplyCoupon('VIP20')}
                  className="flex-1 py-1 px-2 bg-slate-700 hover:bg-slate-600 text-emerald-300 rounded text-[11px] font-mono font-bold cursor-pointer"
                >
                  VIP20 (-20%)
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 text-white px-3.5 py-2.5 rounded-full shadow-xl border border-slate-700 text-xs font-bold transition hover:scale-105 cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Demo Nástroje ({onlineUsers} online)</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      )}
    </div>
  );
};
