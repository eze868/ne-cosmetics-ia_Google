
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
import CategoryBar from './components/CategoryBar';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import HeroCarousel from './components/HeroCarousel';
import HairQuiz from './components/HairQuiz';
import CartSidebar from './components/CartSidebar';
import SEO from './components/SEO';
import ProductComparator from './components/ProductComparator';
import { PRODUCTS, BENEFITS, CATEGORIES } from './constants';
import { BrandType, Product, CartItem } from './types';
import { Search, Filter, ArrowDownWideNarrow, Sparkles, ArrowLeftRight, X } from 'lucide-react';

type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'best_seller';

const App: React.FC = () => {
  // Estados principais
  const [activeBrand, setActiveBrand] = useState<BrandType>('TODAS');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFeaturedPopup, setShowFeaturedPopup] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Estados do Carrinho
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Estados do Comparador
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showComparator, setShowComparator] = useState(false);

  // Filtros e Ordenação
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [visibleCount, setVisibleCount] = useState(8);

  // Carregar carrinho do LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('ne_cart');
    if (savedCart) {
        setCartItems(JSON.parse(savedCart));
    }
    
    setTimeout(() => setIsLoading(false), 1500);
    const timer = setTimeout(() => setShowFeaturedPopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Salvar carrinho no LocalStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('ne_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Lógica do Carrinho
  const addToCart = (product: Product) => {
    setCartItems(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
            return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
        if (item.id === id) {
            return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Lógica do Comparador
  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
        const exists = prev.find(p => p.id === product.id);
        if (exists) {
            return prev.filter(p => p.id !== product.id);
        }
        if (prev.length >= 3) {
            alert("Você só pode comparar até 3 produtos.");
            return prev;
        }
        return [...prev, product];
    });
  };

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(product => {
      const matchesBrand = activeBrand === 'TODAS' || product.brand === activeBrand;
      const matchesCategory = activeCategory === null || product.categoryId === activeCategory;
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
        setActiveBrand={(brand) => { setActiveBrand(brand); setActiveCategory(null); }}
        onProductSelect={setSelectedProduct}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <div className="h-[230px] md:h-[240px]"></div>

      <main className="container mx-auto px-4 md:px-8 pb-20">
        
        <Breadcrumbs activeBrand={activeBrand} setActiveBrand={setActiveBrand} />

        {/* HERO CAROUSEL - Apenas na Home */}
        {activeBrand === 'TODAS' && activeCategory === null && !searchQuery && (
            <div className="mb-10 animate-fade-in">
                <HeroCarousel />

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
                
                {/* CHAMADA DO QUIZ */}
                <div className="mt-8 bg-gradient-to-r from-primary to-gray-800 rounded-xl p-6 text-white flex items-center justify-between shadow-lg relative overflow-hidden cursor-pointer" onClick={() => setShowQuiz(true)}>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <span className="bg-accent text-primary text-[9px] font-black px-2 py-0.5 rounded uppercase mb-2 inline-block">Consultoria Grátis</span>
                        <h3 className="font-serif text-xl font-bold mb-1">Não sabe qual escolher?</h3>
                        <p className="text-xs text-gray-300">Responda 3 perguntas e descubra o ideal.</p>
                    </div>
                    <button className="bg-white text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative z-10">
                        <Sparkles size={18} className="text-accent" />
                    </button>
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 min-h-[400px]">
          {isLoading ? (
            [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
          ) : visibleProducts.length > 0 ? (
            visibleProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onOpenPreview={setSelectedProduct}
                onAddToCart={addToCart}
                isCompareSelected={compareList.some(p => p.id === product.id)}
                onToggleCompare={toggleCompare}
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

        {/* Paginação */}
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
        
        <FAQ />
        <Testimonials />
      </main>

      <SalesNotification />
      <FloatingChat />
      <Footer />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      {/* BARRA FLUTUANTE DE COMPARAÇÃO */}
      {compareList.length > 0 && !showComparator && (
        <div className="fixed bottom-24 left-4 right-4 md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2 z-[90] bg-primary text-white px-5 py-3 rounded-full shadow-2xl flex items-center justify-between md:justify-center gap-4 animate-slide-up border border-gray-800">
            <span className="text-xs font-bold whitespace-nowrap">{compareList.length} item(s)</span>
            <div className="flex gap-2">
                <button 
                    onClick={() => setShowComparator(true)}
                    className="bg-accent text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase hover:bg-white transition-colors flex items-center gap-1 shadow-sm"
                >
                    Comparar <ArrowLeftRight size={14} />
                </button>
                <button 
                    onClick={() => setCompareList([])}
                    className="bg-gray-700 p-1.5 rounded-full hover:bg-red-500 transition-colors"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
      )}

      {/* COMPARADOR MODAL */}
      {showComparator && (
        <ProductComparator 
            products={compareList} 
            onClose={() => setShowComparator(false)} 
            onRemove={(id) => toggleCompare(compareList.find(p => p.id === id)!)}
            onAddToCart={addToCart}
        />
      )}

      {selectedProduct && (
        <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onSwitchProduct={setSelectedProduct}
            onAddToCart={addToCart}
        />
      )}
      {showFeaturedPopup && featuredProduct && <FeaturedPopup product={featuredProduct} onClose={() => setShowFeaturedPopup(false)} />}
      
      {/* Quiz Modal */}
      {showQuiz && <HairQuiz onClose={() => setShowQuiz(false)} onProductFound={(p) => { setShowQuiz(false); setSelectedProduct(p); }} />}
    </div>
  );
};

export default App;
