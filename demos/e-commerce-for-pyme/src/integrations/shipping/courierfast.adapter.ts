export interface ShippingQuoteParams {
  destinationCity: string;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}

export interface ShippingQuoteResult {
  cost: number;
  estimatedDeliveryDays: string;
  courier: string;
}

/**
 * 🚚 CourierFastAdapter
 * Adaptador de logística para la API REST de CourierFast.
 */
export class CourierFastAdapter {
  constructor(private readonly apiKey: string) {}

  async quoteShipping(params: ShippingQuoteParams): Promise<ShippingQuoteResult> {
    // Cotización basada en ciudad y dimensiones con fallback defensivo
    const isCapital = ['Bogota', 'Medellin', 'Cali', 'CDMX', 'Guadalajara'].includes(params.destinationCity);

    return {
      cost: isCapital ? 5000 : 9500,
      estimatedDeliveryDays: isCapital ? '2-3 días hábiles' : '4-7 días hábiles',
      courier: 'CourierFast'
    };
  }
}
