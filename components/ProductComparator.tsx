
import React from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Star, ArrowLeftRight, Trash2, Check } from 'lucide-react';

interface ProductComparatorProps {
  products: Product[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

const ProductComparator: React.FC<ProductComparatorProps> = ({ products, onClose, onRemove, onAddToCart }) => {
  if (products.length === 0) return null;

  // Definição de Alturas Fixas para garantir alinhamento perfeito
  const ROW_HEIGHTS = {
    header: 'h-14',    // Cabeçalho da tabela (botão remover)
    image: 'h-40',     // Imagem + Nome
    price: 'h-16',
    rating: 'h-12',
    brand: 'h-12',
    category: 'h-12',
    benefits: 'h-24',
    action: 'h-20'
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 animate-in fade-in duration-300">
      {/* Backdrop Escuro */}
      <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Container do Modal */}
      <div className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
        
        {/* Header do Modal */}
        <div className="shrink-0 p-4 border-b border-gray-100 flex justify-between items-center bg-white z-20">
          <div className="flex items-center gap-3">
            <div className="bg-accent/10 text-accent p-2 rounded-lg hidden md:block">
                <ArrowLeftRight size={20} />
            </div>
            <div>
                <h2 className="font-serif text-lg md:text-xl font-bold text-primary leading-tight">Comparativo de Produtos</h2>
                <p className="text-xs text-gray-500">Você está comparando {products.length} itens lado a lado</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-primary hover:bg-gray-100 transition-colors p-2 rounded-full"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Área de Conteúdo Scrollável */}
        <div className="flex-1 overflow-auto bg-white overscroll-contain relative w-full scroll-smooth">
          
          <div className="min-w-max grid relative" style={{ gridTemplateColumns: `110px repeat(${products.length}, minmax(180px, 1fr))` }}>
            
            {/* --- COLUNA DE RÓTULOS (STICKY LEFT) --- */}
            {/* Fundo sólido (bg-gray-50) e z-index alto para cobrir o scroll */}
            <div className="sticky left-0 z-20 bg-gray-50 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] flex flex-col font-bold text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">
                <div className={`${ROW_HEIGHTS.header} border-b border-gray-200`}></div> {/* Espaço vazio para alinhar com botão remover */}
                <div className={`${ROW_HEIGHTS.image} p-2 flex items-center justify-center border-b border-gray-200 text-center`}>Produto</div>
                <div className={`${ROW_HEIGHTS.price} p-2 flex items-center border-b border-gray-200 px-4`}>Preço</div>
                <div className={`${ROW_HEIGHTS.rating} p-2 flex items-center border-b border-gray-200 px-4`}>Avaliação</div>
                <div className={`${ROW_HEIGHTS.brand} p-2 flex items-center border-b border-gray-200 px-4`}>Marca</div>
                <div className={`${ROW_HEIGHTS.category} p-2 flex items-center border-b border-gray-200 px-4`}>Categoria</div>
                <div className={`${ROW_HEIGHTS.benefits} p-2 flex items-center border-b border-gray-200 px-4`}>Benefícios</div>
                <div className={`${ROW_HEIGHTS.action} p-2 flex items-center justify-center`}></div>
            </div>

            {/* --- COLUNAS DOS PRODUTOS --- */}
            {products.map((product, index) => {
                 const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
                 
                 return (
                    <div key={product.id} className="flex flex-col border-r border-gray-100 bg-white hover:bg-gray-50/50 transition-colors group">
                        
                        {/* 1. Header (Remover) */}
                        <div className={`${ROW_HEIGHTS.header} flex items-center justify-end px-2 border-b border-gray-100`}>
                            <button 
                                onClick={() => onRemove(product.id)}
                                className="text-gray-300 hover:text-red-500 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={14} /> Remover
                            </button>
                        </div>

                        {/* 2. Imagem & Nome */}
                        <div className={`${ROW_HEIGHTS.image} p-3 flex flex-col items-center justify-center border-b border-gray-100`}>
                            <img src={product.image} alt={product.name} className="h-20 object-contain mb-2 mix-blend-multiply" />
                            <h3 className="text-xs font-bold text-center text-primary line-clamp-2 px-1 leading-tight" title={product.name}>
                                {product.name}
                            </h3>
                        </div>

                        {/* 3. Preço */}
                        <div className={`${ROW_HEIGHTS.price} p-2 flex flex-col justify-center items-center border-b border-gray-100 bg-gray-50/30`}>
                            <div className="flex flex-col items-center">
                                {product.oldPrice > product.price && (
                                    <span className="text-[10px] text-gray-400 line-through">R$ {product.oldPrice.toFixed(2)}</span>
                                )}
                                <span className="text-sm md:text-base font-bold text-action">R$ {product.price.toFixed(2)}</span>
                                {discount > 0 && <span className="text-[9px] text-alert font-bold">-{discount}% OFF</span>}
                            </div>
                        </div>

                        {/* 4. Avaliação */}
                        <div className={`${ROW_HEIGHTS.rating} p-2 flex justify-center items-center border-b border-gray-100 gap-1`}>
                            <span className="font-bold text-sm text-primary">{product.rating}</span>
                            <Star size={12} className="text-accent fill-current" />
                            <span className="text-[10px] text-gray-400">({product.reviews})</span>
                        </div>

                        {/* 5. Marca */}
                        <div className={`${ROW_HEIGHTS.brand} p-2 flex justify-center items-center border-b border-gray-100`}>
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">{product.brand}</span>
                        </div>

                        {/* 6. Categoria */}
                        <div className={`${ROW_HEIGHTS.category} p-2 flex justify-center items-center border-b border-gray-100 text-xs text-gray-500`}>
                            {product.categoryId === 'color' && 'Coloração'}
                            {product.categoryId === 'finish' && 'Finalização'}
                            {product.categoryId === 'treatment' && 'Tratamento'}
                            {product.categoryId === 'premium' && 'Linha Premium'}
                        </div>

                        {/* 7. Benefícios (Tags) */}
                        <div className={`${ROW_HEIGHTS.benefits} p-2 flex flex-col justify-center items-center border-b border-gray-100 px-4`}>
                            <div className="flex flex-wrap justify-center gap-1.5">
                                {product.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[9px] bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded-md whitespace-nowrap flex items-center gap-1">
                                        <Check size={8} className="text-green-500" /> {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 8. Ação */}
                        <div className={`${ROW_HEIGHTS.action} p-3 flex justify-center items-center`}>
                            <button 
                                onClick={() => onAddToCart(product)}
                                className="w-full bg-action hover:bg-green-700 text-white text-xs font-bold uppercase py-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                            >
                                <ShoppingBag size={14} /> Adicionar
                            </button>
                        </div>
                    </div>
                 );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparator;
