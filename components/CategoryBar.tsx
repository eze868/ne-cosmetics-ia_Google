
import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoryBarProps {
  activeCategory: string | null;
  setActiveCategory: (id: string | null) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="mb-6 mt-4">
      <div className="container mx-auto">
        {/* Adicionado padding extra (py-4 e px-4) para evitar corte na animação de scale */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 py-4 md:justify-center items-center">
            
            {/* Botão "Todos" */}
            <button
                onClick={() => setActiveCategory(null)}
                className={`flex flex-col items-center min-w-[70px] gap-2 transition-all duration-300 group ${
                    activeCategory === null ? 'scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
            >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm transition-all ${
                    activeCategory === null 
                    ? 'bg-primary text-white ring-2 ring-offset-2 ring-primary shadow-lg' 
                    : 'bg-white text-gray-400 group-hover:bg-gray-50 group-hover:shadow-md'
                }`}>
                    ∞
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    activeCategory === null ? 'text-primary' : 'text-gray-500'
                }`}>
                    Todos
                </span>
            </button>

            {CATEGORIES.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                    className={`flex flex-col items-center min-w-[70px] gap-2 transition-all duration-300 group ${
                        activeCategory === cat.id ? 'scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm transition-all ${
                        activeCategory === cat.id 
                        ? 'bg-primary text-white ring-2 ring-offset-2 ring-primary shadow-lg' 
                        : 'bg-white group-hover:bg-gray-50 group-hover:shadow-md'
                    }`}>
                        {cat.icon}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        activeCategory === cat.id ? 'text-primary' : 'text-gray-500'
                    }`}>
                        {cat.title.split(' ')[0]}
                    </span>
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
