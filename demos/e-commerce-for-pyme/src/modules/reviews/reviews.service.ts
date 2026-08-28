import type { ProductReview, CreateReviewDTO } from './reviews.types.ts';

/**
 * ⭐ ReviewsService
 * Calificaciones de 1-5 estrellas restringidas a compradores verificados (Regla 3.8 del PDF).
 */
export class ReviewsService {
  reviews = new Map<string, ProductReview[]>(); // productId -> reviews
  verifiedPurchases = new Set<string>(); // "userId:productId"

  registerVerifiedPurchase(userId: string, productId: string) {
    this.verifiedPurchases.add(`${userId}:${productId}`);
  }

  addReview(dto: CreateReviewDTO): { success: boolean; error?: string; review?: ProductReview } {
    if (dto.rating < 1 || dto.rating > 5) {
      return { success: false, error: 'La calificación debe estar entre 1 y 5 estrellas' };
    }

    if (dto.comment.length > 500) {
      return { success: false, error: 'El comentario no puede exceder los 500 caracteres' };
    }

    const hasPurchased = this.verifiedPurchases.has(`${dto.userId}:${dto.productId}`);
    if (!hasPurchased) {
      return { success: false, error: 'Solo compradores verificados pueden calificar este producto' };
    }

    const productReviews = this.reviews.get(dto.productId) || [];
    const alreadyReviewed = productReviews.some((r) => r.userId === dto.userId);
    if (alreadyReviewed) {
      return { success: false, error: 'Solo se permite una calificación por producto por usuario' };
    }

    const newReview: ProductReview = {
      id: `rev-${Date.now()}`,
      userId: dto.userId,
      productId: dto.productId,
      rating: dto.rating,
      comment: dto.comment,
      isVerifiedBuyer: true,
      createdAt: new Date().toISOString()
    };

    productReviews.push(newReview);
    this.reviews.set(dto.productId, productReviews);

    return { success: true, review: newReview };
  }
}
