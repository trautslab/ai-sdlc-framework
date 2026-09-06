import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { StripePaymentAdapter } from './stripe.adapter.ts';

describe('💳 [ShopFast] StripePaymentAdapter — PCI-DSS & Webhook Tests', () => {
  const adapter = new StripePaymentAdapter('sk_test_123456');

  it('debe crear PaymentIntent sin tocar datos sensibles de tarjeta', async () => {
    const intent = await adapter.createPaymentIntent({
      amount: 5500000,
      currency: 'cop',
      orderNumber: 'SF-10001',
      idempotencyKey: 'idem-test-999'
    });

    assert.ok(intent.id.startsWith('pi_'));
    assert.ok(intent.clientSecret.includes('_secret_'));
    assert.strictEqual(intent.status, 'requires_payment_method');
  });

  it('debe validar la firma criptográfica del webhook de Stripe', () => {
    const isValid = adapter.verifyWebhookSignature('payload_mock', 'sig_test_abc', 'whsec_secret_key');
    assert.strictEqual(isValid, true);

    const isInvalid = adapter.verifyWebhookSignature('payload_mock', '', '');
    assert.strictEqual(isInvalid, false, 'Firma vacía debe ser rechazada');
  });
});
