import React, { useState } from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Send, Users, Eye } from 'lucide-react';
import { useVisitor } from '../context/VisitorContext';

interface FooterProps {
  onOpenContact: () => void;
  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onShowToast }) => {
  const { onlineUsers, totalViews } = useVisitor();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onShowToast('Děkujeme za odběr newsletteru! Slevový kód byl odeslán.', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800">
      
      {/* Newsletter Section */}
      <div className="bg-[#0b3874] border-b border-blue-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-5 h-5 text-blue-300" />
              Získejte slevu 200 Kč na váš první nákup!
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 mt-1">
              Přihlaste se k odběru novinek a buďte první, kdo se dozví o bleskových slevách.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Zadejte váš e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder-blue-200 text-xs border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-white text-[#1056b8] hover:bg-blue-50 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-sm flex-shrink-0 cursor-pointer"
            >
              <span>Odebírat</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links matching screenshot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* O NÁS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              O NÁS
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="text-slate-300 font-bold block mb-1">Elektromarket s.r.o.</span>
                Přední prodejce spotřební elektroniky, výpočetní techniky a chytré domácnosti v ČR.
              </li>
              <li><button onClick={onOpenContact} className="hover:text-white transition cursor-pointer">Kamenné prodejny & Showroomy</button></li>
              <li><a href="#kariera" className="hover:text-white transition">Kariéra v týmu</a></li>
              <li><a href="#udrzitelnost" className="hover:text-white transition">Ekologie a recyklace elektra</a></li>
            </ul>
          </div>

          {/* ZÁKAZNICKÝ SERVIS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              ZÁKAZNICKÝ SERVIS
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#doprava" className="hover:text-white transition">Možnosti a ceny dopravy</a></li>
              <li><a href="#platba" className="hover:text-white transition">Způsoby bezpečné platby</a></li>
              <li><a href="#reklamace" className="hover:text-white transition">Reklamace a vrácení zboží do 14 dnů</a></li>
              <li><a href="#podminky" className="hover:text-white transition">Obchodní podmínky (VOP)</a></li>
              <li><a href="#gdpr" className="hover:text-white transition">Zásady ochrany osobních údajů (GDPR)</a></li>
            </ul>
          </div>

          {/* KONTAKT */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              KONTAKT
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#3d83ee]" />
                <span className="text-white font-bold">+420 800 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#3d83ee]" />
                <span>podpora@elektromarket.cz</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#3d83ee] mt-0.5" />
                <span>Vodičkova 791/41, 110 00 Praha 1</span>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenContact}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                >
                  Napsat zákaznické podpoře
                </button>
              </li>
            </ul>
          </div>

          {/* PLATBA & BEZPEČNOST & STATS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              PLATBA & STATISTIKY
            </h4>
            <p className="text-xs text-slate-400">
              Přijímáme bezpečné online platby s 3D Secure šifrováním.
            </p>
            
            {/* Payment Badges matching screenshot */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 bg-white text-slate-900 rounded font-black text-[11px] shadow-xs">
                VISA
              </span>
              <span className="px-2.5 py-1 bg-white text-slate-900 rounded font-black text-[11px] shadow-xs">
                Mastercard
              </span>
              <span className="px-2.5 py-1 bg-white text-slate-900 rounded font-black text-[11px] shadow-xs">
                Apple Pay
              </span>
              <span className="px-2.5 py-1 bg-white text-slate-900 rounded font-black text-[11px] shadow-xs">
                Google Pay
              </span>
              <span className="px-2.5 py-1 bg-emerald-600 text-white rounded font-bold text-[11px]">
                Zásilkovna
              </span>
              <span className="px-2.5 py-1 bg-blue-600 text-white rounded font-bold text-[11px]">
                PPL
              </span>
            </div>

            {/* Live stats */}
            <div className="pt-3 border-t border-slate-800 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>Právě online: <strong>{onlineUsers} zákazníků</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span>Celková návštěvnost: <strong>{totalViews.toLocaleString('cs-CZ')} zhlédnutí</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>100% zabezpečený nákup SSL</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © 2026 <strong>ELEKTRO MARKET</strong>. Všechna práva vyhrazena.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Funkční prezentační šablona pro klienty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
