# 🗺️ Índice Maestro de Documentación & Trazabilidad

Este índice actúa como la **matriz de navegación** para todo el catálogo de arquitectura, casos de uso y diagramas del repositorio.

---

## 🏛️ 1. Arquitectura Global
- [Modelo C4 (Contexto, Contenedores, Componentes)](architecture/c4-model-template.md)
- [Decisiones de Arquitectura (ADRs)](adr/ADR-0001-template.md)

---

## 🔬 1.1. Análisis Profundo & Arquitectura Enterprise (Framework Central)
- [01-ENTERPRISE-NFRS-AND-ISOLATION-100-TOOLS.md](https://github.com/trautslab/ai-sdlc-framework/blob/main/docs/deep-dives/01-ENTERPRISE-NFRS-AND-ISOLATION-100-TOOLS.md) — Matriz de RNFs, Resiliencia, Bulkheading y Aislamiento para CRM de IA con 100+ Integraciones.
- [02-CONTEXT-GOVERNANCE-TOKENOMICS-AND-PLATFORMS.md](https://github.com/trautslab/ai-sdlc-framework/blob/main/docs/deep-dives/02-CONTEXT-GOVERNANCE-TOKENOMICS-AND-PLATFORMS.md) — Gobernanza Inmune a la Saturación/Compactación de Contexto, Tokenomics de Alta Escala y Garantías en Antigravity / Claude Code / Codex / Cursor.

## ☁️ 1.2. Despliegue, Infraestructura & Gobernanza de Ambientes
- [`DEP-001` (Diagrama de Despliegue Multi-Cloud Agnóstico)](diagrams/deployment/DEP-001-template.md) — Topología C4/UML: Edge, Ingress, Cómputo, Datos y SaaS (AWS, GCP, Azure, OCI, Cloudflare, Supabase, Vercel).
- [`SEC-NET-001` (Topología de Red & Seguridad Zero-Trust)](diagrams/network-topology/SEC-NET-001-template.md) — Segmentación en Subnets (DMZ, App, Data), WAF, NAT, Security Groups y Políticas IAM.
- [`ENV-MATRIX` (Matriz de 4 Ambientes DEV / QA / UAT / PROD)](environments/ENV-MATRIX-template.md) — Gobernanza de etapas, gestión de secretos en Vaults/KMS y Quality Gates de promoción.
- [`FINOPS-001` (Modelo FinOps & Presupuesto Cloud)](finops/FINOPS-001-template.md) — Bill of Materials (BOM), costos fijos/variables, tokenomics de IA y comisiones de pasarela.

---

## 🎯 2. Matriz de Trazabilidad: Casos de Uso vs Artefactos de Arquitectura (100% Alcance PDF)

| ID Caso de Uso | Título | Sección PDF | Dominio | Tarea Asociada | Red Trazabilidad | Estado |
| :--- | :--- | :---: | :--- | :---: | :---: | :---: |
| [`UC-001`](use-cases/UC-001-busqueda-catalogo.md) | Búsqueda y Navegación de Catálogo | § 3.1 | Catálogo / Búsqueda | [`TASK-001`](../.agents/tasks/TASK-001-catalog-search-redis.md) | [`NET-001`](diagrams/use-case-network/NET-001-template.md) | `VERIFIED 🟢` |
| [`UC-002`](use-cases/UC-002-gestion-carrito.md) | Gestión de Carrito Persistente & Cupones | § 3.3 | Carrito de Compras | [`TASK-002`](../.agents/tasks/TASK-002-cart-persistence-and-coupons.md) | [`NET-001`](diagrams/use-case-network/NET-001-template.md) | `VERIFIED 🟢` |
| [`UC-003`](use-cases/UC-003-checkout-stripe.md) | Checkout en 3 Pasos y Pago con Tarjeta Stripe | § 3.4 & § 3.6.1 | Pagos & Órdenes | [`TASK-003`](../.agents/tasks/TASK-003-checkout-stripe-transacting.md) | [`NET-001`](diagrams/use-case-network/NET-001-template.md) | `VERIFIED 🟢` |
| [`UC-004`](use-cases/UC-004-cotizacion-envio-courierfast.md) | Cotización de Fletes y Despacho CourierFast | § 3.7 | Envíos y Logística | [`TASK-004`](../.agents/tasks/TASK-004-courierfast-shipping-integration.md) | [`NET-001`](diagrams/use-case-network/NET-001-template.md) | `VERIFIED 🟢` |
| [`UC-005`](use-cases/UC-005-autenticacion-libreta-direcciones.md) | Autenticación y Libreta de Direcciones (Máx 5) | § 3.2 | Auth & Perfil | [`TASK-005`](../.agents/tasks/TASK-005-user-auth-and-address-book.md) | [`NET-001`](diagrams/use-case-network/NET-001-template.md) | `VERIFIED 🟢` |
| [`UC-006`](use-cases/UC-006-opiniones-compradores-verificados.md) | Calificaciones de Compradores Verificados | § 3.8 | Reseñas y Social | [`TASK-006`](../.agents/tasks/TASK-006-verified-product-reviews.md) | [`NET-001`](diagrams/use-case-network/NET-001-template.md) | `VERIFIED 🟢` |
| [`UC-007`](use-cases/UC-007-admin-dashboard-catalogo-csv.md) | Panel Admin, Carga CSV e Inventario Bajo (<10) | § 3.9 | Administración | [`TASK-007`](../.agents/tasks/TASK-007-admin-dashboard-and-csv-import.md) | [`NET-001`](diagrams/use-case-network/NET-001-template.md) | `VERIFIED 🟢` |
| [`UC-008`](use-cases/UC-008-ciclo-vida-pedidos-tracking.md) | Ciclo de Vida de Órdenes (6 Estados) & Tracking | § 3.5 | Gestión de Órdenes | [`TASK-003`](../.agents/tasks/TASK-003-checkout-stripe-transacting.md) | [`NET-001`](diagrams/use-case-network/NET-001-template.md) | `VERIFIED 🟢` |
| [`UC-009`](use-cases/UC-009-transferencia-bancaria-conciliacion.md) | Pago por Transferencia y Conciliación Manual | § 3.6.2 | Pagos Alternativos | [`TASK-003`](../.agents/tasks/TASK-003-checkout-stripe-transacting.md) | [`NET-001`](diagrams/use-case-network/NET-001-template.md) | `VERIFIED 🟢` |

---

## 📊 3. Catálogo de Diagramas por Tipo

### ☁️ Diagramas de Despliegue Multi-Cloud (`docs/diagrams/deployment/`)
- [`DEP-001`](diagrams/deployment/DEP-001-template.md) — Topología física/lógica de contenedores, balanceadores y almacenes gestionados.

### 🛡️ Topología de Red y Seguridad (`docs/diagrams/network-topology/`)
- [`SEC-NET-001`](diagrams/network-topology/SEC-NET-001-template.md) — Arquitectura de red DMZ, subredes privadas aisladas y reglas de firewall.

### 🕸️ Red de Trazabilidad de Casos de Uso (`docs/diagrams/use-case-network/`)
- [`NET-001`](diagrams/use-case-network/NET-001-template.md) — Grafo de dependencia: Requerimiento $\rightarrow$ Caso de Uso $\rightarrow$ Tarea Agente $\rightarrow$ Worktree $\rightarrow$ Commit.

### 🧩 Diagramas de Componentes e Interfaces (`docs/diagrams/components/`)
- [`CMP-001`](diagrams/components/CMP-001-template.md) — Descomposición modular, puertos/interfaces y asignación de ownership por subagente IA.

### 🛡️ Diagramas de Robustez (`docs/diagrams/robustness/`)
- [`ROB-001`](diagrams/robustness/ROB-001-template.md) — Validación BCE (Frontera $\rightarrow$ Control $\rightarrow$ Entidad) de reglas de negocio y políticas de persistencia.

### 🔄 Diagramas de Secuencia (`docs/diagrams/sequences/`)
- [`SEQ-001`](diagrams/sequences/SEQ-001-template.md) — Flujo temporal de creación de orden con verificación de caché y base de datos.

### ⚙️ Diagramas de Actividad / Flujos (`docs/diagrams/activities/`)
- [`ACT-001`](diagrams/activities/ACT-001-template.md) — Lógica de validación, reserva de inventario y rollback.

### 🔀 Máquinas de Estados (`docs/diagrams/state-machines/`)
- [`STM-001`](diagrams/state-machines/STM-001-template.md) — Ciclo de vida y transiciones de la entidad `Order`.

### 💾 Modelo de Datos (`docs/diagrams/entity-relationship/`)
- [`ERD-001`](diagrams/entity-relationship/ERD-001-template.md) — Diagrama Entidad-Relación de PostgreSQL.

### 📅 Roadmap y Planificación Humano-IA (`docs/diagrams/gantt/`)
- [`GANTT-001`](diagrams/gantt/GANTT-001-shopfast.md) — Cronograma interactivo (PO vs Tech Lead vs Agente IA) y protocolo de auditoría/rollback.

---

## 📝 4. Especificaciones Técnicas (RFCs)
- [`RFC-001`](specs/RFC-001-template.md) — Especificación técnica y requerimientos funcionales.


