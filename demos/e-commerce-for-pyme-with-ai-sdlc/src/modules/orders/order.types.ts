export type OrderStatus =
  | 'PENDIENTE_PAGO'
  | 'PAGO_CONFIRMADO'
  | 'EN_PREPARACION'
  | 'ENVIADO'
  | 'ENTREGADO'
  | 'CANCELADO';

export interface OrderItem {
  productId: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface ShippingAddress {
  recipientName: string;
  streetAddress: string;
  city: string;
  phone: string;
  specialInstructions?: string;
}

export interface CreateOrderDTO {
  userId?: string;
  cartId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'STRIPE' | 'TRANSFERENCIA';
  idempotencyKey: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  paymentMethod: string;
  stripePaymentIntentId?: string;
  trackingNumber?: string;
  items: OrderItem[];
  createdAt: Date;
}
