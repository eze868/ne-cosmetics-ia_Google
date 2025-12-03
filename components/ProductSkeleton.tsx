import React from 'react';

const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full animate-pulse">
      {/* Imagem Placeholder */}
      <div className="h-44 md:h-60 bg-gray-200"></div>

      {/* Info Placeholder */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
        
        <div className="flex gap-1 mb-4">
            {[1,2,3,4,5].map(i => <div key={i} className="h-3 w-3 bg-gray-200 rounded-full"></div>)}
        </div>

        <div className="mt-auto pt-2 border-t border-gray-50">
            <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
            <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
            <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;