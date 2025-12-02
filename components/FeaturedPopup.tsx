import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { X, Flame, Clock, CheckCircle } from 'lucide-react';
import { PHONE_NUMBER } from '../constants';

interface FeaturedPopupProps {
  product: Product;
  onClose: () => void;
}

const FeaturedPopup: React.FC<FeaturedPopupProps> = ({ product, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  // Timer regressivo
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
    const message = `🔥 Olá! Quero aproveitar a *OFERTA RELÂMPAGO* do *${product.name}* por R$ ${product.price.toFixed(2).replace('.', ',')}!`;
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in fade-in duration-500 border-2 border-gold/50">
        
        {/* Header da Oferta */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-3 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/10 animate-pulse-slow"></div>
          <div className="flex items-center gap-2 z-10">
            <Flame className="text-yellow-300 fill-yellow-300 animate-bounce" size={20} />
            <span className="font-black italic tracking-wider">OFERTA RELÂMPAGO</span>
          </div>
          <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded text-xs font-mono font-bold z-10">
            <Clock size={12} />
            {formatTime(timeLeft)}
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white z-10 ml-2">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">O QUERIDINHO DOS SALÕES</h3>
            <h2 className="font-serif text-xl font-black text-gray-900 leading-tight">{product.name}</h2>
          </div>

          <div className="relative mb-6 group cursor-pointer" onClick={handleBuy}>
            <div className="absolute -top-2 -right-2 bg-gold text-black text-xs font-black px-3 py-1 rounded-full shadow-lg z-10 rotate-12">
              -{discount}% OFF
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 group-hover:border-gold transition-colors">
              <img src={product.image} alt={product.name} className="h-48 w-full object-contain mx-auto mix-blend-multiply" />
            </div>
          </div>

          <div className="flex items-end justify-center gap-3 mb-6">
            <div className="flex flex-col text-right">
                <span className="text-xs text-gray-400">De <span className="line-through">R$ {product.oldPrice.toFixed(2).replace('.', ',')}</span></span>
                <span className="text-xs text-red-500 font-bold">Economize R$ {(product.oldPrice - product.price).toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="text-4xl font-black text-gray-900 leading-none">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </div>
          </div>

          <div className="space-y-2 mb-6 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
             <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                <CheckCircle size={14} className="text-green-600" /> Mais vendido da semana
             </div>
             <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                <CheckCircle size={14} className="text-green-600" /> Estoque baixo: apenas 3 unidades
             </div>
          </div>

          <button 
            onClick={handleBuy}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black py-4 rounded-xl shadow-lg shadow-green-500/30 transform transition-transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 animate-pulse"
          >
            QUERO APROVEITAR AGORA
          </button>
          
          <p className="text-center text-[10px] text-gray-400 mt-3">
            *Oferta válida apenas enquanto durar o estoque promocional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPopup;