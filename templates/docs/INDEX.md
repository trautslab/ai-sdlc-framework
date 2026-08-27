# 🗺️ Índice Maestro de Documentación & Trazabilidad

Este índice actúa como la **matriz de navegación** para todo el catálogo de arquitectura, casos de uso y diagramas del repositorio.

---

## 🏛️ 1. Arquitectura Global
- [Modelo C4 (Contexto, Contenedores, Componentes)](architecture/c4-model-template.md)
- [Decisiones de Arquitectura (ADRs)](adr/ADR-0001-template.md)

---

## 🔬 1.1. Análisis Profundo & Arquitectura Enterprise
- [`01-ENTERPRISE-NFRS-AND-ISOLATION-100-TOOLS.md`](deep-dives/01-ENTERPRISE-NFRS-AND-ISOLATION-100-TOOLS.md) — Matriz de RNFs, Resiliencia, Bulkheading y Aislamiento para CRM de IA con 100+ Integraciones.
- [`02-CONTEXT-GOVERNANCE-TOKENOMICS-AND-PLATFORMS.md`](deep-dives/02-CONTEXT-GOVERNANCE-TOKENOMICS-AND-PLATFORMS.md) — Gobernanza Inmune a la Saturación/Compactación de Contexto, Tokenomics de Alta Escala y Garantías en Antigravity / Claude Code / Codex / Cursor.

---

## 🎯 2. Matriz de Trazabilidad: Casos de Uso vs Diagramas

| ID Caso de Uso | Título | Dominio | Diagrama Secuencia | Diagrama Actividad | Máquina Estados | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [`UC-001`](use-cases/UC-001-template.md) | Autenticación y Login | Auth | [`SEQ-001`](diagrams/sequences/SEQ-001-template.md) | [`ACT-001`](diagrams/activities/ACT-001-template.md) | [`STM-001`](diagrams/state-machines/STM-001-template.md) | `APPROVED` |

---

## 📊 3. Catálogo de Diagramas por Tipo

### Diagramas de Secuencia (`docs/diagrams/sequences/`)
- [`SEQ-001`](diagrams/sequences/SEQ-001-template.md) — Flujo de creación de orden con verificación de caché y base de datos.

### Diagramas de Actividad / Flujos (`docs/diagrams/activities/`)
- [`ACT-001`](diagrams/activities/ACT-001-template.md) — Lógica de validación, reserva de inventario y rollback.

### Máquinas de Estados (`docs/diagrams/state-machines/`)
- [`STM-001`](diagrams/state-machines/STM-001-template.md) — Ciclo de vida y transiciones de la entidad `Order`.

### Modelo de Datos (`docs/diagrams/entity-relationship/`)
- [`ERD-001`](diagrams/entity-relationship/ERD-001-template.md) — Diagrama Entidad-Relación de PostgreSQL.

---

## 📝 4. Especificaciones Técnicas (RFCs)
- [`RFC-001`](specs/RFC-001-template.md) — Especificación técnica y requerimientos funcionales.
