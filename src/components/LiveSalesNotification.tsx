import React from 'react';
import { useVisitor } from '../context/VisitorContext';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';

export const LiveSalesNotification: React.FC = () => {
  const { recentPurchase } = useVisitor();
  const [dismissed, setDismissed] = React.useState(false);

  if (!recentPurchase || dismissed) return null;

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-blue-100 flex items-center gap-3 animate-in slide-in-from-left-4 duration-300">
      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1056b8] flex items-center justify-center flex-shrink-0">
        <ShoppingBag className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0 text-xs">
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
          <span>{recentPurchase.customer} ({recentPurchase.city})</span>
          <CheckCircle className="w-3 h-3 text-emerald-500" />
        </div>
        <p className="text-slate-900 font-extrabold truncate text-xs mt-0.5">
          {recentPurchase.product}
        </p>
        <span className="text-[10px] text-slate-400 font-medium">
          Zakoupeno {recentPurchase.timeAgo}
        </span>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="text-slate-300 hover:text-slate-600 transition p-1"
        aria-label="Zavřít"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
