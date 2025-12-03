
import React, { useState } from 'react';
import { FAQS } from '../constants';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-12 bg-white rounded-xl my-8 shadow-sm border border-gray-100">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">Perguntas Frequentes</h2>
            <div className="w-12 h-1 bg-accent mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0 pb-4">
              <button 
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left py-2 group"
              >
                <span className="font-bold text-sm md:text-base text-gray-800 group-hover:text-accent transition-colors">
                    {faq.question}
                </span>
                {openIndex === index ? (
                    <Minus size={18} className="text-accent shrink-0" />
                ) : (
                    <Plus size={18} className="text-gray-400 group-hover:text-accent shrink-0 transition-colors" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed pr-8">
                    {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
