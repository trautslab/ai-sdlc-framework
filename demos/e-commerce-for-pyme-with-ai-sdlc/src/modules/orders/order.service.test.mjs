import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { OrderService } from './order.service.ts';
import { StripePaymentAdapter } from '../../integrations/payments/stripe.adapter.ts';

describe('🛒 [ShopFast] OrderService — Checkout & Stock Reservation Tests', () => {
  const stripeAdapter = new StripePaymentAdapter('sk_test_mock_key');
  const mockDbPool = { query: async () => ({ rows: [] }) };
  const orderService = new OrderService(mockDbPool, stripeAdapter);

  it('debe aplicar costo de envío $0 cuando el subtotal supera $50,000 COP/MXN (Regla 3.3.2)', async () => {
    const dto = {
      cartId: 'cart-123',
      paymentMethod: 'STRIPE',
      idempotencyKey: 'idem-key-001',
      items: [
        { productId: 'prod-001', sku: 'LAP-001', quantity: 1, unitPrice: 55000, subtotal: 55000 }
      ],
      shippingAddress: {
        recipientName: 'Carlos Mendoza',
        streetAddress: 'Av. Principal 123',
        city: 'Bogota',
        phone: '+573001234567'
      }
    };

    const result = await orderService.createOrder(dto);

    assert.strictEqual(result.order.subtotal, 55000);
    assert.strictEqual(result.order.shippingCost, 0, 'El envío debe ser gratis para compras > $50,000');
    assert.strictEqual(result.order.totalAmount, 55000);
    assert.strictEqual(result.order.status, 'PAGO_CONFIRMADO');
    assert.ok(result.clientSecret?.startsWith('pi_'), 'Debe generar un clientSecret de Stripe');
  });

  it('debe cobrar tarifa de envío cuando el subtotal es menor a $50,000', async () => {
    const dto = {
      cartId: 'cart-124',
      paymentMethod: 'TRANSFERENCIA',
      idempotencyKey: 'idem-key-002',
      items: [
        { productId: 'prod-002', sku: 'MOUSE-001', quantity: 1, unitPrice: 25000, subtotal: 25000 }
      ],
      shippingAddress: {
        recipientName: 'Ana Gutiérrez',
        streetAddress: 'Calle 45 #10-20',
        city: 'Medellin',
        phone: '+573109876543'
      }
    };

    const result = await orderService.createOrder(dto);

    assert.strictEqual(result.order.subtotal, 25000);
    assert.strictEqual(result.order.shippingCost, 5000, 'Debe cobrar tarifa de envío estándar');
    assert.strictEqual(result.order.totalAmount, 30000);
    assert.strictEqual(result.order.status, 'PENDIENTE_PAGO', 'Las transferencias inician como pendientes');
    assert.strictEqual(result.clientSecret, undefined, 'Transferencia no genera clientSecret de Stripe');
  });
});
