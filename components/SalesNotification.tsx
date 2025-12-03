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
    // Primeira notificação aparece rápido (4 seg)
    const initialTimer = setTimeout(() => {
      triggerNotification();
    }, 4000);

    // Loop infinito com intervalos aleatórios entre 15 e 30 segundos
    const loop = () => {
      const randomInterval = Math.floor(Math.random() * (30000 - 15000 + 1) + 15000);
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

    // Esconder após 5 segundos
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  if (!data) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 z-50 max-w-[300px] bg-white rounded-lg shadow-2xl border-l-4 border-action p-3 flex items-center gap-3 transition-all duration-500 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative shrink-0">
        <img 
          src={data.product.image} 
          alt="Product" 
          className="w-12 h-12 object-contain rounded bg-gray-50 p-1 border border-gray-100"
        />
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
           <CheckCircle2 size={14} className="text-action fill-white" />
        </div>
      </div>
      
      <div className="flex flex-col">
        <p className="text-[10px] text-gray-500 flex items-center gap-1">
          <span className="font-bold text-gray-800">{data.name}</span> de {data.location}
        </p>
        <p className="text-[9px] text-gray-400 mb-0.5">comprou agora mesmo:</p>
        <p className="text-[10px] font-bold text-primary line-clamp-1 leading-tight">
          {data.product.name}
        </p>
      </div>
    </div>
  );
};

export default SalesNotification;