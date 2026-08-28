import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CartService } from './cart.service.ts';

describe('🛒 [TASK-002] CartService — Tests Unitarios', () => {
  const cartService = new CartService();

  it('debe calcular subtotal y aplicar descuento porcentual correctamente', () => {
    const items = [
      { productId: 'p1', sku: 'SKU1', name: 'Item 1', unitPrice: 20000, quantity: 2 } // 40000
    ];
    const coupon = { code: 'PROMO10', discountType: 'PERCENTAGE', discountValue: 10 };

    const calc = cartService.calculateCart(items, coupon);

    assert.strictEqual(calc.subtotal, 40000);
    assert.strictEqual(calc.discountAmount, 4000);
    assert.strictEqual(calc.shippingCost, 5000);
    assert.strictEqual(calc.total, 41000);
    assert.strictEqual(calc.isFreeShipping, false);
  });

  it('debe aplicar envío gratis cuando el subtotal es exactamente o mayor a $50,000', () => {
    const items = [
      { productId: 'p2', sku: 'SKU2', name: 'Item 2', unitPrice: 50000, quantity: 1 }
    ];

    const calc = cartService.calculateCart(items);

    assert.strictEqual(calc.subtotal, 50000);
    assert.strictEqual(calc.shippingCost, 0);
    assert.strictEqual(calc.total, 50000);
    assert.strictEqual(calc.isFreeShipping, true);
  });
});
