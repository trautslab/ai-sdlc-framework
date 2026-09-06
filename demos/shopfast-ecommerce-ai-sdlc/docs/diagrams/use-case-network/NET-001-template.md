# 🕸️ [NET-001] Red de Trazabilidad y Dependencias de Casos de Uso

| Campo | Valor / Descripción |
| :--- | :--- |
| **Identificador:** | `NET-001` (Formato `NET-XXXX`, inmutable y secuencial) |
| **Objetivo del Documento:** | Mapeo de trazabilidad end-to-end desde Requerimientos de Negocio hasta Commits de Subagentes |
| **Audiencia:** | Tech Leads, Product Owners, Arquitectos y Subagentes IA |
| **Última Actualización:** | Septiembre 2026 |

---

## 1. Propósito de la Red de Trazabilidad

Este artefacto ofrece al **Tech Lead** y a los **Stakeholders de Negocio** una vista panorámica inmediata de:
1. Cómo se fragmentaron los requerimientos de alto nivel en **Casos de Uso Funcionales (`UC-XXXX`)**.
2. Qué **Contrato de Tarea (`TASK-XXXX`)** y **Subagente IA** implementó cada funcionalidad.
3. Qué **Git Worktree**, **Suite de Tests** y **Commit Atómico** respalda el entregable.

---

## 2. Grafo de Red de Trazabilidad (Mermaid — Cobertura 100% del Alcance)

```mermaid
graph LR
    %% 1. Requerimientos de Negocio (PDF de Alcance)
    subgraph BUSINESS_LAYER["🏢 Capa de Negocio / Alcance (§ 3.1 - § 3.9)"]
        REQ_CAT["REQ-001\nCatálogo (2,500 ítems)"]
        REQ_CART["REQ-002\nCarrito & Cupones"]
        REQ_CHECKOUT["REQ-003\nCheckout 3 Pasos"]
        REQ_SHIP["REQ-004\nCourierFast API"]
        REQ_AUTH["REQ-005\nAuth & Libreta (≤5)"]
        REQ_REV["REQ-006\nReseñas Verificadas"]
        REQ_ADM["REQ-007\nAdmin CSV & Stock <10"]
        REQ_TRACK["REQ-008\nTracking & Estados"]
        REQ_TRANS["REQ-009\nTransferencia Bancaria"]
    end

    %% 2. Casos de Uso Funcionales (9 UCs)
    subgraph FUNCTIONAL_LAYER["🎯 Casos de Uso Canónicos"]
        UC_001["UC-001\nBúsqueda Catálogo"]
        UC_002["UC-002\nGestión Carrito"]
        UC_003["UC-003\nCheckout Stripe"]
        UC_004["UC-004\nCotización CourierFast"]
        UC_005["UC-005\nAuth & Libreta"]
        UC_006["UC-006\nReseñas Verificadas"]
        UC_007["UC-007\nAdmin CSV & Alertas"]
        UC_008["UC-008\nTracking 6 Estados"]
        UC_009["UC-009\nPago Transferencia"]
    end

    %% 3. Contratos de Tareas Agénticas (7 Tasks)
    subgraph AGENT_TASKS["🤖 Contratos de Tareas (.agents/tasks/)"]
        TASK_001["TASK-001\nCatalogService.ts\n(subagent-1)"]
        TASK_002["TASK-002\nCartService.ts\n(subagent-2)"]
        TASK_003["TASK-003\nOrderService & Stripe\n(subagent-3)"]
        TASK_004["TASK-004\nCourierFastAdapter.ts\n(subagent-2)"]
        TASK_005["TASK-005\nAuthService.ts\n(subagent-1)"]
        TASK_006["TASK-006\nReviewsService.ts\n(subagent-3)"]
        TASK_007["TASK-007\nAdminService.ts\n(subagent-1)"]
    end

    %% 4. Tests y Quality Gates
    subgraph PRODUCTION_GATES["🛡️ 8 Suites de Tests (16 Tests PASSED)"]
        EVAL_1["catalog.test.mjs"]
        EVAL_2["cart.test.mjs"]
        EVAL_3["order.test.mjs + stripe"]
        EVAL_4["courierfast.test.mjs"]
        EVAL_5["auth.test.mjs"]
        EVAL_6["reviews.test.mjs"]
        EVAL_7["admin.test.mjs"]
        MERGE["Fast-Forward Merge\nRama: main\nCommit Atómico"]
    end

    %% Conexiones de Trazabilidad
    REQ_CAT --> UC_001 --> TASK_001 --> EVAL_1 --> MERGE
    REQ_CART --> UC_002 --> TASK_002 --> EVAL_2 --> MERGE
    REQ_CHECKOUT --> UC_003 --> TASK_003 --> EVAL_3 --> MERGE
    REQ_SHIP --> UC_004 --> TASK_004 --> EVAL_4 --> MERGE
    REQ_AUTH --> UC_005 --> TASK_005 --> EVAL_5 --> MERGE
    REQ_REV --> UC_006 --> TASK_006 --> EVAL_6 --> MERGE
    REQ_ADM --> UC_007 --> TASK_007 --> EVAL_7 --> MERGE
    REQ_TRACK --> UC_008 --> TASK_003
    REQ_TRANS --> UC_009 --> TASK_003
```

---

## 3. Matriz de Auditoría y Estado de Trazabilidad Completa (100% Alcance)

| ID Requerimiento | ID Caso de Uso | ID Tarea Agente | Subagente Dueño | Componente Afectado | Suite de Test Determinista | Estado Final |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **REQ-001** | [`UC-001`](../../use-cases/UC-001-busqueda-catalogo.md) | `TASK-001` | `subagent-1` | `src/modules/catalog/` | `catalog.service.test.mjs` | 🟢 VERIFIED |
| **REQ-002** | [`UC-002`](../../use-cases/UC-002-gestion-carrito.md) | `TASK-002` | `subagent-2` | `src/modules/cart/` | `cart.service.test.mjs` | 🟢 VERIFIED |
| **REQ-003** | [`UC-003`](../../use-cases/UC-003-checkout-stripe.md) | `TASK-003` | `subagent-3` | `src/modules/orders/` | `order.service.test.mjs` | 🟢 VERIFIED |
| **REQ-004** | [`UC-004`](../../use-cases/UC-004-cotizacion-envio-courierfast.md) | `TASK-004` | `subagent-2` | `src/integrations/shipping/` | `courierfast.adapter.test.mjs` | 🟢 VERIFIED |
| **REQ-005** | [`UC-005`](../../use-cases/UC-005-autenticacion-libreta-direcciones.md) | `TASK-005` | `subagent-1` | `src/modules/auth/` | `auth.service.test.mjs` | 🟢 VERIFIED |
| **REQ-006** | [`UC-006`](../../use-cases/UC-006-opiniones-compradores-verificados.md) | `TASK-006` | `subagent-3` | `src/modules/reviews/` | `reviews.service.test.mjs` | 🟢 VERIFIED |
| **REQ-007** | [`UC-007`](../../use-cases/UC-007-admin-dashboard-catalogo-csv.md) | `TASK-007` | `subagent-1` | `src/modules/admin/` | `admin.service.test.mjs` | 🟢 VERIFIED |
| **REQ-008** | [`UC-008`](../../use-cases/UC-008-ciclo-vida-pedidos-tracking.md) | `TASK-003` | `subagent-3` | `src/modules/orders/` | `order.service.test.mjs` | 🟢 VERIFIED |
| **REQ-009** | [`UC-009`](../../use-cases/UC-009-transferencia-bancaria-conciliacion.md) | `TASK-003` | `subagent-3` | `src/integrations/payments/` | `stripe.adapter.test.mjs` | 🟢 VERIFIED |

---

## 4. Guía para el Tech Lead: ¿Cómo auditar el avance?

1. **Revisión del Grafo:** Abre este diagrama para verificar si algún caso de uso tiene dependencias bloqueantes o circulares.
2. **Auditoría de Subagentes:** Consulta la tabla para saber con precisión qué subagente desarrolló cada módulo.
3. **Consistencia de Commits:** Cada commit atómico en `main` debe contener en su mensaje el formato:
   ```text
   feat(cart): [UC-002] [TASK-002] implement persistent cart and free shipping logic
   ```
