export interface ProductReview {
  id: string;
  userId: string;
  productId: string;
  rating: number; // 1 - 5 estrellas
  comment: string; // máx 500 chars
  isVerifiedBuyer: boolean;
  createdAt: string;
}

export interface CreateReviewDTO {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}
