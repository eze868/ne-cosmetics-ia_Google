import { Product, Category, Benefit } from './types';

export const PHONE_NUMBER = "5511999999999";

// IDs atualizados para facilitar a filtragem
export const CATEGORIES: Category[] = [
  { id: 'color', icon: '💇‍♀️', title: 'Cabelos Coloridos', subtitle: 'Proteção da cor e matizadores' },
  { id: 'finish', icon: '✨', title: 'Finalização', subtitle: 'Óleos, Leave-ins e Anti-frizz' },
  { id: 'treatment', icon: '🔬', title: 'Tratamentos', subtitle: 'Reconstrução e Nutrição potente' },
  { id: 'premium', icon: '👑', title: 'Linhas Premium', subtitle: 'Kits completos e Tamanho Profissional' },
];

export const BENEFITS: Benefit[] = [
  { icon: '🚚', title: 'Entrega Rápida', description: 'Receba em 2-5 dias úteis' },
  { icon: '💯', title: '100% Original', description: 'Distribuidor autorizado' },
  { icon: '🔄', title: 'Garantia Total', description: '7 dias para troca' },
  { icon: '💎', title: 'Preço Imbatível', description: 'Melhores preços do mercado' },
];

export const PRODUCTS: Product[] = [
  // --- TRUSS ---
  {
    id: 1,
    brand: 'TRUSS',
    categoryId: 'treatment',
    name: 'Combo Ultra Hydratation',
    description: 'Shampoo 300ml + Condicionador 300ml. Reconstrução celular avançada.',
    longDescription: 'Transforme cabelos danificados em fios de seda em apenas 7 dias! Reconstrução celular avançada que repara até os danos mais profundos causados por química. Sente a diferença na primeira aplicação.',
    image: 'https://i.ibb.co/84Km04Dw/truss-kit.webp',
    price: 159.90,
    oldPrice: 199.90,
    tags: ['Reconstrução', 'Resistência', 'Brilho']
  },
  {
    id: 2,
    brand: 'TRUSS',
    categoryId: 'premium',
    name: 'TRUSS Basic Refil - Shampoo 2,4L',
    description: 'Economize até 70% com este refil profissional. Limpeza profunda.',
    longDescription: 'O segredo dos cabeleireiros premium! Economize até 70% com este refil profissional de 2,4L. Limpeza profunda que remove resíduos sem agredir. Seu salão merece o melhor custo-benefício do mercado.',
    image: 'https://i.ibb.co/yFMYPwSy/truss-basic.webp',
    price: 244.90,
    oldPrice: 319.90,
    tags: ['Econômico', 'Profissional', 'Limpeza']
  },
  {
    id: 3,
    brand: 'TRUSS',
    categoryId: 'treatment',
    name: 'Kit Uso Obrigatório Plus+',
    description: 'Tratamento completo que devolve a vida aos fios em 15 minutos.',
    longDescription: 'O kit que está esgotando nas melhores bancas do Brasil! Tratamento completo que devolve a vida aos fios em 15 minutos. Experimente e você nunca mais usará outra coisa. Resultados visíveis imediatamente.',
    image: 'https://i.ibb.co/TB5QwD5t/Truss-plus.webp',
    price: 159.90,
    oldPrice: 199.90,
    tags: ['Rápido', 'Resultado Imediato', 'Tratamento']
  },
  {
    id: 4,
    brand: 'TRUSS',
    categoryId: 'finish',
    name: 'Truss Frizz Zero 260ml',
    description: 'Adeus frizz para sempre! Controle total mesmo na umidade.',
    longDescription: 'Adeus frizz para sempre! Controle total mesmo na umidade. Seus cabelos ficarão alinhados como se tivessem saído do salonista. A fórmula exclusiva cria uma barreira invisível contra o caos capilar.',
    image: 'https://i.ibb.co/ZzQXbxCr/Truss-Frizz-Zero.webp',
    price: 104.90,
    oldPrice: 149.90,
    tags: ['Zero Frizz', 'Anti-Umidade', 'Alinhamento']
  },
  {
    id: 5,
    brand: 'TRUSS',
    categoryId: 'treatment',
    name: 'TRUSS Uso Obrigatório 260ml',
    description: 'O salvador dos cabelos destruídos! Reconstrói fio por fio.',
    longDescription: 'O salvador dos cabelos destruídos! Reconstrói fio por fio, devolvendo a força perdida após químicas agressivas. Se você já perdeu a esperança com seus cabelos, este produto vai surpreendê-la.',
    image: 'https://i.ibb.co/XrJPbFTB/Truss-uso-Obrigatorio.webp',
    price: 109.90,
    oldPrice: 149.90,
    tags: ['Salvador', 'Reconstrução', 'Danos Severos']
  },

  // --- WELLA ---
  {
    id: 6,
    brand: 'WELLA',
    categoryId: 'finish',
    name: 'Oil Reflections Luminous 250ml',
    description: 'Brilho de espelho em cada fio! Transforma cabelos opacos.',
    longDescription: 'Brilho de espelho em cada fio! O shampoo que transforma cabelos opacos em verdadeiras fontes de luz. Tecnologia com óleos preciosos que refletem a luz como um diamante lapidado.',
    image: 'https://i.ibb.co/PvjtSgMz/Wella-Professionals-Oil-Reflections-Luminous-Reveal-Shampoo-250ml.webp',
    price: 89.90,
    oldPrice: 119.90,
    tags: ['Brilho', 'Luminosidade', 'Luxo']
  },
  {
    id: 7,
    brand: 'WELLA',
    categoryId: 'color',
    name: 'Color Motion+ Shampoo 250ml',
    description: 'Mantenha sua cor de salão por até 8 semanas. Proteção anti-desbotamento.',
    longDescription: 'Mantenha sua cor de salão por 2 meses! Tecnologia anti-desbotamento que protege sua tintura como uma capa invisível. Sua cor favorita ficará viva e vibrante como no primeiro dia.',
    image: 'https://i.ibb.co/nsCrpw3z/Wella-Professionals-Color-Motion-Shampoo-250ml.webp',
    price: 89.90,
    oldPrice: 181.90,
    tags: ['Cor Viva', 'Proteção', 'Vibrância']
  },
  {
    id: 8,
    brand: 'WELLA',
    categoryId: 'premium',
    name: 'Invigo Nutri Enrich 1000ml',
    description: 'Nutrição intensa que seus cabelos clamam. Fórmula mega concentrada.',
    longDescription: 'Nutrição intensa que seus cabelos clamam por! Fórmula mega concentrada que penetra no córtex capilar, alimentando cada fio com vitaminas essenciais. Seus cabelos ficarão saciados de nutrientes.',
    image: 'https://i.ibb.co/3m8VgRd4/b-2df75f6686a24e9b5ead8b3ae5895a58.webp',
    price: 142.90,
    oldPrice: 309.90,
    tags: ['Nutrição', 'Vitaminas', 'Concentrado']
  },
  {
    id: 9,
    brand: 'WELLA',
    categoryId: 'treatment',
    name: 'Invigo Nutri Enrich 250ml',
    description: 'Fórmula com Goji Berry. Nutre instantaneamente cabelos secos.',
    longDescription: 'O segredo dos cabelos hidratados das celebridades! Fórmula com manteiga de karité que derrete no contato com os fios, selando a hidratação por até 72 horas. Experimente o luxo em sua casa.',
    image: 'https://i.ibb.co/kshHBygc/Invigo-Nutri-Shampoo-250-Ml-1.webp',
    price: 67.90,
    oldPrice: 153.90,
    tags: ['Hidratação', 'Maciez', 'Goji Berry']
  },
  {
    id: 10,
    brand: 'WELLA',
    categoryId: 'treatment',
    name: 'Máscara Nutri Enrich 500ml',
    description: 'Tratamento de salão na sua casa! Spa capilar completo em 5 min.',
    longDescription: 'Tratamento de salão na sua casa! Máscara ultra concentrada que age como um spa capilar completo. Em 10 minutos, seus cabelos ganham nova vida. A transformação é tão visível que você vai se emocionar.',
    image: 'https://i.ibb.co/wmCMsGp/Invigo-Nutri-Enrich-M-scara500-G.png',
    price: 184.90,
    oldPrice: 307.90,
    tags: ['Spa Capilar', 'Rápido', 'Transformação']
  },
  {
    id: 11,
    brand: 'WELLA',
    categoryId: 'treatment',
    name: 'Invigo Nutri-Enrich - Máscara 150ml',
    description: 'Tratamento que cabe na bolsa mas entrega resultados gigantes!',
    longDescription: 'O tratamento que cabe na bolsa mas entrega resultados gigantes! Perfeita para manutenção diária ou para levar na viagem. Seus cabelos agradecem o mimo profissional todos os dias.',
    image: 'https://i.ibb.co/4nBhXKTQ/Invigo-Nutri-Enrich-M-scara.webp',
    price: 99.90,
    oldPrice: 156.90,
    tags: ['Manutenção', 'Diária', 'Prático']
  },
  {
    id: 12,
    brand: 'WELLA',
    categoryId: 'color',
    name: 'Cool Blonde Recharge 250ml',
    description: 'Neutraliza tons amarelados em 30 segundos. Loiro platina.',
    longDescription: 'O desejado tom platinado sem o temido amarelado! Neutraliza tons amarelados em 30 segundos, deixando seus loiros com aquele brilho prateado de passarela. A revolução dos loiros chegou!',
    image: 'https://i.ibb.co/5WVt4KSg/Shampoo-Wella-Professionals-Invigo-Cool-Blonde-Recharge-250ml.webp',
    price: 54.90,
    oldPrice: 139.90,
    tags: ['Loiro', 'Matizador', 'Platina']
  },
  {
    id: 13,
    brand: 'WELLA',
    categoryId: 'premium',
    name: 'Shampoo Wella Fusion 1000ml',
    description: 'Limpeza profunda que não resseca. Ideal para uso diário profissional.',
    longDescription: 'O queridinho dos salões premium! Limpeza profunda que não resseca, ideal para uso diário profissional. Economia garantida com qualidade superior. Seu salão merece o melhor.',
    image: 'https://i.ibb.co/C3gHW9vK/Shampoo-Wella-Professionals-Fusion-1000ml.webp',
    price: 174.90,
    oldPrice: 410.90,
    tags: ['Profissional', 'Economia', 'Premium']
  },
  {
    id: 14,
    brand: 'WELLA',
    categoryId: 'premium',
    name: 'Condicionador Wella Fusion 1000ml',
    description: 'Desembaraço instantâneo e maciez que dura dias.',
    longDescription: 'O parceiro perfeito para o shampoo Fusion! Desembaraço instantâneo e maciez que dura dias. Seus clientes vão perguntar qual produto mágico você está usando.',
    image: 'https://i.ibb.co/kVcs4BVN/Condicionador-Wella-Professionals-Fusion-1000ml.webp',
    price: 199.90,
    oldPrice: 490.90,
    tags: ['Desembaraço', 'Maciez', 'Duradouro']
  },
  {
    id: 15,
    brand: 'WELLA',
    categoryId: 'premium',
    name: 'Kit Wella Fusion Profissional',
    description: 'Shampoo 1000ml + Condicionador 1000ml. Estoque para meses.',
    longDescription: 'O combo que vai revolucionar seu salão! Kit completo com economia extra. Garanta estoque para meses de tratamentos premium. Oferta por tempo limitado - estoque esgotando!',
    image: 'https://i.ibb.co/1GXg699R/Kit-Shampoo-Wella-Professionals-Fusion-1000ml.webp',
    price: 364.99,
    oldPrice: 758.90,
    tags: ['Kit Salão', 'Econômico', 'Completo']
  },
  {
    id: 16,
    brand: 'WELLA',
    categoryId: 'treatment',
    name: 'Kit Wella Fusion Home Care',
    description: 'Shampoo 250ml + Condicionador 200ml. A porta de entrada para Wella.',
    longDescription: 'Experimente a qualidade Fusion sem compromisso! Kit perfeito para teste ou para quem prefere produtos fresquinhos. A porta de entrada para o mundo profissional Wella.',
    image: 'https://i.ibb.co/mFt3tY9y/Kit-Wella-Professionals-Fusion-Shampoo-250ml-Condicionador-200ml-Kit.webp',
    price: 199.90,
    oldPrice: 317.90,
    tags: ['Iniciante', 'Kit', 'Home Care']
  },
  {
    id: 17,
    brand: 'WELLA',
    categoryId: 'premium',
    name: 'Color Brilliance Shampoo 1000ml',
    description: 'O guardião das cores vibrantes! Protege sua tintura.',
    longDescription: 'O guardião das cores vibrantes! Protege sua tintura como um escudo invisível, impedindo que os pigmentos escapem. Sua cor permanecerá intensa como se tivesse sido feita hoje.',
    image: 'https://i.ibb.co/bRbQM5fT/Wella-Professionals-Invigo-Color-Brilliance-Shampoo-1000ml.webp',
    price: 184.90,
    oldPrice: 322.90,
    tags: ['Proteção Cor', '1 Litro', 'Profissional']
  },
  {
    id: 18,
    brand: 'WELLA',
    categoryId: 'color',
    name: 'Color Brilliance Shampoo 250ml',
    description: 'Sua cor favorita agradece o cuidado especializado todos os dias.',
    longDescription: 'A versão perfeita para uso pessoal! Todos os benefícios profissionais em um frasco conveniente. Sua cor favorita agradece o cuidado especializado todos os dias.',
    image: 'https://i.ibb.co/27NsBg9j/Wella-Professionals-Invigo-Color-Brilliance-Shampoo-250ml.webp',
    price: 74.90,
    oldPrice: 149.90,
    tags: ['Manutenção Cor', 'Home Care', 'Brilho']
  },
  {
    id: 19,
    brand: 'WELLA',
    categoryId: 'color',
    name: 'Color Brilliance Condicionador 250ml',
    description: 'Selamento de cutículas que mantém a cor presa dentro dos fios.',
    longDescription: 'O complemento perfeito para o shampoo Color Brilliance! Selamento de cutículas que mantém a cor presa dentro dos fios. Maciez que convida ao toque constante.',
    image: 'https://i.ibb.co/Gvf3kyGv/Condicionador-Invigo-Color-Brilliance.webp',
    price: 109.90,
    oldPrice: 219.90,
    tags: ['Selamento', 'Cutículas', 'Cor']
  },
  {
    id: 20,
    brand: 'WELLA',
    categoryId: 'treatment',
    name: 'Color Brilliance Máscara 150ml',
    description: 'Tratamento intensivo semanal para revitalização da cor.',
    longDescription: 'O tratamento intensivo que sua cor precisa! Uma vez por semana para revitalização completa. Seus cabelos coloridos nunca foram tão bem tratados.',
    image: 'https://i.ibb.co/XfTPD6m0/Invigo-Color-Brilliance-Mascara150.webp',
    price: 94.90,
    oldPrice: 156.90,
    tags: ['Intensivo', 'Semanal', 'Revitalização']
  },
  {
    id: 21,
    brand: 'WELLA',
    categoryId: 'finish',
    name: 'Oil Reflections Óleo 100ml',
    description: 'Elixir dos deuses! Apenas 2 gotas transformam o cabelo.',
    longDescription: 'O elixir dos deuses para seus cabelos! Apenas 2 gotas transformam qualquer cabelo em seda pura. Brilho, maciez e controle em um frasco luxuoso.',
    image: 'https://i.ibb.co/HD8MCjfY/Wella-Professionals-Oil-Reflections-leo-Capilar-100ml.webp',
    price: 129.90,
    oldPrice: 179.90,
    tags: ['Óleo', 'Finalizador', 'Luxo']
  },
  {
    id: 22,
    brand: 'WELLA',
    categoryId: 'finish',
    name: 'Oil Reflections Light 100ml',
    description: 'Versão light para cabelos finos. Textura invisível.',
    longDescription: 'A versão light para quem ama óleo mas não quer peso! Textura leve que desaparece nos cabelos, deixando apenas benefícios. Perfeito para cabelos finos e médios.',
    image: 'https://i.ibb.co/Zk03zRr/Wella-Professionals-Oil-Reflections-Light-leo-Capilar-100ml.webp',
    price: 139.90,
    oldPrice: 239.90,
    tags: ['Leve', 'Fios Finos', 'Sem Peso']
  },

  // --- BRAÉ ---
  {
    id: 23,
    brand: 'BRAÉ',
    categoryId: 'color',
    name: 'Go Curly Crespos 250ml',
    description: 'Definição perfeita que realça cada espiral natural.',
    longDescription: 'A celebração dos cachos em sua forma mais gloriosa! Definição perfeita que realça cada espiral natural. Seus cachos nunca foram tão obedientes e definidos. Aceite sua beleza natural!',
    image: 'https://i.ibb.co/k6wKzgBR/Shampoo-Bra-Go-Curly-Crespos-250ml.webp',
    price: 39.90,
    oldPrice: 99.90,
    tags: ['Cachos', 'Definição', 'Natural']
  },
  {
    id: 24,
    brand: 'BRAÉ',
    categoryId: 'treatment',
    name: 'Revival Condicionador 250ml',
    description: 'Nutrição intensa para fios desestruturados. Renascimento capilar.',
    longDescription: 'O renascimento dos seus cabelos! Nutrição tão intensa que parece um transplante de vitalidade. Seus fios secos e ressecados vão voltar a ter a elasticidade e brilho de quando você era criança. A revolução começa agora.',
    image: 'https://i.ibb.co/p6WdZWfV/Condicionador-Bra-Revival-250ml.webp',
    price: 39.90,
    oldPrice: 89.90,
    tags: ['Renascimento', 'Elasticidade', 'Força']
  },
  {
    id: 25,
    brand: 'BRAÉ',
    categoryId: 'finish',
    name: 'Essential Fluido Reparador 60ml',
    description: 'O guarda-costas invisível dos seus cabelos! Proteção térmica.',
    longDescription: 'O guarda-costas invisível dos seus cabelos! Proteção 24h contra agressões externas enquanto repara danos passados. Aplique e sinta a transformação instantânea. Seus cabelos merecem essa proteção premium.',
    image: 'https://i.ibb.co/Lh9vD7N1/Bra-Essential-Fluido-Reparador-Leave-in-60ml.webp',
    price: 34.90,
    oldPrice: 79.90,
    tags: ['Proteção', 'Térmico', 'Reparação']
  },

  // --- SEBASTIAN ---
  {
    id: 26,
    brand: 'SEBASTIAN',
    categoryId: 'finish',
    name: 'Dark Oil Sebastian 30ml',
    description: 'O elixir negro! Óleo de styling evanescente que nutre.',
    longDescription: 'O elixir negro que os salões mais caros escondem de você! Três gotas bastam para transformar seus cabelos em seda líquida. Brilho, maciez e tratamento em uma única fórmula mágica. Experimente o segredo dos ricos.',
    image: 'https://i.ibb.co/C3svxp17/d7bf38e2-608d-4a6d-9cb6-a0c7f0a41f8b.jpg',
    price: 54.90,
    oldPrice: 119.90,
    tags: ['Elixir', 'Leveza', 'Styling']
  },

  // --- CADIVEU ---
  {
    id: 27,
    brand: 'CADIVEU',
    categoryId: 'treatment',
    name: 'Kit Bye Bye Frizz',
    description: 'Kit completo que domina até os cabelos mais indisciplinados.',
    longDescription: 'Adeus definitivo para o frizz rebelde! Kit completo que domina até os cabelos mais indisciplinados. Em 7 dias, seus cabelos aprenderão a ser obedientes. A paz capilar que você sempre sonhou.',
    image: 'https://i.ibb.co/BHmT0Z6C/Kit-Cadiveu-Professional-Essentials-Bye-Bye-Frizz.webp',
    price: 69.90,
    oldPrice: 169.90,
    tags: ['Anti-Frizz', 'Disciplina', 'Liso']
  },
  {
    id: 28,
    brand: 'CADIVEU',
    categoryId: 'treatment',
    name: 'Kit Bye Bye Frizz Alinhamento',
    description: 'Alinhamento profissional sem química! Resultado de progressiva.',
    longDescription: 'Alinhamento profissional sem química! Domine seus cabelos sem agredi-los. O kit perfeito para quem busca cabelos lisos e disciplinados de forma saudável. Resultados de escova progressiva sem danos.',
    image: 'https://i.ibb.co/tp5G2kHB/Kit-Cadiveu-Professional-Essentials-Bye-Bye-Frizz-Alinhamento.webp',
    price: 109.90,
    oldPrice: 219.90,
    tags: ['Alinhamento', 'Sem Química', 'Liso']
  },
  {
    id: 29,
    brand: 'CADIVEU',
    categoryId: 'premium',
    name: 'Kit Cadiveu Glamour Duo',
    description: 'Shampoo e condicionador que transformam sua rotina em ritual de luxo.',
    longDescription: 'O glamour em forma de produtos! Shampoo e condicionador que transformam sua rotina em um ritual de luxo. Seus cabelos vão brilhar como se estivessem sempre sob holofotes. Sinta-se uma diva todos os dias.',
    image: 'https://i.ibb.co/WvgNyGqd/Kit-Cadiveu-Glamour-Shampoo-250ml-Condicionador.webp',
    price: 75.90,
    oldPrice: 149.90,
    tags: ['Glamour', 'Brilho', 'Nutrição']
  },
  {
    id: 30,
    brand: 'CADIVEU',
    categoryId: 'finish',
    name: 'Açaí Oil 60ml',
    description: 'O poder da Amazônia! Óleo de açaí puro com proteção UV.',
    longDescription: 'O poder da Amazônia em suas mãos! Óleo de açaí puro que nutre com a força da floresta. Antioxidantes poderosos que combatem o envelhecimento capilar. A natureza trabalhando para a beleza dos seus cabelos.',
    image: 'https://i.ibb.co/FbX0knph/Cadiveu-Professional-A-a-Oil-leo-Capilar-60ml.webp',
    price: 64.90,
    oldPrice: 99.90,
    tags: ['Amazônia', 'Antioxidante', 'Proteção UV']
  },

  // --- MINIATURAS ---
  {
    id: 31,
    brand: 'MINIATURA',
    categoryId: 'finish',
    name: 'Wella Oil Reflections 50ml',
    description: 'Versão mini perfeita para viagens. Brilho instantâneo.',
    longDescription: 'Experimente o luxo sem compromisso! Versão mini perfeita para viagens ou para testar antes de investir no frasco grande. O mesmo brilho de diamante em tamanho conveniente.',
    image: 'https://i.ibb.co/YBMbSf30/Wella-Professionals-Oil-Reflections-Luminous-Reval-Shampoo-50ml.webp',
    price: 39.90,
    oldPrice: 69.90,
    tags: ['Viagem', 'Teste', 'Brilho']
  },
  {
    id: 32,
    brand: 'MINIATURA',
    categoryId: 'treatment',
    name: 'Wella Ultimate Repair 50ml',
    description: 'Socorro imediato em miniatura! Reparação em 90 segundos.',
    longDescription: 'O socorro imediato em miniatura! Leve para onde for e tenha reparação profissional sempre à mão. Perfeito para emergências capilares durante viagens.',
    image: 'https://i.ibb.co/bgdGf8rR/Wella-Professional-Ultimate-Repair-Mini-Shampoo-50ml.webp',
    price: 34.90,
    oldPrice: 59.90,
    tags: ['SOS', 'Rápido', 'Viagem']
  },
  {
    id: 33,
    brand: 'MINIATURA',
    categoryId: 'premium',
    name: 'Wella Ultimate Luxe Oil 30ml',
    description: 'Uma dose de luxo para sua bolsa! O luxo agora cabe no seu nécessaire.',
    longDescription: 'Uma dose de luxo para sua bolsa! Experimente o shampoo mais desejado dos salões premium em versão mini. O luxo agora cabe no seu nécessaire.',
    image: 'https://i.ibb.co/LDZDc0Q1/Wella-Professionals-Ultimate-Luxe-Oil-Shampoo-30ml.webp',
    price: 24.90,
    oldPrice: 59.90,
    tags: ['Luxo', 'Mini', 'Premium']
  },
  {
    id: 34,
    brand: 'MINIATURA',
    categoryId: 'treatment',
    name: 'Sebastian Penetraitt 50ml',
    description: 'Reconstrução profunda em tamanho ideal para necessaire.',
    longDescription: 'A penetração profunda em tamanho ideal para teste! Experimente a tecnologia que reconstrói de dentro para fora. Seus cabelos vão implorar pelo frasco grande depois.',
    image: 'https://i.ibb.co/KjhYVpKm/Sebastian-Penetraitt.jpg',
    price: 29.90,
    oldPrice: 69.90,
    tags: ['Reconstrução', 'Mini', 'Forte']
  },
  {
    id: 35,
    brand: 'MINIATURA',
    categoryId: 'color',
    name: 'Máscara Wella Blondorplex 30ml',
    description: 'Fortalece e neutraliza amarelos em uma única aplicação.',
    longDescription: 'O salvador dos loiros em miniatura! Fortalece e neutraliza amarelos em uma única aplicação. Leve o tratamento profissional para onde for.',
    image: 'https://i.ibb.co/S43144Kp/Wella-Professionals-Blondor-Plex-Condicionador-Fortificante-30ml.webp',
    price: 39.90,
    oldPrice: 69.90,
    tags: ['Loiro', 'Fortificante', 'Mini']
  },
  {
    id: 36,
    brand: 'MINIATURA',
    categoryId: 'treatment',
    name: 'Máscara Ultimate Luxe Oil 30ml',
    description: 'Tratamento expresso. Resultados de salão em apenas 5 minutos.',
    longDescription: 'O luxo em miniatura para tratamento expresso! Máscara que entrega resultados de salão em apenas 5 minutos. Perfeita para quem tem pressa mas não abre mão da qualidade.',
    image: 'https://i.ibb.co/67Gx8Rkw/Wella-Professionals-Ultimate-Luxe-Oil-M-scara-Capilar-30ml.webp',
    price: 44.90,
    oldPrice: 79.90,
    tags: ['Expresso', 'Rápido', 'Luxo']
  },
  {
    id: 37,
    brand: 'MINIATURA',
    categoryId: 'color',
    name: 'Máscara Color Brilliance 30ml',
    description: 'Proteção da cor em tamanho viagem. Não deixe desbotar.',
    longDescription: 'A proteção da sua cor em tamanho viagem! Mantenha sua tintura vibrante mesmo longe de casa. Não deixe suas cores desbotarem nas férias.',
    image: 'https://i.ibb.co/Pz90N4z2/Wella-Professionals-Invigo-Color-Brilliance-M-scara-Capilar-30ml.webp',
    price: 39.90,
    oldPrice: 69.90,
    tags: ['Cor', 'Viagem', 'Proteção']
  },
  {
    id: 38,
    brand: 'MINIATURA',
    categoryId: 'color',
    name: 'Máscara Color Motion+ 30ml',
    description: 'Movimento e cor em miniatura! A versão mini que não deixa sua cor parar.',
    longDescription: 'Movimento e cor em miniatura! Mantenha sua cor em movimento mesmo em viagens. A versão mini que não deixa sua cor parar.',
    image: 'https://i.ibb.co/KxXgBwmw/Wella-Professionals-Color-Motion-M-scara-Capilar-30ml.webp',
    price: 39.90,
    oldPrice: 69.90,
    tags: ['Movimento', 'Cor', 'Leve']
  },
  {
    id: 39,
    brand: 'MINIATURA',
    categoryId: 'treatment',
    name: 'Braé Revival Condicionador 60ml',
    description: 'O renascimento em miniatura! Perfeito para final de semana.',
    longDescription: 'O renascimento em miniatura! Leve a nutrição intensa para onde precisar. Perfeito para final de semana na praia ou viagens de negócios.',
    image: 'https://i.ibb.co/4nHwBW06/Bra-Revival-Condicionador-60ml.webp',
    price: 24.90,
    oldPrice: 49.90,
    tags: ['Renascimento', 'Praia', 'Mini']
  },
  {
    id: 40,
    brand: 'MINIATURA',
    categoryId: 'color',
    name: 'Joico K-PAK Color Therapy 50ml',
    description: 'A terapia para suas cores em tamanho viagem! Trata e protege.',
    longDescription: 'A terapia para suas cores em tamanho viagem! Condicionador que trata enquanto protege a coloração. Leve o cuidado profissional para qualquer lugar.',
    image: 'https://i.ibb.co/7JnzLbPN/Joico-K-PAK-Color-Therapy-Condicionador-50ml.webp',
    price: 49.90,
    oldPrice: 89.90,
    tags: ['Terapia', 'Cor', 'Joico']
  }
];