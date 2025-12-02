export type BrandType = 'TRUSS' | 'WELLA' | 'BRAÉ' | 'SEBASTIAN' | 'CADIVEU' | 'MINIATURA' | 'TODAS';

export interface Product {
  id: number;
  brand: BrandType;
  categoryId: string; // Novo campo para filtro por categoria
  name: string;
  description: string; // Descrição curta para o card
  longDescription?: string; // Descrição longa para o modal
  image: string;
  price: number;
  oldPrice: number;
  tags: string[];
}

export interface Category {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}