
import React, { useEffect, useState, useRef } from 'react';
import { Product } from '../types';
import { X, ShieldCheck, Heart, ShoppingBag } from 'lucide-react';
import { PHONE_NUMBER, PRODUCTS } from '../constants';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onSwitchProduct: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSwitchProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    // Simular algoritmo de recomendação
    const related = PRODUCTS.filter(p => p.brand === product.brand && p.id !== product.id)
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 2);
    setRelatedProducts(related);

    // Bloquear scroll do body quando modal abre
    document.body.style.overflow = 'hidden';

    // Rolar para o topo ao trocar de produto
    if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
    }

    return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'auto';
    };
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full md:max-w-4xl h-[95vh] md:h-auto md:max-h-[90vh] flex flex-col shadow-2xl rounded-t-[2rem] md:rounded-[2rem] animate-in slide-in-from-bottom duration-300 md:zoom-in overflow-hidden">
        
        {/* Scrollable Content */}
        <div ref={scrollRef} className="overflow-y-auto flex-1 pb-24 md:pb-0 hide-scrollbar">
            <div className="flex flex-col md:flex-row">
                {/* Coluna Imagem */}
                <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 relative min-h-[300px]">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 md:hidden bg-white/80 backdrop-blur p-2 rounded-full text-black shadow-sm z-10"
                    >
                        <X size={20} />
                    </button>
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-h-[250px] md:max-h-[350px] object-contain drop-shadow-xl"
                    />
                </div>

                {/* Coluna Info */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col bg-white">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest inline-block mb-2">{product.brand}</span>
                            <h2 className="font-serif text-xl md:text-3xl text-primary leading-tight font-bold">
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

                    <div className="my-4 flex items-baseline gap-3">
                        <span className="text-3xl font-sans font-bold text-primary">R$ {product.price.toFixed(2)}</span>
                        <span className="text-sm text-gray-400 line-through">R$ {product.oldPrice.toFixed(2)}</span>
                        <span className="bg-alert text-white text-[10px] font-bold px-2 py-0.5 rounded">-{discount}%</span>
                    </div>

                    <div className="prose prose-sm text-gray-600 mb-6 leading-relaxed text-sm">
                        {product.longDescription || product.description}
                    </div>

                    {/* Desktop Actions (Hidden on Mobile) */}
                    <div className="hidden md:block mt-auto space-y-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <ShieldCheck size={14} className="text-action" /> Garantia de Originalidade
                        </div>
                    
                        <div className="flex gap-3">
                            <button 
                                onClick={handleBuyClick}
                                className="flex-1 bg-action hover:bg-green-700 text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
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

            {/* Cross Sell */}
            {relatedProducts.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                    <h3 className="text-xs font-bold uppercase text-gray-500 mb-3 tracking-widest">Complete o tratamento:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {relatedProducts.map(rp => (
                            <div 
                                key={rp.id} 
                                className="flex gap-3 bg-white p-3 rounded-lg border border-gray-100 items-center cursor-pointer hover:border-accent transition-all hover:shadow-md"
                                onClick={() => onSwitchProduct(rp)}
                            >
                                <img src={rp.image} alt={rp.name} className="w-12 h-12 object-contain" />
                                <div>
                                    <p className="text-xs font-bold text-primary line-clamp-1 group-hover:text-accent transition-colors">{rp.name}</p>
                                    <p className="text-xs text-action font-bold">R$ {rp.price.toFixed(2)}</p>
                                    <span className="text-[10px] text-primary underline mt-1 block">Ver Detalhes</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* MOBILE STICKY FOOTER (Fixo no rodapé) */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20 flex gap-3">
            <button 
                onClick={handleBuyClick}
                className="flex-1 bg-action text-white font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm animate-pulse-slow"
            >
                Comprar Agora
            </button>
             <button className="bg-gray-100 p-3.5 rounded-xl text-gray-600">
                <Heart size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
