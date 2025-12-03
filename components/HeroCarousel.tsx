
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    // Imagem elegante de cabelo/salão (Unsplash)
    image: "https://images.unsplash.com/photo-1605280263929-1c42c62ef169?q=80&w=2070&auto=format&fit=crop",
    subtitle: "LANÇAMENTO EXCLUSIVO",
    title: "Nova Linha Wella Ultimate",
    description: "Reparação total em 90 segundos. O milagre que seu cabelo precisa.",
    buttonText: "CONHECER AGORA",
    position: "left"
  },
  {
    id: 2,
    // Imagem de produtos/textura
    image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=2069&auto=format&fit=crop",
    subtitle: "OFERTA POR TEMPO LIMITADO",
    title: "Kits de Tratamento",
    description: "Leve o salão para sua casa com até 60% de desconto.",
    buttonText: "VER OFERTAS",
    position: "center"
  },
  {
    id: 3,
    // Imagem clean
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop",
    subtitle: "FRETE GRÁTIS BRASIL",
    title: "Em compras acima de R$ 199",
    description: "Receba seus produtos favoritos com segurança e rapidez.",
    buttonText: "APROVEITAR",
    position: "right"
  }
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-2xl shadow-lg group">
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Imagem de Fundo com Overlay */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover transition-transform duration-[10s] ease-linear transform scale-100 group-hover:scale-110"
          />

          {/* Conteúdo */}
          <div className={`absolute inset-0 z-20 container mx-auto px-8 flex flex-col justify-center h-full text-white ${
            slide.position === 'center' ? 'items-center text-center' : 
            slide.position === 'right' ? 'items-end text-right' : 'items-start text-left'
          }`}>
             <div className="animate-slide-up max-w-lg">
                <span className="inline-block px-3 py-1 mb-4 border border-white/50 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
                    {slide.subtitle}
                </span>
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                </h2>
                <p className="text-sm md:text-base text-gray-100 mb-8 font-light leading-relaxed max-w-md">
                    {slide.description}
                </p>
                <button className="bg-white text-primary hover:bg-accent hover:text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all transform hover:scale-105 shadow-xl flex items-center gap-2 mx-auto md:mx-0">
                    {slide.buttonText} <ArrowRight size={16} />
                </button>
             </div>
          </div>
        </div>
      ))}

      {/* Controles */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 backdrop-blur-md p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 backdrop-blur-md p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {SLIDES.map((_, idx) => (
            <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
            />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
