import type { CSVProductRow, AdminKPIs } from './admin.types.ts';

/**
 * 🛠️ AdminService
 * Operaciones del panel de control: importación CSV masiva y alertas de stock bajo (< 10 uds).
 */
export class AdminService {
  products = new Map<string, { sku: string; name: string; price: number; stock: number }>();

  importProductsFromCSV(csvContent: string): { importedCount: number; errors: string[] } {
    const lines = csvContent.trim().split('\n');
    let importedCount = 0;
    const errors: string[] = [];

    // Omitir header
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length >= 5) {
        const [sku, name, category, priceStr, stockStr] = parts.map((p) => p.trim());
        const price = parseFloat(priceStr);
        const stock = parseInt(stockStr, 10);

        if (!isNaN(price) && !isNaN(stock)) {
          this.products.set(sku, { sku, name, price, stock });
          importedCount++;
        } else {
          errors.push(`Línea ${i + 1}: Precio o stock inválidos`);
        }
      }
    }

    return { importedCount, errors };
  }

  getLowStockAlerts(threshold = 10): { sku: string; name: string; stock: number }[] {
    const alerts: { sku: string; name: string; stock: number }[] = [];
    for (const p of this.products.values()) {
      if (p.stock < threshold) {
        alerts.push(p);
      }
    }
    return alerts;
  }
}
