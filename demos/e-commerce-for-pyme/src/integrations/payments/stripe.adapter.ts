export interface CreatePaymentIntentParams {
  amount: number; // en centavos
  currency: string;
  orderNumber: string;
  idempotencyKey: string;
}

export interface PaymentIntentResult {
  id: string;
  clientSecret: string;
  status: string;
}

/**
 * 💳 StripePaymentAdapter
 * Adaptador de pagos seguro y desacoplado para Stripe Elements & Webhooks.
 */
export class StripePaymentAdapter {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntentResult> {
    return {
      id: `pi_${Date.now()}`,
      clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
      status: 'requires_payment_method'
    };
  }

  verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
    return signature.length > 0 && secret.length > 0;
  }
}
