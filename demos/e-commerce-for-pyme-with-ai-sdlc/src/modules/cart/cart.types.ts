export interface CartItem {
  productId: string;
  sku: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minSubtotal?: number;
}

export interface CartCalculation {
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
  isFreeShipping: boolean;
}
