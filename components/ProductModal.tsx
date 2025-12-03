import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { X, ShieldCheck, Heart } from 'lucide-react';
import { PHONE_NUMBER, PRODUCTS } from '../constants';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    // Simular algoritmo de recomendação (mesma marca, aleatório)
    const related = PRODUCTS.filter(p => p.brand === product.brand && p.id !== product.id)
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 2);
    setRelatedProducts(related);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, product]);

  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  const handleBuyClick = () => {
    const message = `Olá! Vi o *${product.name}* no site e quero comprar.`;
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full md:max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl rounded-t-[2rem] md:rounded-[2rem] animate-in zoom-in duration-300">
        
        <div className="flex flex-col md:flex-row">
            {/* Coluna Imagem */}
            <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 md:hidden bg-white p-2 rounded-full text-black shadow-sm"
                >
                    <X size={24} />
                </button>
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-[300px] object-contain drop-shadow-xl"
                />
            </div>

            {/* Coluna Info */}
            <div className="w-full md:w-1/2 p-8 flex flex-col bg-white">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest inline-block mb-2">{product.brand}</span>
                        <h2 className="font-serif text-2xl md:text-3xl text-primary leading-tight font-bold">
                        {product.name}
                        </h2>
                    </div>
                    <button 
                    onClick={onClose}
                    className="hidden md:block text-gray-400 hover:text-black transition-colors"
                    >
                    <X size={24} />
                    </button>
                </div>

                <div className="my-6 flex items-baseline gap-4">
                    <span className="text-4xl font-sans font-bold text-primary">R$ {product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-400 line-through">R$ {product.oldPrice.toFixed(2)}</span>
                    <span className="bg-alert text-white text-xs font-bold px-2 py-1 rounded">-{discount}% OFF</span>
                </div>

                <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
                    {product.longDescription || product.description}
                </div>

                <div className="mt-auto space-y-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ShieldCheck size={14} className="text-action" /> Garantia de Originalidade
                    </div>
                
                    <div className="flex gap-3">
                        <button 
                            onClick={handleBuyClick}
                            className="flex-1 bg-action hover:bg-green-700 text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                        >
                            Finalizar Compra
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl text-gray-600 transition-colors">
                            <Heart size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Seção Recomendação Personalizada */}
        {relatedProducts.length > 0 && (
            <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Quem viu este produto, também comprou:</h3>
                <div className="grid grid-cols-2 gap-4">
                    {relatedProducts.map(rp => (
                        <div key={rp.id} className="flex gap-3 bg-white p-3 rounded-lg border border-gray-100 items-center">
                            <img src={rp.image} alt={rp.name} className="w-12 h-12 object-contain" />
                            <div>
                                <p className="text-xs font-bold text-primary line-clamp-1">{rp.name}</p>
                                <p className="text-xs text-action font-bold">R$ {rp.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;