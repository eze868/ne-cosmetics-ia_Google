import React from 'react';
import { Product, BrandType } from '../types';
import { PHONE_NUMBER } from '../constants';
import { Tag, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenPreview: (product: Product) => void;
}

const getBrandColor = (brand: BrandType): string => {
  switch (brand) {
    case 'TRUSS': return 'bg-truss';
    case 'WELLA': return 'bg-wella';
    case 'BRAÉ': return 'bg-brae';
    case 'SEBASTIAN': return 'bg-sebastian';
    case 'CADIVEU': return 'bg-cadiveu';
    case 'MINIATURA': return 'bg-mini';
    default: return 'bg-gray-800';
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenPreview }) => {
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  
  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Olá! Quero comprar o *${product.name}* por R$ ${product.price.toFixed(2).replace('.', ',')}`;
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden border-2 border-transparent hover:border-gold transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col h-full transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onOpenPreview(product)}
    >
      {/* Image Container */}
      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-6 overflow-hidden">
        <span className={`absolute top-4 left-4 ${getBrandColor(product.brand)} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-10 shadow-md`}>
          {product.brand}
        </span>
        
        {/* Quick View Overlay (Visible on Hover) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Eye size={16} /> Espiar
            </div>
        </div>

        <img 
          src={product.image} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl relative z-0"
        />
        <div className="absolute bottom-3 right-3 bg-whatsapp text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1 z-10">
            <Tag size={12} /> -{discount}%
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-serif font-bold text-lg leading-tight mb-2 text-gray-900 line-clamp-2 group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Specs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[10px] font-bold uppercase tracking-wider text-wella bg-gold/10 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Price & Action */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex justify-between items-end mb-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 line-through">R$ {product.oldPrice.toFixed(2).replace('.', ',')}</span>
              <span className="text-2xl font-black text-gray-900">R$ {product.price.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
          
          <button 
            onClick={handleBuyClick}
            className="w-full bg-whatsapp hover:bg-[#128C7E] text-white font-bold py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-whatsapp/20 z-20 relative"
          >
            <ShoppingBag size={18} />
            COMPRAR AGORA
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;