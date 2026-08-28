# 📋 Registro Central de Tareas (Task Correlative Registry) — ShopFast

Este registro es la **fuente única de verdad** para la asignación de identificadores correlativos `TASK-XXX`.

> ⚠️ **INVARIANTE DE CORRELATIVOS:** Ningún agente o desarrollador puede crear una tarea sin registrarla aquí primero. Queda terminantemente prohibido duplicar identificadores o reutilizar correlativos cerrados.

---

## 📊 Matriz de Asignación de Tareas

| ID Correlativo | Título de la Tarea | Módulo Afectado | Prioridad | Estado | Rama Git |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `TASK-001` | [Búsqueda & Catálogo con Caché Redis L2](TASK-001-catalog-search-redis.md) | `src/modules/catalog/` | HIGH | `COMPLETED` | `feat/task-001-catalog` |
| `TASK-002` | [Carrito, Persistencia Dual & Cupones](TASK-002-cart-persistence-and-coupons.md) | `src/modules/cart/` | HIGH | `COMPLETED` | `feat/task-002-cart` |
| `TASK-003` | [Checkout, Stripe & Transacción Stock](TASK-003-checkout-stripe-transacting.md) | `src/modules/orders/` | CRITICAL | `COMPLETED` | `feat/task-003-orders-checkout` |
| `TASK-004` | [Logística & Envíos con CourierFast](TASK-004-courierfast-shipping-integration.md) | `src/integrations/shipping/` | MEDIUM | `COMPLETED` | `feat/task-004-courierfast-shipping` |
| `TASK-005` | [Auth JWT & Libreta de Direcciones](TASK-005-user-auth-and-address-book.md) | `src/modules/auth/` | HIGH | `COMPLETED` | `feat/task-005-user-auth` |
| `TASK-006` | [Reseñas de Compradores Verificados](TASK-006-verified-product-reviews.md) | `src/modules/reviews/` | LOW | `COMPLETED` | `feat/task-006-verified-reviews` |
| `TASK-007` | [Admin Dashboard & Importación CSV](TASK-007-admin-dashboard-and-csv-import.md) | `src/modules/admin/` | HIGH | `COMPLETED` | `feat/task-007-admin-dashboard` |

---

## 🔒 Próximo Correlativo Disponible: `TASK-008`
Cualquier nuevo requerimiento debe reclamar estrictamente el correlativo **`TASK-008`**.
