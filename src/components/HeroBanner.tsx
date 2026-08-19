import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Award, Users, Sparkles, Smartphone, Laptop, Headphones } from 'lucide-react';
import { useVisitor } from '../context/VisitorContext';

interface HeroBannerProps {
  onShopNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow }) => {
  const { onlineUsers, todayOrders } = useVisitor();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0e448b] bg-gradient-to-r from-[#082855] via-[#0f4b9c] to-[#145fc7] text-white shadow-2xl mb-8 border border-blue-800/40">
      
      {/* Ambient background glows */}
      <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 -top-16 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle tech background grid pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative px-6 py-10 sm:px-12 sm:py-14 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
        
        {/* Left text column matching screenshot exactly */}
        <div className="max-w-xl space-y-4 sm:space-y-5 text-center lg:text-left">
          
          {/* Live Visitor & Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold text-blue-100 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <Users className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-white font-extrabold">{onlineUsers} zákazníků</span>
            <span className="text-blue-200">právě nakupuje · Dnes {todayOrders} objednávek</span>
          </div>

          {/* Main Title matching reference image */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.12] text-white drop-shadow-sm">
            NEJNOVĚJŠÍ TECHNOLOGIE NA DOSAH!
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-blue-100 font-normal leading-relaxed max-w-lg">
            Objevte naši nabídku elektroniky. Prémiové smartphony, výkonné notebooky, 4K televize a audio příslušenství za bezkonkurenční ceny s doručením do druhého dne.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-5 pt-1 text-xs font-semibold text-blue-100">
            <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-xs">
              <Zap className="w-4 h-4 text-amber-300" /> Bleskové odeslání
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-300" /> 2 roky záruka
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-xs">
              <Award className="w-4 h-4 text-cyan-300" /> Autorizovaný prodejce
            </span>
          </div>

          {/* CTA Button matching reference image */}
          <div className="pt-2">
            <button
              onClick={onShopNow}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-blue-50 text-[#1056b8] font-black text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <span>Nakupovat nyní</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right 3D High-Tech Device Showcase */}
        <div className="relative w-full lg:w-1/2 flex items-center justify-center py-4">
          <div className="relative w-full max-w-md h-72 sm:h-80 flex items-center justify-center">
            
            {/* Center Glowing Tech Card - Laptop mockup */}
            <div className="absolute top-2 right-4 sm:right-8 w-56 sm:w-68 bg-slate-900/80 backdrop-blur-md rounded-2xl p-3 border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 z-10">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-blue-200">
                <span className="flex items-center gap-1 font-bold text-white">
                  <Laptop className="w-3.5 h-3.5 text-blue-400" /> ProBook 14
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">Skladem</span>
              </div>
              <div className="h-28 rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center p-2">
                <img 
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80" 
                  alt="ProBook 14"
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-300">Intel Core i5 · 16GB</span>
                <span className="font-extrabold text-white">18 490 Kč</span>
              </div>
            </div>

            {/* Left Glass Tech Card - Smartphone Nova X10 */}
            <div className="absolute bottom-2 left-2 sm:left-6 w-48 sm:w-56 bg-slate-900/85 backdrop-blur-md rounded-2xl p-3 border border-white/20 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300 z-20">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-blue-200">
                <span className="flex items-center gap-1 font-bold text-white">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Nova X10
                </span>
                <span className="bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-bold">-11 %</span>
              </div>
              <div className="h-28 rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center p-2">
                <img 
                  src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80" 
                  alt="Nova X10"
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-300">128GB AMOLED</span>
                <span className="font-extrabold text-cyan-300">7 990 Kč</span>
              </div>
            </div>

            {/* Floating SoundFlow ANC Headphones badge */}
            <div className="absolute -top-3 left-6 sm:left-12 bg-white/95 text-slate-900 rounded-2xl px-3.5 py-2 shadow-xl border border-blue-100 flex items-center gap-2.5 transform -rotate-3 hover:scale-105 transition-transform duration-200 z-30">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#1056b8] flex items-center justify-center">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bestseller</span>
                <span className="text-xs font-black text-slate-900">SoundFlow ANC</span>
              </div>
            </div>

            {/* Floating discount badge */}
            <div className="absolute -bottom-2 right-6 sm:right-12 bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-30 transform rotate-6">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Letní akce až -40%</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
