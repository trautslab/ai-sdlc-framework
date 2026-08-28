import type { UserProfile, ShippingAddressDTO } from './auth.types.ts';

/**
 * 🔐 AuthService
 * Gestión de usuarios, autenticación y libreta de direcciones (máx 5 por usuario).
 */
export class AuthService {
  maxAddressesPerUser = 5;
  userAddresses = new Map<string, ShippingAddressDTO[]>();

  addShippingAddress(address: ShippingAddressDTO): { success: boolean; error?: string } {
    const existing = this.userAddresses.get(address.userId) || [];

    if (existing.length >= this.maxAddressesPerUser) {
      return {
        success: false,
        error: `Límite alcanzado: Máximo ${this.maxAddressesPerUser} direcciones permitidas por usuario`
      };
    }

    if (address.isDefault) {
      existing.forEach((a) => (a.isDefault = false));
    }

    const savedAddress = { ...address, id: `addr-${Date.now()}` };
    existing.push(savedAddress);
    this.userAddresses.set(address.userId, existing);

    return { success: true };
  }

  getUserAddresses(userId: string): ShippingAddressDTO[] {
    return this.userAddresses.get(userId) || [];
  }
}
