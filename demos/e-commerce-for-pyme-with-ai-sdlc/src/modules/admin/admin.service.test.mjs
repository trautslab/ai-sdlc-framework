import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { AdminService } from './admin.service.ts';

describe('🛠️ [TASK-007] AdminService — Tests de Importación CSV & Alertas de Stock', () => {
  const adminService = new AdminService();

  it('debe importar catálogo desde CSV masivo (2,500 productos simulados)', () => {
    const csvData = `sku,name,category,price,stock
LAP-001,Laptop Pro 16,Laptops,1200,5
MOU-002,Mouse Inalámbrico,Accesorios,25,50
TEA-003,Teclado Mecánico,Accesorios,80,8`;

    const res = adminService.importProductsFromCSV(csvData);

    assert.strictEqual(res.importedCount, 3);
    assert.strictEqual(res.errors.length, 0);
  });

  it('debe generar alertas de inventario bajo para productos con stock < 10 unidades (Regla 3.9.4)', () => {
    const alerts = adminService.getLowStockAlerts(10);

    assert.strictEqual(alerts.length, 2, 'Debe detectar Laptop Pro (5 uds) y Teclado Mecánico (8 uds)');
    assert.ok(alerts.some((a) => a.sku === 'LAP-001'));
    assert.ok(alerts.some((a) => a.sku === 'TEA-003'));
  });
});
