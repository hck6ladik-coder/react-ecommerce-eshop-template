import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Layers, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Phone, 
  Truck, 
  ShieldCheck,
  CheckCircle2,
  LogIn,
  Users,
  Eye
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useComparison } from '../context/ComparisonContext';
import { useVisitor } from '../context/VisitorContext';
import { CategoryId, Product } from '../types';
import { PRODUCTS, CATEGORIES } from '../data/products';

interface HeaderProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onProductClick: (product: Product) => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onProductClick,
  onOpenContact,
}) => {
  const { totalItems, subtotal, formatPrice, setIsCartOpen } = useCart();
  const { wishlist, setIsWishlistOpen } = useWishlist();
  const { comparisonList, setIsComparisonOpen } = useComparison();
  const { onlineUsers, totalViews } = useVisitor();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Filtered preview products for live search dropdown
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail) {
      setIsLoggedIn(true);
      setIsUserModalOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs transition-all">
      {/* Top micro bar with Live Online Visitors Counter & Free Shipping */}
      <div className="bg-[#0b3874] text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Left: Free shipping & warranty */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-slate-200 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-blue-300" />
              Doprava <strong className="text-white">ZDARMA</strong> nad 2 000 Kč
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              Záruka 24 měsíců + 14 dní na vrácení
            </span>
          </div>

          {/* Right: Real-time Online Visitors & Total Views */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-slate-300 text-[11px] sm:text-xs ml-auto">
            
            {/* Live pulsating online counter */}
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 text-white">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Users className="w-3 h-3 text-emerald-400 hidden sm:inline" />
              <span className="font-bold text-emerald-300">{onlineUsers}</span>
              <span className="hidden sm:inline text-slate-200">lidí online</span>
            </div>

            {/* Total views */}
            <div className="hidden lg:flex items-center gap-1 text-slate-300">
              <Eye className="w-3 h-3 text-blue-300" />
              <span>Návštěvnost: <strong className="text-white font-mono">{totalViews.toLocaleString('cs-CZ')}</strong></span>
            </div>

            {/* Infoline */}
            <div className="hidden sm:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-white font-bold">+420 800 123 456</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          
          {/* Mobile menu trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Otevřít menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div 
            onClick={() => {
              onSelectCategory('all');
              onSearchChange('');
            }}
            className="cursor-pointer select-none flex flex-col items-start leading-none group"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#1056b8] group-hover:text-blue-700 transition">
                ELEKTRO
              </span>
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#0c3160]">
                MARKET
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 mt-0.5">
              Váš expert na elektroniku
            </span>
          </div>

          {/* Search bar */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative hidden md:block">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Hledat mezi 26+ prémiovými produkty..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-4 pr-12 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1056b8] focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setIsSearchFocused(true)}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-[#1056b8] hover:bg-[#0d4899] text-white rounded-lg flex items-center justify-center transition shadow-xs cursor-pointer"
                aria-label="Vyhledat"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Live Search Auto-complete Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50">
                  <span>Výsledky pro &quot;<strong>{searchQuery}</strong>&quot;</span>
                  <span className="font-bold text-[#1056b8]">{searchResults.length} položek</span>
                </div>
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onProductClick(product);
                          setIsSearchFocused(false);
                        }}
                        className="flex items-center gap-3.5 p-3 hover:bg-blue-50/70 cursor-pointer transition group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-contain rounded-lg bg-white border border-slate-200 p-1 group-hover:scale-105 transition"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1056b8] truncate">{product.name}</p>
                          <p className="text-[11px] text-slate-500">{product.subtitle} · {product.categoryName}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-black text-slate-900">{formatPrice(product.price)}</span>
                          <span className="block text-[10px] text-emerald-600 font-bold">Skladem</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500">
                    Nenalezen žádný produkt odpovídající výrazu &quot;{searchQuery}&quot;.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User actions */}
          <div className="flex items-center gap-1 sm:gap-2.5">
            {/* Porovnání */}
            <button
              onClick={() => setIsComparisonOpen(true)}
              className="relative p-2.5 text-slate-700 hover:text-[#1056b8] hover:bg-blue-50 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              title="Porovnání parametrů produktů"
            >
              <Layers className="w-5 h-5" />
              <span className="hidden xl:inline text-xs font-bold">Porovnání</span>
              {comparisonList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {comparisonList.length}
                </span>
              )}
            </button>

            {/* Oblíbené */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              title="Uložené oblíbené produkty"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden xl:inline text-xs font-bold">Oblíbené</span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Můj Účet */}
            <div className="relative">
              <button
                onClick={() => setIsUserModalOpen(!isUserModalOpen)}
                className="flex items-center gap-2 p-2 text-slate-700 hover:text-[#1056b8] hover:bg-blue-50 rounded-xl transition cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                  {isLoggedIn ? (userEmail.charAt(0).toUpperCase() || 'U') : <User className="w-4 h-4" />}
                </div>
                <div className="hidden sm:flex flex-col items-start leading-tight text-left">
                  <span className="text-xs font-bold text-slate-800">
                    {isLoggedIn ? 'Můj účet' : 'Můj Účet'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {isLoggedIn ? (userEmail.split('@')[0] || 'Přihlášen') : 'Přihlášení'}
                  </span>
                </div>
              </button>

              {/* User Dropdown */}
              {isUserModalOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in">
                  {isLoggedIn ? (
                    <div>
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1056b8] font-black flex items-center justify-center">
                          {userEmail.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-black text-slate-900 truncate">{userEmail}</p>
                          <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> VIP Člen Klubu
                          </p>
                        </div>
                      </div>
                      <div className="py-2 space-y-1 text-xs text-slate-700 font-medium">
                        <button className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-50 transition cursor-pointer">Moje objednávky</button>
                        <button className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-50 transition cursor-pointer">Fakturační adresy</button>
                        <button className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-50 transition cursor-pointer">Moje slevové kupóny</button>
                      </div>
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="w-full mt-2 text-xs text-rose-600 font-bold py-2 border-t border-slate-100 hover:bg-rose-50 rounded-lg text-center transition cursor-pointer"
                      >
                        Odhlásit se
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleLoginSubmit} className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
                        <LogIn className="w-4 h-4 text-[#1056b8]" /> Přihlášení do zákaznického účtu
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Zadejte e-mail pro rychlé přihlášení:
                      </p>
                      <input
                        type="email"
                        required
                        placeholder="klient@email.cz"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full bg-[#1056b8] hover:bg-[#0d4899] text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer shadow-xs"
                      >
                        Přihlásit se
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Košík */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-[#1056b8] hover:bg-[#0d4899] text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition group relative cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="tracking-wide">
                Košík {totalItems > 0 ? `(${totalItems})` : '(0)'}
              </span>
              {totalItems > 0 && (
                <span className="hidden md:inline font-normal text-blue-200 border-l border-blue-400/40 pl-2 text-xs">
                  {formatPrice(subtotal)}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Hledat v nabídce..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-3.5 pr-10 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#1056b8] focus:outline-none"
            />
            <button className="absolute right-1.5 px-2.5 py-1.5 bg-[#1056b8] text-white rounded-lg">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation bar matching screenshot */}
      <nav className="bg-slate-50 border-t border-slate-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center space-x-1 text-xs sm:text-sm font-black tracking-wider text-slate-800">
            {/* MOBILY with dropdown */}
            <li className="relative group">
              <button
                onClick={() => onSelectCategory('mobily')}
                className={`flex items-center gap-1.5 px-4 py-3 uppercase transition cursor-pointer ${
                  activeCategory === 'mobily' 
                    ? 'text-[#1056b8] border-b-2 border-[#1056b8] bg-blue-50/50' 
                    : 'text-slate-800 hover:text-[#1056b8] hover:bg-slate-100/70'
                }`}
              >
                <span>MOBILY</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>

              {/* Sub-menu Dropdown */}
              <div className="absolute top-full left-0 w-64 bg-white rounded-b-2xl shadow-xl border border-slate-100 p-2 hidden group-hover:block z-50 animate-in fade-in">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">Kategorie telefonů</div>
                <button 
                  onClick={() => onSelectCategory('mobily')}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-[#1056b8] rounded-lg transition cursor-pointer"
                >
                  Všechny chytré telefony (6)
                </button>
                <button 
                  onClick={() => onSelectCategory('mobily')}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-[#1056b8] rounded-lg transition cursor-pointer"
                >
                  Apple iPhone 15 & 13
                </button>
                <button 
                  onClick={() => onSelectCategory('mobily')}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-[#1056b8] rounded-lg transition cursor-pointer"
                >
                  Samsung Galaxy S24 Ultra & A55
                </button>
                <button 
                  onClick={() => onSelectCategory('mobily')}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-[#1056b8] rounded-lg transition cursor-pointer"
                >
                  Xiaomi Redmi Note & Nova X10
                </button>
              </div>
            </li>

            {/* NOTEBOOKY */}
            <li>
              <button
                onClick={() => onSelectCategory('notebooky')}
                className={`px-4 py-3 uppercase transition cursor-pointer ${
                  activeCategory === 'notebooky' 
                    ? 'text-[#1056b8] border-b-2 border-[#1056b8] bg-blue-50/50' 
                    : 'text-slate-800 hover:text-[#1056b8] hover:bg-slate-100/70'
                }`}
              >
                NOTEBOOKY
              </button>
            </li>

            {/* TV & AUDIO */}
            <li>
              <button
                onClick={() => onSelectCategory('tv-audio')}
                className={`px-4 py-3 uppercase transition cursor-pointer ${
                  activeCategory === 'tv-audio' 
                    ? 'text-[#1056b8] border-b-2 border-[#1056b8] bg-blue-50/50' 
                    : 'text-slate-800 hover:text-[#1056b8] hover:bg-slate-100/70'
                }`}
              >
                TV & AUDIO
              </button>
            </li>

            {/* TABLETY */}
            <li>
              <button
                onClick={() => onSelectCategory('tablety')}
                className={`px-4 py-3 uppercase transition cursor-pointer ${
                  activeCategory === 'tablety' 
                    ? 'text-[#1056b8] border-b-2 border-[#1056b8] bg-blue-50/50' 
                    : 'text-slate-800 hover:text-[#1056b8] hover:bg-slate-100/70'
                }`}
              >
                TABLETY
              </button>
            </li>

            {/* PŘÍSLUŠENSTVÍ */}
            <li>
              <button
                onClick={() => onSelectCategory('prislusenstvi')}
                className={`px-4 py-3 uppercase transition cursor-pointer ${
                  activeCategory === 'prislusenstvi' 
                    ? 'text-[#1056b8] border-b-2 border-[#1056b8] bg-blue-50/50' 
                    : 'text-slate-800 hover:text-[#1056b8] hover:bg-slate-100/70'
                }`}
              >
                PŘÍSLUŠENSTVÍ & GAMING
              </button>
            </li>

            {/* KONTAKT */}
            <li>
              <button
                onClick={onOpenContact}
                className="px-4 py-3 uppercase text-slate-800 hover:text-[#1056b8] hover:bg-slate-100/70 transition cursor-pointer"
              >
                KONTAKT
              </button>
            </li>

            {/* AKCE / SPECIAL TAG */}
            <li className="ml-auto">
              <button
                onClick={() => onSelectCategory('all')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                LETNÍ SLEVY AŽ -40%
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="text-xs font-bold text-slate-400 uppercase px-2">Kategorie</div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id as CategoryId);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                activeCategory === cat.id ? 'bg-[#1056b8] text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${activeCategory === cat.id ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {cat.count}
              </span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenContact();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 cursor-pointer"
            >
              Kontakt & Kamenné prodejny
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
