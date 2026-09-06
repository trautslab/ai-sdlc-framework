import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CourierFastAdapter } from './courierfast.adapter.ts';

describe('🚚 [TASK-004] CourierFastAdapter — Tests de Cotización Logística', () => {
  const adapter = new CourierFastAdapter('courier_test_key');

  it('debe cotizar tarifa local preferencial para ciudades principales (Bogotá, Medellín, CDMX)', async () => {
    const res = await adapter.quoteShipping({
      destinationCity: 'Bogota',
      weightKg: 2.0,
      lengthCm: 20,
      widthCm: 15,
      heightCm: 10
    });

    assert.strictEqual(res.cost, 5000);
    assert.strictEqual(res.estimatedDeliveryDays, '2-3 días hábiles');
    assert.strictEqual(res.courier, 'CourierFast');
  });

  it('debe cotizar tarifa regional para otras ciudades', async () => {
    const res = await adapter.quoteShipping({
      destinationCity: 'Villavicencio',
      weightKg: 2.0,
      lengthCm: 20,
      widthCm: 15,
      heightCm: 10
    });

    assert.strictEqual(res.cost, 9500);
    assert.strictEqual(res.estimatedDeliveryDays, '4-7 días hábiles');
  });
});
