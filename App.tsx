
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import FeaturedPopup from './components/FeaturedPopup';
import SalesNotification from './components/SalesNotification';
import FloatingChat from './components/FloatingChat';
import Breadcrumbs from './components/Breadcrumbs';
import ProductSkeleton from './components/ProductSkeleton';
import CategoryBar from './components/CategoryBar'; // Novo Componente
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import SEO from './components/SEO';
import { PRODUCTS, BENEFITS, CATEGORIES } from './constants';
import { BrandType, Product } from './types';
import { Search, Filter, ArrowDownWideNarrow } from 'lucide-react';

type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'best_seller';

const App: React.FC = () => {
  // Estados principais
  const [activeBrand, setActiveBrand] = useState<BrandType>('TODAS');
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // Novo Estado
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFeaturedPopup, setShowFeaturedPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filtros e Ordenação
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [visibleCount, setVisibleCount] = useState(8);

  // Simular loading inicial
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
    const timer = setTimeout(() => setShowFeaturedPopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchesBrand = activeBrand === 'TODAS' || product.brand === activeBrand;
      const matchesCategory = activeCategory === null || product.categoryId === activeCategory; // Nova Lógica
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesBrand && matchesCategory && matchesSearch && matchesPrice;
    });

    // Lógica de Ordenação
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'best_seller':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      default:
        // Relevance: Prioriza Best Sellers e Novos
        result.sort((a, b) => {
            const scoreA = (a.isBestSeller ? 2 : 0) + (a.isNew ? 1 : 0);
            const scoreB = (b.isBestSeller ? 2 : 0) + (b.isNew ? 1 : 0);
            return scoreB - scoreA;
        });
    }

    return result;
  }, [activeBrand, activeCategory, searchQuery, priceRange, sortBy]);

  const featuredProduct = PRODUCTS.find(p => p.id === 15);
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-primary">
      <SEO />
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        activeBrand={activeBrand}
        setActiveBrand={(brand) => { setActiveBrand(brand); setActiveCategory(null); }} // Resetar categoria ao mudar marca
        onProductSelect={setSelectedProduct}
      />

      <div className="h-[230px] md:h-[240px]"></div>

      <main className="container mx-auto px-4 md:px-8 pb-20">
        
        {/* Breadcrumbs de Navegação */}
        <Breadcrumbs activeBrand={activeBrand} setActiveBrand={setActiveBrand} />

        {/* HERO BANNER - Apenas na Home */}
        {activeBrand === 'TODAS' && activeCategory === null && !searchQuery && (
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

                {/* BARRA DE BENEFÍCIOS */}
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

        {/* NOVA BARRA DE CATEGORIAS VISUAL */}
        <CategoryBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        {/* TÍTULO & FILTROS */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 mt-4 gap-4">
            <div className="text-center md:text-left">
                <h2 className="font-serif text-2xl md:text-3xl text-primary font-bold">
                    {activeCategory 
                        ? CATEGORIES.find(c => c.id === activeCategory)?.title 
                        : (activeBrand === 'TODAS' ? 'Catálogo Completo' : activeBrand)
                    }
                </h2>
                <div className="w-12 h-1 bg-accent rounded-full mx-auto md:mx-0 mt-1"></div>
            </div>

            {/* Controles de Filtro e Ordenação */}
            <div className="flex gap-3 text-xs w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                    <Filter size={14} className="text-gray-400" />
                    <select 
                        value={priceRange[1]} 
                        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                        className="bg-transparent outline-none text-gray-600 font-medium cursor-pointer"
                    >
                        <option value="1000">Preço: Todos</option>
                        <option value="50">Até R$ 50</option>
                        <option value="100">Até R$ 100</option>
                        <option value="200">Até R$ 200</option>
                    </select>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                    <ArrowDownWideNarrow size={14} className="text-gray-400" />
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="bg-transparent outline-none text-gray-600 font-medium cursor-pointer"
                    >
                        <option value="relevance">Mais Relevantes</option>
                        <option value="best_seller">Mais Vendidos</option>
                        <option value="price_asc">Menor Preço</option>
                        <option value="price_desc">Maior Preço</option>
                    </select>
                </div>
            </div>
        </div>

        {/* GRID DE PRODUTOS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 min-h-[400px]">
          {isLoading ? (
            // Skeleton Loading State
            [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
          ) : visibleProducts.length > 0 ? (
            visibleProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onOpenPreview={setSelectedProduct} 
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-white p-6 rounded-full mb-6 shadow-sm">
                    <Search size={24} className="text-gray-300" />
                </div>
                <p className="text-gray-500 text-sm font-light">Nenhum produto encontrado com estes filtros.</p>
                <button 
                    onClick={() => { setActiveBrand('TODAS'); setActiveCategory(null); setSearchQuery(''); setPriceRange([0, 1000]); }}
                    className="mt-4 text-xs font-bold underline text-primary uppercase tracking-wider"
                >
                    Limpar Filtros
                </button>
            </div>
          )}
        </div>

        {/* Paginação / Carregar Mais */}
        {!isLoading && visibleProducts.length < filteredProducts.length && (
            <div className="text-center mt-12">
                <button 
                    onClick={() => setVisibleCount(prev => prev + 8)}
                    className="bg-white border border-gray-300 text-primary px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-50 hover:border-primary transition-all shadow-sm"
                >
                    Carregar Mais Produtos
                </button>
                <p className="text-[10px] text-gray-400 mt-3">
                    Mostrando {visibleProducts.length} de {filteredProducts.length} produtos
                </p>
            </div>
        )}
        
        {/* Nova Seção: FAQ */}
        <FAQ />
        
        {/* Nova Seção: Depoimentos */}
        <Testimonials />

      </main>

      <SalesNotification />
      <FloatingChat />
      <Footer />

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      {showFeaturedPopup && featuredProduct && <FeaturedPopup product={featuredProduct} onClose={() => setShowFeaturedPopup(false)} />}
    </div>
  );
};

export default App;
