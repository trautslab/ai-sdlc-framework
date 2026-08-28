# 🗺️ Matriz Maestra de Trazabilidad — ShopFast E-commerce Platform

Este índice centraliza y conecta todos los requisitos del [Documento de Alcance de ShopFast S.A.](../Caso-Práctico-Documento-de-Alcance.pdf) con su arquitectura técnica, diagramas y código.

---

## 🏛️ 1. Arquitectura del Sistema (Modelo C4)
- [C4 Nivel 1: Contexto del Sistema](architecture/c4-01-context.md) — Actores (Comprador, Admin) y Servicios Externos (Stripe, CourierFast).
- [C4 Nivel 2: Contenedores](architecture/c4-02-containers.md) — Web SPA, API Backend Node.js, PostgreSQL 14+, Redis Cache.
- [C4 Nivel 3: Componentes](architecture/c4-03-components.md) — Módulos Catalog, Cart, Checkout, Orders y PaymentAdapter.

---

## 🎯 2. Matriz de Trazabilidad: Casos de Uso vs. Diagramas

| ID Caso de Uso | Nombre del Flujo | Módulo | Diagrama Secuencia | Diagrama Actividad | Máquina Estados | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| [`UC-001`](use-cases/UC-001-busqueda-catalogo.md) | Búsqueda y Navegación de Catálogo (2,500 items) | Catalog | [`SEQ-001`](diagrams/sequences/SEQ-001-checkout-stripe.md) | [`ACT-001`](diagrams/activities/ACT-001-flujo-compra.md) | — | `APPROVED` |
| [`UC-002`](use-cases/UC-002-gestion-carrito.md) | Gestión de Carrito y Validación de Stock | Cart | [`SEQ-001`](diagrams/sequences/SEQ-001-checkout-stripe.md) | [`ACT-001`](diagrams/activities/ACT-001-flujo-compra.md) | — | `APPROVED` |
| [`UC-003`](use-cases/UC-003-checkout-stripe.md) | Checkout en 3 Pasos y Pago Seguro Stripe | Checkout | [`SEQ-001`](diagrams/sequences/SEQ-001-checkout-stripe.md) | [`ACT-001`](diagrams/activities/ACT-001-flujo-compra.md) | [`STM-001`](diagrams/state-machines/STM-001-estado-pedido.md) | `APPROVED` |

---

## 📊 3. Catálogo de Diagramas

- **Secuencia:** [`SEQ-001: Checkout con Stripe Webhook`](diagrams/sequences/SEQ-001-checkout-stripe.md)
- **Actividades / Flujos:** [`ACT-001: Proceso de Compra y Bifurcaciones`](diagrams/activities/ACT-001-flujo-compra.md)
- **Máquina de Estados:** [`STM-001: Ciclo de Vida del Pedido`](diagrams/state-machines/STM-001-estado-pedido.md)
- **Modelo de Datos:** [`ERD-001: Esquema Relacional PostgreSQL`](diagrams/entity-relationship/ERD-001-shopfast-db.md)

---

## ⚖️ 4. Registro de Decisiones de Arquitectura (ADRs)
- [`ADR-0001: Delegación de PCI-DSS mediante Stripe Checkout`](adr/ADR-0001-stripe-checkout-adapter.md)
- [`ADR-0002: Estrategia de Caché Redis para Búsquedas < 1.0s`](adr/ADR-0002-redis-cache-strategy.md)
