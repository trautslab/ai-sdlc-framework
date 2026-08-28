export interface CSVProductRow {
  sku: string;
  name: string;
  category: string;
  price: string;
  stock: string;
}

export interface AdminKPIs {
  totalOrders: number;
  totalRevenue: number;
  lowStockAlertCount: number;
}
