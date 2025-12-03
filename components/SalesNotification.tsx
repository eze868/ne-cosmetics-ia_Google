
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import { CheckCircle2 } from 'lucide-react';

const NAMES = [
  "Ana Paula", "Mariana", "Fernanda", "Julia", "Beatriz", "Patricia", 
  "Camila", "Larissa", "Bruna", "Gabriela", "Amanda", "Leticia",
  "Roberto", "Carla", "Renata", "Juliana", "Vanessa", "Aline"
];

const LOCATIONS = [
  "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", 
  "Curitiba, PR", "Salvador, BA", "Brasília, DF", "Porto Alegre, RS",
  "Recife, PE", "Fortaleza, CE", "Goiânia, GO", "Campinas, SP"
];

const SalesNotification: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<{name: string, location: string, product: Product} | null>(null);

  useEffect(() => {
    // Primeira notificação demora mais (10 seg)
    const initialTimer = setTimeout(() => {
      triggerNotification();
    }, 10000);

    // Loop infinito com intervalos longos (entre 45s e 90s)
    const loop = () => {
      const randomInterval = Math.floor(Math.random() * (90000 - 45000 + 1) + 45000);
      setTimeout(() => {
        triggerNotification();
        loop();
      }, randomInterval);
    };

    loop();

    return () => clearTimeout(initialTimer);
  }, []);

  const triggerNotification = () => {
    const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
    const randomLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

    setData({
      name: randomName,
      location: randomLocation,
      product: randomProduct
    });
    setVisible(true);

    // Esconder após 4 segundos (rápido)
    setTimeout(() => {
      setVisible(false);
    }, 4000);
  };

  if (!data) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 z-40 max-w-[240px] bg-white rounded-lg shadow-xl border-l-2 border-action p-2.5 flex items-center gap-2.5 transition-all duration-700 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative shrink-0">
        <img 
          src={data.product.image} 
          alt="Product" 
          className="w-9 h-9 object-contain rounded bg-gray-50 p-0.5 border border-gray-100"
        />
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
           <CheckCircle2 size={10} className="text-action fill-white" />
        </div>
      </div>
      
      <div className="flex flex-col min-w-0">
        <p className="text-[9px] text-gray-500 flex items-center gap-1 truncate">
          <span className="font-bold text-gray-800">{data.name}</span> de {data.location.split(',')[0]}
        </p>
        <p className="text-[8px] text-gray-400 mb-0.5">comprou agora:</p>
        <p className="text-[9px] font-bold text-primary truncate leading-tight">
          {data.product.name}
        </p>
      </div>
    </div>
  );
};

export default SalesNotification;
