export interface ProductAttribute {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  images: string[];
  attributes: ProductAttribute[];
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
}

export interface ProductSearchFilters {
  query?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  limit?: number;
  offset?: number;
}
