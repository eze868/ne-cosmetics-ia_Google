export type BrandType = 'TRUSS' | 'WELLA' | 'BRAÉ' | 'SEBASTIAN' | 'CADIVEU' | 'MINIATURA' | 'TODAS';

export interface Product {
  id: number;
  brand: BrandType;
  categoryId: string;
  name: string;
  description: string;
  longDescription?: string;
  image: string;
  price: number;
  oldPrice: number;
  tags: string[];
  criticalStock?: boolean; // Novo campo para gatilho de escassez
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