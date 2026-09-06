export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: 'CUSTOMER' | 'ADMIN';
  createdAt: string;
}

export interface ShippingAddressDTO {
  id?: string;
  userId: string;
  recipientName: string;
  streetAddress: string;
  city: string;
  phone: string;
  isDefault: boolean;
}
