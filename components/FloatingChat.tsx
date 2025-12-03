import React from 'react';
import { PHONE_NUMBER } from '../constants';

const FloatingChat: React.FC = () => {
  const handleClick = () => {
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Olá! Preciso de ajuda para escolher um produto.")}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[60] bg-whatsapp hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center justify-center group"
      aria-label="Atendimento via WhatsApp"
    >
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
      <svg 
        viewBox="0 0 24 24" 
        width="28" 
        height="28" 
        fill="currentColor"
        className="fill-white"
      >
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.575 1.973.891 3.287.891 3.181 0 5.767-2.587 5.767-5.766.001-3.185-2.58-5.774-5.76-5.774zm0 10.915c-1.194 0-2.083-.298-2.984-.827l-2.139.562.57-2.089c-.546-.913-.826-1.79-.83-2.984.001-2.84 2.312-5.151 5.152-5.152 2.841 0 5.151 2.311 5.151 5.151.002 2.841-2.31 5.152-5.15 5.152z" />
        <path d="M12.061 3.904c4.655 0 8.441 3.787 8.441 8.442 0 4.655-3.786 8.441-8.441 8.441-4.655 0-8.441-3.786-8.441-8.441 0-4.655 3.786-8.442 8.441-8.442zm0-2.268C6.166 1.636 1.352 6.451 1.352 12.346c0 5.896 4.814 10.71 10.709 10.71 5.895 0 10.709-4.814 10.709-10.71 0-5.895-4.814-10.71-10.709-10.71z" />
      </svg>
      <span className="absolute right-full mr-3 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Precisa de ajuda?
      </span>
    </button>
  );
};

export default FloatingChat;