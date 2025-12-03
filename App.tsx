import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import FeaturedPopup from './components/FeaturedPopup';
import SalesNotification from './components/SalesNotification';
import { PRODUCTS, BENEFITS } from './constants';
import { BrandType, Product } from './types';
import { Search } from 'lucide-react';

const App: React.FC = () => {
  const [activeBrand, setActiveBrand] = useState<BrandType>('TODAS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFeaturedPopup, setShowFeaturedPopup] = useState(false);

  // Exibir popup após 5 segundos
  React.useEffect(() => {
    const timer = setTimeout(() => setShowFeaturedPopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesBrand = activeBrand === 'TODAS' || product.brand === activeBrand;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesBrand && matchesSearch;
    });
  }, [activeBrand, searchQuery]);

  const featuredProduct = PRODUCTS.find(p => p.id === 15);

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-primary">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        activeBrand={activeBrand}
        setActiveBrand={setActiveBrand}
      />

      {/* Espaçador para Header Fixo */}
      <div className="h-[230px] md:h-[240px]"></div>

      <main className="container mx-auto px-4 md:px-8 pb-20">
        
        {/* HERO BANNER - Visual Impactante */}
        {activeBrand === 'TODAS' && !searchQuery && (
            <div className="mb-10 animate-fade-in">
                <div className="relative w-full rounded-2xl overflow-hidden bg-primary text-white h-64 md:h-80 flex flex-col justify-center items-center text-center p-6 shadow-2xl">
                    <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
                    <div className="relative z-10 max-w-lg">
                        <span className="bg-white text-primary text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded mb-4 inline-block">Professional Care</span>
                        <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight font-medium">
                            Resultado de Salão <br/><span className="text-accent italic font-light">na sua casa</span>
                        </h2>
                        <button 
                            onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})}
                            className="bg-action text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-green-600 transition-colors shadow-lg"
                        >
                            Ver Ofertas
                        </button>
                    </div>
                </div>

                {/* BARRA DE BENEFÍCIOS (Trust Elements) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 py-6 border-b border-gray-200 bg-white rounded-xl px-4 shadow-sm">
                    {BENEFITS.map((b, i) => (
                        <div key={i} className="flex items-center justify-center gap-3 text-center md:text-left">
                            <span className="text-xl filter grayscale">{b.icon}</span>
                            <div>
                                <h4 className="font-bold text-[10px] uppercase tracking-wider text-primary">{b.title}</h4>
                                <p className="text-[9px] text-gray-500">{b.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* TÍTULO DA SEÇÃO */}
        <div className="flex flex-col items-center justify-center mb-8 mt-4">
            <h2 className="font-serif text-2xl md:text-3xl text-primary text-center mb-2 font-bold">
                {activeBrand === 'TODAS' ? 'Mais Vendidos' : activeBrand}
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full"></div>
        </div>

        {/* GRID DE PRODUTOS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onOpenPreview={setSelectedProduct} 
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="bg-white p-6 rounded-full mb-6 shadow-sm">
                <Search size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-500 text-sm font-light">Nenhum produto encontrado.</p>
            <button 
                onClick={() => { setActiveBrand('TODAS'); setSearchQuery(''); }}
                className="mt-4 text-xs font-bold underline text-primary uppercase tracking-wider"
            >
                Ver todos os produtos
            </button>
          </div>
        )}
      </main>

      {/* Componente de Notificações de Venda */}
      <SalesNotification />

      <Footer />

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {showFeaturedPopup && featuredProduct && <FeaturedPopup product={featuredProduct} onClose={() => setShowFeaturedPopup(false)} />}
    </div>
  );
};

export default App;