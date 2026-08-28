# [TASK-003] Módulo de Checkout, Pagos con Stripe & Reserva de Stock

**ID:** `TASK-003` | **Módulo:** `src/modules/orders/` & `src/integrations/payments/` | **Prioridad:** CRITICAL  
**Caso de Uso Asociado:** [`docs/use-cases/UC-003-checkout-stripe.md`](../../docs/use-cases/UC-003-checkout-stripe.md)  
**Branch Aislado:** `feat/task-003-orders-checkout`  

## 🎯 1. Objetivo
Implementar el proceso de checkout en 3 pasos, integración con Stripe Payment Intents, validación criptográfica de webhooks y descuento atómico de inventario en transacción ACID.

## 🔒 Invariantes de Aislamiento
- Cero almacenamiento de datos de tarjeta en base de datos (PCI-DSS delegado).
- Idempotencia obligatoria en toda orden creada.

## 🧪 Comando de Evaluación
```bash
node evals/harness.mjs --task task-003
```
