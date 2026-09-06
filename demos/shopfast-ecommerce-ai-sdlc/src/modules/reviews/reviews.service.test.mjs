import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ReviewsService } from './reviews.service.ts';

describe('⭐ [TASK-006] ReviewsService — Tests de Compradores Verificados', () => {
  const reviewsService = new ReviewsService();
  const userId = 'usr-200';
  const productId = 'prod-001';

  it('debe rechazar opiniones de usuarios que no han comprado el producto', () => {
    const res = reviewsService.addReview({
      userId: 'usuario-sin-compra',
      productId,
      rating: 5,
      comment: 'Excelente producto!'
    });

    assert.strictEqual(res.success, false);
    assert.ok(res.error?.includes('Solo compradores verificados'));
  });

  it('debe aceptar reseña si el usuario es comprador verificado', () => {
    reviewsService.registerVerifiedPurchase(userId, productId);

    const res = reviewsService.addReview({
      userId,
      productId,
      rating: 5,
      comment: 'Excelente producto probado en tienda!'
    });

    assert.strictEqual(res.success, true);
    assert.strictEqual(res.review?.rating, 5);
    assert.strictEqual(res.review?.isVerifiedBuyer, true);
  });

  it('debe rechazar una segunda reseña del mismo usuario para el mismo producto', () => {
    const duplicateRes = reviewsService.addReview({
      userId,
      productId,
      rating: 4,
      comment: 'Otra reseña duplicada'
    });

    assert.strictEqual(duplicateRes.success, false);
    assert.ok(duplicateRes.error?.includes('Solo se permite una calificación'));
  });
});
