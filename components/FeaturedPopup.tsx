import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { X, ArrowRight } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';

interface FeaturedPopupProps {
  product: Product;
  onClose: () => void;
}

const FeaturedPopup: React.FC<FeaturedPopupProps> = ({ product, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleBuy = () => {
    const message = `🔥 Vi a OFERTA RELÂMPAGO do *${product.name}* e quero aproveitar agora!`;
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-sm overflow-hidden shadow-2xl rounded-2xl transform transition-all animate-in fade-in duration-500">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 p-1.5 rounded-full text-gray-500 hover:text-black transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="p-6 text-center">
          <span className="bg-alert/10 text-alert text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">
            ⚡ Oportunidade Única
          </span>
          
          <h3 className="font-serif text-2xl text-primary font-bold mb-2">Não perca isso!</h3>
          <p className="text-xs text-gray-500 mb-6">Esta oferta especial expira em breve.</p>
          
          <div className="bg-gray-50 p-6 mb-4 rounded-xl flex items-center justify-center border border-gray-100">
             <img src={product.image} alt={product.name} className="max-h-32 object-contain" />
          </div>

          <h4 className="font-bold text-sm text-primary mb-1 line-clamp-1">{product.name}</h4>
          
          <div className="flex items-end justify-center gap-2 mb-6">
             <span className="text-gray-400 line-through text-xs mb-1">R$ {product.oldPrice.toFixed(2)}</span>
             <span className="text-2xl font-bold text-action">R$ {product.price.toFixed(2)}</span>
          </div>

          <div className="text-center mb-6">
            <span className="text-sm font-mono font-bold text-alert animate-pulse">
                EXPIRA EM: {formatTime(timeLeft)}
            </span>
          </div>

          <button 
            onClick={handleBuy}
            className="w-full bg-action hover:bg-green-700 text-white text-sm font-bold uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
          >
            Aproveitar Agora <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPopup;