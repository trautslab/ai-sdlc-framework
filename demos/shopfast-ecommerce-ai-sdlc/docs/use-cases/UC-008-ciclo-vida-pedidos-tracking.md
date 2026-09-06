# 🎯 [UC-008] Ciclo de Vida de Órdenes, Tracking en Tiempo Real y Cancelación

| Campo | Valor / Descripción |
| :--- | :--- |
| **Identificador Único:** | `UC-008` (Formato `UC-XXXX`, inmutable y secuencial) |
| **Módulo / Dominio:** | Gestión de Pedidos del Cliente (§ 3.5 del PDF de Alcance) |
| **Prioridad de Negocio:** | ALTA (P1) |
| **Estado:** | `VERIFIED 🟢` |
| **Impacto en Negocio:** | Visibilidad completa del estado del pedido, trazabilidad logística y reducción de consultas de soporte. |
| **Requerimiento Origen:** | [`REQ-008`](../specs/RFC-001-mvp-core-architecture.md) |
| **Contrato de Tarea Agente:**| [`.agents/tasks/TASK-003-checkout-stripe-transacting.md`](../../.agents/tasks/TASK-003-checkout-stripe-transacting.md) |
| **Red de Trazabilidad:** | [`NET-TEMPLATE`](../diagrams/use-case-network/NET-TEMPLATE.md) |

---

## 1. Descripción del Negocio
Permitir a los compradores consultar el estado en tiempo real de sus pedidos a través de una máquina de estados determinista con 6 estados formales (`PENDIENTE_PAGO`, `PAGO_CONFIRMADO`, `EN_PREPARACION`, `ENVIADO`, `ENTREGADO`, `CANCELADO`), visualizar el enlace directo de tracking con CourierFast, solicitar factura con RUT/RFC y cancelar pedidos de forma autónoma antes de que entren en fase logística.

---

## 2. Actores y Roles
- **Actor Principal:** Comprador con pedidos vigentes o históricos.
- **Actor Secundario:** Sistema de Envíos CourierFast / Operador de Despacho.
- **Subagente IA Responsable:** `subagent-3` (Órdenes y Máquina de Estados).

---

## 3. Precondiciones Invariables
1. El usuario debe estar autenticado y ser el propietario legítimo de la orden (`buyerId == session.userId`).
2. Las transiciones de estado deben obedecer estrictamente las reglas del diagrama de máquina de estados [`STM-001`](../diagrams/state-machines/STM-001-estado-pedido.md).

---

## 4. Flujo Principal (Happy Path)
1. El cliente accede a su historial de compras en `/account/orders`.
2. El sistema lista las órdenes ordenadas descendentemente por fecha con sus badges de estado.
3. El cliente pulsa en una orden en estado `ENVIADO`.
4. El sistema presenta el detalle completo (ítems, precios, impuestos, dirección de entrega) y el botón con enlace externo a la guía de tracking en CourierFast.
5. El cliente puede pulsar *"Solicitar Factura"* e ingresar su RUT/RFC para emisión tributaria.

---

## 5. Reglas de Negocio y Restricciones de Cancelación
- **5.a Cancelación Permitida (Regla 3.5):**
  - El cliente solo puede cancelar el pedido si se encuentra en estado `PENDIENTE_PAGO` o `PAGO_CONFIRMADO`.
  - Al cancelar, el sistema libera automáticamente la reserva de stock en inventario y procesa el reembolso en Stripe si ya existía cobro.
- **5.b Cancelación Bloqueada (Regla 3.5 & 3.9.2):**
  - Si el pedido se encuentra en `EN_PREPARACION`, `ENVIADO` o `ENTREGADO`, la opción de cancelación se deshabilita con el mensaje: *"El pedido ya se encuentra en proceso de despacho y no puede ser cancelado en línea. Contacta a soporte para devoluciones"*.

---

## 6. Criterios de Aceptación (BDD Gherkin)
```gherkin
Escenario: Cancelación autónoma exitosa de pedido confirmado
  Dado un pedido en estado "PAGO_CONFIRMADO"
  Cuando el comprador solicita la cancelación antes del despacho
  Entonces el pedido transiciona a estado "CANCELADO"
  Y el stock previamente reservado es devuelto al inventario disponible
  Y se emite la orden de reembolso al procesador de pagos

Escenario: Rechazo de cancelación para pedido ya despachado
  Dado un pedido en estado "ENVIADO" con número de tracking asignado
  Cuando el comprador intenta invocar el endpoint de cancelación
  Entonces el sistema rechaza la solicitud con HTTP 409 Conflict
  Y el pedido se mantiene en estado "ENVIADO"
```
