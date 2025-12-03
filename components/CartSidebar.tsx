
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { PHONE_NUMBER } from '../constants';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  // Total com descontos (Valor Final)
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Total Original (Sem descontos / Gross Total)
  const grossTotal = cartItems.reduce((acc, item) => acc + (item.oldPrice * item.quantity), 0);
  
  // Total Economizado
  const totalSavings = grossTotal - total;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let message = `🛒 *NOVO PEDIDO DO SITE*\n\n`;
    message += `Olá! Gostaria de finalizar a compra dos seguintes itens:\n\n`;
    
    cartItems.forEach(item => {
      message += `▪️ ${item.quantity}x *${item.name}*\n   De: ~R$ ${(item.oldPrice * item.quantity).toFixed(2)}~\n   *Por: R$ ${(item.price * item.quantity).toFixed(2)}*\n`;
    });

    message += `\n💰 *Valor Original: ~R$ ${grossTotal.toFixed(2)}~*`;
    message += `\n✅ *Valor Final: R$ ${total.toFixed(2)}*`;
    message += `\n🎉 *Economia Total: R$ ${totalSavings.toFixed(2)}*`;
    message += `\n\nAguardo instruções de pagamento e entrega.`;

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Overlay Escuro */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 right-0 z-[101] w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-primary" />
            <h2 className="font-serif text-xl font-bold text-primary">Sua Sacola</h2>
            <span className="bg-accent/10 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} itens
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
              <ShoppingBag size={64} className="opacity-20" />
              <p>Sua sacola está vazia.</p>
              <button 
                onClick={onClose}
                className="text-action font-bold text-sm underline"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3 animate-in slide-in-from-right-4 duration-300">
                <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase">{item.brand}</span>
                      <h3 className="text-xs font-bold text-primary line-clamp-2">{item.name}</h3>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="text-right">
                       {/* Preço Original Riscado */}
                       <p className="text-[10px] text-gray-400 line-through">
                         R$ {(item.oldPrice * item.quantity).toFixed(2)}
                       </p>
                       {/* Preço Final */}
                       <p className="text-sm font-bold text-primary">
                         R$ {(item.price * item.quantity).toFixed(2)}
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        <div className="p-5 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          {totalSavings > 0 && (
            <div className="bg-green-50 text-green-700 text-xs font-bold text-center py-2 rounded-lg mb-4 border border-green-100">
              🎉 Você está economizando R$ {totalSavings.toFixed(2)}!
            </div>
          )}
          
          <div className="space-y-3 mb-6">
             {/* Valor Original */}
             <div className="flex justify-between text-xs text-gray-400">
                <span>Valor Original</span>
                <span className="line-through">R$ {grossTotal.toFixed(2)}</span>
             </div>
             
             {/* Descontos */}
             <div className="flex justify-between text-xs text-green-600 font-bold">
                <span>Descontos</span>
                <span>- R$ {totalSavings.toFixed(2)}</span>
             </div>
             
             {/* Total Final */}
             <div className="flex justify-between text-xl font-bold text-primary pt-3 border-t border-gray-100">
                <span>Total a Pagar</span>
                <span>R$ {total.toFixed(2)}</span>
             </div>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-whatsapp hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Finalizar Pedido no WhatsApp <ArrowRight size={18} />
          </button>
          
          <p className="text-[10px] text-center text-gray-400 mt-3">
            Envie o pedido para nosso atendente confirmar o estoque e pagamento.
          </p>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
