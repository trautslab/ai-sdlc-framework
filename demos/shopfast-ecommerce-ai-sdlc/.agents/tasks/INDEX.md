# 📋 Registro Central de Tareas (Task Correlative Registry)

Este archivo es la **fuente única de verdad** para la asignación de identificadores correlativos `TASK-XXX`.

> ⚠️ **INVARIANTE DE CORRELATIVOS:** Ningún agente de IA puede crear un archivo en `.agents/tasks/` sin consultar este índice, verificar el último correlativo usado y registrar aquí la nueva tarea antes de iniciar.

---

## 📊 Matriz de Asignación de Tareas

| ID Correlativo | Título de la Tarea | Caso de Uso | Módulo Afectado | Prioridad | Estado | Rama Git |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| `TASK-001` | Catálogo & Búsqueda con Caché Redis L2 | [`UC-001`](../../docs/use-cases/UC-001-busqueda-catalogo.md) | `src/modules/catalog/` | HIGH | `COMPLETED` | `feat/task-001-catalog` |
| `TASK-002` | Carrito de Compras, Persistencia Dual & Cupones | [`UC-002`](../../docs/use-cases/UC-002-gestion-carrito.md) | `src/modules/cart/` | HIGH | `COMPLETED` | `feat/task-002-cart` |
| `TASK-003` | Checkout Transaccional, Stripe & Inventario ACID | [`UC-003`](../../docs/use-cases/UC-003-checkout-stripe.md) | `src/modules/orders/` | CRITICAL | `COMPLETED` | `feat/task-003-orders-checkout` |
| `TASK-004` | Integración Logística con CourierFast API | [`UC-004`](../../docs/use-cases/UC-004-cotizacion-envio-courierfast.md) | `src/integrations/shipping/` | MEDIUM | `COMPLETED` | `feat/task-004-courierfast-shipping` |
| `TASK-005` | Autenticación, Perfil & Libreta de Direcciones | [`UC-005`](../../docs/use-cases/UC-005-autenticacion-libreta-direcciones.md) | `src/modules/auth/` | HIGH | `COMPLETED` | `feat/task-005-user-auth` |
| `TASK-006` | Opiniones, Calificaciones & Compradores Verificados | [`UC-006`](../../docs/use-cases/UC-006-opiniones-compradores-verificados.md) | `src/modules/reviews/` | LOW | `COMPLETED` | `feat/task-006-verified-reviews` |
| `TASK-007` | Panel Admin, Carga Masiva CSV & Alertas Stock | [`UC-007`](../../docs/use-cases/UC-007-admin-dashboard-catalogo-csv.md) | `src/modules/admin/` | HIGH | `COMPLETED` | `feat/task-007-admin-dashboard` |

---

## 🔒 Próximo Correlativo Disponible: `TASK-008`
Cualquier nuevo requerimiento debe reclamar estrictamente el siguiente correlativo secuencial disponible.

