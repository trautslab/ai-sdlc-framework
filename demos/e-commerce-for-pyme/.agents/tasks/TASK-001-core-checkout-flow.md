# [TASK-001] Implementación del Flujo de Checkout con Stripe y Reserva de Stock

**ID:** `TASK-001`  
**Prioridad:** CRITICAL  
**Caso de Uso Asociado:** [`docs/use-cases/UC-003-checkout-stripe.md`](../../docs/use-cases/UC-003-checkout-stripe.md)  
**Asignado a:** Antigravity AI Agent  
**Branch:** `feature/task-001-core-checkout-flow`  

---

## 🎯 1. Objetivo
Implementar la capa de servicios y adaptadores para el proceso de checkout en 3 pasos (Envío, Pago con Stripe, Confirmación) garantizando la reserva atómica de stock y la recepción segura del webhook de pago.

## 🚫 2. Fuera de Alcance (Non-Goals)
- No implementar facturación electrónica automática (reservado para Fase 2).
- No implementar cotización dinámica con CourierFast (usar tarifa plana por ahora).

## 🛡️ 3. Invariantes Específicos
- Cumplir [`invariants.md`](../rules/invariants.md) sobre PCI-DSS.
- Tiempo de respuesta del endpoint de checkout `< 300ms`.

## ✅ 4. Criterios de Aceptación (Definición de Terminado)
- [ ] Implementar `OrderService.createOrder()` con transacción ACID en `src/modules/orders/order.service.ts`.
- [ ] Implementar `StripePaymentAdapter.createPaymentIntent()` y verificación de webhook en `src/integrations/payments/stripe.adapter.ts`.
- [ ] Eval Harness en 100% pasando: `node evals/harness.mjs --task task-001`.
- [ ] Actualizar `CHANGELOG.md` y `HANDOFF.md`.

## 🧪 5. Comando de Evaluación (Eval Harness)
```bash
node evals/harness.mjs --task task-001
```
