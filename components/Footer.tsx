
import React from 'react';
import { ShieldCheck, Lock, Truck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111] text-gray-400 py-12 px-6 text-center text-xs border-t border-gray-800">
      
      {/* Seção de Confiança e Pagamento */}
      <div className="container mx-auto max-w-4xl border-b border-gray-800 pb-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Segurança */}
            <div className="flex flex-col items-center">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Site Blindado & Seguro</h4>
                <div className="flex gap-4">
                     <div className="flex flex-col items-center gap-2 group">
                        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800 group-hover:border-green-500 transition-colors">
                            <ShieldCheck className="text-gray-400 group-hover:text-green-500 transition-colors" size={18} />
                        </div>
                        <span className="text-[9px] font-medium text-gray-500">Compra Segura</span>
                     </div>
                     <div className="flex flex-col items-center gap-2 group">
                        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800 group-hover:border-gray-300 transition-colors">
                            <Lock className="text-gray-400 group-hover:text-gray-200 transition-colors" size={18} />
                        </div>
                        <span className="text-[9px] font-medium text-gray-500">Dados Protegidos</span>
                     </div>
                     <div className="flex flex-col items-center gap-2 group">
                        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800 group-hover:border-blue-400 transition-colors">
                            <Truck className="text-gray-400 group-hover:text-blue-400 transition-colors" size={18} />
                        </div>
                        <span className="text-[9px] font-medium text-gray-500">Entrega Garantida</span>
                     </div>
                </div>
            </div>

            {/* Pagamento */}
            <div className="flex flex-col items-center">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Formas de Pagamento</h4>
                <div className="flex flex-wrap justify-center gap-2 items-center opacity-80 hover:opacity-100 transition-opacity">
                    <div className="h-8 bg-white rounded px-3 flex items-center justify-center shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg" className="h-4 w-auto" alt="Pix" />
                    </div>
                    <div className="h-8 bg-white rounded px-3 flex items-center justify-center shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2.5 w-auto" alt="Visa" />
                    </div>
                    <div className="h-8 bg-white rounded px-3 flex items-center justify-center shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4 w-auto" alt="Mastercard" />
                    </div>
                    <div className="h-8 bg-white rounded px-3 flex items-center justify-center shadow-sm text-gray-800 text-[10px] font-black border border-gray-200">
                        BOLETO
                    </div>
                </div>
                <p className="text-[9px] text-gray-600 mt-2">Parcele em até 12x no cartão ou 5% OFF no Pix</p>
            </div>
        </div>
      </div>

      <div className="mb-4">
        <strong className="text-gold text-sm block mb-1">N&E COSMETICS</strong>
        <span>Distribuidor Autorizado de Produtos Profissionais</span>
      </div>
      <div className="space-y-1 mb-6">
        <p>CNPJ: XX.XXX.XXX/0001-XX</p>
        <p>WhatsApp: (11) 99999-9999</p>
        <p>Atendimento: Segunda a Sexta, 9h às 18h</p>
      </div>
      <p className="text-[10px] text-gray-600 max-w-md mx-auto">
        Todas as marcas são propriedade de seus respectivos donos.
        Imagens meramente ilustrativas. Preços e promoções válidos por tempo limitado.
        © 2025 N&E Cosmetics - Todos os direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
