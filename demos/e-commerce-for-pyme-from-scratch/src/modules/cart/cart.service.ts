import type { CartItem, Coupon, CartCalculation } from './cart.types.ts';

/**
 * 🛒 CartService
 * Lógica aislada de carrito, persistencia y aplicación de descuentos promocionales.
 */
export class CartService {
  freeShippingThreshold = 50000; // $50,000 COP
  defaultShippingCost = 5000;

  calculateCart(items: CartItem[], coupon?: Coupon): CartCalculation {
    const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

    let discountAmount = 0;
    if (coupon) {
      if (coupon.discountType === 'PERCENTAGE') {
        discountAmount = (subtotal * coupon.discountValue) / 100;
      } else {
        discountAmount = Math.min(coupon.discountValue, subtotal);
      }
    }

    const isFreeShipping = subtotal >= this.freeShippingThreshold;
    const shippingCost = isFreeShipping ? 0 : this.defaultShippingCost;
    const total = Math.max(0, subtotal - discountAmount + shippingCost);

    return {
      subtotal,
      discountAmount,
      shippingCost,
      total,
      isFreeShipping
    };
  }
}
