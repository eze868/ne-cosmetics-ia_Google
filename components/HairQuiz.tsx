
import React, { useState } from 'react';
import { X, Sparkles, ChevronRight, RefreshCcw, Check, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface HairQuizProps {
  onClose: () => void;
  onProductFound: (product: Product) => void;
}

// Definição das Etapas
const QUESTIONS = [
  {
    id: 'texture',
    title: 'Qual a textura natural dos seus fios?',
    options: [
      { label: 'Liso Fino', icon: 'line' },
      { label: 'Liso Espesso', icon: 'align-justify' },
      { label: 'Ondulado', icon: 'waves' },
      { label: 'Cacheado / Crespo', icon: 'curly-loop' }
    ]
  },
  {
    id: 'history',
    title: 'Qual o histórico químico recente?',
    options: [
      { label: 'Natural / Virgem', icon: 'leaf' },
      { label: 'Loiro / Descolorido', icon: 'sun' },
      { label: 'Alisado / Progressiva', icon: 'thermometer' },
      { label: 'Coloração (Escura/Ruiva)', icon: 'palette' }
    ]
  },
  {
    id: 'concern',
    title: 'Qual seu maior pesadelo hoje?',
    options: [
      { label: 'Quebra e Pontas Duplas', icon: 'scissors' },
      { label: 'Frizz e Volume Armado', icon: 'cloud-lightning' },
      { label: 'Ressecamento / Sem Brilho', icon: 'droplet-off' },
      { label: 'Amarelado / Cor Desbotada', icon: 'eye-off' }
    ]
  }
];

const HairQuiz: React.FC<HairQuizProps> = ({ onClose, onProductFound }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(-1); // -1 = Intro
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Product | null>(null);
  const [explanation, setExplanation] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStart = () => setCurrentStepIndex(0);

  const handleAnswer = (answer: string) => {
    const currentQuestionId = QUESTIONS[currentStepIndex].id;
    const newAnswers = { ...answers, [currentQuestionId]: answer };
    setAnswers(newAnswers);

    if (currentStepIndex < QUESTIONS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    setIsAnalyzing(true);
    setCurrentStepIndex(99); // Estado de Loading/Resultado

    setTimeout(() => {
      let recommendedId = 15; // Fallback: Kit Fusion
      let reason = "Este é o tratamento mais completo para revigorar a saúde geral dos seus fios.";

      const { texture, history, concern } = finalAnswers;

      // LÓGICA DE DECISÃO (Árvore de Decisão Simplificada)

      // 1. CASOS CRÍTICOS DE COR/QUÍMICA
      if (history.includes('Loiro')) {
        if (concern.includes('Amarelado')) {
            recommendedId = 12; // Wella Cool Blonde
            reason = "Para loiras, neutralizar o amarelado é essencial. Este shampoo matizador devolve o tom platinado enquanto trata.";
        } else if (concern.includes('Quebra')) {
            recommendedId = 5; // Truss Uso Obrigatório (O rei da reconstrução)
            reason = "Cabelos descoloridos sofrem perda de massa. O Uso Obrigatório é a reconstrução potente que você precisa para parar a quebra.";
        } else {
            recommendedId = 35; // Wella Blondorplex Mini (ou grande se tiver)
            reason = "A tecnologia Plex é fundamental para manter a estrutura do fio descolorido intacta.";
        }
      } 
      
      // 2. CASOS DE TEXTURA ESPECÍFICA
      else if (texture.includes('Cacheado') || texture.includes('Crespo')) {
        if (concern.includes('Frizz') || concern.includes('Volume')) {
             recommendedId = 23; // Braé Go Curly
             reason = "Seus cachos precisam de definição e memória. A linha Go Curly hidrata a curvatura sem pesar.";
        } else {
             recommendedId = 8; // Wella Nutri Enrich 1L (Cachos precisam de muita nutrição)
             reason = "Cabelos com curvatura tendem a ser mais secos nas pontas. Uma nutrição profunda com Goji Berry vai devolver a vida aos cachos.";
        }
      }

      // 3. CASOS DE PROBLEMA ESPECÍFICO (Prioridade Alta)
      else if (concern.includes('Frizz')) {
        recommendedId = 27; // Kit Cadiveu Bye Bye Frizz
        reason = "O Bye Bye Frizz cria uma memória de alinhamento no fio, blindando contra a umidade e garantindo o liso perfeito.";
      }
      else if (concern.includes('Quebra') || concern.includes('Pontas')) {
        recommendedId = 1; // Truss Kit Ultra Hydratation
        reason = "Seu foco é parar a quebra. A tecnologia de reconstrução celular da Truss age no córtex do fio, soldando as pontas duplas.";
      }
      else if (concern.includes('Ressecamento')) {
        recommendedId = 21; // Wella Oil Reflections
        reason = "Para combater o ressecamento imediato, nada supera o Oil Reflections. Ele devolve o manto lipídico e o brilho espelhado.";
      }
      
      // 4. CASOS DE MANUTENÇÃO (Alisados/Naturais)
      else if (history.includes('Alisado')) {
        recommendedId = 7; // Wella Color Motion (Proteção) ou Fusion
        reason = "Cabelos quimicamente alisados precisam de proteção e força. Esta linha mantém a saúde do fio pós-química.";
      }
      else {
        // Natural/Sem grandes problemas -> Manutenção de Luxo
        recommendedId = 29; // Cadiveu Glamour ou Oil Reflections Light
        reason = "Para manter a saúde do seu cabelo natural, selecionamos uma linha que foca em brilho e maciez sem pesar.";
      }

      const product = PRODUCTS.find(p => p.id === recommendedId) || PRODUCTS[0];
      setResult(product);
      setExplanation(reason);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getProgress = () => {
    if (currentStepIndex === -1) return 0;
    if (currentStepIndex === 99) return 100;
    return ((currentStepIndex + 1) / QUESTIONS.length) * 100;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[500px] animate-in zoom-in duration-300">
        
        {/* Header com Progresso */}
        <div className="bg-white p-6 pb-2">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold">
                        AI
                    </span>
                    <span className="font-bold text-xs tracking-widest uppercase text-gray-400">Consultoria Capilar</span>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-black"><X size={24} /></button>
            </div>
            {currentStepIndex > -1 && (
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-accent transition-all duration-500 ease-out"
                        style={{ width: `${getProgress()}%` }}
                    ></div>
                </div>
            )}
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 flex flex-col justify-center">
            
            {/* ESTÁGIO 0: INTRO */}
            {currentStepIndex === -1 && (
                <div className="text-center animate-in slide-in-from-bottom duration-500">
                    <div className="w-24 h-24 bg-gradient-to-tr from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 mx-auto shadow-inner relative">
                        <Sparkles className="text-accent w-10 h-10 animate-pulse" />
                        <div className="absolute -right-2 -top-2 bg-white px-3 py-1 rounded-full text-[10px] font-bold shadow-sm border border-gray-100">
                            Grátis
                        </div>
                    </div>
                    <h2 className="font-serif text-3xl font-bold text-primary mb-3">Diagnóstico Profissional</h2>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed px-4">
                        Nossa Inteligência Artificial analisa 3 fatores cruciais do seu fio para encontrar o tratamento exato que seu cabelo pede hoje.
                    </p>
                    <button 
                        onClick={handleStart}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-gray-900 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                        Iniciar Análise <ArrowRight size={16} />
                    </button>
                    <p className="text-[10px] text-gray-400 mt-4">Leva menos de 30 segundos</p>
                </div>
            )}

            {/* PERGUNTAS */}
            {currentStepIndex >= 0 && currentStepIndex < QUESTIONS.length && (
                <div className="animate-in slide-in-from-right duration-300">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2 block">
                        Passo {currentStepIndex + 1} de {QUESTIONS.length}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-primary mb-6">
                        {QUESTIONS[currentStepIndex].title}
                    </h3>
                    <div className="space-y-3">
                        {QUESTIONS[currentStepIndex].options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(opt.label)}
                                className="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-accent hover:bg-[#FFFAF0] transition-all group flex items-center gap-4 bg-white shadow-sm hover:shadow-md"
                            >
                                <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-accent group-hover:bg-accent">
                                    <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-primary flex-1">
                                    {opt.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ESTÁGIO FINAL: ANÁLISE & RESULTADO */}
            {currentStepIndex === 99 && (
                <div className="text-center w-full">
                    {isAnalyzing ? (
                        <div className="flex flex-col items-center py-10">
                            <div className="relative mb-8">
                                <div className="w-20 h-20 border-4 border-gray-100 rounded-full"></div>
                                <div className="w-20 h-20 border-4 border-accent border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                                <div className="absolute inset-0 flex items-center justify-center font-serif font-bold text-lg text-primary">
                                    AI
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-primary mb-2">Analisando suas respostas...</h3>
                            <p className="text-xs text-gray-500 animate-pulse">Cruzando dados com {PRODUCTS.length} produtos profissionais</p>
                        </div>
                    ) : result && (
                        <div className="animate-in zoom-in duration-500 text-left">
                            <div className="bg-[#FFFAF0] border border-accent/20 rounded-xl p-4 mb-6 flex gap-3 items-start">
                                <Sparkles className="text-accent shrink-0 mt-0.5" size={18} />
                                <div>
                                    <h4 className="font-bold text-xs uppercase text-accent mb-1 tracking-wide">Por que escolhemos este?</h4>
                                    <p className="text-xs text-gray-700 leading-relaxed font-medium">
                                        "{explanation}"
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-center bg-white p-4 rounded-xl shadow-lg border border-gray-50 mb-6 cursor-pointer hover:border-accent transition-colors" onClick={() => onProductFound(result)}>
                                <img src={result.image} alt={result.name} className="w-24 h-24 object-contain" />
                                <div>
                                    <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase mb-1 inline-block">{result.brand}</span>
                                    <h3 className="font-bold text-sm text-primary line-clamp-2 mb-1">{result.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-action">R$ {result.price.toFixed(2)}</span>
                                        <span className="text-xs text-gray-400 line-through">R$ {result.oldPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => onProductFound(result)}
                                    className="flex-1 bg-action text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                                >
                                    Ver Oferta Exclusiva <ArrowRight size={16} />
                                </button>
                                <button 
                                    onClick={() => { setCurrentStepIndex(0); setAnswers({}); }}
                                    className="p-4 bg-gray-50 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
                                    title="Refazer Quiz"
                                >
                                    <RefreshCcw size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default HairQuiz;
