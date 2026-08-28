# 🤖 Directrices de Desarrollo para Agentes IA — ShopFast E-commerce

Este documento es el **punto de anclaje inicial** que cualquier agente de IA (Antigravity IDE/CLI, Cursor, Claude Code) debe leer al ingresar a este repositorio.

---

## 1. Identidad y Contexto del Proyecto
- **Proyecto:** ShopFast E-commerce MVP.
- **Stack Tecnológico:** TypeScript (Node.js 22), PostgreSQL 14+ (persistencia relacional ACID), Redis (caché de catálogo y sesiones), Stripe API (pagos), CourierFast API (logística).
- **Documento Fuente:** [`Caso-Práctico-Documento-de-Alcance.pdf`](./Caso-Práctico-Documento-de-Alcance.pdf).

---

## 2. Invariantes Arquitectónicos de ShopFast (No Negociables)
1. **PCI-DSS & Seguridad de Tarjetas:** NUNCA almacenar números de tarjeta, CVV o fechas de expiración en nuestra base de datos. Todo el procesamiento se delega a Stripe Elements / Checkout.
2. **Reserva Atómica de Stock:** Las órdenes deben reservar inventario dentro de una transacción SQL con bloqueo optimista/pesimista para prevenir sobreventa (*Overselling*).
3. **Desacoplamiento de Courier:** Las cotizaciones de CourierFast deben tener un timeout máximo de 2.5s y fallback a tarifa plana local si el servicio de courier no responde.
4. **Cero Consultas N+1 en Catálogo:** Las búsquedas de 2,500 productos deben responder en `< 1.0s` utilizando caché de Redis indexada por categoría/SKU.
5. **Zero Half-Done Policy:** Toda entrega debe ejecutarse en vivo (`npm test`, `npm run demo:live`, `npm run eval:task`) con 100% de aserciones verdes desde la primera iteración.

---

## 3. Protocolo de Sesión de Antigravity
1. **Inicio:** Leer [`HANDOFF.md`](./HANDOFF.md) y el contrato de tarea en [`.agents/tasks/TASK-001-core-checkout-flow.md`](./.agents/tasks/TASK-001-core-checkout-flow.md).
2. **Desarrollo:** Ejecutar `node evals/harness.mjs --task task-001` para verificar el cumplimiento del contrato.
3. **Cierre:** Actualizar la sección `[Unreleased]` de [`CHANGELOG.md`](./CHANGELOG.md) y dejar el checkpoint en `HANDOFF.md`.
