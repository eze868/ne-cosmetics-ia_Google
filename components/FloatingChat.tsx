
import React, { useState } from 'react';
import { PHONE_NUMBER } from '../constants';
import { MessageCircle, Truck, HelpCircle, X, ChevronUp } from 'lucide-react';

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsApp = (type: 'sales' | 'track') => {
    let text = "";
    if (type === 'sales') text = "Olá! Preciso de ajuda para escolher um produto.";
    if (type === 'track') text = "Olá! Gostaria de rastrear meu pedido.";
    
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq-section');
    if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      
      {/* MENU EXPANSÍVEL */}
      <div className={`flex flex-col gap-2 transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none absolute bottom-0 right-0'
      }`}>
        
        {/* Opção Rastreio */}
        <button 
            onClick={() => handleWhatsApp('track')}
            className="flex items-center justify-end gap-3 group"
        >
            <span className="bg-white text-gray-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Rastrear Pedido
            </span>
            <div className="w-8 h-8 bg-white text-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 border border-gray-100">
                <Truck size={14} />
            </div>
        </button>

        {/* Opção FAQ */}
        <button 
            onClick={scrollToFAQ}
            className="flex items-center justify-end gap-3 group"
        >
            <span className="bg-white text-gray-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Dúvidas Frequentes
            </span>
            <div className="w-8 h-8 bg-white text-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 border border-gray-100">
                <HelpCircle size={14} />
            </div>
        </button>

         {/* Opção Vendas */}
         <button 
            onClick={() => handleWhatsApp('sales')}
            className="flex items-center justify-end gap-3 group"
        >
            <span className="bg-white text-gray-700 text-[10px] font-bold px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Falar com Especialista
            </span>
            <div className="w-8 h-8 bg-white text-green-600 rounded-full shadow-lg flex items-center justify-center hover:bg-green-50 border border-green-100">
                <MessageCircle size={14} />
            </div>
        </button>
      </div>

      {/* BOTÃO PRINCIPAL (TOGGLE) - Reduzido */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-3 rounded-full shadow-xl transition-all transform hover:scale-105 flex items-center justify-center group ${
            isOpen ? 'bg-gray-800 rotate-90' : 'bg-whatsapp hover:bg-green-600'
        }`}
        aria-label="Atendimento"
      >
        {isOpen ? (
            <X className="text-white" size={20} />
        ) : (
            <>
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 z-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
                </span>
                
                {/* ÍCONE WHATSAPP SVG - Reduzido */}
                <svg 
                    viewBox="0 0 24 24" 
                    width="24" 
                    height="24" 
                    fill="currentColor"
                    className="fill-white"
                >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.575 1.973.891 3.287.891 3.181 0 5.767-2.587 5.767-5.766.001-3.185-2.58-5.774-5.76-5.774zm0 10.915c-1.194 0-2.083-.298-2.984-.827l-2.139.562.57-2.089c-.546-.913-.826-1.79-.83-2.984.001-2.84 2.312-5.151 5.152-5.152 2.841 0 5.151 2.311 5.151 5.151.002 2.841-2.31 5.152-5.15 5.152z" />
                    <path d="M12.061 3.904c4.655 0 8.441 3.787 8.441 8.442 0 4.655-3.786 8.441-8.441 8.441-4.655 0-8.441-3.786-8.441-8.441 0-4.655 3.786-8.442 8.441-8.442zm0-2.268C6.166 1.636 1.352 6.451 1.352 12.346c0 5.896 4.814 10.71 10.709 10.71 5.895 0 10.709-4.814 10.709-10.71 0-5.895-4.814-10.71-10.709-10.71z" />
                </svg>
            </>
        )}
        
        {!isOpen && (
            <span className="absolute right-full mr-3 bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap animate-in slide-in-from-right-2">
                Ajuda?
            </span>
        )}
      </button>
    </div>
  );
};

export default FloatingChat;
