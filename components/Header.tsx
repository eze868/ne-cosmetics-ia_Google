import React from 'react';
import { BrandType } from '../types';
import { Search } from 'lucide-react';

interface HeaderProps {
  activeBrand: BrandType;
  setActiveBrand: (brand: BrandType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const BRANDS: BrandType[] = ['TODAS', 'TRUSS', 'WELLA', 'BRAÉ', 'SEBASTIAN', 'CADIVEU', 'MINIATURA'];

const Header: React.FC<HeaderProps> = ({ activeBrand, setActiveBrand, searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-gradient-to-br from-[#111] to-[#222] text-white pt-8 pb-4 px-4 sticky top-0 z-50 shadow-2xl border-b-4 border-transparent" style={{borderImage: 'linear-gradient(to right, #FF6B35, #8B4513, #1E88E5, #000000, #9C27B0, #FF9800) 1'}}>
      <div className="max-w-4xl mx-auto text-center mb-6">
        <h1 className="font-serif text-4xl md:text-6xl font-black text-gold tracking-widest mb-2">N&E</h1>
        <p className="text-xs md:text-sm tracking-[0.3em] text-gray-400 uppercase mb-4">Professional Cosmetics</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative mb-6">
        <input 
          type="text" 
          placeholder="Busque por produto..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      {/* Brand Filter */}
      <div className="flex justify-start md:justify-center overflow-x-auto gap-2 pb-2 hide-scrollbar px-2 max-w-5xl mx-auto">
        {BRANDS.map((brand) => (
          <button
            key={brand}
            onClick={() => setActiveBrand(brand)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 border border-transparent ${
              activeBrand === brand 
                ? 'bg-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.5)] transform scale-105' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;