import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import FeaturedPopup from './components/FeaturedPopup';
import { PRODUCTS, CATEGORIES, BENEFITS, PHONE_NUMBER } from './constants';
import { BrandType, Product } from './types';
import { MessageCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

const App: React.FC = () => {
  const [activeBrand, setActiveBrand] = useState<BrandType>('TODAS');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [offerTime, setOfferTime] = useState(3600); // 1 hour in seconds
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFeaturedPopup, setShowFeaturedPopup] = useState(false);

  // Timer logic for the scarcity effect
  useEffect(() => {
    const timer = setInterval(() => {
      setOfferTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Show Featured Popup after 4 seconds
  useEffect(() => {
    const popupTimer = setTimeout(() => {
      // Check if user hasn't seen it in this session (optional logic, kept simple here)
      setShowFeaturedPopup(true);
    }, 4000);
    return () => clearTimeout(popupTimer);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProduct || showFeaturedPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProduct, showFeaturedPopup]);

  const formattedTime = useMemo(() => {
    const hours = Math.floor(offerTime / 3600);
    const minutes = Math.floor((offerTime % 3600) / 60);
    const seconds = offerTime % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [offerTime]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesBrand = activeBrand === 'TODAS' || product.brand === activeBrand;
      const matchesCategory = activeCategory === null || product.categoryId === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesBrand && matchesCategory && matchesSearch;
    });
  }, [activeBrand, activeCategory, searchQuery]);

  // ID 15 is the Wella Fusion Kit (Greatest discount/value)
  const featuredProduct = PRODUCTS.find(p => p.id === 15);

  const toggleCategory = (categoryId: string) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header 
        activeBrand={activeBrand} 
        setActiveBrand={(brand) => { setActiveBrand(brand); setActiveCategory(null); }} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-grow container mx-auto px-4 max-w-5xl py-8">
        
        {/* Offer Banner */}
        <div className="bg-gradient-to-r from-gold to-yellow-300 rounded-2xl p-4 md:p-6 mb-10 shadow-xl shadow-gold/20 flex flex-col md:flex-row items-center justify-between text-black animate-pulse-slow relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
          <div className="z-10 text-center md:text-left">
            <h2 className="font-black text-xl md:text-2xl italic tracking-tighter">OFERTAS EXCLUSIVAS</h2>
            <p className="text-sm md:text-base font-medium opacity-80">Descontos de até 60% em produtos selecionados</p>
          </div>
          <div className="mt-4 md:mt-0 bg-black/10 px-4 py-2 rounded-lg font-mono font-bold flex items-center gap-2">
            <Clock size={18} />
            <span>EXPIRA EM: {formattedTime}</span>
          </div>
        </div>

        {/* Categories Navigation - Always Visible & Interactive */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900 text-center md:text-left">Navegue por Categoria</h2>
            {activeCategory && (
              <button 
                onClick={() => setActiveCategory(null)}
                className="text-xs text-red-500 font-bold flex items-center gap-1 hover:underline"
              >
                <XCircle size={14} /> Limpar filtro
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button 
                  key={cat.id} 
                  onClick={() => toggleCategory(cat.id)}
                  className={`relative p-4 rounded-xl transition-all duration-300 text-center cursor-pointer border group overflow-hidden ${
                    isActive 
                      ? 'bg-gray-900 border-gold shadow-lg transform -translate-y-1' 
                      : 'bg-white border-gray-100 hover:border-gold/50 hover:shadow-md'
                  }`}
                >
                  <span className={`text-3xl mb-2 block transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {cat.icon}
                  </span>
                  <h3 className={`font-bold text-sm mb-1 ${isActive ? 'text-gold' : 'text-gray-800'}`}>
                    {cat.title}
                  </h3>
                  <p className={`text-[10px] ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>
                    {cat.subtitle}
                  </p>
                  
                  {/* Indicator Line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gold"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-12" id="products">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
                {activeBrand === 'TODAS' ? 'Catálogo' : activeBrand} 
                {activeCategory && <span className="text-gold"> • {CATEGORIES.find(c => c.id === activeCategory)?.title}</span>}
              </h2>
            </div>
            <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full whitespace-nowrap">
              {filteredProducts.length} itens
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onOpenPreview={setSelectedProduct} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg mb-2">Nenhum produto encontrado para esta combinação.</p>
              <p className="text-sm text-gray-400">Tente selecionar outra categoria ou marca.</p>
              <button 
                onClick={() => {setActiveBrand('TODAS'); setActiveCategory(null); setSearchQuery('')}}
                className="mt-6 bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-black transition-colors"
              >
                Ver todos os produtos
              </button>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="bg-[#1a1a1a] rounded-3xl p-8 md:p-12 text-white text-center mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gold mb-10 relative z-10">Por que escolher a N&E?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {BENEFITS.map((benefit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-4xl mb-4 bg-white/5 w-16 h-16 rounded-full flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-xs text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center py-12 px-4">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">Precisa de ajuda especializada?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">Nossos especialistas estão prontos para montar um cronograma capilar personalizado para você.</p>
          <a 
            href={`https://wa.me/${PHONE_NUMBER}?text=Olá! Preciso de ajuda para escolher meus produtos.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-whatsapp hover:bg-[#128C7E] text-white font-black py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <MessageCircle size={24} />
            FALAR COM ESPECIALISTA
          </a>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
             <CheckCircle size={12} className="text-green-500" /> Resposta em até 5 min
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Render Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Render Featured Popup */}
      {showFeaturedPopup && featuredProduct && (
        <FeaturedPopup 
          product={featuredProduct} 
          onClose={() => setShowFeaturedPopup(false)} 
        />
      )}
    </div>
  );
};

export default App;