import React, { useEffect } from 'react';
import { Product, BrandType } from '../types';
import { X, ShoppingBag, Tag, Check, ShieldCheck } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
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

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  const handleBuyClick = () => {
    const message = `Olá! Vi o produto *${product.name}* no site e gostaria de comprar.`;
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop com blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Botão Fechar Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 md:hidden bg-white/80 p-2 rounded-full shadow-lg text-gray-800"
        >
          <X size={24} />
        </button>

        {/* Coluna da Imagem */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 relative">
           <span className={`absolute top-6 left-6 ${getBrandColor(product.brand)} text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md z-10`}>
              {product.brand}
            </span>
           <div className="absolute top-6 right-6 hidden md:block">
             <div className="bg-whatsapp text-white px-3 py-1 rounded-full font-bold text-sm shadow-md flex items-center gap-1">
               <Tag size={14} /> -{discount}% OFF
             </div>
           </div>
           
           <img 
            src={product.image} 
            alt={product.name} 
            className="max-h-[300px] md:max-h-[400px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Coluna de Detalhes */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col bg-white">
          <div className="flex justify-between items-start mb-2">
            <h2 className="font-serif text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h2>
            <button 
              onClick={onClose}
              className="hidden md:block text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-gold">★★★★★</div>
            <span className="text-gray-400 text-sm">(Produto Original)</span>
          </div>

          <div className="mb-6">
            <span className="text-gray-400 text-sm line-through block mb-1">
              De R$ {product.oldPrice.toFixed(2).replace('.', ',')}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black text-gray-900">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                À vista
              </span>
            </div>
          </div>

          <div className="prose prose-sm text-gray-600 mb-6 flex-grow">
            <p className="text-base leading-relaxed">
              {product.longDescription || product.description}
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Check className="text-whatsapp" size={18} />
              <span>Em estoque - Envio imediato</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <ShieldCheck className="text-gold" size={18} />
              <span>Garantia de originalidade N&E</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {product.tags.map((tag, idx) => (
              <span key={idx} className="text-xs font-bold uppercase tracking-wider text-gray-600 bg-gray-100 border border-gray-200 px-3 py-1 rounded-lg">
                {tag}
              </span>
            ))}
          </div>

          <button 
            onClick={handleBuyClick}
            className="w-full bg-whatsapp hover:bg-[#128C7E] text-white font-black text-lg py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-whatsapp/20 transform hover:-translate-y-1"
          >
            <ShoppingBag size={24} />
            COMPRAR PELO WHATSAPP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;