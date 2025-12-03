
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
  criticalStock?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  reviews: number;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
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

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}
