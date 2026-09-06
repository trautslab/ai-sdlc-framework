import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { AuthService } from './auth.service.ts';

describe('🔐 [TASK-005] AuthService — Tests Unitarios de Libreta de Direcciones', () => {
  const authService = new AuthService();
  const userId = 'usr-100';

  it('debe permitir registrar direcciones y establecer dirección predeterminada', () => {
    const res = authService.addShippingAddress({
      userId,
      recipientName: 'Carlos Mendoza',
      streetAddress: 'Calle 100 #15-20',
      city: 'Bogota',
      phone: '+573001112233',
      isDefault: true
    });

    assert.strictEqual(res.success, true);
    const addresses = authService.getUserAddresses(userId);
    assert.strictEqual(addresses.length, 1);
    assert.strictEqual(addresses[0].isDefault, true);
  });

  it('debe rechazar registrar más de 5 direcciones por usuario (Regla 3.2.3 del PDF)', () => {
    for (let i = 0; i < 4; i++) {
      authService.addShippingAddress({
        userId,
        recipientName: `Contacto ${i}`,
        streetAddress: `Av ${i}`,
        city: 'Bogota',
        phone: '+573001112233',
        isDefault: false
      });
    }

    // Intento número 6 (debe fallar)
    const overflowRes = authService.addShippingAddress({
      userId,
      recipientName: 'Contacto Extra',
      streetAddress: 'Calle 200',
      city: 'Medellin',
      phone: '+573001112233',
      isDefault: false
    });

    assert.strictEqual(overflowRes.success, false);
    assert.ok(overflowRes.error?.includes('Máximo 5 direcciones'));
  });
});
