import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CatalogService } from './catalog.service.ts';

describe('📦 [ShopFast] CatalogService — Search & Redis Cache L2 Tests', () => {
  const memoryCache = new Map();
  const mockRedis = {
    get: async (key) => memoryCache.get(key) || null,
    set: async (key, val) => memoryCache.set(key, val)
  };
  const mockDb = {};
  const catalogService = new CatalogService(mockRedis, mockDb);

  it('debe buscar productos y almacenar en caché Redis L2', async () => {
    const filters = { query: 'Laptop', limit: 10 };
    
    // Primera consulta (Cache Miss -> Consulta BD y Cachea)
    const res1 = await catalogService.searchProducts(filters);
    assert.ok(res1.items.length > 0);
    assert.strictEqual(res1.items[0].sku, 'LAP-GAM-001');

    // Segunda consulta (Cache Hit -> Retorna desde Redis)
    const res2 = await catalogService.searchProducts(filters);
    assert.deepStrictEqual(res1, res2);
    assert.ok(memoryCache.size > 0, 'La clave de caché debe haberse creado en Redis');
  });
});
