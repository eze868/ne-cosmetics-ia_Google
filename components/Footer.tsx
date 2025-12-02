import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111] text-gray-400 py-10 px-6 text-center text-xs border-t border-gray-800">
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