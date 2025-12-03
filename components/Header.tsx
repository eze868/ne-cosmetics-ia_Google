
import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { BrandType, Product } from '../types';
import { PRODUCTS } from '../constants';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeBrand: BrandType;
  setActiveBrand: (brand: BrandType) => void;
  onProductSelect?: (product: Product) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  activeBrand, 
  setActiveBrand, 
  onProductSelect,
  cartCount,
  onOpenCart
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filtrar sugestões
  const suggestions = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 1
  ).slice(0, 5);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Lógica de Persistência do Timer
    const TIMER_KEY = 'offer_end_time_v1';
    const ONE_HOUR = 3600 * 1000;

    const initTimer = () => {
        const storedEndTime = localStorage.getItem(TIMER_KEY);
        const now = Date.now();

        if (storedEndTime) {
            const end = parseInt(storedEndTime, 10);
            const remaining = Math.max(0, Math.floor((end - now) / 1000));
            
            if (remaining === 0) {
                // Se expirou, reseta para 1 hora (simulando "última chance")
                const newEnd = now + ONE_HOUR;
                localStorage.setItem(TIMER_KEY, newEnd.toString());
                return 3600;
            }
            return remaining;
        } else {
            // Primeiro acesso
            const newEnd = now + ONE_HOUR;
            localStorage.setItem(TIMER_KEY, newEnd.toString());
            return 3600;
        }
    };

    setTimeLeft(initTimer());

    const timer = setInterval(() => {
        setTimeLeft(prev => {
            if (prev <= 0) {
                // Reinicia ciclo ao acabar
                const now = Date.now();
                localStorage.setItem(TIMER_KEY, (now + ONE_HOUR).toString());
                return 3600;
            }
            return prev - 1;
        });
    }, 1000);

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearInterval(timer);
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return { h, m, s };
  };

  const time = formatTime(timeLeft);
  const brands: BrandType[] = ['TRUSS', 'WELLA', 'BRAÉ', 'SEBASTIAN', 'CADIVEU', 'MINIATURA'];

  const handleSuggestionClick = (product: Product) => {
    setSearchQuery(product.name);
    setShowSuggestions(false);
    if (onProductSelect) onProductSelect(product);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center">
        {/* 1. MENU PRINCIPAL */}
        <div className={`w-full bg-white transition-all duration-300 z-50 border-b border-gray-200 ${isScrolled ? 'py-2 shadow-md' : 'py-4'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between gap-4">
                {/* Logo */}
                <div 
                    className="flex flex-col shrink-0 cursor-pointer group text-center"
                    onClick={() => { setActiveBrand('TODAS'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                >
                    <h1 className={`font-serif font-black tracking-tighter text-primary transition-all duration-300 ${isScrolled ? 'text-2xl' : 'text-3xl'}`}>
                        N&E
                    </h1>
                    <span className={`text-[8px] font-bold uppercase tracking-[0.3em] text-gray-500 ${isScrolled ? 'hidden' : 'block'}`}>
                        Professional
                    </span>
                </div>

                {/* Search Bar com Autocomplete */}
                <div 
                    className={`flex-1 max-w-xs transition-all duration-500 ${isScrolled ? 'opacity-0 w-0 hidden' : 'opacity-100 w-auto'}`}
                    ref={searchRef}
                >
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="Buscar produtos..." 
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                            onFocus={() => setShowSuggestions(true)}
                            className="w-full bg-gray-100 border border-transparent focus:border-action focus:bg-white rounded-full py-2 px-4 pl-10 text-xs font-medium text-primary placeholder-gray-500 transition-all outline-none"
                        />
                        <Search className="absolute left-3 top-2 text-gray-400 group-focus-within:text-action transition-colors" size={16} />
                        
                        {/* Sugestões Dropdown */}
                        {showSuggestions && searchQuery.length > 1 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                {suggestions.length > 0 ? (
                                    <ul>
                                        {suggestions.map(product => (
                                            <li 
                                                key={product.id}
                                                onClick={() => handleSuggestionClick(product)}
                                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
                                            >
                                                <img src={product.image} alt={product.name} className="w-8 h-8 object-contain" />
                                                <div className="flex-1">
                                                    <p className="text-xs font-bold text-gray-800 line-clamp-1">{product.name}</p>
                                                    <p className="text-[10px] text-gray-500">{product.brand}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-4 text-center text-xs text-gray-400">Nenhum produto encontrado</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Cart Button */}
                <button 
                  onClick={onOpenCart}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ShoppingBag className="text-primary" size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-action text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                      {cartCount}
                    </span>
                  )}
                </button>
            </div>
        </div>

        {/* 2. BARRA DE OFERTAS */}
        <div 
            className={`w-[92%] max-w-4xl mx-auto mt-3 bg-primary text-white rounded-lg shadow-persuasive overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] relative z-40 border-l-4 border-accent ${
                isScrolled 
                ? 'max-h-0 opacity-0 -translate-y-10 mt-0' 
                : 'max-h-24 opacity-100 translate-y-0'
            }`}
        >
            <div className="flex items-center justify-between px-5 py-3 relative">
                <div className="flex flex-col z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-alert text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                            EXPIRA HOJE
                        </span>
                    </div>
                    <p className="font-bold text-base md:text-xl text-white leading-tight">
                        Descontos de <span className="text-accent text-2xl md:text-3xl font-black italic">60%</span>
                    </p>
                </div>

                <div className="z-10 flex flex-col items-end">
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Termina em:</span>
                    <div className="flex gap-1 font-mono font-bold text-sm md:text-lg text-white">
                        <div className="bg-gray-800 w-7 h-8 md:w-9 md:h-9 flex items-center justify-center rounded text-white shadow-inner">{time.h.toString().padStart(2,'0')}</div>
                        <span className="self-center text-gray-600">:</span>
                        <div className="bg-gray-800 w-7 h-8 md:w-9 md:h-9 flex items-center justify-center rounded text-white shadow-inner">{time.m.toString().padStart(2,'0')}</div>
                        <span className="self-center text-gray-600">:</span>
                        <div className="bg-gray-800 w-7 h-8 md:w-9 md:h-9 flex items-center justify-center rounded text-alert shadow-inner">{time.s.toString().padStart(2,'0')}</div>
                    </div>
                </div>
            </div>
        </div>

        {/* 3. MARCAS (Glassmorphism) */}
        <div className={`w-full z-30 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 py-3 overflow-x-auto hide-scrollbar flex gap-2 md:justify-center pl-4 pr-4">
                 <button 
                    onClick={() => setActiveBrand('TODAS')}
                    className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all ${
                        activeBrand === 'TODAS' 
                        ? 'bg-primary text-white shadow-lg transform scale-105' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-black'
                    }`}
                 >
                    Todas
                 </button>
                 
                 {brands.map(brand => (
                    <button 
                        key={brand} 
                        onClick={() => setActiveBrand(brand)}
                        className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide whitespace-nowrap transition-all ${
                            activeBrand === brand 
                            ? 'bg-primary text-white shadow-lg transform scale-105' 
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-black'
                        }`}
                    >
                        {brand}
                    </button>
                 ))}
            </div>
        </div>
    </div>
  );
};

export default Header;
