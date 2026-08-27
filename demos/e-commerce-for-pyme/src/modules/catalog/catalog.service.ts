import { Product, ProductSearchFilters } from './catalog.types';

/**
 * 📦 CatalogService
 * Servicio de catálogo optimizado con caché Redis para búsquedas en < 1.0s.
 */
export class CatalogService {
  private cacheTTLSeconds = 900; // 15 minutos

  constructor(
    private readonly redisClient: any,
    private readonly dbClient: any
  ) {}

  async searchProducts(filters: ProductSearchFilters): Promise<{ items: Product[]; total: number }> {
    const cacheKey = `catalog:search:${JSON.stringify(filters)}`;

    // 1. Intentar recuperación desde Caché Redis L2
    if (this.redisClient) {
      const cached = await this.redisClient.get(cacheKey);
      if (cached) {
        return JSON.parse(cached);
      }
    }

    // 2. Consulta a Base de Datos PostgreSQL con índices optimizados
    const query = `
      SELECT id, sku, name, description, category_id, price, discount_price, stock_quantity, images, attributes, status, created_at
      FROM products
      WHERE status = 'ACTIVE'
        ${filters.query ? `AND (name ILIKE $1 OR description ILIKE $1 OR sku ILIKE $1)` : ''}
      ORDER BY created_at DESC
      LIMIT ${filters.limit || 20} OFFSET ${filters.offset || 0}
    `;

    // Simulación de respuesta de base de datos
    const items: Product[] = [
      {
        id: 'prod-001',
        sku: 'LAP-GAM-001',
        name: 'Laptop Gaming Pro 16"',
        description: 'Potente laptop con procesador de última generación y GPU dedicada.',
        categoryId: 'cat-laptops-gaming',
        price: 1200.0,
        discountPrice: 1099.0,
        stockQuantity: 15,
        images: ['https://cdn.shopfast.com/img/laptop-1.webp'],
        attributes: [{ name: 'RAM', value: '32GB' }, { name: 'SSD', value: '1TB' }],
        status: 'ACTIVE',
        createdAt: new Date()
      }
    ];

    const result = { items, total: items.length };

    // 3. Guardar en caché Redis
    if (this.redisClient) {
      await this.redisClient.set(cacheKey, JSON.stringify(result), 'EX', this.cacheTTLSeconds);
    }

    return result;
  }
}
