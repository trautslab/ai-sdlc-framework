# [TASK-002] Módulo de Carrito de Compras, Persistencia Dual & Cupones

**ID:** `TASK-002` | **Módulo:** `src/modules/cart/` | **Prioridad:** HIGH  
**Caso de Uso Asociado:** [`docs/use-cases/UC-002-gestion-carrito.md`](../../docs/use-cases/UC-002-gestion-carrito.md)  
**Branch Aislado:** `feat/task-002-cart`  

## 🎯 1. Objetivo
Implementar la gestión del carrito de compras con persistencia dual (LocalStorage 30 días para anónimos / PostgreSQL para usuarios logueados), validación de stock en tiempo real, aplicación de cupones de descuento y regla de envío gratis para compras $> \$50,000$.

## 🔒 Invariantes de Aislamiento
- Aislado exclusivamente en `src/modules/cart/`.
- No procesa pagos ni manipula tarjetas.

## 🧪 Comando de Evaluación
```bash
node evals/harness.mjs --task task-002
```
