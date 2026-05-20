// src/types/index.ts

export interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  img: string;
  desc: string;
  category: 'Camisetas' | 'Hoodies';
  sizes: ProductSize[];
}

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  size: ProductSize;
  quantity: number;
}

export type ViewMode = 3 | 4 | 6;

export interface Filters {
  categories: string[];
  sizes: string[];
  priceRanges: string[];
}

export interface ShippingOption {
  id: string;
  label: string;
  price: number;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 'standard', label: 'Standard (3-5 days)', price: 9500 },
  { id: 'express',  label: 'Express (1-2 days)',  price: 15900 },
  { id: 'same_day', label: 'Same Day',            price: 24900 },
];

export const VALID_DISCOUNT_CODES: Record<string, number> = {
  REBIRTH10: 0.1,
  WELCOME10: 0.1,
};
