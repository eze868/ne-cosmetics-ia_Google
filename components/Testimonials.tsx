import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  // Dividir em duas linhas para o efeito marquee
  const row1 = TESTIMONIALS.slice(0, 6);
  const row2 = TESTIMONIALS.slice(6, 12);

  return (
    <section className="py-16 bg-[#F8F9FA] relative overflow-hidden border-t border-gray-100">
      <style>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-left {
          display: flex;
          animation: scrollLeft 40s linear infinite;
        }
        .marquee-right {
          display: flex;
          animation: scrollRight 40s linear infinite;
        }
        .marquee-container:hover .marquee-left,
        .marquee-container:hover .marquee-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-4 mb-10 relative z-10 text-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Social Proof</span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mt-2">O que dizem nossas clientes</h2>
        <div className="w-12 h-1 bg-accent mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="marquee-container space-y-6">
        {/* Linha 1 - Esquerda */}
        <div className="marquee-left w-max hover:cursor-grab active:cursor-grabbing">
          {[...row1, ...row1].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="w-[300px] md:w-[400px] mx-3 bg-white p-6 rounded-xl shadow-sm border border-gray-50 flex flex-col justify-between shrink-0">
               <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-0.5 text-accent">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < item.rating ? "currentColor" : "none"} className={i < item.rating ? "text-accent" : "text-gray-300"} />
                    ))}
                  </div>
                  <Quote className="text-gray-100 w-8 h-8" fill="currentColor" />
               </div>
               
               <p className="text-sm text-gray-600 mb-4 leading-relaxed font-medium">"{item.content}"</p>
               
               <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                   <div>
                       <h4 className="text-xs font-bold text-primary">{item.name}</h4>
                       <span className="text-[10px] text-gray-400 uppercase tracking-wide">{item.role}</span>
                   </div>
                   <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                       <span className="text-[10px] font-bold text-green-600">✓</span>
                   </div>
               </div>
            </div>
          ))}
        </div>

        {/* Linha 2 - Direita */}
        <div className="marquee-right w-max hover:cursor-grab active:cursor-grabbing">
          {[...row2, ...row2].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="w-[300px] md:w-[400px] mx-3 bg-white p-6 rounded-xl shadow-sm border border-gray-50 flex flex-col justify-between shrink-0">
               <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-0.5 text-accent">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < item.rating ? "currentColor" : "none"} className={i < item.rating ? "text-accent" : "text-gray-300"} />
                    ))}
                  </div>
                  <Quote className="text-gray-100 w-8 h-8" fill="currentColor" />
               </div>
               
               <p className="text-sm text-gray-600 mb-4 leading-relaxed font-medium">"{item.content}"</p>
               
               <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                   <div>
                       <h4 className="text-xs font-bold text-primary">{item.name}</h4>
                       <span className="text-[10px] text-gray-400 uppercase tracking-wide">{item.role}</span>
                   </div>
                   <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                       <span className="text-[10px] font-bold text-green-600">✓</span>
                   </div>
               </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradientes laterais para suavizar entrada/saída */}
      <div className="absolute top-0 left-0 w-8 md:w-32 h-full bg-gradient-to-r from-[#F8F9FA] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-8 md:w-32 h-full bg-gradient-to-l from-[#F8F9FA] to-transparent z-10 pointer-events-none"></div>
    </section>
  );
};

export default Testimonials;