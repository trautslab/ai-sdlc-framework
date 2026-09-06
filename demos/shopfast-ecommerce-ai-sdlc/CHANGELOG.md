# Changelog — ShopFast Platform

Todas las modificaciones notables de este proyecto están documentadas en este archivo siguiendo el estándar [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y [Semantic Versioning (SemVer)](https://semver.org/lang/es/).

---

## [Unreleased]

### Added
- Integración del webhook de Stripe con idempotencia de eventos (`TASK-001`).
- Módulo de cotización de envíos con CourierFast API.

---

## [0.1.0] - 2026-08-27 — *MVP Core Architecture & Scaffolding Release*

### 🚀 Added
- **Arquitectura & Especificaciones:**
  - Especificación formal de requisitos basada en el Documento de Alcance de ShopFast S.A.
  - Modelo C4 (Contexto, Contenedores y Componentes) en `docs/architecture/`.
  - Casos de Uso formales con BDD Gherkin: `UC-001` (Catálogo y Búsqueda), `UC-002` (Carrito de Compras), `UC-003` (Checkout en 3 pasos).
  - Diagramas de Secuencia, Actividades, Estados (`Order Lifecycle`) y Modelo ERD para PostgreSQL.
  - Decisiones de Arquitectura: `ADR-0001` (Stripe Checkout) y `ADR-0002` (Caché Redis para 2,500 productos).
- **Módulos Core & Vertical Slices (`src/`):**
  - Módulo de Catálogo con búsqueda indexada y soporte de 3 niveles de categorías.
  - Módulo de Órdenes con reserva transaccional de inventario.
  - Adaptador de Pagos con Stripe (`StripePaymentAdapter`).
- **Gobernanza & Calidad:**
  - Configuración de DevContainer hermético para desarrollo en Node 22 + PostgreSQL + Redis.
  - Eval Harness determinista (`evals/harness.mjs`) para validación de contratos de tareas.
