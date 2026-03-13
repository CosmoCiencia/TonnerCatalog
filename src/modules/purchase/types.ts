import type { Product } from '../catalog/types';

export interface OrderItem {
  productId: string;
  name: string;
  line?: string;
  image?: string;
  presentation: string;
  presentations: string[];
  quantity: number;
}

export interface CustomerData {
  name: string;
  company: string;
  city: string;
  notes: string;
}

export function buildInitialOrderItem(product: Product): OrderItem {
  return {
    productId: product.id,
    name: product.name,
    line: product.line,
    image: product.image || product.image_url,
    presentation: product.presentations?.[0] ?? 'Sin definir',
    presentations: product.presentations?.length ? product.presentations : ['Sin definir'],
    quantity: 1,
  };
}
