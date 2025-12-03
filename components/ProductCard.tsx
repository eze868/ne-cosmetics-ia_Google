import React from 'react';
import { Product } from '../types';
import { PHONE_NUMBER } from '../constants';

interface ProductCardProps {
  product: Product;
  onOpenPreview: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenPreview }) => {
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  
  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Olá! Quero garantir o *${product.name}* com desconto de ${discount}% por R$ ${product.price.toFixed(2)}`;
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
        className="bg-white rounded-xl shadow-sm hover:shadow-persuasive transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer relative border border-transparent hover:border-gray-100"
        onClick={() => onOpenPreview(product)}
    >
      {/* Imagem */}
      <div className="relative h-44 md:h-60 bg-white p-4 flex items-center justify-center overflow-hidden">
        {/* Badge Desconto Persuasivo */}
        {discount > 0 && (
            <div className="absolute top-0 left-0 bg-alert text-white text-[10px] font-black px-3 py-1.5 z-10 rounded-br-lg shadow-sm">
                -{discount}% OFF
            </div>
        )}

        {/* Botão Espiar Mobile (Sempre visível) */}
        <button className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-gray-400 hover:text-action shadow-sm z-10 md:hidden">
            <span className="sr-only">Ver detalhes</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>

        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay "Ver Detalhes" no Desktop */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hidden md:flex">
            <span className="bg-white text-primary text-xs font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                Espiar
            </span>
        </div>
      </div>

      {/* Informações */}
      <div className="p-4 flex flex-col flex-grow bg-white text-left relative">
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{product.brand}</span>
        
        {/* Título */}
        <h3 className="font-sans text-xs md:text-sm font-semibold text-primary line-clamp-2 mb-2 min-h-[2.5em] leading-relaxed">
          {product.name}
        </h3>

        {/* Avaliação (Prova Social Visual) */}
        <div className="flex items-center gap-0.5 mb-2">
            {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-3 h-3 text-accent fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            ))}
            <span className="text-[9px] text-gray-400 ml-1">(4.9)</span>
        </div>

        {/* Estoque Crítico - Alerta Vermelho */}
        {product.criticalStock ? (
            <div className="text-[9px] text-alert font-bold mb-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-alert rounded-full animate-pulse"></span>
                RESTAM POUCOS
            </div>
        ) : (
            <div className="mb-2 h-4"></div>
        )}

        <div className="mt-auto pt-2 border-t border-gray-50">
            <div className="flex flex-col mb-3">
                <span className="text-[10px] text-gray-400 line-through">De R$ {product.oldPrice.toFixed(2)}</span>
                <span className="text-lg md:text-xl font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                </span>
            </div>

            <button 
                onClick={handleBuyClick}
                className="w-full bg-action hover:bg-green-700 text-white text-[11px] font-bold uppercase tracking-wider py-3 rounded-lg shadow-glow transition-all active:scale-95 flex items-center justify-center gap-2"
            >
                Comprar
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;