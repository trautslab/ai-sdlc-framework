# 🎯 [UC-009] Pago vía Transferencia Bancaria y Conciliación Administrativa

| Campo | Valor / Descripción |
| :--- | :--- |
| **Identificador Único:** | `UC-009` (Formato `UC-XXXX`, inmutable y secuencial) |
| **Módulo / Dominio:** | Pagos Alternativos (§ 3.6.2 del PDF de Alcance) |
| **Prioridad de Negocio:** | MEDIA (P2) |
| **Estado:** | `VERIFIED 🟢` |
| **Impacto en Negocio:** | Captura de ventas de clientes no bancarizados o corporativos sin tarjeta de crédito. |
| **Requerimiento Origen:** | [`REQ-009`](../specs/RFC-001-mvp-core-architecture.md) |
| **Contrato de Tarea Agente:**| [`.agents/tasks/TASK-003-checkout-stripe-transacting.md`](../../.agents/tasks/TASK-003-checkout-stripe-transacting.md) |
| **Red de Trazabilidad:** | [`NET-001`](../diagrams/use-case-network/NET-001-template.md) |

---

## 1. Descripción del Negocio
Permitir a los compradores que no utilicen tarjetas de crédito o débito seleccionar el método de **Transferencia Bancaria**, generando un pedido en estado `PENDIENTE_PAGO` con instrucciones y datos bancarios oficiales de ShopFast S.A. El equipo de operaciones valida manualmente el comprobante de transferencia y confirma el pago en el panel administrativo para dar inicio al despacho.

---

## 2. Actores y Roles
- **Actor Principal:** Comprador sin tarjeta de crédito.
- **Actor Secundario:** Operador Administrativo de ShopFast.
- **Subagente IA Responsable:** `subagent-3` (Pagos y Órdenes).

---

## 3. Precondiciones Invariables
1. Los datos de la cuenta bancaria de ShopFast deben estar configurados en el sistema (§ 3.9.5).
2. La orden debe generarse con reserva temporal de stock (48 horas de vigencia máxima).
3. No se autoriza el despacho logístico mientras el pedido permanezca en `PENDIENTE_PAGO`.

---

## 4. Flujo Principal (Happy Path)
1. En el Paso 2 del Checkout, el comprador elige *"Transferencia Bancaria"*.
2. El sistema genera la orden con ID unívoco y estado inicial `PENDIENTE_PAGO`.
3. La pantalla de confirmación y el email automático presentan los datos bancarios (Banco, Cuenta Corriente, Titular, RUT) y el código de referencia de la orden.
4. El cliente realiza la transferencia y remite el comprobante de pago.
5. El operador administrativo ingresa al módulo `/admin/orders`, coteja los fondos en la cuenta y pulsa *"Confirmar Pago Manual"*.
6. La orden transiciona a `PAGO_CONFIRMADO` y se emite la orden de empaque y guía en CourierFast.

---

## 5. Reglas de Negocio y Expiración por Falta de Pago
- **5.a Cancelación Automática por Vencimiento (Time-to-Live):**
  - Si transcurren 48 horas sin que el comprador adjunte comprobante ni el admin confirme el pago, un job en segundo plano marca la orden como `CANCELADA` y libera el inventario reservado.
- **5.b Comprobante Inválido o Monto Discordante:**
  - El operador puede rechazar el comprobante registrando el motivo ("Monto transferido no coincide con el total de la orden"), lo que notifica inmediatamente al comprador para subsanar la diferencia.

---

## 6. Criterios de Aceptación (BDD Gherkin)
```gherkin
Escenario: Creación de pedido con pago por transferencia
  Dado que el comprador selecciona "Transferencia Bancaria" en el checkout
  Cuando confirma la compra de un pedido de $120,000 COP
  Entonces la orden se crea con estado inicial "PENDIENTE_PAGO"
  Y el email de confirmación incluye los datos bancarios y número de referencia
  Y el stock queda reservado temporalmente por 48 horas

Escenario: Aprobación administrativa del pago manual
  Dado un pedido en estado "PENDIENTE_PAGO" con comprobante verificado en banco
  Cuando el administrador pulsa "Confirmar Pago Manual"
  Entonces la orden transiciona a "PAGO_CONFIRMADO"
  Y se habilita la generación de la guía de despacho con CourierFast
```
