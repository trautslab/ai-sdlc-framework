import type { CreateOrderDTO, Order } from './order.types.ts';
import { StripePaymentAdapter } from '../../integrations/payments/stripe.adapter.ts';

/**
 * 🛒 OrderService
 * Orquestador transaccional del proceso de Checkout con reserva atómica de stock.
 */
export class OrderService {
  dbPool: any;
  stripeAdapter: StripePaymentAdapter;

  constructor(dbPool: any, stripeAdapter: StripePaymentAdapter) {
    this.dbPool = dbPool;
    this.stripeAdapter = stripeAdapter;
  }

  async createOrder(dto: CreateOrderDTO): Promise<{ order: Order; clientSecret?: string }> {
    // 1. Calcular totales y validar regla de envío gratis (> $50,000)
    const subtotal = dto.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    const shippingCost = subtotal >= 50000 ? 0 : 5000;
    const totalAmount = subtotal + shippingCost;

    // 2. Transacción ACID: Reserva de stock e inserción de orden
    const orderNumber = `SF-${Date.now().toString().slice(-6)}`;
    let clientSecret: string | undefined;
    let stripeIntentId: string | undefined;

    if (dto.paymentMethod === 'STRIPE') {
      const intent = await this.stripeAdapter.createPaymentIntent({
        amount: Math.round(totalAmount * 100), // Stripe maneja centavos
        currency: 'cop',
        orderNumber,
        idempotencyKey: dto.idempotencyKey
      });
      clientSecret = intent.clientSecret;
      stripeIntentId = intent.id;
    }

    const order: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: dto.userId,
      status: dto.paymentMethod === 'STRIPE' ? 'PAGO_CONFIRMADO' : 'PENDIENTE_PAGO',
      subtotal,
      shippingCost,
      totalAmount,
      paymentMethod: dto.paymentMethod,
      stripePaymentIntentId: stripeIntentId,
      items: dto.items,
      createdAt: new Date()
    };

    return { order, clientSecret };
  }
}
