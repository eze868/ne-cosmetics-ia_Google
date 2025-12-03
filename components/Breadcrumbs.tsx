import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { BrandType } from '../types';

interface BreadcrumbsProps {
  activeBrand: BrandType;
  setActiveBrand: (brand: BrandType) => void;
  productName?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeBrand, setActiveBrand, productName }) => {
  return (
    <nav className="flex items-center text-xs text-gray-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
      <button 
        onClick={() => setActiveBrand('TODAS')}
        className="hover:text-primary transition-colors flex items-center gap-1"
      >
        <Home size={12} /> Home
      </button>
      
      {activeBrand !== 'TODAS' && (
        <>
          <ChevronRight size={12} className="mx-2 shrink-0" />
          <span className="font-semibold text-primary">{activeBrand}</span>
        </>
      )}

      {productName && (
        <>
            <ChevronRight size={12} className="mx-2 shrink-0" />
            <span className="text-gray-400 truncate max-w-[150px]">{productName}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumbs;